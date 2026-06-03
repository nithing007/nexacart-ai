const express = require('express');
const router = express.Router();
const {
  getRecommendations,
  getBudgetAssistant,
  getSmartSearch,
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All AI routes require auth to personalize recommendations

router.get('/recommendations', getRecommendations);
router.post('/budget-assistant', getBudgetAssistant);
router.get('/smart-search', getSmartSearch);

module.exports = router;
