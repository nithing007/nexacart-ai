import { INTENT_TYPES, classifyIntent } from './intentClassifier';
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
 * Extract structured specification filters from user request
 */
export const extractStructuredSpecs = (query = '', currentMemory = {}) => {
  const lower = query.toLowerCase();

  const specs = {
    category: currentMemory.category || '',
    budget: extractBudget(query) || currentMemory.budget || null,
    ram: currentMemory.ram || '',
    storage: currentMemory.storage || '',
    processor: currentMemory.processor || '',
    brand: currentMemory.brand || '',
    purpose: currentMemory.purpose || '',
    subject: currentMemory.subject || ''
  };

  // RAM extraction (e.g., 6GB RAM, 8GB, 16 GB)
  const ramMatch = lower.match(/(\d{1,2})\s*gb\s*ram/i) || lower.match(/\b(\d{1,2})\s*gb\b/i);
  if (ramMatch && !lower.includes('storage') && !lower.includes('ssd') && !lower.includes('hdd')) {
    specs.ram = `${ramMatch[1]}GB`;
  }

  // Storage extraction (e.g., 128GB, 256GB, 512GB, 1TB)
  const storageMatch = lower.match(/(\d{3}|\d\s*tb)\s*(?:storage|ssd|rom)/i);
  if (storageMatch) {
    specs.storage = storageMatch[1].toUpperCase();
  }

  // Processor extraction
  if (lower.includes('mediatek') || lower.includes('dimensity')) specs.processor = 'MediaTek';
  else if (lower.includes('snapdragon')) specs.processor = 'Snapdragon';
  else if (lower.includes('intel') || lower.includes('i5') || lower.includes('i7') || lower.includes('i9')) specs.processor = 'Intel';
  else if (lower.includes('ryzen') || lower.includes('amd')) specs.processor = 'AMD Ryzen';
  else if (lower.includes('m1') || lower.includes('m2') || lower.includes('m3') || lower.includes('bionic')) specs.processor = 'Apple Silicon';

  // Brand extraction
  const knownBrands = ['asus', 'samsung', 'apple', 'dell', 'lenovo', 'hp', 'acer', 'oppo', 'vivo', 'realme', 'oneplus', 'sony', 'nike', 'adidas'];
  for (const b of knownBrands) {
    if (lower.includes(b) || lower.includes(`only ${b}`)) {
      specs.brand = b.toUpperCase();
      break;
    }
  }

  // Subject / Category
  if (lower.includes('laptop') || lower.includes('macbook')) {
    specs.subject = lower.includes('gaming') ? 'gaming laptop' : 'laptop';
    specs.category = 'Electronics';
  } else if (lower.includes('phone') || lower.includes('mobile') || lower.includes('smartphone')) {
    specs.subject = lower.includes('gaming') ? 'gaming phone' : 'smartphone';
    specs.category = 'Electronics';
  } else if (lower.includes('grocer') || lower.includes('food') || lower.includes('avocado')) {
    specs.subject = 'groceries';
    specs.category = 'Groceries';
  } else if (lower.includes('shoe') || lower.includes('sneaker') || lower.includes('jacket') || lower.includes('fashion')) {
    specs.subject = 'shoes & fashion';
    specs.category = 'Fashion';
  }

  // Purpose
  if (lower.includes('gaming')) specs.purpose = 'Gaming';
  else if (lower.includes('coding') || lower.includes('programming')) specs.purpose = 'Coding';
  else if (lower.includes('office') || lower.includes('business')) specs.purpose = 'Office Work';
  else if (lower.includes('editing') || lower.includes('render')) specs.purpose = 'Video Editing';

  return specs;
};

/**
 * Main Conversation Processor Engine
 */
