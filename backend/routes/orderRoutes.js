const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All order routes require authentication

router.route('/')
  .post(addOrderItems)
  .get(getMyOrders);

router.route('/:id')
  .get(getOrderById);

module.exports = router;
