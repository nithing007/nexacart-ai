/**
 * Intent Classifier for NexaCart AI Shopping Copilot
 * Classifies user messages into 12 core intent types:
 * 1. GREETING
 * 2. GENERAL_CONVERSATION (Personal identity, Creator, Greetings)
 * 3. PRODUCT_SEARCH (Catalog search queries)
 * 4. PRODUCT_COMPARISON (Comparing items)
 * 5. PRODUCT_EXPLANATION (Explaining specs/terms like OLED, RAM)
 * 6. BUDGET_PLANNING (Monthly budget planning)
 * 7. WISHLIST (Viewing/navigating wishlist)
 * 8. CART (Viewing/navigating cart)
 * 9. ORDER_TRACKING (Tracking order status)
 * 10. SHOPPING_ADVICE (Buying advice, processor benchmarks)
 * 11. NAVIGATION (Voice/text navigation commands)
 * 12. GENERAL_KNOWLEDGE (General tech/world questions)
 */

export const INTENT_TYPES = {
  GREETING: 'greeting',
  GENERAL_CONVERSATION: 'general_conversation',
  PRODUCT_SEARCH: 'product_search',
  PRODUCT_COMPARISON: 'product_comparison',
  PRODUCT_EXPLANATION: 'product_explanation',
  BUDGET_PLANNING: 'budget_planning',
  WISHLIST: 'wishlist',
  CART: 'cart',
  ORDER_TRACKING: 'order_tracking',
  SHOPPING_ADVICE: 'shopping_advice',
  NAVIGATION: 'navigation',
  GENERAL_KNOWLEDGE: 'general_knowledge',
};

/**
 * Standard Product Categories
 */
export const CATEGORY_TYPES = {
  MOBILE_PHONES: 'Mobile Phones',
  LAPTOPS: 'Laptops',
  HEADPHONES: 'Headphones & Audio',
  TELEVISIONS: 'Televisions & Display',
  FASHION: 'Fashion & Apparel',
  GROCERIES: 'Groceries & Pantry',
  FURNITURE: 'Home & Office',
  ACCESSORIES: 'Accessories',
  ELECTRONICS: 'Electronics'
};

/**
 * Misspelling & Typo Correction Dictionary
 */
export const BRAND_TYPO_MAP = {
  'samung': 'SAMSUNG',
  'samsng': 'SAMSUNG',
  'aple': 'APPLE',
  'appele': 'APPLE',
  'iphone': 'APPLE',
  'mediateck': 'MEDIATEK',
  'mediatek': 'MEDIATEK',
  'dimensity': 'MEDIATEK',
  'snapdagon': 'SNAPDRAGON',
  'snadragon': 'SNAPDRAGON',
  'reame': 'REALME',
  'relme': 'REALME',
  'onepluse': 'ONEPLUS',
  'one plus': 'ONEPLUS',
  'xiaomy': 'XIAOMI',
  'redmi': 'XIAOMI',
  'poko': 'POCO',
  'asus': 'ASUS',
  'lenvo': 'LENOVO',
  'hp': 'HP',
  'dell': 'DELL',
  'acer': 'ACER',
  'sonny': 'SONY',
  'nik': 'NIKE',
  'adida': 'ADIDAS'
};

/**
 * Detect product category from query string
 */
export const detectCategoryFromQuery = (query = '') => {
  const lower = query.toLowerCase();

  if (lower.includes('phone') || lower.includes('mobile') || lower.includes('smartphone') || lower.includes('iphone') || lower.includes('galaxy')) {
    return CATEGORY_TYPES.MOBILE_PHONES;
  }
  if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('chromebook') || lower.includes('notebook')) {
    return CATEGORY_TYPES.LAPTOPS;
  }
  if (lower.includes('headphone') || lower.includes('earphone') || lower.includes('earbud') || lower.includes('airpods') || lower.includes('audio')) {
    return CATEGORY_TYPES.HEADPHONES;
  }
  if (lower.includes('tv') || lower.includes('television') || lower.includes('monitor') || lower.includes('display screen')) {
    return CATEGORY_TYPES.TELEVISIONS;
  }
  if (lower.includes('shoe') || lower.includes('sneaker') || lower.includes('jacket') || lower.includes('t-shirt') || lower.includes('clothing') || lower.includes('fashion')) {
    return CATEGORY_TYPES.FASHION;
  }
  if (lower.includes('grocer') || lower.includes('food') || lower.includes('fruit') || lower.includes('milk') || lower.includes('avocado')) {
    return CATEGORY_TYPES.GROCERIES;
  }
  if (lower.includes('chair') || lower.includes('desk') || lower.includes('table') || lower.includes('lamp') || lower.includes('furniture')) {
    return CATEGORY_TYPES.FURNITURE;
  }
  if (lower.includes('charger') || lower.includes('case') || lower.includes('cover') || lower.includes('cable') || lower.includes('accessory')) {
    return CATEGORY_TYPES.ACCESSORIES;
  }
  return null;
};

