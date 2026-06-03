const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All cart routes need protection

router.route('/')
  .get(getCart)
  .post(addToCart)
  .put(updateCartItemQuantity);

router.delete('/:productId', removeFromCart);
router.post('/clear', clearCart);

module.exports = router;
