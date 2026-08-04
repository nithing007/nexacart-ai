const Order = require('../models/Order');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const { createRazorpayOrder } = require('../services/razorpayService');
const { verifyRazorpaySignature } = require('../utils/paymentVerification');

// Delivery partner helpers
const getRandomDeliveryPartner = () => {
  const partners = ['Delhivery', 'Blue Dart', 'DTDC', 'XpressBees', 'Ekart', 'India Post'];
  return partners[Math.floor(Math.random() * partners.length)];
};

const generateTrackingNumber = (partner) => {
  const prefix = partner.substring(0, 3).toUpperCase();
  const randNum = Math.floor(100000000 + Math.random() * 900000000);
  return `${prefix}${randNum}IN`;
};

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    console.log('\n======================================================');
    console.log('[Razorpay Order Creation Request]');
    console.log(`- Customer: ${req.user.email} (${req.user._id})`);
    console.log(`- Amount: ₹${amount}`);
    console.log('======================================================\n');

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid order amount' });
    }

    const rzpOrder = await createRazorpayOrder({
      amount,
      currency,
      receipt: receipt || `rcpt_${req.user._id.toString().substring(0, 6)}_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        userEmail: req.user.email
      }
    });

    return res.status(200).json({
      success: true,
      order_id: rzpOrder.id,
      amount: rzpOrder.amount, // in paise
      currency: rzpOrder.currency,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('[Error Creating Razorpay Order]:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Unable to create Razorpay Order'
    });
  }
};

// @desc    Verify Razorpay Payment Signature & Create/Confirm Order
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderPayload
    } = req.body;

    console.log('\n======================================================');
    console.log('[Razorpay Payment Verification Request]');
    console.log(`- Razorpay Order ID: ${razorpay_order_id}`);
    console.log(`- Razorpay Payment ID: ${razorpay_payment_id}`);
    console.log('======================================================\n');

    // 1. Signature Verification
    const isValid = verifyRazorpaySignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });

    if (!isValid) {
      console.error('\x1b[31m%s\x1b[0m', '[Razorpay Verification Failed]: Signature mismatch');
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Invalid signature.'
      });
    }

    // Extract order details from payload
    const {
      orderItems = [],
      shippingAddress = 'Address Provided at Checkout',
      paymentMethod = 'Razorpay',
      itemsPrice = 0,
      taxPrice = 0,
      shippingPrice = 0,
      totalPrice = 0
    } = orderPayload || req.body;

    const partner = getRandomDeliveryPartner();
    const trackingNo = generateTrackingNumber(partner);
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + 3);

    // 2. Create Confirmed Order in DB
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: new Date(),
      status: 'Confirmed',
      deliveryPartner: partner,
      trackingNumber: trackingNo,
      expectedDeliveryDate: expectedDate,
      estimatedDeliveryTime: '2:00 PM – 7:00 PM',
      paymentResult: {
        id: razorpay_payment_id,
        status: 'Completed',
        update_time: new Date().toISOString(),
        email_address: req.user.email
      },
      timeline: [
        {
          status: 'Confirmed',
          timestamp: new Date(),
          description: `Payment verified via Razorpay (${razorpay_payment_id}). Order confirmed.`
        }
      ]
    });

    const createdOrder = await order.save();

    // 3. Create Payment Record in DB
    const payment = new Payment({
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      userOrder: createdOrder._id,
      userId: req.user._id,
      amount: totalPrice,
      currency: 'INR',
      paymentMethod,
      status: 'Captured',
      transactionId: razorpay_payment_id,
      gateway: 'Razorpay'
    });

    await payment.save();

    // 4. Inventory Stock Reduction
    for (const item of orderItems) {
      if (item.product) {
        const product = await Product.findById(item.product);
        if (product) {
          product.countInStock = Math.max(0, product.countInStock - item.quantity);
          await product.save();
          console.log(`[Inventory]: Stock reduced for "${product.name}" to ${product.countInStock}`);
        }
      }
    }

    console.log('\x1b[32m%s\x1b[0m', `[Razorpay Payment Success]: Order #${createdOrder._id} created.`);

    return res.status(201).json({
      success: true,
      message: 'Payment verified and order confirmed successfully.',
      order: createdOrder,
      orderId: createdOrder._id,
      paymentId: razorpay_payment_id
    });

  } catch (error) {
    console.error('[Razorpay Payment Verification Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Payment verification failed'
    });
  }
};

// @desc    Admin: Get All Payment Records
// @route   GET /api/payment/admin/all
// @access  Private/Admin
const getAdminPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate('userId', 'firstName lastName email phoneNumber')
      .populate('userOrder')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Payment Record by Order ID
// @route   GET /api/payment/order/:orderId
// @access  Private
const getPaymentByOrderId = async (req, res) => {
  try {
    const payment = await Payment.findOne({ userOrder: req.params.orderId })
      .populate('userId', 'firstName lastName email')
      .populate('userOrder');

    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found for this order' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getAdminPayments,
  getPaymentByOrderId
};
