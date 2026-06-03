const { GoogleGenerativeAI } = require("@google/generative-ai");

let selectedModelName = 'gemini-1.5-flash';

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Helper to call Gemini and fallback to a newer version if 1.5-flash is deprecated/not found.
 */
const callGeminiWithFallback = async (client, prompt, isJson = false) => {
  const config = isJson ? { responseMimeType: "application/json" } : undefined;
  
  try {
    const model = client.getGenerativeModel({ model: selectedModelName, generationConfig: config });
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    const msg = error.message || '';
    if (selectedModelName === 'gemini-1.5-flash' && (msg.includes('not found') || msg.includes('not supported') || error.status === 404)) {
      console.warn('⚠️ gemini-1.5-flash is not available/supported. Falling back to gemini-2.5-flash.');
      selectedModelName = 'gemini-2.5-flash';
      const model = client.getGenerativeModel({ model: selectedModelName, generationConfig: config });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    }
    throw error;
  }
};

// General content generation helper for testing or simple prompts
const generateGeminiContent = async (prompt) => {
  const client = getGeminiClient();
  if (!client) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    return await callGeminiWithFallback(client, prompt, false);
  } catch (error) {
    console.error('Gemini content generation error:', error);
    throw error;
  }
};

/**
 * AI-powered Smart Search using natural language via Google Gemini.
 */
const getSmartSearchResults = async (query, allProducts) => {
  const client = getGeminiClient();
  const lowerQuery = query.toLowerCase();

  // Load products if not provided
  if (!allProducts) {
    try {
      const Product = require('../models/Product');
      allProducts = await Product.find({});
    } catch {
      allProducts = [];
    }
  }

  // Local fallback logic
  const localFallback = () => {
    let maxPrice = Infinity;
    const priceMatch = lowerQuery.match(/(?:under|below|less than|max|budget of)\s*₹?\s*(\d+)/i) 
      || lowerQuery.match(/(\d+)\s*(?:budget|price limit|rupees|rs)/i);
    
    if (priceMatch) {
      maxPrice = Number(priceMatch[1]);
    }

    let matchedCategory = '';
    if (lowerQuery.includes('phone') || lowerQuery.includes('mobile') || lowerQuery.includes('iphone') || lowerQuery.includes('samsung')) {
      matchedCategory = 'Electronics';
    } else if (lowerQuery.includes('headphone') || lowerQuery.includes('earbud') || lowerQuery.includes('audio') || lowerQuery.includes('sony')) {
      matchedCategory = 'Electronics';
    } else if (lowerQuery.includes('laptop') || lowerQuery.includes('macbook') || lowerQuery.includes('computer')) {
      matchedCategory = 'Electronics';
    } else if (lowerQuery.includes('avocado') || lowerQuery.includes('blueberry') || lowerQuery.includes('milk') || lowerQuery.includes('tea') || lowerQuery.includes('grocery') || lowerQuery.includes('food') || lowerQuery.includes('fruit')) {
      matchedCategory = 'Groceries';
    } else if (lowerQuery.includes('chair') || lowerQuery.includes('desk') || lowerQuery.includes('lamp') || lowerQuery.includes('water bottle') || lowerQuery.includes('coffee') || lowerQuery.includes('notebook')) {
      matchedCategory = 'Home & Office';
    } else if (lowerQuery.includes('sneaker') || lowerQuery.includes('shoe') || lowerQuery.includes('backpack') || lowerQuery.includes('jacket') || lowerQuery.includes('t-shirt') || lowerQuery.includes('sun glass') || lowerQuery.includes('fashion') || lowerQuery.includes('clothing')) {
      matchedCategory = 'Fashion';
    }

    let matches = [];
    if (matchedCategory) {
      matches = allProducts.filter(p => p.category === matchedCategory && p.price <= maxPrice);
    } else {
      matches = allProducts.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(lowerQuery);
        const descMatch = p.description.toLowerCase().includes(lowerQuery);
        return (nameMatch || descMatch) && p.price <= maxPrice;
      });
    }

    if (matches.length === 0) {
      matches = allProducts.filter(p => p.price <= maxPrice).slice(0, 5);
    }

    matches = [...matches].sort((a, b) => b.rating - a.rating).slice(0, 5);

    const productIds = matches.map(m => m._id.toString());
    const matchedNames = matches.map(m => m.name).join(', ');

    return {
      productIds,
      reasoning: `[Local Fallback] I searched our catalog for products matching "${query}" and found these top choices: ${matchedNames || 'no exact matches'}. These fit your pricing and keyword constraints.`,
      recommendations: `If you are looking for alternatives, you can check out items in the same categories, which offer great values.`
    };
  };

  if (!client) {
    return localFallback();
  }

  try {
    const serializedProducts = allProducts.map(p => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      category: p.category,
      rating: p.rating
    }));

    const prompt = `You are a smart shopping assistant. The user wants to search our catalog using natural language: "${query}".
Here is the available products JSON catalog:
${JSON.stringify(serializedProducts)}

Determine the best matching products (up to 5) that satisfy the user's search query, including category, keyword, and price limits (e.g. "under ₹20000").
Return a JSON object with exactly the following structure:
{
  "productIds": ["id1", "id2", ...],
  "reasoning": "A paragraph (under 60 words) explaining why these products match the search query.",
  "recommendations": "A brief sentence (under 30 words) suggesting related alternatives or tips."
}`;

    const resText = await callGeminiWithFallback(client, prompt, true);
    return JSON.parse(resText);
  } catch (error) {
    console.error('Gemini Smart Search Error:', error);
    return localFallback();
  }
};

