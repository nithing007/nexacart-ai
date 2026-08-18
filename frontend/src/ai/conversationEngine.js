import { INTENT_TYPES, CATEGORY_TYPES, BRAND_TYPO_MAP, classifyIntent, detectCategoryFromQuery } from './intentClassifier.js';
import api from '../services/api.js';

/**
 * Format numerical amount into Indian Rupee format (INR)
 */
export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

/**
 * Helper to parse value with optional "K" notation (e.g., "50k" -> 50000, "0.5k" -> 500)
 */
const parsePriceVal = (str) => {
  if (!str) return null;
  const s = str.trim().toLowerCase();
  const kMatch = s.match(/^(\d+(?:\.\d+)?)\s*k$/i);
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000);
  const cleaned = s.replace(/,/g, '').replace(/₹|rs\.?/gi, '').trim();
  const val = parseInt(cleaned, 10);
  return isNaN(val) ? null : val;
};

/**
 * Extract numerical price bounds (minPrice, maxPrice) from user text
 * Examples:
 * - "between 500 and 700" -> { minPrice: 500, maxPrice: 700 }
 * - "under 20000" -> { minPrice: null, maxPrice: 20000 }
 * - "above 50000" -> { minPrice: 50000, maxPrice: null }
 */
export const extractPriceBounds = (text = '', memoryBase = {}) => {
  const lower = text.toLowerCase();

  // Range pattern 1: "between 500 and 700", "between ₹500 and ₹700", "500 to 700", "500 - 700", "from 500 to 700"
  const rangeMatch = lower.match(/(?:between|from)?\s*₹?\s*(\d[\d,.]*k?)\s*(?:and|to|-|–)\s*₹?\s*(\d[\d,.]*k?)/i);
  if (rangeMatch) {
    const val1 = parsePriceVal(rangeMatch[1]);
    const val2 = parsePriceVal(rangeMatch[2]);
    if (val1 !== null && val2 !== null) {
      return {
        minPrice: Math.min(val1, val2),
        maxPrice: Math.max(val1, val2),
        isExplicitNewRange: true
      };
    }
  }

  // Under / Below / Less than / Max / Up to
  const maxMatch = lower.match(/(?:under|below|less than|max|maximum|up to|budget of|budget is|only under|only below)\s*₹?\s*(\d[\d,.]*k?)/i);
  if (maxMatch) {
    const val = parsePriceVal(maxMatch[1]);
    if (val !== null) {
      return {
        minPrice: null,
        maxPrice: val,
        isExplicitNewRange: true
      };
    }
  }

  // Above / More than / Over / Min / At least
  const minMatch = lower.match(/(?:above|more than|over|greater than|at least|min|minimum)\s*₹?\s*(\d[\d,.]*k?)/i);
  if (minMatch) {
    const val = parsePriceVal(minMatch[1]);
    if (val !== null) {
      return {
        minPrice: val,
        maxPrice: null,
        isExplicitNewRange: true
      };
    }
  }

  // Standalone price or rupees (e.g., "₹20,000", "20000 rupees")
  const standaloneMatch = lower.match(/(?:₹|rs\.?)\s*(\d[\d,.]*k?)\b/i) || lower.match(/\b(\d[\d,.]*k?)\s*(?:rupees|rs|budget)\b/i);
  if (standaloneMatch) {
    const val = parsePriceVal(standaloneMatch[1]);
    if (val !== null && val > 10) {
      return {
        minPrice: null,
        maxPrice: val,
        isExplicitNewRange: true
      };
    }
  }

  // Retain existing memory bounds if no new price bounds found in message
  return {
    minPrice: memoryBase.minPrice ?? null,
    maxPrice: memoryBase.maxPrice ?? memoryBase.budget ?? null,
    isExplicitNewRange: false
  };
};

/**
 * Backward compatibility alias for single budget
 */
export const extractBudget = (text = '') => {
  const bounds = extractPriceBounds(text, {});
  return bounds.maxPrice;
};

/**
 * Extract structured specification filters from user request with fuzzy brand correction
 */
