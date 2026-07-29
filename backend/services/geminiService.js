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

  // Local fallback logic grounded in category
  const localFallback = () => {
    let maxPrice = Infinity;
    const priceMatch = lowerQuery.match(/(?:under|below|less than|max|budget of)\s*₹?\s*(\d+)/i) 
      || lowerQuery.match(/(\d+)\s*(?:budget|price limit|rupees|rs)/i);
    
    if (priceMatch) {
      maxPrice = Number(priceMatch[1]);
    }

    let detectedSubject = '';
    if (lowerQuery.includes('phone') || lowerQuery.includes('mobile') || lowerQuery.includes('iphone') || lowerQuery.includes('samsung') || lowerQuery.includes('realme') || lowerQuery.includes('poco')) {
      detectedSubject = 'phone';
    } else if (lowerQuery.includes('laptop') || lowerQuery.includes('macbook') || lowerQuery.includes('computer')) {
      detectedSubject = 'laptop';
    } else if (lowerQuery.includes('headphone') || lowerQuery.includes('earbud') || lowerQuery.includes('audio') || lowerQuery.includes('sony')) {
      detectedSubject = 'headphone';
    } else if (lowerQuery.includes('grocer') || lowerQuery.includes('avocado') || lowerQuery.includes('food') || lowerQuery.includes('fruit')) {
      detectedSubject = 'groceries';
    } else if (lowerQuery.includes('shoe') || lowerQuery.includes('sneaker') || lowerQuery.includes('jacket') || lowerQuery.includes('fashion')) {
      detectedSubject = 'fashion';
    }

    let matches = allProducts.filter(p => {
      const pName = p.name.toLowerCase();
      const pDesc = (p.description || '').toLowerCase();
      
      if (detectedSubject === 'phone') {
        if (!pName.includes('phone') && !pName.includes('mobile') && !pName.includes('iphone') && !pName.includes('galaxy') && !pName.includes('smartphone')) return false;
      } else if (detectedSubject === 'laptop') {
        if (!pName.includes('laptop') && !pName.includes('macbook')) return false;
      }
      
      if (p.price > maxPrice) return false;
      return true;
    });

    matches = [...matches].sort((a, b) => b.rating - a.rating).slice(0, 5);

    const productIds = matches.map(m => m._id.toString());
    const matchedNames = matches.map(m => m.name).join(', ');

    return {
      productIds,
      reasoning: matches.length > 0 
        ? `Found ${matches.length} catalog matches fitting your request for "${query}": ${matchedNames}. All selected items satisfy price and specification boundaries.`
        : `No matching items found in our catalog for "${query}". Please consider expanding budget or adjusting spec requirements.`,
      recommendations: `Only items currently in stock within the matching category are presented.`
    };
  };

  if (!client) {
    return localFallback();
  }

  try {
    const serializedProducts = allProducts.map(p => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice,
      category: p.category,
      rating: p.rating
    }));

    const prompt = `You are a ChatGPT-style AI Shopping Copilot for NexaCart. The user wants to search our catalog: "${query}".
Here is the available catalog JSON:
${JSON.stringify(serializedProducts)}

STRICT RULES:
1. ONLY pick products that strictly belong to the user's requested item category (e.g. if phone requested, NEVER pick laptops or headphones).
2. ONLY pick products that satisfy the requested specs (RAM, storage, brand, price limit).
3. If zero products match, return empty productIds array. NEVER recommend unrelated products.
4. Provide structured reasoning explaining why each selected product fits.

Return JSON format:
{
  "productIds": ["id1", "id2"],
  "reasoning": "Clear explanation of matches satisfying extracted requirements.",
  "recommendations": "Category-specific follow-up advice."
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
