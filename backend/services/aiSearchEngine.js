const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Format numerical amount into Indian Rupee format (INR)
 */
const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

/**
 * Extract structured search requirements from user query & conversation history
 */
const extractRequirementsWithGemini = async (userMessage, history = [], activeContext = {}) => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Default structured requirement template
  const defaultRequirements = {
    category: activeContext.category || null,
    brand: activeContext.brand || null,
    minPrice: activeContext.minPrice ?? null,
    maxPrice: activeContext.maxPrice ?? null,
    ram: activeContext.ram || null,
    storage: activeContext.storage || null,
    display: activeContext.display || null,
    processor: activeContext.processor || null,
    intent: 'search'
  };

  const lowerMessage = userMessage.toLowerCase();

  // Price range extraction (e.g. "between 500 and 700", "500 to 700", "under 20000")
  const rangeMatch = lowerMessage.match(/(?:between|from)?\s*₹?\s*(\d[\d,.]*k?)\s*(?:and|to|-|–)\s*₹?\s*(\d[\d,.]*k?)/i);
  if (rangeMatch) {
    const parseVal = (str) => {
      const s = str.trim().toLowerCase();
      if (s.endsWith('k')) return Math.round(parseFloat(s) * 1000);
      return parseInt(s.replace(/,/g, ''), 10);
    };
    const v1 = parseVal(rangeMatch[1]);
    const v2 = parseVal(rangeMatch[2]);
    if (!isNaN(v1) && !isNaN(v2)) {
      defaultRequirements.minPrice = Math.min(v1, v2);
      defaultRequirements.maxPrice = Math.max(v1, v2);
    }
  } else {
    const maxMatch = lowerMessage.match(/(?:under|below|less than|max|up to|budget of|budget is|only under)\s*₹?\s*(\d[\d,.]*k?)/i);
    if (maxMatch) {
      const s = maxMatch[1].trim().toLowerCase();
      const val = s.endsWith('k') ? Math.round(parseFloat(s) * 1000) : parseInt(s.replace(/,/g, ''), 10);
      if (!isNaN(val)) {
        defaultRequirements.minPrice = null;
        defaultRequirements.maxPrice = val;
      }
    }
  }

  // Category detection
  const commonCategories = ['headphones', 'laptops', 'phones', 'books', 'shoes', 'toys', 'watches', 'perfumes', 'bags', 'cameras', 'instruments', 'groceries'];
  let detectedCat = null;
  for (const cat of commonCategories) {
    if (lowerMessage.includes(cat)) {
      if (cat === 'laptops') detectedCat = 'Laptops';
      else if (cat === 'phones') detectedCat = 'Mobile Phones';
      else if (cat === 'headphones') detectedCat = 'Headphones & Audio';
      else if (cat === 'groceries') detectedCat = 'Groceries & Pantry';
      else detectedCat = cat.charAt(0).toUpperCase() + cat.slice(1);
      break;
    }
  }

  if (detectedCat) {
    defaultRequirements.category = detectedCat;
  } else if (lowerMessage.includes('phone') || lowerMessage.includes('mobile') || lowerMessage.includes('smartphone') || lowerMessage.includes('iphone')) {
    defaultRequirements.category = 'Mobile Phones';
  } else if (lowerMessage.includes('laptop') || lowerMessage.includes('macbook') || lowerMessage.includes('notebook')) {
    defaultRequirements.category = 'Laptops';
  } else if (lowerMessage.includes('headphone') || lowerMessage.includes('earbud') || lowerMessage.includes('audio')) {
    defaultRequirements.category = 'Headphones & Audio';
  } else if (lowerMessage.includes('shoe') || lowerMessage.includes('sneaker') || lowerMessage.includes('jacket') || lowerMessage.includes('fashion') || lowerMessage.includes('apparel')) {
    defaultRequirements.category = 'Fashion & Apparel';
  } else if (lowerMessage.includes('grocer') || lowerMessage.includes('food') || lowerMessage.includes('fruit') || lowerMessage.includes('grocery') || lowerMessage.includes('groceries')) {
    defaultRequirements.category = 'Groceries & Pantry';
  } else {
    // Dynamic noun extraction (e.g. "books", "toys")
    const match = lowerMessage.match(/(?:buy|show|find|recommend|get|want|search for|look for|browse)\s+(?:me\s+)?(?:some\s+)?([a-zA-Z]+s?\b)/i);
    if (match) {
      const extracted = match[1];
      const stopWords = ['something', 'item', 'product', 'deal', 'offer', 'anything', 'one', 'some', 'cheap', 'best', 'good', 'rupee', 'rupees', 'rs'];
      if (!stopWords.includes(extracted)) {
        defaultRequirements.category = extracted.charAt(0).toUpperCase() + extracted.slice(1);
      }
    }
  }

  // Display detection
  if (lowerMessage.includes('amoled')) defaultRequirements.display = 'AMOLED';
  else if (lowerMessage.includes('oled')) defaultRequirements.display = 'OLED';

  // RAM detection
  const ramMatch = lowerMessage.match(/\b(4|6|8|12|16|32)\s*gb\b/i);
  if (ramMatch && !lowerMessage.includes('storage')) {
    defaultRequirements.ram = `${ramMatch[1]}GB`;
  }

  // Storage detection
  const storageMatch = lowerMessage.match(/\b(64|128|256|512|1tb)\s*gb\b/i);
  if (storageMatch && defaultRequirements.ram !== `${storageMatch[1]}GB`) {
    defaultRequirements.storage = `${storageMatch[1]}GB`;
  }

  // Brand detection
  const knownBrands = ['samsung', 'apple', 'sony', 'realme', 'poco', 'oneplus', 'xiaomi', 'redmi', 'asus', 'dell', 'hp', 'lenovo', 'acer'];
  for (const b of knownBrands) {
    if (lowerMessage.includes(b)) {
      defaultRequirements.brand = b.toUpperCase();
      break;
    }
  }

  if (!apiKey || apiKey === 'your_gemini_api_key' || apiKey.trim() === '') {
    return defaultRequirements;
  }

  try {
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash', generationConfig: { responseMimeType: 'application/json' } });

    const prompt = `You are a shopping copilot requirement extractor.
    Current conversation history: ${JSON.stringify(history)}
    Active context: ${JSON.stringify(activeContext)}
    New user message: "${userMessage}"

    Extract the latest active product requirements as JSON:
    {
      "category": "Mobile Phones" | "Laptops" | "Headphones & Audio" | "Fashion & Apparel" | "Groceries & Pantry" | "Books" | "Shoes" | "Toys" | "Watches" | null,
      "brand": "SAMSUNG" | "APPLE" | "SONY" | "REALME" | "DELL" | null,
      "minPrice": number or null,
      "maxPrice": number or null,
      "ram": "8GB" or null,
      "storage": "256GB" or null,
      "display": "AMOLED" | "OLED" | null,
      "processor": "MediaTek" | "Snapdragon" | "Intel" | null,
      "intent": "search" | "refine" | "cart" | "question"
    }

    Rules:
    - If user provides new price bounds (e.g. "between 500 and 700" or "under 30000"), update minPrice and maxPrice.
    - If user updates brand or category or RAM, update them.
    - Maintain existing context unless user explicitly changes it or switches category.`;

    const res = await model.generateContent(prompt);
    const jsonText = res.response.text().trim();
    const parsed = JSON.parse(jsonText);
    return { ...defaultRequirements, ...parsed };
  } catch (err) {
    console.warn('Gemini requirement extraction fallback used:', err.message);
    return defaultRequirements;
  }
};