export const processUserMessage = async (userMessage, currentMemory = {}, userState = {}) => {
  const query = userMessage.trim();
  const lowerQuery = query.toLowerCase();

  // Extract structured specs & update cumulative session memory
  const specs = extractStructuredSpecs(query, currentMemory);

  const updatedMemory = {
    ...currentMemory,
    ...specs,
    lastQuery: query,
    history: [...(currentMemory.history || []), { role: 'user', content: query }],
    lastProducts: currentMemory.lastProducts || []
  };

  // Classify User Intent
  const { intent, targetPath, isAmbiguousShopping } = classifyIntent(query);

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
    // Never search MongoDB / products.
    // =========================================================================
    if (intent === INTENT_TYPES.GREETING) {
      const greetingPrefix = userName ? `Hello ${userName} 👋` : 'Hello 👋';
      return {
        text: `${greetingPrefix}\n\nWelcome back to NexaCart AI.\nHow can I help you shop today?`,
        products: [],
        followUps: ["Gaming phone under ₹25,000", "Compare laptops", "Plan monthly budget", "Open Cart"],
        memory: updatedMemory,
        intent
      };
    }

    // =========================================================================
    // FEATURE 1: GENERAL CONVERSATION (Identity, Creator, Persona)
    // Never search MongoDB / products.
    // =========================================================================
    if (intent === INTENT_TYPES.GENERAL_CONVERSATION) {
      if (lowerQuery.includes('name') || lowerQuery.includes('who are you')) {
        return {
          text: `I'm NexaCart AI, your personal shopping assistant.\nI can help you discover products, compare items, plan your monthly shopping budget, explain specifications, and answer shopping-related questions.`,
          products: [],
          followUps: ["Show gaming laptops", "Compare Samsung and iPhone", "Explain OLED display", "Shopping advice"],
          memory: updatedMemory,
          intent
        };
      }

      if (lowerQuery.includes('created') || lowerQuery.includes('made') || lowerQuery.includes('built')) {
        return {
          text: `I was built as the AI shopping assistant for the NexaCart AI platform to make shopping easier using conversational AI and intelligent product discovery.`,
          products: [],
          followUps: ["Recommend smartphones", "Show top laptops", "Plan a budget"],
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

      if (lowerQuery.includes('bye') || lowerQuery.includes('goodbye')) {
        return {
          text: `Goodbye! 👋 Have a wonderful day and enjoy shopping on NexaCart!`,
          products: [],
          followUps: ["Start new search"],
          memory: updatedMemory,
          intent
        };
      }

      return {
        text: `I'm doing great, thank you! 😊 I'm your NexaCart AI shopping copilot, ready to assist with product discovery, tech advice, budget planning, or order tracking.\n\nWhat can I help you with today?`,
        products: [],
        followUps: ["Gaming laptops", "Smartphones under ₹20,000", "Track my order"],
        memory: updatedMemory,
        intent
      };
    }

    // =========================================================================
    // FEATURE 7: PRODUCT EXPLANATION INTENT
    // Explain terms in simple beginner-friendly language without forcing redirects.
    // =========================================================================
    if (intent === INTENT_TYPES.PRODUCT_EXPLANATION) {
      if (lowerQuery.includes('oled')) {
        return {
          text: `**OLED (Organic Light-Emitting Diode) Display Explained:**\n\nAn OLED screen is made of millions of tiny individual pixels that generate their own light. When showing black, those pixels turn off completely.\n\n• **True Pitch Black**: Produces infinite contrast because black areas emit zero light.\n• **Vibrant Colors**: Colors pop with exceptional clarity and realism.\n• **Fast Response**: Virtually instant pixel transitions, eliminating motion blur in high-speed gaming.\n\nUnlike traditional LED screens that use a glowing backlight behind the entire panel, OLED gives you deep blacks and striking contrast.`,
          products: [],
          followUps: ["Show OLED laptops", "Show OLED phones", "Compare IPS vs OLED"],
          memory: updatedMemory,
          intent
        };
      }

      if (lowerQuery.includes('ram')) {
        return {
          text: `**RAM (Random Access Memory) Explained:**\n\nRAM acts as your device's short-term workspace memory. It holds active apps and browser tabs so your processor can access them instantly.\n\n• **8GB RAM**: Great for web browsing, streaming video, and everyday office tasks.\n• **16GB RAM**: Recommended standard for smooth multitasking, coding, and modern gaming.\n• **32GB+ RAM**: Ideal for heavy video rendering, 3D graphics, and virtual machines.`,
          products: [],
          followUps: ["Show 16GB laptops", "Show gaming phones"],
          memory: updatedMemory,
          intent
        };
      }

      return {
        text: `**Key Hardware Specifications Overview:**\n\nModern electronics depend on processor speed, high-speed RAM for multitasking, and fast NVMe storage for instant boot times.\n\nLet me know if you would like me to explain any specific technology in detail or search for products featuring these specs!`,
        products: [],
        followUps: ["Explain OLED display", "Explain RAM", "Search laptops"],
        memory: updatedMemory,
        intent
      };
    }

    // =========================================================================
    // FEATURE 8: SHOPPING ADVICE INTENT
    // Answer shopping questions conversationally.
    // =========================================================================
    if (intent === INTENT_TYPES.SHOPPING_ADVICE) {
      if (lowerQuery.includes('processor') || lowerQuery.includes('snapdragon') || lowerQuery.includes('mediatek')) {
        return {
          text: `**Snapdragon vs. MediaTek Processors for Gaming:**\n\n• **Qualcomm Snapdragon**: Renowned for superior Adreno GPU efficiency, thermal stability during sustained gaming sessions, and excellent developer optimization for mobile games.\n• **MediaTek Dimensity**: Offers extraordinary multi-core raw performance and high power efficiency at lower price points.\n\n**Verdict**: Snapdragon is slightly favored for sustained high-FPS mobile gaming stability, while MediaTek Dimensity offers unbeatable value in mid-range smartphones.`,
          products: [],
          followUps: ["Show Snapdragon phones", "Show MediaTek phones", "Gaming phones under ₹25,000"],
          memory: updatedMemory,
          intent
        };
      }

      if (lowerQuery.includes('ips') && lowerQuery.includes('oled')) {
        return {
          text: `**IPS vs. OLED Displays:**\n\n• **IPS LCD**: Consistent color accuracy, no burn-in risk, brighter in direct outdoor sunlight, and more affordable.\n• **OLED**: Perfect pitch black levels, vibrant contrast, faster pixel response time, but carries a small risk of burn-in if static images stay on for long periods.\n\n**Recommendation**: Choose IPS for long productivity sessions/work. Choose OLED for immersive movie watching and high-contrast gaming.`,
          products: [],
          followUps: ["Show OLED laptops", "Show IPS gaming laptops"],
          memory: updatedMemory,
          intent
        };
      }

      return {
        text: `**Shopping Expert Advice:**\n\nWhen buying tech hardware in 2026, prioritize:\n1. At least **16GB RAM** for laptops or **8GB RAM** for smartphones.\n2. **SSD storage** over traditional hard drives.\n3. Efficient high-refresh-rate displays for smooth visual output.`,
        products: [],
        followUps: ["Find 16GB laptops", "Find smartphones"],
        memory: updatedMemory,
        intent
      };
    }

    // =========================================================================
    // FEATURE 7, 8, 9, 11, 12: CART / WISHLIST / ORDERS INTENT
    // =========================================================================
    if (intent === INTENT_TYPES.CART || intent === INTENT_TYPES.WISHLIST || intent === INTENT_TYPES.ORDER_TRACKING) {
      const cartItems = userState.cart?.items || [];
      const wishlistItems = userState.wishlist?.products || [];
      const orders = userState.orders?.orders || [];

      if (intent === INTENT_TYPES.CART) {
        if (cartItems.length === 0) {
          return {
            text: `Your shopping cart is currently empty 🛒\n\nWould you like me to recommend top-rated products available in our shop?`,
            products: [],
            followUps: ["Show gaming laptops", "Smartphones under ₹20,000", "Browse Shop"],
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
    // FEATURE 6 & 14: PRODUCT COMPARISON INTENT
    // =========================================================================
    if (intent === INTENT_TYPES.PRODUCT_COMPARISON) {
      let allProducts = [];
      try {
        const res = await api.get('/products');
        allProducts = res.data || [];
      } catch (err) {
        console.warn('Catalog fetch failed for comparison:', err);
      }

      // Check if user said "compare the first two" or "compare previous"
      let itemsToCompare = [];
      if (lowerQuery.includes('first two') || lowerQuery.includes('compare these') || lowerQuery.includes('compare previous')) {
        itemsToCompare = (updatedMemory.lastProducts || []).slice(0, 2);
      }

      if (itemsToCompare.length < 2) {
        itemsToCompare = filterProductsForComparison(allProducts, query, updatedMemory);
      }

      if (itemsToCompare.length < 2 && allProducts.length >= 2) {
        itemsToCompare = allProducts.slice(0, 2);
      }

      const p1 = itemsToCompare[0] || { name: 'Option 1', price: 25000, category: 'Electronics' };
      const p2 = itemsToCompare[1] || { name: 'Option 2', price: 30000, category: 'Electronics' };

      const structuredComparison = `**Product Comparison: ${p1.name} vs. ${p2.name}**\n\n` +
        `• **Price**: ${p1.name} (${formatINR(p1.price)}) vs ${p2.name} (${formatINR(p2.price)})\n` +
        `• **Display**: ${p1.name} (Full HD High Refresh Rate) vs ${p2.name} (High Contrast Display)\n` +
        `• **Battery**: ${p1.name} (All-day battery efficiency) vs ${p2.name} (Fast charging support)\n` +
        `• **Camera / Specs**: ${p1.name} (${p1.category} Specs) vs ${p2.name} (${p2.category} Specs)\n` +
        `• **Processor**: ${p1.name} (Optimized performance) vs ${p2.name} (High-speed multi-tasking)\n\n` +
        `**Pros & Cons:**\n` +
        `✔ **${p1.name}**: ${p1.price < p2.price ? 'More affordable price point' : 'Superior build quality and rating'}\n` +
        `✖ **${p1.name}**: Higher weight package\n` +
        `✔ **${p2.name}**: ${p2.price < p1.price ? 'Lower initial budget impact' : 'Higher overall user rating'}\n` +
        `✖ **${p2.name}**: Premium cost factor\n\n` +
        `**Recommendation**: If you prefer better budget efficiency, choose **${p1.price <= p2.price ? p1.name : p2.name}**. For maximum feature performance, select **${p1.price > p2.price ? p1.name : p2.name}**.`;

      return {
        text: structuredComparison,
        products: itemsToCompare,
        followUps: [`Add ${p1.name} to Cart`, `Add ${p2.name} to Cart`, "Show cheaper options"],
        memory: { ...updatedMemory, lastProducts: itemsToCompare },
        intent
      };
    }

    // =========================================================================
    // FEATURE 3 & 4: STRUCTURED PRODUCT SEARCH & ZERO HALLUCINATION
    // =========================================================================
    if (intent === INTENT_TYPES.PRODUCT_SEARCH) {

      // Handle ambiguous request follow-up prompt
      if (isAmbiguousShopping && !updatedMemory.budget && !updatedMemory.brand && !updatedMemory.purpose) {
        const itemType = updatedMemory.subject || 'product';
        return {
          text: `Sure! I'd be happy to help you find the perfect ${itemType}.\n\nCould you specify:\n• your preferred budget?\n• brand preference (e.g. ASUS, Apple, Samsung, Dell)?\n• primary use (gaming, coding, office work, daily use)?`,
          products: [],
          followUps: [
            `Gaming ${itemType} (under ₹70,000)`,
            `Office & Coding ${itemType} (under ₹50,000)`,
            `Everyday ${itemType} (under ₹25,000)`
          ],
          memory: updatedMemory,
          intent
        };
      }

      // Fetch MongoDB Catalog
      let allProducts = [];
      try {
        const res = await api.get('/products');
        allProducts = res.data || [];
      } catch (err) {
        console.warn('Catalog fetch failed:', err);
      }

      // Strict Filter MongoDB Catalog using extracted parameters
      const { matchedProducts, missingCriteria } = filterCatalogProducts(allProducts, query, updatedMemory);

      // FEATURE 4: ZERO HALLUCINATION PRODUCT SEARCH
      // If NO products match all requirements, return structured refusal. NEVER INVENT PRODUCTS!
      if (matchedProducts.length === 0) {
        const missingList = missingCriteria.length > 0
          ? missingCriteria.map(c => `✓ ${c}`).join('\n')
          : `✓ ${updatedMemory.brand || 'Specified Brand'}\n✓ ${updatedMemory.budget ? formatINR(updatedMemory.budget) : 'Price Target'}\n✓ Specified Specifications`;

        const refusalText = `I'm sorry, I searched our current catalog but couldn't find a product matching:\n\n${missingList}\n\nWould you like me to:\n\n• remove the processor/brand requirement\n• increase your budget limit\n• show similar ${updatedMemory.subject || 'products'} available in stock\n• notify you when matching products become available?`;

        return {
          text: refusalText,
          products: getPopularCategoryFallback(allProducts, updatedMemory.category),
          followUps: [
            "Increase budget",
            "Remove brand filter",
            `Show available ${updatedMemory.subject || 'items'}`
          ],
          memory: updatedMemory,
          intent
        };
      }

      // Products exist! Ask Gemini for natural explanation of WHY each product matches.
      let reasoningText = `Matches your specified ${updatedMemory.brand ? `${updatedMemory.brand} brand, ` : ''}${updatedMemory.budget ? `budget under ${formatINR(updatedMemory.budget)}, ` : ''}and performance requirements.`;
      try {
        const prompt = `User asked: "${query}". Explain in 2 concise bullet sentences why these matching products are ideal: ${matchedProducts.slice(0, 3).map(p => p.name).join(', ')}.`;
        const geminiRes = await api.post('/ai/test', { prompt });
        if (geminiRes.data?.response) {
          reasoningText = geminiRes.data.response;
        }
      } catch {
        // Fallback to local reasoning
      }

      return {
        text: `Here are the top matches available in our NexaCart catalog for **"${query}"**:`,
        reasoning: reasoningText,
        products: matchedProducts.slice(0, 5),
        followUps: ["Compare the first two", "Show cheaper options", "Check specs"],
        memory: { ...updatedMemory, lastProducts: matchedProducts.slice(0, 5) },
        intent
      };
    }

  } catch (err) {
    console.error('Conversation Engine Error:', err);
    // FEATURE 23: FRIENDLY ERROR HANDLING
    return {
      text: "I'm having trouble connecting right now. Please try again in a moment.",
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
    followUps: ["Recommend laptops", "Compare products", "Check budget"],
    memory: updatedMemory,
    intent
  };
};

/**
 * Filter catalog products strictly and track missing criteria for Zero Hallucination check
 */
const filterCatalogProducts = (products = [], query = '', memory = {}) => {
  const lower = query.toLowerCase();

  const missingCriteria = [];

  const matched = products.filter(p => {
    const pName = p.name.toLowerCase();
    const pDesc = (p.description || '').toLowerCase();
    const pCat = (p.category || '').toLowerCase();

    // 1. Budget constraint
    if (memory.budget && p.price > memory.budget) {
      if (!missingCriteria.includes(`Budget under ${formatINR(memory.budget)}`)) {
        missingCriteria.push(`Budget under ${formatINR(memory.budget)}`);
      }
      return false;
    }

    // 2. Brand constraint
    if (memory.brand) {
      const brandLower = memory.brand.toLowerCase();
      if (!pName.includes(brandLower) && !pDesc.includes(brandLower)) {
        if (!missingCriteria.includes(`${memory.brand} Brand`)) {
          missingCriteria.push(`${memory.brand} Brand`);
        }
        return false;
      }
    }

    // 3. Category constraint
    if (memory.category && memory.category.toLowerCase() !== 'all') {
      const catLower = memory.category.toLowerCase();
      if (catLower === 'electronics' && (pCat.includes('fashion') || pCat.includes('grocer'))) return false;
      if (catLower === 'groceries' && !pCat.includes('grocer')) return false;
      if (catLower === 'fashion' && !pCat.includes('fashion') && !pName.includes('shoe')) return false;
    }

    // 4. Keyword / Subject constraint
    if (memory.subject) {
      const subLower = memory.subject.toLowerCase();
      if (subLower.includes('laptop') && !pName.includes('laptop') && !pName.includes('macbook')) return false;
      if (subLower.includes('phone') && !pName.includes('phone') && !pName.includes('mobile') && !pName.includes('iphone') && !pName.includes('samsung')) return false;
    }

    // 5. Query matching check
    const queryTokens = lower.split(/\s+/).filter(t => t.length > 3 && !['under', 'with', 'need', 'show', 'only', 'from', 'this', 'that', 'have'].includes(t));
    if (queryTokens.length > 0) {
      const tokenMatchCount = queryTokens.filter(t => pName.includes(t) || pDesc.includes(t)).length;
      if (tokenMatchCount === 0 && !pName.includes(lower)) return false;
    }

    return true;
  }).sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return {
    matchedProducts: matched,
    missingCriteria: Array.from(new Set(missingCriteria))
  };
};

const filterProductsForComparison = (products = [], query = '', memory = {}) => {
  const lower = query.toLowerCase();
  const matched = products.filter(p => {
    const nameLower = p.name.toLowerCase();
    return lower.includes(nameLower) || nameLower.split(' ').some(w => w.length > 3 && lower.includes(w));
  });

  if (matched.length >= 2) return matched.slice(0, 4);

  // Return top products from memory category or all
  const cat = memory.category || 'Electronics';
  return products.filter(p => p.category === cat).slice(0, 2);
};

const getPopularCategoryFallback = (products = [], category = '') => {
  if (category) {
    const items = products.filter(p => p.category === category);
    if (items.length > 0) return items.slice(0, 3);
  }
  return products.slice(0, 3);
};
