const Product = require('../models/Product');
const {
  generateGeminiContent,
  getSmartSearchResults,
  getPersonalizedRecommendations,
  getBudgetRecommendations
} = require('../services/geminiService');

/**
 * Handle API error mapping for Gemini exceptions
 */
const handleGeminiError = (error, res) => {
  const msg = error.message || '';
  console.error('Gemini Controller Error:', error);

  if (msg.includes('API key') || msg.includes('API_KEY') || msg.includes('key not valid')) {
    return res.status(401).json({ error: 'Invalid API key or configuration' });
  }

  if (msg.includes('Quota exceeded') || msg.includes('429') || msg.includes('rate limit')) {
    return res.status(429).json({ error: 'Gemini API rate limit exceeded' });
  }

  res.status(500).json({ error: `Gemini service failure: ${error.message || 'Unknown error'}` });
};

// @desc    Test Gemini integration
// @route   POST /api/ai/test
// @access  Public
const testGemini = async (req, res) => {
  try {
    const prompt = "Suggest the best gaming laptop under ₹60000";
    const response = await generateGeminiContent(prompt);
    res.json({ prompt, response });
  } catch (error) {
    handleGeminiError(error, res);
  }
};

// @desc    Smart Search using Gemini
// @route   POST /api/ai/search
// @access  Public
const searchGemini = async (req, res) => {
  try {
    const query = req.body.query || req.body.q;
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const allProducts = await Product.find({});
    const result = await getSmartSearchResults(query, allProducts);

    const matchedDocs = await Product.find({ _id: { $in: result.productIds } });
    const orderedDocs = result.productIds
      .map(id => matchedDocs.find(d => d._id.toString() === id))
      .filter(Boolean);

    res.json({
      products: orderedDocs.length > 0 ? orderedDocs : matchedDocs.slice(0, 5),
      reasoning: result.reasoning,
      recommendations: result.recommendations
    });
  } catch (error) {
    handleGeminiError(error, res);
  }
};

// @desc    Get Personalized Recommendations using Gemini
// @route   POST /api/ai/recommendations
// @access  Public
const recommendationsGemini = async (req, res) => {
  try {
    const { interestCategories = [], cartProducts = [], wishlistProducts = [] } = req.body;

    const allProducts = await Product.find({});
    const result = await getPersonalizedRecommendations(
      interestCategories,
      cartProducts,
      wishlistProducts,
      allProducts
    );

    const recommendedDocs = await Product.find({ _id: { $in: result.productIds } });
    const orderedDocs = result.productIds
      .map(id => recommendedDocs.find(d => d._id.toString() === id))
      .filter(Boolean);

    res.json({
      recommendations: orderedDocs.length > 0 ? orderedDocs : recommendedDocs.slice(0, 5),
      reasoning: result.reasoning
    });
  } catch (error) {
    handleGeminiError(error, res);
  }
};

// @desc    Get Budget Recommendations using Gemini
// @route   POST /api/ai/budget
// @access  Public
const budgetGemini = async (req, res) => {
  try {
    const { budget, category = 'All' } = req.body;
    const targetBudget = Number(budget);

    if (isNaN(targetBudget) || targetBudget <= 0) {
      return res.status(400).json({ error: 'Please enter a valid budget' });
    }

    const allProducts = await Product.find({});
    const result = await getBudgetRecommendations(targetBudget, category, allProducts);

    const budgetDocs = await Product.find({ _id: { $in: result.productIds } });
    const orderedDocs = result.productIds
      .map(id => budgetDocs.find(d => d._id.toString() === id))
      .filter(Boolean);

    const totalCost = orderedDocs.reduce((sum, p) => sum + p.price, 0);

    res.json({
      budget: targetBudget,
      totalCost,
      remaining: targetBudget - totalCost,
      items: orderedDocs,
      estimatedSavings: result.estimatedSavings,
      budgetInsights: result.budgetInsights,
      aiTips: result.aiTips
    });
  } catch (error) {
    handleGeminiError(error, res);
  }
};

module.exports = {
  testGemini,
  searchGemini,
  recommendationsGemini,
  budgetGemini
};