export const extractStructuredSpecs = (query = '', memoryBase = {}) => {
  const lower = query.toLowerCase();

  // Correct common brand/tech spelling errors
  let correctedQuery = lower;
  Object.keys(BRAND_TYPO_MAP).forEach(typo => {
    if (correctedQuery.includes(typo)) {
      correctedQuery = correctedQuery.replace(new RegExp(`\\b${typo}\\b`, 'g'), BRAND_TYPO_MAP[typo].toLowerCase());
    }
  });

  const priceBounds = extractPriceBounds(query, memoryBase);
  const detectedCategory = detectCategoryFromQuery(query);

  const specs = {
    category: detectedCategory || memoryBase.category || '',
    minPrice: priceBounds.minPrice,
    maxPrice: priceBounds.maxPrice,
    budget: priceBounds.maxPrice, // sync budget with maxPrice
    ram: memoryBase.ram || '',
    storage: memoryBase.storage || '',
    display: memoryBase.display || '',
    processor: memoryBase.processor || '',
    brand: memoryBase.brand || '',
    purpose: memoryBase.purpose || '',
    subject: memoryBase.subject || ''
  };

  // Display Type extraction (AMOLED, OLED, IPS, LCD)
  if (lower.includes('amoled')) specs.display = 'AMOLED';
  else if (lower.includes('oled')) specs.display = 'OLED';
  else if (lower.includes('ips')) specs.display = 'IPS';
  else if (lower.includes('lcd')) specs.display = 'LCD';

  // RAM extraction (e.g., 4GB, 6GB, 8GB, 12GB, 16GB, 32GB)
  const ramMatch = lower.match(/(\d{1,2})\s*gb\s*ram/i) || lower.match(/\b(4|6|8|12|16|32)\s*gb\b/i);
  if (ramMatch && !lower.includes('storage') && !lower.includes('ssd') && !lower.includes('hdd') && !lower.includes('rom')) {
    specs.ram = `${ramMatch[1]}GB`;
  }

  // Storage extraction (e.g., 64GB, 128GB, 256GB, 512GB, 1TB)
  const storageMatch = lower.match(/(\d{3}|\d\s*tb)\s*(?:storage|ssd|rom)/i) || lower.match(/\b(64|128|256|512|1tb)\s*gb\b/i);
  if (storageMatch && specs.ram !== `${storageMatch[1]}GB`) {
    specs.storage = storageMatch[1].toUpperCase().includes('GB') ? storageMatch[1].toUpperCase() : `${storageMatch[1]}GB`;
  }

  // Processor extraction
  if (lower.includes('mediatek') || lower.includes('dimensity')) specs.processor = 'MediaTek';
  else if (lower.includes('snapdragon')) specs.processor = 'Snapdragon';
  else if (lower.includes('intel') || lower.includes('i5') || lower.includes('i7') || lower.includes('i9')) specs.processor = 'Intel';
  else if (lower.includes('ryzen') || lower.includes('amd')) specs.processor = 'AMD Ryzen';
  else if (lower.includes('m1') || lower.includes('m2') || lower.includes('m3') || lower.includes('bionic')) specs.processor = 'Apple Silicon';

  // Brand extraction
  const knownBrands = ['asus', 'samsung', 'apple', 'dell', 'lenovo', 'hp', 'acer', 'oppo', 'vivo', 'realme', 'poco', 'oneplus', 'xiaomi', 'redmi', 'iqoo', 'sony', 'nike', 'adidas'];
  for (const b of knownBrands) {
    if (correctedQuery.includes(b)) {
      specs.brand = b.toUpperCase();
      break;
    }
  }

  // Subject & Category Detection
  if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('notebook')) {
    specs.subject = lower.includes('gaming') ? 'gaming laptop' : 'laptop';
    specs.category = CATEGORY_TYPES.LAPTOPS;
  } else if (lower.includes('phone') || lower.includes('mobile') || lower.includes('smartphone') || lower.includes('iphone')) {
    specs.subject = lower.includes('gaming') ? 'gaming phone' : 'mobile phone';
    specs.category = CATEGORY_TYPES.MOBILE_PHONES;
  } else if (lower.includes('headphone') || lower.includes('earbud') || lower.includes('audio')) {
    specs.subject = 'headphones & audio';
    specs.category = CATEGORY_TYPES.HEADPHONES;
  } else if (lower.includes('grocer') || lower.includes('food') || lower.includes('avocado')) {
    specs.subject = 'groceries';
    specs.category = CATEGORY_TYPES.GROCERIES;
  } else if (lower.includes('shoe') || lower.includes('sneaker') || lower.includes('jacket') || lower.includes('fashion')) {
    specs.subject = 'shoes & fashion';
    specs.category = CATEGORY_TYPES.FASHION;
  }

  // Purpose
  if (lower.includes('gaming')) specs.purpose = 'Gaming';
  else if (lower.includes('coding') || lower.includes('programming')) specs.purpose = 'Coding';
  else if (lower.includes('office') || lower.includes('business')) specs.purpose = 'Office Work';
  else if (lower.includes('editing') || lower.includes('render')) specs.purpose = 'Video Editing';

  return specs;
};