/**
 * Filter product catalog strictly against extracted requirements (Source of Truth)
 */
const filterProductsStrictly = (products = [], requirements = {}) => {
  return products.filter(product => {
    const pName = (product.name || '').toLowerCase();
    const pDesc = (product.description || '').toLowerCase();
    const pCat = (product.category || '').toLowerCase();

    // 1. Category check
    if (requirements.category) {
      const targetCat = requirements.category.toLowerCase();
      if (targetCat === 'mobile phones' || targetCat === 'mobiles' || targetCat === 'mobile' || targetCat === 'phone' || targetCat === 'phones') {
        const isPhone = pCat.includes('mobile') || pCat.includes('phone') || pName.includes('phone') || pName.includes('mobile') || pName.includes('iphone') || pName.includes('galaxy') || pName.includes('5g');
        const isForbidden = pName.includes('laptop') || pName.includes('headphone') || pName.includes('macbook');
        if (!isPhone || isForbidden) return false;
      } else if (targetCat === 'laptops' || targetCat === 'laptop') {
        if (!pName.includes('laptop') && !pName.includes('macbook')) return false;
      } else if (targetCat === 'headphones & audio' || targetCat === 'headphones' || targetCat === 'headphone') {
        if (!pName.includes('headphone') && !pName.includes('earbud') && !pName.includes('audio')) return false;
      } else if (targetCat === 'groceries & pantry' || targetCat === 'groceries' || targetCat === 'grocery') {
        if (!pCat.includes('grocer') && !pName.includes('avocado') && !pName.includes('food')) return false;
      } else if (targetCat === 'fashion & apparel' || targetCat === 'fashion' || targetCat === 'shoes' || targetCat === 'shoe' || targetCat === 'sneaker') {
        if (!pCat.includes('fashion') && !pName.includes('shoe') && !pName.includes('sneaker') && !pName.includes('shirt') && !pName.includes('t-shirt')) return false;
      } else {
        // Dynamic matches
        if (!pCat.includes(targetCat) && !pName.includes(targetCat) && !pDesc.includes(targetCat)) return false;
      }
    }

    // 2. Numeric Price Bounds (STRICT)
    if (requirements.minPrice !== null && requirements.minPrice !== undefined && product.price < requirements.minPrice) {
      return false;
    }
    if (requirements.maxPrice !== null && requirements.maxPrice !== undefined && product.price > requirements.maxPrice) {
      return false;
    }

    // 3. Brand check
    if (requirements.brand) {
      const bLower = requirements.brand.toLowerCase();
      if (!pName.includes(bLower) && !pDesc.includes(bLower)) return false;
    }

    // 4. Display check
    if (requirements.display) {
      const dLower = requirements.display.toLowerCase();
      if (!pName.includes(dLower) && !pDesc.includes(dLower)) return false;
    }

    // 5. RAM check
    if (requirements.ram) {
      const ramNum = requirements.ram.replace(/gb/gi, '');
      const ramPattern = new RegExp(`\\b${ramNum}\\s*gb\\b`, 'i');
      if (!ramPattern.test(pName) && !ramPattern.test(pDesc)) return false;
    }

    // 6. Storage check
    if (requirements.storage) {
      const sVal = requirements.storage.toLowerCase();
      if (!pName.includes(sVal) && !pDesc.includes(sVal)) return false;
    }

    // 7. Processor check
    if (requirements.processor) {
      const pProc = requirements.processor.toLowerCase();
      if (!pName.includes(pProc) && !pDesc.includes(pProc)) return false;
    }

    return true;
  });
};

