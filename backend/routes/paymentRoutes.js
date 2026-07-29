const express = require('express');
const router = express.Router();
const {
  getUpiConfig,
  createUpiOrder,
  submitUpiPayment,
  adminVerifyPayment,
  getAdminPayments,
  getPaymentByOrderId
} = require('../controllers/paymentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public route to fetch UPI Config (UPI ID & Merchant Name)
router.get('/upi-config', getUpiConfig);

// Protected User routes
router.post('/create-upi-order', protect, createUpiOrder);
router.post('/submit-upi-payment', protect, submitUpiPayment);
router.get('/order/:orderId', protect, getPaymentByOrderId);

// Protected Admin routes
router.post('/admin/verify-payment', protect, adminOnly, adminVerifyPayment);
router.get('/admin/all', protect, adminOnly, getAdminPayments);

module.exports = router;