/**
 * FEATURE 1: CONVERSATION ISOLATION & CONSTRAINTS UPDATE ENGINE
 * Checks whether user is refining active search or starting a brand new category search.
 */
export const resolveContextIsolation = (query = '', currentMemory = {}) => {
  const lower = query.toLowerCase();

  const newDetectedCategory = detectCategoryFromQuery(query);

  // If query specifies an EXPLICIT NEW category that differs from current category, RESET CONTEXT!
  if (newDetectedCategory && currentMemory.category && newDetectedCategory !== currentMemory.category) {
    return {
      isReset: true,
      cleanMemory: {
        category: newDetectedCategory,
        subject: '',
        minPrice: null,
        maxPrice: null,
        budget: null,
        ram: '',
        storage: '',
        display: '',
        processor: '',
        brand: '',
        purpose: '',
        lastQuery: query,
        history: [...(currentMemory.history || []), { role: 'user', content: query }],
        lastProducts: []
      }
    };
  }

  // Refinement / Follow-up triggers (e.g. "between 500 and 700", "under 30000", "only samsung", "show cheaper ones")
  const isRefinementOrModification = 
    lower.includes('between') ||
    lower.includes('under') ||
    lower.includes('below') ||
    lower.includes('above') ||
    lower.includes('only') ||
    lower.includes('actually') ||
    lower.includes('now') ||
    lower.includes('make it') ||
    lower.includes('cheaper') ||
    lower.includes('with') ||
    lower.includes('gb') ||
    lower.includes('ram') ||
    lower.includes('amoled') ||
    lower.includes('oled') ||
    extractPriceBounds(query, {}).isExplicitNewRange;

  if (isRefinementOrModification && currentMemory.category) {
    return {
      isReset: false,
      cleanMemory: currentMemory
    };
  }

  // Check for fresh search phrase without memory
  const isFreshSearchQuery = (lower.includes('i want') || lower.includes('i need') || lower.includes('find me') || lower.includes('show me') || lower.includes('search'))
    && newDetectedCategory && newDetectedCategory !== currentMemory.category;

  if (isFreshSearchQuery) {
    return {
      isReset: true,
      cleanMemory: {
        category: newDetectedCategory || '',
        subject: '',
        minPrice: null,
        maxPrice: null,
        budget: null,
        ram: '',
        storage: '',
        display: '',
        processor: '',
        brand: '',
        purpose: '',
        lastQuery: query,
        history: [...(currentMemory.history || []), { role: 'user', content: query }],
        lastProducts: []
      }
    };
  }

  return {
    isReset: false,
    cleanMemory: currentMemory
  };
};

/**
 * Main Conversation Processor Engine
 */
