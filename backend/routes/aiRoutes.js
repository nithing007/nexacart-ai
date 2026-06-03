const express = require('express');
const router = express.Router();
const {
  getRecommendations,
  getBudgetAssistant,
  getSmartSearch,
} = require('../controllers/aiController');
const {
  testGemini,
  searchGemini,
  recommendationsGemini,
  budgetGemini,
} = require('../controllers/geminiController');
const { protect } = require('../middleware/authMiddleware');

// Publicly testable Gemini routes
router.post('/test', testGemini);
router.post('/search', searchGemini);
router.post('/recommendations', recommendationsGemini);
router.post('/budget', budgetGemini);

router.use(protect); // All AI routes require auth to personalize recommendations

router.get('/recommendations', getRecommendations);
router.post('/budget-assistant', getBudgetAssistant);
router.get('/smart-search', getSmartSearch);

module.exports = router;