/**
 * Personalized Recommendations using Google Gemini.
 */
const getPersonalizedRecommendations = async (userInterestCategoriesOrUserData, cartProducts, wishlistProducts, allProducts) => {
  const client = getGeminiClient();

  let interestCategories = [];
  let cart = [];
  let wishlist = [];

  if (Array.isArray(userInterestCategoriesOrUserData)) {
    interestCategories = userInterestCategoriesOrUserData;
    cart = cartProducts || [];
    wishlist = wishlistProducts || [];
  } else if (userInterestCategoriesOrUserData && typeof userInterestCategoriesOrUserData === 'object') {
    interestCategories = userInterestCategoriesOrUserData.interestCategories || [];
    cart = userInterestCategoriesOrUserData.cartProducts || [];
    wishlist = userInterestCategoriesOrUserData.wishlistProducts || [];
  }

  // Load products if not provided
  if (!allProducts) {
    try {
      const Product = require('../models/Product');
      allProducts = await Product.find({});
    } catch {
      allProducts = [];
    }
  }

  const localFallback = () => {
    const categories = [...new Set([
      ...interestCategories,
      ...cart.map(p => p.category),
      ...wishlist.map(p => p.category)
    ])].filter(Boolean);

    let picks = [];
    if (categories.length > 0) {
      picks = allProducts.filter(p => 
        categories.includes(p.category) && 
        !cart.some(cp => cp._id.toString() === p._id.toString()) &&
        !wishlist.some(wp => wp._id.toString() === p._id.toString())
      );
    }

    if (picks.length === 0) {
      picks = allProducts.filter(p => p.isFeatured || p.rating >= 4.6);
    }

    picks = [...picks].sort((a, b) => b.rating - a.rating).slice(0, 5);
    const names = picks.map(p => p.name).join(', ');

    return {
      productIds: picks.map(p => p._id.toString()),
      reasoning: categories.length > 0
        ? `[Local Fallback] Based on your interest in ${categories.join(' & ')}, we selected these premium items: ${names}. They align with your style and shopping list.`
        : `[Local Fallback] Check out our most popular items selected just for you: ${names}. These are customer favorites with outstanding ratings.`
    };
  };

  if (!client) {
    return localFallback();
  }

  try {
    const serializedProducts = allProducts.map(p => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      category: p.category,
      rating: p.rating
    }));

    const userProfile = {
      interestCategories,
      cartItems: cart.map(p => p.name),
      wishlistItems: wishlist.map(p => p.name)
    };

    const prompt = `You are a personalized shopping AI. The user profile is:
${JSON.stringify(userProfile)}

Select the top 5 product recommendations from our catalog:
${JSON.stringify(serializedProducts)}

Filter out products they already have in their cart or wishlist if possible.
Return a JSON object with exactly the following structure:
{
  "productIds": ["id1", "id2", ...],
  "reasoning": "A short, engaging paragraph (under 75 words) explaining why these products fit their profile."
}`;

    const resText = await callGeminiWithFallback(client, prompt, true);
    return JSON.parse(resText);
  } catch (error) {
    console.error('Gemini Personalized Recommendations Error:', error);
    return localFallback();
  }
};