export const processUserMessage = async (userMessage, currentMemory = {}, userState = {}) => {
  const query = userMessage.trim();
  const lowerQuery = query.toLowerCase();

  // Step 1: REQUIREMENT 1 - FIX AI CONTEXT LEAKING (Conversation Isolation)
  const { cleanMemory } = resolveContextIsolation(query, currentMemory);

  // Step 2: REQUIREMENT 2 & 3 - INTENT EXTRACTION & CATEGORY DETECTION
  const specs = extractStructuredSpecs(query, cleanMemory);

  const updatedMemory = {
    ...cleanMemory,
    ...specs,
    lastQuery: query,
    history: [...(cleanMemory.history || []), { role: 'user', content: query }],
    lastProducts: cleanMemory.lastProducts || []
  };

  // Classify User Intent
  const { intent, targetPath, isAmbiguousShopping, confidence } = classifyIntent(query);

  const userName = userState.user?.name ? userState.user.name.trim().split(' ')[0] : (userState.user?.firstName || null);

  try {
    // =========================================================================
    // FEATURE 15: VOICE & TEXT NAVIGATION INTENT
    // =========================================================================
    if (intent === INTENT_TYPES.NAVIGATION && targetPath) {
      const pageNames = {
        '/cart': 'Shopping Cart 🛒',
        '/wishlist': 'Wishlist ❤️',
        '/profile': 'Profile Settings 👤',
        '/budget-assistant': 'AI Smart Budget Assistant 💰',
        '/orders': 'My Orders 📦',
        '/products': 'NexaCart Shop Catalog 🛍️'
      };
      return {
        text: `Opening ${pageNames[targetPath] || 'page'} for you now...`,
        action: 'NAVIGATE',
        targetPath,
        products: [],
        followUps: ["Back to chat", "Show products"],
        memory: updatedMemory,
        intent
      };
    }

    // =========================================================================
    // FEATURE 1: GREETING INTENT
    // =========================================================================
    if (intent === INTENT_TYPES.GREETING) {
      const greetingPrefix = userName ? `Hello ${userName} 👋` : 'Hello 👋';
      return {
        text: `${greetingPrefix}\n\nWelcome back to NexaCart AI.\nHow can I help you shop today?`,
        products: [],
        followUps: ["Mobile phones under ₹20,000", "Compare gaming laptops", "Plan monthly budget", "Open Cart"],
        memory: updatedMemory,
        intent
      };
    }

    // =========================================================================
    // FEATURE 1: GENERAL CONVERSATION (Identity, Persona, Greetings)
    // =========================================================================
    if (intent === INTENT_TYPES.GENERAL_CONVERSATION) {
      if (lowerQuery.includes('name') || lowerQuery.includes('who are you')) {
        return {
          text: `I'm NexaCart AI, your personal AI shopping copilot.\nI can help you search our catalog, extract detailed tech specs, compare products, plan budgets, and find deals grounded strictly in our product catalog.`,
          products: [],
          followUps: ["Mobile phones", "Gaming laptops", "Compare Samsung and iPhone", "Shopping advice"],
          memory: updatedMemory,
          intent
        };
      }

      if (lowerQuery.includes('thank') || lowerQuery.includes('good job') || lowerQuery.includes('nice')) {
        return {
          text: `You're very welcome! 😊 I'm glad I could help. Let me know if you need anything else!`,
          products: [],
          followUps: ["Compare products", "Check my cart", "Explore electronics"],
          memory: updatedMemory,
          intent
        };
      }

      return {
        text: `I'm your NexaCart AI shopping copilot! Ready to assist with catalog discovery, tech advice, budget planning, or order tracking.\n\nWhat can I help you find today?`,
        products: [],
        followUps: ["Smartphones under ₹20,000", "Gaming laptops", "Track my order"],
        memory: updatedMemory,
        intent
      };
    }

    // =========================================================================
    // FEATURE 7: PRODUCT EXPLANATION INTENT
    // =========================================================================
    if (intent === INTENT_TYPES.PRODUCT_EXPLANATION) {
      if (lowerQuery.includes('oled') || lowerQuery.includes('amoled')) {
        return {
          text: `**OLED & AMOLED Display Technology:**\n\n• **True Pitch Black**: Individual self-lit pixels turn off completely, yielding infinite contrast ratio.\n• **Vibrant Color Punch**: Richer color saturation and wider viewing angles compared to standard LCD screens.\n• **Fast Pixel Response**: Ultra-low latency motion handling ideal for mobile gaming and videos.`,
          products: [],
          followUps: ["Show AMOLED phones", "Show OLED laptops", "Compare IPS vs OLED"],
          memory: updatedMemory,
          intent
        };
      }

      return {
        text: `**Hardware Specifications Overview:**\n\nHigh performance in modern electronics relies on fast multi-core processors, sufficient RAM for multitasking, and fast NVMe flash storage.\n\nLet me know if you'd like to search our catalog for products with specific specs!`,
        products: [],
        followUps: ["Explain RAM", "Explain Processors", "Search phones"],
        memory: updatedMemory,
        intent
      };
    }

    // =========================================================================
    // FEATURE 8: SHOPPING ADVICE INTENT
    // =========================================================================
    if (intent === INTENT_TYPES.SHOPPING_ADVICE) {
      if (lowerQuery.includes('processor') || lowerQuery.includes('snapdragon') || lowerQuery.includes('mediatek')) {
        return {
          text: `**MediaTek Dimensity vs. Qualcomm Snapdragon:**\n\n• **Qualcomm Snapdragon**: Renowned for GPU gaming stability, Adreno graphics efficiency, and optimal developer support.\n• **MediaTek Dimensity**: Delivers extraordinary multi-core CPU power and high energy efficiency at lower price points.\n\n**Verdict**: Both offer high performance. MediaTek provides high value in mid-range phones, while Snapdragon leads in sustained flagship mobile gaming.`,
          products: [],
          followUps: ["Show MediaTek phones", "Show Snapdragon phones", "Phones under ₹20,000"],
          memory: updatedMemory,
          intent
        };
      }

      return {
        text: `**Shopping Expert Advice:**\n\nWhen buying smartphones in 2026, look for:\n1. At least **6GB to 8GB RAM** for smooth multitasking.\n2. Minimum **128GB storage** for apps and videos.\n3. Reliable chipset like **MediaTek Dimensity** or **Snapdragon**.`,
        products: [],
        followUps: ["Phones under ₹20,000", "Show 8GB RAM phones"],
        memory: updatedMemory,
        intent
      };
    }

    // =========================================================================
    // FEATURE 7, 8, 9: CART / WISHLIST / ORDERS INTENT
    // =========================================================================
    if (intent === INTENT_TYPES.CART || intent === INTENT_TYPES.WISHLIST || intent === INTENT_TYPES.ORDER_TRACKING) {
      const cartItems = userState.cart?.items || [];
      const wishlistItems = userState.wishlist?.products || [];
      const orders = userState.orders?.orders || [];

      if (intent === INTENT_TYPES.CART) {
        if (cartItems.length === 0) {
          return {
            text: `Your shopping cart is currently empty 🛒\n\nWould you like me to show top deals available in our store?`,
            products: [],
            followUps: ["Smartphones under ₹20,000", "Show laptops", "Browse Shop"],
            memory: updatedMemory,
            intent
          };
        }

        const totalCartValue = cartItems.reduce((sum, item) => sum + ((item.product?.price || 0) * (item.quantity || 1)), 0);
        const itemListText = cartItems.map(i => `• **${i.product?.name || 'Item'}** (x${i.quantity}) - ${formatINR(i.product?.price)}`).join('\n');

        return {
          text: `**Your Shopping Cart (${cartItems.length} item${cartItems.length > 1 ? 's' : ''}):**\n\n${itemListText}\n\n**Total Value:** ${formatINR(totalCartValue)}`,
          products: cartItems.map(i => i.product).filter(Boolean),
          followUps: ["Proceed to Checkout", "Open Wishlist", "Clear Cart"],
          memory: updatedMemory,
          intent
        };
      }

      if (intent === INTENT_TYPES.WISHLIST) {
        if (wishlistItems.length === 0) {
          return {
            text: `Your wishlist is currently empty ❤️\n\nYou can click the heart icon on any product to save it for later!`,
            products: [],
            followUps: ["Explore products", "Show laptops"],
            memory: updatedMemory,
            intent
          };
        }

        return {
          text: `**Your Saved Wishlist (${wishlistItems.length} items):**\n\nHere are the items saved in your wishlist:`,
          products: wishlistItems,
          followUps: ["Open Cart", "Browse shop"],
          memory: updatedMemory,
          intent
        };
      }

      if (intent === INTENT_TYPES.ORDER_TRACKING) {
        if (orders.length === 0) {
          return {
            text: `You have no recent orders placed 📦\n\nOnce you place an order, delivery updates will appear right here.`,
            products: [],
            followUps: ["Browse shop", "Open Cart"],
            memory: updatedMemory,
            intent
          };
        }

        const latest = orders[0];
        return {
          text: `**Latest Order Status:**\n\n• **Order ID**: #${latest._id?.slice(-8) || 'NEXA-1001'}\n• **Status**: ${latest.isDelivered ? '✅ Delivered' : '🚚 In Transit / Processing'}\n• **Total Amount**: ${formatINR(latest.totalPrice || latest.totalAmount)}`,
          products: [],
          followUps: ["View Order Details", "Continue Shopping"],
          memory: updatedMemory,
          intent
        };
      }
    }

    // =========================================================================
    // FEATURE 15: LOW CONFIDENCE / AMBIGUOUS CLARIFICATION TRIGGER
    // =========================================================================
    if (isAmbiguousShopping && confidence < 0.8 && !updatedMemory.ram && !updatedMemory.processor && !updatedMemory.budget) {
      if (lowerQuery.includes('mediatek') && !lowerQuery.includes('phone') && !lowerQuery.includes('tablet')) {
        return {
          text: `Did you mean:\n\n• **MediaTek Mobile Phone**\n• **MediaTek Tablet**?\n\nPlease clarify so I can search the right category in our catalog!`,
          products: [],
          followUps: ["MediaTek mobile phone", "MediaTek tablet"],
          memory: updatedMemory,
          intent
        };
      }

      if (lowerQuery.includes('phone') && !updatedMemory.budget) {
        return {
          text: `I can help you find a great mobile phone! 📱\n\nCould you also specify your preferred budget?\n• Under ₹15,000\n• Under ₹25,000\n• Under ₹50,000`,
          products: [],
          followUps: ["Phone under ₹15,000", "Phone under ₹25,000", "Phone under ₹50,000"],
          memory: updatedMemory,
          intent
        };
      }
    }

    // =========================================================================
    // FEATURE 3, 4, 5, 6, 7, 8, 14: STRUCTURED PRODUCT SEARCH & RANKING PIPELINE
    // =========================================================================
    if (intent === INTENT_TYPES.PRODUCT_SEARCH || intent === INTENT_TYPES.PRODUCT_COMPARISON) {
      // Fetch MongoDB Catalog
      let allProducts = [];
      try {
        const res = await api.get('/products');
        allProducts = res.data || [];
      } catch (err) {
        console.warn('Catalog fetch failed:', err);
      }

      // Perform Strict Product Filtering & Multi-Factor Ranking
      const {
        matchedProducts,
        missingCriteria,
        detectedCategoryName
      } = runStrictSearchPipeline(allProducts, query, updatedMemory);

      // STEP 5: STRICT CONSTRAINT VALIDATION & ZERO MATCH REFUSAL
      if (matchedProducts.length === 0) {
        const categoryLabel = detectedCategoryName ? detectedCategoryName.toLowerCase() : 'product';
        const missingList = missingCriteria.length > 0
          ? missingCriteria.map(c => `• ${c}`).join('\n')
          : '• Selected specifications';

        const refusalText = `I couldn't find a ${categoryLabel} matching all those requirements in our catalog:\n\n${missingList}\n\nWould you like me to relax one of the specifications?`;

        return {
          text: refusalText,
          products: [],
          followUps: [
            `Show all ${categoryLabel}s`,
            "Change Budget",
            "Modify Specs"
          ],
          memory: updatedMemory,
          intent
        };
      }

      // REQUIREMENT 8: CHATGPT SHOPPING RESPONSE FORMAT
      const topMatches = matchedProducts.slice(0, 3);
      const reasoningBullets = [];
      if (updatedMemory.processor) reasoningBullets.push(`✓ ${updatedMemory.processor} processor`);
      if (updatedMemory.ram) reasoningBullets.push(`✓ ${updatedMemory.ram} RAM`);
      if (updatedMemory.storage) reasoningBullets.push(`✓ ${updatedMemory.storage} storage`);
      if (updatedMemory.brand) reasoningBullets.push(`✓ ${updatedMemory.brand} brand`);
      if (updatedMemory.budget) reasoningBullets.push(`✓ Under ${formatINR(updatedMemory.budget)}`);
      reasoningBullets.push('✓ Available in catalog');

      const bestMatch = topMatches[0];
      const altMatch = topMatches[1];
      const budgetMatch = topMatches.length > 2 ? topMatches[2] : null;

      let formattedResponseText = `I found ${topMatches.length} ${detectedCategoryName.toLowerCase()}s matching your requirements.\n\n` +
        `**Reasoning:**\n${reasoningBullets.join('\n')}\n\n` +
        `**Best Match:**\n${bestMatch.name} (${formatINR(bestMatch.price)}) - High spec match with rating ${bestMatch.rating}⭐.`;

      if (altMatch) {
        formattedResponseText += `\n\n**Alternative:**\n${altMatch.name} (${formatINR(altMatch.price)}) - Excellent alternative in the same category.`;
      }
      if (budgetMatch) {
        formattedResponseText += `\n\n**Budget Option:**\n${budgetMatch.name} (${formatINR(budgetMatch.price)}) - Most budget-friendly choice available.`;
      }

      // REQUIREMENT 6: DYNAMIC CATEGORY-SPECIFIC AI INSIGHTS
      const categoryInsightsText = generateCategoryInsights(detectedCategoryName, bestMatch, updatedMemory);

      // REQUIREMENT 9: CONVERSATIONAL FOLLOW-UP CHIPS
      const categoryFollowUps = generateCategoryFollowUps(detectedCategoryName, updatedMemory);

      return {
        text: formattedResponseText,
        reasoning: categoryInsightsText,
        products: topMatches,
        followUps: categoryFollowUps,
        memory: { ...updatedMemory, lastProducts: topMatches },
        intent
      };
    }

  } catch (err) {
    console.error('Conversation Engine Error:', err);
    return {
      text: "I'm having trouble connecting to catalog search right now. Please try again in a moment.",
      products: [],
      followUps: ["Try again", "Browse shop"],
      memory: updatedMemory,
      intent: 'error'
    };
  }

  // Default fallback
  return {
    text: "How can I assist your shopping experience today on NexaCart?",
    products: [],
    followUps: ["Smartphones under ₹20,000", "Compare laptops", "Check budget"],
    memory: updatedMemory,
    intent
  };
};