/**
 * Classifies a user message string into one of the 12 intent types.
 */
export const classifyIntent = (message = '') => {
  const text = message.trim();
  const lower = text.toLowerCase();

  if (!text) {
    return {
      intent: INTENT_TYPES.GREETING,
      category: null,
      isAmbiguousShopping: false,
      confidence: 1.0,
    };
  }

  const detectedCategory = detectCategoryFromQuery(text);

  // 1. NAVIGATION INTENT
  const navigationRules = [
    { target: '/cart', keywords: ['open cart', 'go to cart', 'view cart', 'show cart', 'open my cart'] },
    { target: '/wishlist', keywords: ['open wishlist', 'go to wishlist', 'view wishlist', 'show wishlist', 'open my wishlist'] },
    { target: '/profile', keywords: ['open profile', 'go to profile', 'view profile', 'my profile', 'account settings'] },
    { target: '/budget-assistant', keywords: ['open budget assistant', 'go to budget assistant', 'open budget planner', 'budget assistant'] },
    { target: '/orders', keywords: ['track my orders', 'track order', 'open orders', 'my orders', 'show my orders', 'order tracking'] },
    { target: '/products', keywords: ['open shop', 'go to shop', 'open catalog', 'browse shop', 'show products', 'browse catalog'] }
  ];

  for (const nav of navigationRules) {
    if (nav.keywords.some((k) => lower === k || lower.includes(k))) {
      return {
        intent: INTENT_TYPES.NAVIGATION,
        targetPath: nav.target,
        category: detectedCategory,
        isAmbiguousShopping: false,
        confidence: 0.98,
      };
    }
  }

  // 2. GREETING INTENT
  const greetingRegex = /^(hi|hello|hey|good\s*(morning|afternoon|evening|day)|greetings|namaste|yo|hola)\b[!.\s]*$/i;
  if (greetingRegex.test(lower)) {
    return {
      intent: INTENT_TYPES.GREETING,
      category: null,
      isAmbiguousShopping: false,
      confidence: 0.98,
    };
  }

  // 3. GENERAL CONVERSATION INTENT
  const identityKeywords = [
    'what is your name', "what's your name", 'who are you', 'who created you', 'who made you',
    'how are you', 'thank you', 'thanks', 'bye', 'goodbye', 'can you help me', 'good job',
    'nice work', 'are you ai', 'what can you do', 'tell me about yourself'
  ];
  if (identityKeywords.some((k) => lower.includes(k))) {
    return {
      intent: INTENT_TYPES.GENERAL_CONVERSATION,
      category: null,
      isAmbiguousShopping: false,
      confidence: 0.96,
    };
  }

  // 4. CART INTENT
  if (lower.includes('my cart') || lower.includes('in my cart') || lower.includes('cart items') || lower === 'cart') {
    return {
      intent: INTENT_TYPES.CART,
      targetPath: '/cart',
      category: null,
      isAmbiguousShopping: false,
      confidence: 0.95,
    };
  }

  // 5. WISHLIST INTENT
  if (lower.includes('my wishlist') || lower.includes('in my wishlist') || lower === 'wishlist') {
    return {
      intent: INTENT_TYPES.WISHLIST,
      targetPath: '/wishlist',
      category: null,
      isAmbiguousShopping: false,
      confidence: 0.95,
    };
  }

  // 6. ORDER TRACKING INTENT
  if (lower.includes('where is my order') || lower.includes('order status') || lower.includes('track order')) {
    return {
      intent: INTENT_TYPES.ORDER_TRACKING,
      targetPath: '/orders',
      category: null,
      isAmbiguousShopping: false,
      confidence: 0.95,
    };
  }

  // 7. PRODUCT COMPARISON INTENT
  const comparisonKeywords = ['compare', ' vs ', ' versus ', 'difference between samsung', 'difference between iphone'];
  if (comparisonKeywords.some((k) => lower.includes(k)) && !lower.includes('ssd and hdd') && !lower.includes('ips and oled')) {
    return {
      intent: INTENT_TYPES.PRODUCT_COMPARISON,
      category: detectedCategory,
      isAmbiguousShopping: false,
      confidence: 0.95,
    };
  }

  // 8. SHOPPING ADVICE INTENT
  const shoppingAdviceKeywords = [
    'which processor is better', 'is 8gb ram enough', 'is 16gb ram enough', 'snapdragon vs mediatek',
    'which display is better', 'gaming laptop buying guide', 'which phone should i buy', 'shopping advice',
    'what to look for when buying', 'difference between ips and oled'
  ];
  if (shoppingAdviceKeywords.some((k) => lower.includes(k))) {
    return {
      intent: INTENT_TYPES.SHOPPING_ADVICE,
      category: detectedCategory,
      isAmbiguousShopping: false,
      confidence: 0.94,
    };
  }

  // 9. PRODUCT EXPLANATION INTENT
  const explanationKeywords = [
    'explain oled', 'explain lcd', 'explain led', 'explain amoled', 'explain refresh rate',
    'explain ram', 'explain nvme', 'explain processor', 'explain resolution', 'explain 4k'
  ];
  if (explanationKeywords.some((k) => lower.includes(k))) {
    return {
      intent: INTENT_TYPES.PRODUCT_EXPLANATION,
      category: detectedCategory,
      isAmbiguousShopping: false,
      confidence: 0.93,
    };
  }

  // 10. BUDGET PLANNING INTENT
  const budgetKeywords = [
    'build me a pc', 'build a pc', 'grocery list under', 'budget assistant', 'allocate budget',
    'i have ₹', 'i have rs', 'my budget is', 'budget of ₹', 'budget of rs'
  ];
  if (budgetKeywords.some((k) => lower.includes(k))) {
    return {
      intent: INTENT_TYPES.BUDGET_PLANNING,
      category: detectedCategory,
      isAmbiguousShopping: false,
      confidence: 0.92,
    };
  }

  // 11. GENERAL KNOWLEDGE INTENT
  const gkKeywords = [
    'what is artificial intelligence', 'what is ai', 'what is chatgpt', 'what is gemini',
    'tell me a joke', 'who is the president', 'what is gravity', 'how does internet work'
  ];
  if (gkKeywords.some((k) => lower.includes(k))) {
    return {
      intent: INTENT_TYPES.GENERAL_KNOWLEDGE,
      category: null,
      isAmbiguousShopping: false,
      confidence: 0.90,
    };
  }

  // 12. PRODUCT SEARCH INTENT & AMBIGUITY CHECK
  const shoppingKeywords = [
    'laptop', 'phone', 'mobile', 'smartphone', 'shoe', 'sneaker', 'grocer', 'headphone', 'earbud',
    'audio', 'tv', 'television', 'watch', 'smartwatch', 'washing machine', 'refrigerator', 'chair',
    'desk', 'lamp', 'bottle', 'backpack', 'jacket', 't-shirt', 'clothing', 'fashion', 'camera',
    'buy', 'shop', 'find', 'recommend', 'search', 'under ₹', 'under rs', 'under ', 'below ', 'only ',
    'show me', 'looking for', 'ram', 'storage', 'mediatek', 'snapdragon'
  ];

  const containsShoppingKeyword = shoppingKeywords.some((k) => lower.includes(k));

  const ambiguousPhrases = [
    "i need a laptop", "i want a laptop", "looking for a laptop",
    "i need a phone", "i want a phone", "looking for a phone",
    "need groceries", "recommend something", "what should i buy", "help me buy",
    "suggest a laptop", "suggest a phone", "i need shoes"
  ];

  const isAmbiguous = ambiguousPhrases.some((p) => lower === p || lower.includes(p)) &&
    !lower.match(/(?:under|below|less than|budget|₹|rs|\d{4,})/i) &&
    !lower.includes('gaming') && !lower.includes('coding') && !lower.includes('office') && !lower.includes('editing');

  if (containsShoppingKeyword || isAmbiguous) {
    return {
      intent: INTENT_TYPES.PRODUCT_SEARCH,
      category: detectedCategory,
      isAmbiguousShopping: isAmbiguous,
      confidence: isAmbiguous ? 0.65 : 0.92,
    };
  }

  // Default fallback
  return {
    intent: INTENT_TYPES.PRODUCT_SEARCH,
    category: detectedCategory,
    isAmbiguousShopping: true,
    confidence: 0.60,
  };
};

