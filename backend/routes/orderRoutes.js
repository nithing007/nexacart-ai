const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  cancelOrder,
  requestReturn,
  updateOrderStatusAdmin,
  getAdminOrders
} = require('../controllers/orderController');
const { protect, adminOnly: admin } = require('../middleware/authMiddleware');

router.use(protect); // All order routes require authentication

router.route('/')
  .post(addOrderItems)
  .get(getMyOrders);

router.route('/admin/all')
  .get(admin, getAdminOrders);

router.route('/:id')
  .get(getOrderById);

router.route('/:id/cancel')
  .put(cancelOrder);

router.route('/:id/return')
  .put(requestReturn);

router.route('/:id/admin-status')
  .put(admin, updateOrderStatusAdmin);

module.exports = router;