/**
 * Generate natural language AI response strictly using validated products
 */
const generateResponseFromProducts = async (requirements, verifiedProducts = [], userMessage = '') => {
  if (verifiedProducts.length === 0) {
    const missingSpecs = [];
    if (requirements.ram) missingSpecs.push(`${requirements.ram} RAM`);
    if (requirements.storage) missingSpecs.push(`${requirements.storage} Storage`);
    if (requirements.display) missingSpecs.push(`${requirements.display} Display`);
    if (requirements.brand) missingSpecs.push(`${requirements.brand} Brand`);
    if (requirements.minPrice !== null && requirements.minPrice !== undefined && requirements.maxPrice !== null && requirements.maxPrice !== undefined) {
      missingSpecs.push(`Price between ${formatINR(requirements.minPrice)} and ${formatINR(requirements.maxPrice)}`);
    } else if (requirements.maxPrice !== null && requirements.maxPrice !== undefined) {
      missingSpecs.push(`Price under ${formatINR(requirements.maxPrice)}`);
    } else if (requirements.minPrice !== null && requirements.minPrice !== undefined) {
      missingSpecs.push(`Price above ${formatINR(requirements.minPrice)}`);
    }

    const categoryText = requirements.category ? requirements.category.toLowerCase() : 'product';
    const missingList = missingSpecs.length > 0 ? missingSpecs.map(s => `• ${s}`).join('\n') : '• Selected specifications';

    return {
      text: `I couldn't find a ${categoryText} matching all those requirements in our catalog:\n\n${missingList}\n\nWould you like me to relax one of the specifications?`,
      products: [],
      reasoning: 'No catalog item meets 100% of the active filter boundaries.'
    };
  }

  const topMatches = verifiedProducts.slice(0, 3);
  const bestMatch = topMatches[0];
  const altMatch = topMatches[1];
  const budgetMatch = topMatches[2];

  let text = `I found ${verifiedProducts.length} product(s) matching your exact requirements.\n\n` +
    `**Best Match:**\n${bestMatch.name} (${formatINR(bestMatch.price)}) - Rating: ${bestMatch.rating}⭐.`;

  if (altMatch) {
    text += `\n\n**Alternative:**\n${altMatch.name} (${formatINR(altMatch.price)}) - Rating: ${altMatch.rating}⭐.`;
  }
  if (budgetMatch) {
    text += `\n\n**Budget Pick:**\n${budgetMatch.name} (${formatINR(budgetMatch.price)}) - Rating: ${budgetMatch.rating}⭐.`;
  }

  return {
    text,
    products: topMatches,
    reasoning: `Selected ${topMatches.length} product(s) directly from catalog satisfying price bounds and technical specs.`
  };
};

module.exports = {
  extractRequirementsWithGemini,
  filterProductsStrictly,
  generateResponseFromProducts
};