/**
 * Smart Budget Recommendations using Google Gemini.
 */
const getBudgetRecommendations = async (targetBudgetOrBudget, category, allProducts) => {
  const client = getGeminiClient();
  const targetBudget = Number(targetBudgetOrBudget);

  // Load products if not provided
  if (!allProducts) {
    try {
      const Product = require('../models/Product');
      allProducts = await Product.find({});
    } catch {
      allProducts = [];
    }
  }

  const localFallback = () => {
    let pool = allProducts;
    if (category && category !== 'All') {
      pool = allProducts.filter(p => p.category === category);
    }

    const sortedPool = [...pool].sort((a, b) => b.rating - a.rating);

    let currentCost = 0;
    const selectedList = [];

    for (const prod of sortedPool) {
      if (currentCost + prod.price <= targetBudget) {
        selectedList.push(prod);
        currentCost += prod.price;
      }
      if (selectedList.length >= 4) break;
    }

    const totalOriginal = selectedList.reduce((sum, p) => sum + p.originalPrice, 0);
    const totalCurrent = selectedList.reduce((sum, p) => sum + p.price, 0);
    const savings = totalOriginal - totalCurrent;

    return {
      productIds: selectedList.map(p => p._id.toString()),
      estimatedSavings: savings,
      budgetInsights: `[Local Fallback] You have allocated ₹${totalCurrent.toLocaleString()} out of your ₹${targetBudget.toLocaleString()} budget. That utilizes ${((totalCurrent / targetBudget) * 100).toFixed(0)}% of your limit, leaving ₹${(targetBudget - totalCurrent).toLocaleString()} in savings!`,
      aiTips: [
        `By choosing discounted bundles, you saved ₹${savings.toLocaleString()} off retail.`,
        totalCurrent > 1500 
          ? 'Fantastic! You qualified for Free Standard Shipping, saving you an extra ₹150.'
          : `Add ₹${(1500 - totalCurrent).toLocaleString()} more to qualify for Free Shipping.`
      ]
    };
  };

  if (!client) {
    return localFallback();
  }

  try {
    const serializedProducts = allProducts.map(p => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      category: p.category,
      rating: p.rating
    }));

    const prompt = `You are a financial shopping assistant. The user has a budget of ₹${targetBudget} and desires products in category: "${category || 'All'}".
Here is our catalog:
${JSON.stringify(serializedProducts)}

Select a combination of products (up to 4) that fit within the ₹${targetBudget} budget limit. Maximize overall value and discount savings.
Return a JSON object with exactly the following structure:
{
  "productIds": ["id1", "id2", ...],
  "estimatedSavings": 1250,
  "budgetInsights": "A paragraph (under 60 words) analyzing their budget usage and choices.",
  "aiTips": ["tip 1 (under 25 words)", "tip 2 (under 25 words)"]
}`;

    const resText = await callGeminiWithFallback(client, prompt, true);
    return JSON.parse(resText);
  } catch (error) {
    console.error('Gemini Budget Recommendations Error:', error);
    return localFallback();
  }
};

const checkGeminiConnection = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key' || apiKey.trim() === '') {
    console.warn('⚠️ Gemini API key is missing or not configured.');
    return false;
  }
  console.log('✓ Gemini API initialized');
  console.log('✓ Gemini service ready');
  return true;
};

module.exports = {
  generateGeminiContent,
  getSmartSearchResults,
  getPersonalizedRecommendations,
  getBudgetRecommendations,
  checkGeminiConnection,
};
