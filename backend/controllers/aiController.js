const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');
const {
  getSmartSearchResults,
  getPersonalizedRecommendations,
  getBudgetRecommendations,
} = require('../services/openaiService');

// @desc    Get AI product recommendations
// @route   GET /api/ai/recommendations
// @access  Private
const getRecommendations = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');

    const cartProducts = cart ? cart.items.map(item => item.product).filter(Boolean) : [];
    const wishlistProducts = wishlist ? wishlist.products.filter(Boolean) : [];

    const interestCategories = [
      ...new Set([
        ...cartProducts.map(p => p.category),
        ...wishlistProducts.map(p => p.category)
      ])
    ];

    const allProducts = await Product.find({});

    const result = await getPersonalizedRecommendations(
      interestCategories,
      cartProducts,
      wishlistProducts,
      allProducts
    );

    // Map product IDs back to full product documents
    const recommendedDocs = await Product.find({ _id: { $in: result.productIds } });

    // Order docs according to recommendations order
    const orderedDocs = result.productIds
      .map(id => recommendedDocs.find(d => d._id.toString() === id))
      .filter(Boolean);

    res.json({
      recommendations: orderedDocs.length > 0 ? orderedDocs : recommendedDocs.slice(0, 5),
      reasoning: result.reasoning
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products fitting budget & savings insights
// @route   POST /api/ai/budget-assistant
// @access  Private
const getBudgetAssistant = async (req, res) => {
  try {
    const { budget, category = 'All' } = req.body;
    const targetBudget = Number(budget);

    if (isNaN(targetBudget) || targetBudget <= 0) {
      return res.status(400).json({ message: 'Please enter a valid budget' });
    }

    const allProducts = await Product.find({});

    const result = await getBudgetRecommendations(targetBudget, category, allProducts);

    const budgetDocs = await Product.find({ _id: { $in: result.productIds } });
    const orderedDocs = result.productIds
      .map(id => budgetDocs.find(d => d._id.toString() === id))
      .filter(Boolean);

    const totalCost = orderedDocs.reduce((sum, p) => sum + p.price, 0);

    // Build default fallback insights if not fully formatted
    let finalInsights = [];
    
    // 1. Calculate discount savings
    const totalOriginal = orderedDocs.reduce((sum, p) => sum + p.originalPrice, 0);
    const instantSavings = totalOriginal - totalCost;

    if (instantSavings > 0) {
      finalInsights.push({
        type: 'discount',
        title: 'Instant Discount Savings',
        description: `By purchasing these items now, you are saving ₹${instantSavings.toLocaleString()} off the original retail price.`
      });
    }

    // 2. Identify lower price alternative insight
    const categoriesInList = [...new Set(orderedDocs.map(p => p.category))];
    for (const cat of categoriesInList) {
      const catProducts = allProducts.filter(p => p.category === cat);
      if (catProducts.length > 1) {
        const sortedCat = catProducts.sort((a, b) => a.price - b.price);
        const cheapest = sortedCat[0];
        const selectedInBudget = orderedDocs.find(p => p.category === cat && p._id.toString() !== cheapest._id.toString());
        
        if (selectedInBudget && selectedInBudget.price > cheapest.price) {
          const diff = selectedInBudget.price - cheapest.price;
          finalInsights.push({
            type: 'alternative',
            title: `Save on ${cat}`,
            description: `You could save ₹${diff.toLocaleString()} more by swapping "${selectedInBudget.name}" for "${cheapest.name}".`
          });
          break; // just add one swap suggestion
        }
      }
    }

    // 3. Add general tip
    finalInsights.push({
      type: 'tip',
      title: 'Smart Shipping Tip',
      description: totalCost > 1500 
        ? 'Great! Your total order value qualifies for Free Standard Shipping, saving you ₹150.'
        : `Tip: Add ₹${(1500 - totalCost).toLocaleString()} more to qualify for Free Shipping and save ₹150.`
    });

    res.json({
      budget: targetBudget,
      totalCost,
      remaining: targetBudget - totalCost,
      items: orderedDocs,
      insights: finalInsights,
      aiTips: result.aiTips,
      budgetInsights: result.budgetInsights
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Natural language AI product search
// @route   GET /api/ai/smart-search
// @access  Private
const getSmartSearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const allProducts = await Product.find({});
    const result = await getSmartSearchResults(q, allProducts);

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
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRecommendations,
  getBudgetAssistant,
  getSmartSearch,
};
