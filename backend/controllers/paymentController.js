const Order = require('../models/Order');
const Product = require('../models/Product');
const Payment = require('../models/Payment');

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

// @desc    Get UPI Payment Configuration (UPI ID & Merchant Name)
// @route   GET /api/payment/upi-config
// @access  Public
const getUpiConfig = (req, res) => {
  const upiId = process.env.UPI_ID || 'nexacart@upi';
  const merchantName = process.env.UPI_MERCHANT_NAME || 'NexaCart AI';
  console.log(`[UPI Config Request] Returning UPI ID: ${upiId}`);
  res.json({ upiId, merchantName });
};

// @desc    Create Order & Generate Dynamic UPI Payment URI
// @route   POST /api/payment/create-upi-order
// @access  Private
const createUpiOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod = 'UPI',
      itemsPrice = 0,
      taxPrice = 0,
      shippingPrice = 0,
      totalPrice = 0
    } = req.body;

    console.log('\n======================================================');
    console.log('[Dynamic UPI QR Payment Request]');
    console.log(`- Customer: ${req.user.email} (${req.user._id})`);
    console.log(`- Total Price: ₹${totalPrice}`);
    console.log(`- Items Count: ${orderItems?.length || 0}`);
    console.log('======================================================\n');

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ message: 'Invalid order total' });
    }

    const partner = getRandomDeliveryPartner();
    const trackingNo = generateTrackingNumber(partner);
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + 3);

    // 1. Create initial Order in MongoDB with status 'Waiting for Payment'
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress: shippingAddress || 'Address Provided at Checkout',
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: false,
      status: 'Waiting for Payment',
      deliveryPartner: partner,
      trackingNumber: trackingNo,
      expectedDeliveryDate: expectedDate,
      estimatedDeliveryTime: '2:00 PM – 7:00 PM',
      timeline: [
        { 
          status: 'Waiting for Payment', 
          timestamp: new Date(), 
          description: 'Order created. Pending customer UPI payment submission.' 
        }
      ]
    });

    const createdOrder = await order.save();

    // 2. Generate Dynamic UPI Payment URI
    const upiId = process.env.UPI_ID || 'nexacart@upi';
    const merchantName = encodeURIComponent(process.env.UPI_MERCHANT_NAME || 'NexaCart AI');
    const orderIdStr = createdOrder._id.toString();
    const amountFormatted = totalPrice.toFixed(2);

    // Standard UPI Payment URI Format:
    // upi://pay?pa=YOUR_UPI_ID&pn=NexaCart AI&am=<order amount>&tn=<order id>&cu=INR
    const upiUri = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amountFormatted}&tn=${orderIdStr}&cu=INR`;

    createdOrder.upiUri = upiUri;
    await createdOrder.save();

    // 3. Create initial Payment Record in MongoDB
    const payment = new Payment({
      paymentId: `pay_upi_${Date.now()}`,
      orderId: orderIdStr,
      userOrder: createdOrder._id,
      userId: req.user._id,
      amount: totalPrice,
      currency: 'INR',
      paymentMethod,
      upiId,
      upiUri,
      status: 'Waiting for Payment',
      transactionId: `TXN_PENDING_${Date.now()}`,
      gateway: 'UPI QR'
    });

    const createdPayment = await payment.save();

    console.log('\x1b[32m%s\x1b[0m', `[UPI Order Created Successfully]: Order #${createdOrder._id}`);
    console.log(`- Dynamic UPI URI: ${upiUri}`);

    return res.status(201).json({
      success: true,
      message: 'UPI order created successfully',
      order: createdOrder,
      payment: createdPayment,
      upiUri,
      upiId,
      merchantName: process.env.UPI_MERCHANT_NAME || 'NexaCart AI'
    });

  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '[Error Creating UPI Order]:', error.message);
    res.status(500).json({ message: error.message || 'Failed to create UPI payment order' });
  }
};