/**
 * REQUIREMENT 3, 4, 7, 14: STRICT SEARCH PIPELINE & MULTI-FACTOR RANKING
 */

const runStrictSearchPipeline = (products = [], query = '', memory = {}) => {
  // Detect exact target category - do NOT default to MOBILE_PHONES
  const targetCategory = memory.category || detectCategoryFromQuery(query) || null;

  const missingCriteria = [];

  // Track extracted target specs
  if (memory.ram) missingCriteria.push(`${memory.ram} RAM`);
  if (memory.storage) missingCriteria.push(`${memory.storage} Storage`);
  if (memory.display) missingCriteria.push(`${memory.display} Display`);
  if (memory.processor) missingCriteria.push(`${memory.processor} Processor`);
  if (memory.brand) missingCriteria.push(`${memory.brand} Brand`);
  if (memory.minPrice !== null && memory.minPrice !== undefined && memory.maxPrice !== null && memory.maxPrice !== undefined) {
    missingCriteria.push(`Price between ${formatINR(memory.minPrice)} and ${formatINR(memory.maxPrice)}`);
  } else if (memory.maxPrice !== null && memory.maxPrice !== undefined) {
    missingCriteria.push(`Price under ${formatINR(memory.maxPrice)}`);
  } else if (memory.minPrice !== null && memory.minPrice !== undefined) {
    missingCriteria.push(`Price above ${formatINR(memory.minPrice)}`);
  }

  // Step 1: Category Filter (Strict Boundary!)
  const categoryPool = products.filter(p => {
    if (!targetCategory) return true; // Broad search if no category specified

    const pCat = (p.category || '').toLowerCase();
    const pName = (p.name || '').toLowerCase();
    const pDesc = (p.description || '').toLowerCase();

    const lowerTarget = targetCategory.toLowerCase();

    // Mobiles category mapping
    if (lowerTarget === CATEGORY_TYPES.MOBILE_PHONES.toLowerCase() || lowerTarget === 'mobiles' || lowerTarget === 'mobile' || lowerTarget === 'phone' || lowerTarget === 'phones') {
      const isPhone = pCat.includes('mobile') || pCat.includes('phone') || pName.includes('phone') || pName.includes('mobile') || pName.includes('iphone') || pName.includes('galaxy') || pName.includes('5g') || (pCat.includes('electronics') && (pName.includes('samsung') || pName.includes('realme') || pName.includes('poco') || pName.includes('vivo') || pName.includes('oppo') || pName.includes('redmi') || pName.includes('oneplus') || pName.includes('nothing') || pName.includes('motorola') || pName.includes('iqoo') || pName.includes('xiaomi') || pName.includes('infinix') || pName.includes('tecno') || pName.includes('nokia') || pName.includes('honor')));
      const isForbidden = pName.includes('headphone') || pName.includes('laptop') || pName.includes('macbook') || pName.includes('charger') || pName.includes('monitor') || pName.includes('keyboard');
      return isPhone && !isForbidden;
    }

    // Laptops category mapping
    if (lowerTarget === CATEGORY_TYPES.LAPTOPS.toLowerCase() || lowerTarget === 'laptop' || lowerTarget === 'laptops') {
      const isLaptop = pName.includes('laptop') || pName.includes('macbook') || pName.includes('notebook');
      return isLaptop;
    }

    // Headphones category mapping
    if (lowerTarget === CATEGORY_TYPES.HEADPHONES.toLowerCase() || lowerTarget === 'headphone' || lowerTarget === 'headphones') {
      return pName.includes('headphone') || pName.includes('earbud') || pName.includes('audio') || pName.includes('earphone');
    }

    // Groceries category mapping
    if (lowerTarget === CATEGORY_TYPES.GROCERIES.toLowerCase() || lowerTarget === 'grocery' || lowerTarget === 'groceries') {
      return pCat.includes('grocer') || pName.includes('avocado') || pName.includes('food') || pName.includes('grocery');
    }

    // Fashion category mapping
    if (lowerTarget === CATEGORY_TYPES.FASHION.toLowerCase() || lowerTarget === 'fashion' || lowerTarget === 'shoe' || lowerTarget === 'shoes' || lowerTarget === 'sneaker' || lowerTarget === 'clothing' || lowerTarget === 'apparel') {
      return pCat.includes('fashion') || pName.includes('shoe') || pName.includes('sneaker') || pName.includes('shirt') || pName.includes('t-shirt');
    }

    // Dynamic category match check
    return pCat.includes(lowerTarget) || pName.includes(lowerTarget) || pDesc.includes(lowerTarget);
  });

  // Step 2: Strict Spec & Numeric Price Bounds Filtering
  const matched = [];

  categoryPool.forEach(product => {
    const pName = product.name.toLowerCase();
    const pDesc = (product.description || '').toLowerCase();

    let satisfiesAllStrict = true;

    // Price Bounds Check (STRICT)
    if (memory.minPrice !== null && memory.minPrice !== undefined && product.price < memory.minPrice) {
      satisfiesAllStrict = false;
    }
    if (memory.maxPrice !== null && memory.maxPrice !== undefined && product.price > memory.maxPrice) {
      satisfiesAllStrict = false;
    }

    // Display Type Check
    if (memory.display) {
      const dispLower = memory.display.toLowerCase();
      if (!pName.includes(dispLower) && !pDesc.includes(dispLower)) {
        satisfiesAllStrict = false;
      }
    }

    // Processor check
    if (memory.processor) {
      const procLower = memory.processor.toLowerCase();
      if (!pName.includes(procLower) && !pDesc.includes(procLower)) {
        satisfiesAllStrict = false;
      }
    }

    // RAM check
    if (memory.ram) {
      const ramNum = memory.ram.replace(/gb/gi, '');
      const ramPattern = new RegExp(`\\b${ramNum}\\s*gb\\b`, 'i');
      if (!ramPattern.test(pName) && !ramPattern.test(pDesc)) {
        satisfiesAllStrict = false;
      }
    }

    // Storage check
    if (memory.storage) {
      const storVal = memory.storage.toLowerCase();
      if (!pName.includes(storVal) && !pDesc.includes(storVal)) {
        satisfiesAllStrict = false;
      }
    }

    // Brand check
    if (memory.brand) {
      const brandLower = memory.brand.toLowerCase();
      if (!pName.includes(brandLower) && !pDesc.includes(brandLower)) {
        satisfiesAllStrict = false;
      }
    }

    if (satisfiesAllStrict) {
      matched.push(product);
    }
  });

  // Sort matched products by rating descending
  matched.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return {
    matchedProducts: matched,
    missingCriteria: Array.from(new Set(missingCriteria)),
    detectedCategoryName: targetCategory
  };
};

