const Order = require('../models/Order');
const Product = require('../models/Product');

// Helper to generate realistic tracking number and partner
const getRandomDeliveryPartner = () => {
  const partners = ['Delhivery', 'Blue Dart', 'DTDC', 'XpressBees', 'Ekart', 'India Post'];
  return partners[Math.floor(Math.random() * partners.length)];
};

const generateTrackingNumber = (partner) => {
  const prefix = partner.substring(0, 3).toUpperCase();
  const randNum = Math.floor(100000000 + Math.random() * 900000000);
  return `${prefix}${randNum}IN`;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const partner = getRandomDeliveryPartner();
    const trackingNo = generateTrackingNumber(partner);
    
    // Expected delivery 3 to 5 days from now
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + 3);

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: itemsPrice || 0,
      taxPrice: taxPrice || 0,
      shippingPrice: shippingPrice || 0,
      totalPrice: totalPrice || 0,
      status: 'Confirmed',
      deliveryPartner: partner,
      trackingNumber: trackingNo,
      expectedDeliveryDate: expectedDate,
      estimatedDeliveryTime: '2:00 PM – 7:00 PM',
      timeline: [
        { status: 'Order Placed', timestamp: new Date(), description: 'Order submitted by customer.' },
        { status: 'Confirmed', timestamp: new Date(), description: 'Payment confirmed & order sent to seller.' }
      ]
    });

    const createdOrder = await order.save();

    // Adjust stock levels
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock = Math.max(0, product.countInStock - item.quantity);
        await product.save();
      }
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'firstName lastName name email');

    if (order) {
      if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to view this order' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel an order before shipment
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }

    const eligibleStatuses = ['Pending', 'Confirmed', 'Packed'];
    if (!eligibleStatuses.includes(order.status)) {
      return res.status(400).json({ message: `Cannot cancel order at '${order.status}' stage. Order has already been shipped or processed.` });
    }

    order.status = 'Cancelled';
    order.cancellationReason = req.body.reason || 'Cancelled by customer';
    order.timeline.push({
      status: 'Cancelled',
      timestamp: new Date(),
      description: `Order cancelled. Reason: ${order.cancellationReason}`
    });

    // Restore product stock
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock += item.quantity;
        await product.save();
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Request return or replacement after delivery
// @route   PUT /api/orders/:id/return
// @access  Private
const requestReturn = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to request return for this order' });
    }

    if (order.status !== 'Delivered') {
      return res.status(400).json({ message: 'Return requests can only be created for delivered orders' });
    }

    order.returnReason = req.body.reason || 'Defective / Damaged product';
    order.returnStatus = 'Requested';
    order.status = 'Returned';
    order.timeline.push({
      status: 'Return Requested',
      timestamp: new Date(),
      description: `Return request submitted. Reason: ${order.returnReason}`
    });

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin: Update order status, delivery partner, and tracking ID
// @route   PUT /api/orders/:id/admin-status
// @access  Private/Admin
const updateOrderStatusAdmin = async (req, res) => {
  try {
    const { status, deliveryPartner, trackingNumber, estimatedDeliveryTime } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status) order.status = status;
    if (deliveryPartner) order.deliveryPartner = deliveryPartner;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (estimatedDeliveryTime) order.estimatedDeliveryTime = estimatedDeliveryTime;

    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    order.timeline.push({
      status: status || 'Status Updated',
      timestamp: new Date(),
      description: `Order status updated to ${status || order.status} by logistics manager.`
    });

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin: Get all orders across all users
// @route   GET /api/orders/admin/all
// @access  Private/Admin
const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  cancelOrder,
  requestReturn,
  updateOrderStatusAdmin,
  getAdminOrders
};
