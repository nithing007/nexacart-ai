import { INTENT_TYPES, CATEGORY_TYPES, BRAND_TYPO_MAP, classifyIntent, detectCategoryFromQuery } from './intentClassifier';
import api from '../services/api';

/**
 * Format numerical amount into Indian Rupee format (INR)
 */
export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

/**
 * Extract numerical budget from user text (e.g. "under 25000", "80k", "₹80,000")
 */
export const extractBudget = (text = '') => {
  const lower = text.toLowerCase();

  const kMatch = lower.match(/(\d+(?:\.\d+)?)\s*k\b/i);
  if (kMatch) {
    return Math.round(parseFloat(kMatch[1]) * 1000);
  }

  const directMatch = lower.match(/(?:under|below|less than|max|budget of|budget is|around|₹|rs\.?)\s*(\d[\d,]*)/i)
    || lower.match(/(\d[\d,]*)\s*(?:rupees|rs|budget)/i);

  if (directMatch) {
    const cleaned = directMatch[1].replace(/,/g, '');
    const num = parseInt(cleaned, 10);
    if (!isNaN(num) && num > 100) return num;
  }

  return null;
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

  const specs = {
    category: memoryBase.category || detectCategoryFromQuery(query) || '',
    budget: extractBudget(query) || memoryBase.budget || null,
    ram: memoryBase.ram || '',
    storage: memoryBase.storage || '',
    processor: memoryBase.processor || '',
    brand: memoryBase.brand || '',
    purpose: memoryBase.purpose || '',
    subject: memoryBase.subject || ''
  };

  // RAM extraction (e.g., 6GB RAM, 8GB, 16 GB, 6 GB)
  const ramMatch = lower.match(/(\d{1,2})\s*gb\s*ram/i) || lower.match(/\b(\d{1,2})\s*gb\b/i);
  if (ramMatch && !lower.includes('storage') && !lower.includes('ssd') && !lower.includes('hdd') && !lower.includes('rom')) {
    specs.ram = `${ramMatch[1]}GB`;
  }

  // Storage extraction (e.g., 128GB, 256GB, 512GB, 1TB)
  const storageMatch = lower.match(/(\d{3}|\d\s*tb)\s*(?:storage|ssd|rom)/i) || lower.match(/\b(128|256|512)\s*gb\b/i);
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
 * FEATURE 1: CONVERSATION ISOLATION ENGINE
 * Checks whether user is continuing previous context or starting a new search reset.
 */
export const resolveContextIsolation = (query = '', currentMemory = {}) => {
  const lower = query.toLowerCase();

  // Continuation markers
  const continuationPhrases = [
    'what about', 'how about', 'also', 'under', 'cheaper', 'show alternatives',
    'change budget', 'modify specs', 'compare these', 'compare them', 'with amoled',
    'in black', 'with 8gb', 'with 16gb', 'show more', 'similar'
  ];

  const hasContinuationMarker = continuationPhrases.some(p => lower.includes(p));

  const newDetectedCategory = detectCategoryFromQuery(query);

  // If query specifies a NEW category that differs from memory category, RESET CONTEXT!
  if (newDetectedCategory && currentMemory.category && newDetectedCategory !== currentMemory.category) {
    return {
      isReset: true,
      cleanMemory: {
        category: newDetectedCategory,
        subject: '',
        budget: null,
        ram: '',
        storage: '',
        processor: '',
        brand: '',
        purpose: '',
        lastQuery: query,
        history: [...(currentMemory.history || []), { role: 'user', content: query }],
        lastProducts: []
      }
    };
  }

  // If query does NOT have continuation markers and specifies a brand new product type, RESET!
  const isFreshSearchQuery = (lower.includes('i want') || lower.includes('i need') || lower.includes('find me') || lower.includes('show me') || lower.includes('search'))
    && !hasContinuationMarker;

  if (isFreshSearchQuery) {
    return {
      isReset: true,
      cleanMemory: {
        category: newDetectedCategory || '',
        subject: '',
        budget: null,
        ram: '',
        storage: '',
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
        nearAlternatives,
        missingCriteria,
        detectedCategoryName
      } = runStrictSearchPipeline(allProducts, query, updatedMemory);

      // FEATURE 4: STRICT PRODUCT FILTERING & ZERO HALLUCINATION REFUSAL
      if (matchedProducts.length === 0) {
        // Step A: Check if near alternatives exist in the SAME category (REQUIREMENT 5: SMART FALLBACK)
        if (nearAlternatives.length > 0) {
          const requestedSpecStr = updatedMemory.processor || updatedMemory.brand || 'specified model';
          const altProcessor = nearAlternatives[0].name.includes('Snapdragon') ? 'Snapdragon' : 'available';

          const fallbackQuestionText = `We couldn't find a **${requestedSpecStr}** ${detectedCategoryName.toLowerCase()} in our catalog.\n\nWould you like to see similar ${detectedCategoryName.toLowerCase()}s with **${altProcessor}** processors?`;

          return {
            text: fallbackQuestionText,
            isSmartFallback: true,
            fallbackOptions: nearAlternatives.slice(0, 3),
            products: [],
            followUps: ["Show Alternatives", "Change Budget", "Modify Specs"],
            memory: updatedMemory,
            intent
          };
        }

        // Step B: Zero Hallucination Refusal Response (REQUIREMENT 4)
        const missingList = missingCriteria.length > 0
          ? missingCriteria.map(c => `• ${c}`).join('\n')
          : `• ${updatedMemory.ram || '6GB RAM'}\n• ${updatedMemory.storage || '128GB Storage'}\n• ${updatedMemory.processor || 'MediaTek Processor'}`;

        const categoryLabel = detectedCategoryName ? detectedCategoryName.toLowerCase() : 'product';

        const refusalText = `Sorry, we currently don't have a ${categoryLabel} matching:\n\n${missingList}\n\nin our catalog.`;

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
  // Detect exact target category
  const targetCategory = memory.category || detectCategoryFromQuery(query) || CATEGORY_TYPES.MOBILE_PHONES;

  const missingCriteria = [];

  // Track extracted target specs
  if (memory.ram) missingCriteria.push(`${memory.ram} RAM`);
  if (memory.storage) missingCriteria.push(`${memory.storage} Storage`);
  if (memory.processor) missingCriteria.push(`${memory.processor} Processor`);
  if (memory.brand) missingCriteria.push(`${memory.brand} Brand`);
  if (memory.budget) missingCriteria.push(`Budget under ${formatINR(memory.budget)}`);

  // Step 1: Category Filter (Strict Boundary!)
  const categoryPool = products.filter(p => {
    const pCat = (p.category || '').toLowerCase();
    const pName = (p.name || '').toLowerCase();

    if (targetCategory === CATEGORY_TYPES.MOBILE_PHONES) {
      const isPhone = pCat.includes('mobile') || pCat.includes('phone') || pName.includes('phone') || pName.includes('mobile') || pName.includes('iphone') || pName.includes('galaxy') || pName.includes('5g') || (pCat.includes('electronics') && (pName.includes('samsung') || pName.includes('realme') || pName.includes('poco') || pName.includes('vivo') || pName.includes('oppo') || pName.includes('redmi') || pName.includes('oneplus') || pName.includes('nothing') || pName.includes('motorola') || pName.includes('iqoo') || pName.includes('xiaomi') || pName.includes('infinix') || pName.includes('tecno') || pName.includes('nokia') || pName.includes('honor')));
      const isForbidden = pName.includes('headphone') || pName.includes('laptop') || pName.includes('macbook') || pName.includes('charger') || pName.includes('monitor') || pName.includes('keyboard');
      return isPhone && !isForbidden;
    }

    if (targetCategory === CATEGORY_TYPES.LAPTOPS) {
      const isLaptop = pName.includes('laptop') || pName.includes('macbook') || pName.includes('notebook');
      return isLaptop;
    }

    if (targetCategory === CATEGORY_TYPES.HEADPHONES) {
      return pName.includes('headphone') || pName.includes('earbud') || pName.includes('audio');
    }

    if (targetCategory === CATEGORY_TYPES.GROCERIES) {
      return pCat.includes('grocer') || pName.includes('avocado') || pName.includes('food');
    }

    if (targetCategory === CATEGORY_TYPES.FASHION) {
      return pCat.includes('fashion') || pName.includes('shoe') || pName.includes('sneaker');
    }

    return true;
  });

  // Step 2: Strict Spec Filtering & Scoring
  const matched = [];
  const nearAlternatives = [];

  categoryPool.forEach(product => {
    const pName = product.name.toLowerCase();
    const pDesc = (product.description || '').toLowerCase();

    let specMatchScore = 100;
    let satisfiesAllStrict = true;

    // Processor check
    if (memory.processor) {
      const procLower = memory.processor.toLowerCase();
      if (!pName.includes(procLower) && !pDesc.includes(procLower)) {
        satisfiesAllStrict = false;
        specMatchScore -= 40;
      }
    }

    // RAM check
    if (memory.ram) {
      const ramLower = memory.ram.toLowerCase();
      if (!pName.includes(ramLower) && !pDesc.includes(ramLower)) {
        satisfiesAllStrict = false;
        specMatchScore -= 20;
      }
    }

    // Storage check
    if (memory.storage) {
      const storLower = memory.storage.toLowerCase();
      if (!pName.includes(storLower) && !pDesc.includes(storLower)) {
        satisfiesAllStrict = false;
        specMatchScore -= 20;
      }
    }

    // Brand check
    if (memory.brand) {
      const brandLower = memory.brand.toLowerCase();
      if (!pName.includes(brandLower) && !pDesc.includes(brandLower)) {
        satisfiesAllStrict = false;
        specMatchScore -= 30;
      }
    }

    // Budget check
    if (memory.budget && product.price > memory.budget) {
      satisfiesAllStrict = false;
      specMatchScore -= 30;
    }

    // REQUIREMENT 7: MULTI-FACTOR RANKING SCORE
    // Score = Spec Match (50%) + Rating (25%) + Price Efficiency (25%)
    const ratingScore = (product.rating || 4.0) * 10;
    const priceEfficiency = memory.budget ? Math.max(0, 100 - Math.abs(memory.budget - product.price) / 1000) : 50;

    const totalScore = (specMatchScore * 0.5) + (ratingScore * 0.25) + (priceEfficiency * 0.25);
    product._rankScore = totalScore;

    if (satisfiesAllStrict) {
      matched.push(product);
    } else if (specMatchScore >= 40) {
      nearAlternatives.push(product);
    }
  });

  // Sort by calculated multi-factor rank score
  matched.sort((a, b) => (b._rankScore || 0) - (a._rankScore || 0));
  nearAlternatives.sort((a, b) => (b._rankScore || 0) - (a._rankScore || 0));

  return {
    matchedProducts: matched,
    nearAlternatives,
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