// @desc    Customer Submits UPI Payment UTR Ref / Screenshot
// @route   POST /api/payment/submit-upi-payment
// @access  Private
const submitUpiPayment = async (req, res) => {
  try {
    const { orderId, upiTransactionRef, paymentScreenshot } = req.body;

    console.log(`[Customer Payment Submission] Order #${orderId}, UTR: ${upiTransactionRef}`);

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update Order fields
    order.status = 'Payment Submitted';
    order.upiTransactionRef = upiTransactionRef || order.upiTransactionRef || `UTR_${Date.now()}`;
    if (paymentScreenshot) {
      order.paymentScreenshot = paymentScreenshot;
    }
    order.paymentSubmittedAt = new Date();
    order.timeline.push({
      status: 'Payment Submitted',
      timestamp: new Date(),
      description: `Payment submitted by customer. UTR/Ref: ${order.upiTransactionRef}. Pending Admin Verification.`
    });

    const updatedOrder = await order.save();

    // Update Payment record
    const payment = await Payment.findOne({ userOrder: orderId });
    if (payment) {
      payment.status = 'Payment Submitted';
      payment.upiTransactionRef = order.upiTransactionRef;
      payment.transactionId = order.upiTransactionRef;
      if (paymentScreenshot) {
        payment.paymentScreenshot = paymentScreenshot;
      }
      await payment.save();
    }

    console.log('\x1b[32m%s\x1b[0m', `[Payment Proof Submitted]: Order #${orderId} marked as Payment Submitted.`);

    return res.json({
      success: true,
      message: 'Payment details submitted successfully. Waiting for Admin verification.',
      order: updatedOrder
    });

  } catch (error) {
    console.error('Error submitting UPI payment:', error);
    res.status(500).json({ message: error.message || 'Failed to submit payment details' });
  }
};

// @desc    Admin Verifies UPI Payment (Approve / Reject / Request Again)
// @route   POST /api/payment/admin/verify-payment
// @access  Private/Admin
const adminVerifyPayment = async (req, res) => {
  try {
    const { orderId, action, adminNotes } = req.body; // action: 'Approve' | 'Reject' | 'Request Again'

    console.log(`[Admin Payment Verification] Action: ${action} for Order #${orderId}`);

    if (!orderId || !action) {
      return res.status(400).json({ message: 'Order ID and action are required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const payment = await Payment.findOne({ userOrder: orderId });

    if (action === 'Approve') {
      order.isPaid = true;
      order.paidAt = new Date();
      order.status = 'Confirmed';
      order.paymentVerifiedAt = new Date();
      order.adminNotes = adminNotes || 'Payment verified and approved by Admin.';
      order.timeline.push({
        status: 'Admin Verified',
        timestamp: new Date(),
        description: `Payment approved by Admin (${req.user.email}). Status updated to Paid & Confirmed.`
      });

      const updatedOrder = await order.save();

      if (payment) {
        payment.status = 'Captured';
        payment.adminNotes = order.adminNotes;
        await payment.save();
      }

      // Reduce product stock count
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
          product.countInStock = Math.max(0, product.countInStock - item.quantity);
          await product.save();
          console.log(`[Inventory]: Reduced stock for "${product.name}" to ${product.countInStock}`);
        }
      }

      console.log(`[Admin Approval]: Order #${orderId} marked as Paid & Confirmed.`);

      return res.json({
        success: true,
        message: 'Payment approved. Order marked as Paid and Confirmed.',
        order: updatedOrder
      });

    } else if (action === 'Reject') {
      order.isPaid = false;
      order.status = 'Payment Rejected';
      order.adminNotes = adminNotes || 'Payment verification rejected by Admin.';
      order.timeline.push({
        status: 'Payment Rejected',
        timestamp: new Date(),
        description: `Payment rejected by Admin. Reason: ${order.adminNotes}`
      });

      const updatedOrder = await order.save();

      if (payment) {
        payment.status = 'Rejected';
        payment.adminNotes = order.adminNotes;
        await payment.save();
      }

      return res.json({
        success: true,
        message: 'Payment rejected by Admin.',
        order: updatedOrder
      });

    } else if (action === 'Request Again') {
      order.isPaid = false;
      order.status = 'Waiting for Payment';
      order.adminNotes = adminNotes || 'Please resubmit your payment transaction ID or screenshot.';
      order.timeline.push({
        status: 'Waiting for Payment',
        timestamp: new Date(),
        description: `Admin requested payment resubmission. Note: ${order.adminNotes}`
      });

      const updatedOrder = await order.save();

      if (payment) {
        payment.status = 'Request Again';
        payment.adminNotes = order.adminNotes;
        await payment.save();
      }

      return res.json({
        success: true,
        message: 'Requested payment resubmission from customer.',
        order: updatedOrder
      });

    } else {
      return res.status(400).json({ message: 'Invalid verification action' });
    }

  } catch (error) {
    console.error('Admin Verification Error:', error);
    res.status(500).json({ message: error.message || 'Admin verification failed' });
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
  getUpiConfig,
  createUpiOrder,
  submitUpiPayment,
  adminVerifyPayment,
  getAdminPayments,
  getPaymentByOrderId
};
