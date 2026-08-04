const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getAdminPayments,
  getPaymentByOrderId
} = require('../controllers/paymentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Protected User Razorpay routes (with legacy route aliases)
router.post('/create-order', protect, createOrder);
router.post('/create-upi-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.post('/verify-payment', protect, verifyPayment);
router.post('/submit-upi-payment', protect, verifyPayment);
router.get('/order/:orderId', protect, getPaymentByOrderId);

// Protected Admin routes
router.get('/admin/all', protect, adminOnly, getAdminPayments);

module.exports = router;