/**
 * REQUIREMENT 6: DYNAMIC CATEGORY-SPECIFIC AI INSIGHTS
 */
const generateCategoryInsights = (categoryName = '', bestProduct = {}) => {
  if (categoryName === CATEGORY_TYPES.MOBILE_PHONES) {
    return `For mobile phones, performance relies on RAM capacity, processor efficiency (e.g. MediaTek/Snapdragon), battery size, and display technology. ${bestProduct.name || 'Selected items'} delivers smooth daily multitasking and gaming stability without overheating.`;
  }

  if (categoryName === CATEGORY_TYPES.LAPTOPS) {
    return `For laptops, priorities include CPU core speed, high-speed RAM, fast NVMe SSD storage, and thermal cooling efficiency for heavy workloads.`;
  }

  if (categoryName === CATEGORY_TYPES.GROCERIES) {
    return `Selected grocery items focus on organic freshness, nutritional standards, and high customer satisfaction ratings.`;
  }

  return `Products are evaluated based on specification match, user ratings, price efficiency, and catalog availability.`;
};

/**
 * REQUIREMENT 9: CONVERSATIONAL FOLLOW-UP CHIPS
 */
const generateCategoryFollowUps = (categoryName = '') => {
  if (categoryName === CATEGORY_TYPES.MOBILE_PHONES) {
    return [
      "Compare these phones",
      "See camera comparison",
      "Filter under ₹20,000",
      "Only AMOLED displays"
    ];
  }

  if (categoryName === CATEGORY_TYPES.LAPTOPS) {
    return [
      "Compare GPU benchmarks",
      "Filter under ₹60,000",
      "16GB RAM laptops only",
      "Check battery life"
    ];
  }

  return [
    "Compare top picks",
    "Show cheaper options",
    "Check availability"
  ];
};

