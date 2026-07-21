import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedPrompts from './SuggestedPrompts';
import { Sparkles, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AIChatBox = ({ onClose, containerHeight = "h-[500px]" }) => {
  const { user } = useSelector((state) => state.auth);
  
  // Extract user's first name if logged in
  const firstName = user?.name ? user.name.trim().split(' ')[0] : null;

  // Build personalized welcome message
  const buildWelcomeMessage = (name) => {
    if (name) {
      return {
        id: 'welcome',
        sender: 'assistant',
        text: `Hello ${name} 👋\n\nI'm NexaCart AI,\nyour personal shopping assistant.\n\nHow can I help you today?\n\nNeed product recommendations,\nshopping advice,\nbudget planning,\nor price comparisons?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUps: ["Gaming laptop", "Compare products", "Gift ideas", "Budget planning"]
      };
    }
    return {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello 👋\n\nI'm NexaCart AI.\n\nHow can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      followUps: ["Shopping advice", "Product recommendations", "Price comparisons", "Budgeting"]
    };
  };

  const [messages, setMessages] = useState([buildWelcomeMessage(firstName)]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  
  // Session memory for conversational context
  const [contextMemory, setContextMemory] = useState({
    subject: '',       // e.g. "gaming laptop", "smartphone", "gift"
    budget: null,      // e.g. 70000
    category: '',      // e.g. "Electronics"
    lastQuery: ''      // last user query
  });

  const chatContainerRef = useRef(null);

// Derive display messages so welcome message updates dynamically without useEffect setState
  const displayMessages = messages.map(msg => {
    if (msg.id === 'welcome') {
      return buildWelcomeMessage(firstName);
    }
    return msg;
  });

  // Prefetch products for local search & fallback reasoning
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get('/products');
        setAllProducts(res.data || []);
      } catch (err) {
        console.warn('Failed to load products for local catalog search', err);
      }
    };
    loadProducts();
  }, []);

  // Internal Container Scroll Only — DOES NOT scroll the browser window/page
  const scrollToBottomInternal = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottomInternal();
  }, [messages, isLoading]);

  // Comprehensive Local Natural Language Processing & Fallback Engine
  const generateConversationalResponse = (queryText, currentMemory) => {
    const lower = queryText.toLowerCase().trim();
    let updatedMemory = { ...currentMemory, lastQuery: queryText };

    // 1. GREETINGS
    if (/^(hi|hello|hey|good morning|good afternoon|good evening|greetings|namaste)\b/i.test(lower)) {
      const greetingName = firstName ? ` ${firstName}` : '';
      return {
        text: `Hello${greetingName}! 👋 Great to chat with you.\n\nI'm ready to assist you with:\n• Finding top-rated products\n• Product comparisons\n• Budget-friendly shopping bundles\n• Technical specification advice\n\nWhat are you looking to buy today?`,
        followUps: ["I'm buying a laptop", "I need a gift", "Compare iPhone vs Samsung", "Set a budget"],
        memory: updatedMemory
      };
    }

    // 2. UNRELATED / NON-SHOPPING QUESTIONS
    const nonShoppingKeywords = ['weather', 'who won', 'president', 'prime minister', 'capital of', 'recipe', 'poem', 'write code', 'python script', 'math', 'calculate 2+2'];
    const isNonShopping = nonShoppingKeywords.some(k => lower.includes(k)) && 
                          !lower.includes('laptop') && !lower.includes('phone') && !lower.includes('buy') && !lower.includes('shop') && !lower.includes('product');
    
    if (isNonShopping) {
      return {
        text: `I'm designed to help you with shopping, product recommendations, comparisons, budgeting and product information.\n\nI'll do my best to answer general questions too.\n\nIf you have any shopping or product needs, feel free to ask anytime!`,
        followUps: ["Recommend laptops", "Show top electronics", "Browse groceries"],
        memory: updatedMemory
      };
    }

    // 3. EXTRACT BUDGET
    const budgetMatch = lower.match(/(?:under|below|less than|max|budget of|budget is|around)\s*₹?\s*(\d+)/i) 
      || lower.match(/(\d+)\s*(?:k|thousand|rupees|rs|budget)/i);
    
    if (budgetMatch) {
      let extracted = Number(budgetMatch[1]);
      if (lower.includes('k') && extracted < 1000) extracted *= 1000;
      updatedMemory.budget = extracted;
    }

    // 4. EXTRACT SUBJECT / CATEGORY
    if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('computer') || lower.includes('pc')) {
      updatedMemory.subject = lower.includes('gaming') ? 'gaming laptop' : 'laptop';
      updatedMemory.category = 'Electronics';
    } else if (lower.includes('phone') || lower.includes('mobile') || lower.includes('iphone') || lower.includes('samsung')) {
      updatedMemory.subject = 'smartphone';
      updatedMemory.category = 'Electronics';
    } else if (lower.includes('gift') || lower.includes('parents') || lower.includes('friend')) {
      updatedMemory.subject = 'gift items';
    } else if (lower.includes('grocer') || lower.includes('food')) {
      updatedMemory.category = 'Groceries';
    } else if (lower.includes('fashion') || lower.includes('shoe') || lower.includes('wear') || lower.includes('cloth')) {
      updatedMemory.category = 'Fashion';
    }

    // 5. TECHNICAL SPEC EXPLANATIONS (e.g., "Can you explain OLED?", "What is refresh rate?")
    if (lower.includes('explain') || lower.includes('what is') || lower.includes('tell me about')) {
      if (lower.includes('oled') || lower.includes('display') || lower.includes('screen')) {
        return {
          text: `**OLED (Organic Light-Emitting Diode) Display Technology**\n\nOLED panels feature self-lit pixels that produce perfect true blacks and infinite contrast ratios.\n\nReason:\n✔ True pitch blacks & infinite contrast\n✔ Ultra-fast pixel response times (ideal for gaming)\n✔ Vibrant color accuracy and high brightness\n\nCons:\n✖ Slightly higher power consumption on full white screens\n✖ Premium price point\n\nWould you like me to recommend laptops or smartphones with OLED screens?`,
          followUps: ["Show OLED laptops", "Show OLED phones", "Compare LED vs OLED"],
          memory: updatedMemory
        };
      }
    }

    // 6. AMBIGUOUS / UNDERSPECIFIED SHOPPING REQUESTS (PART 7)
    if (lower === "i'm buying a laptop" || lower === "i need a laptop" || lower === "what should i buy?" || lower === "i'm confused" || lower === "i don't know what to buy") {
      return {
        text: `I'd love to help you find the perfect choice!\n\nTo narrow down the best recommendations, could you tell me:\n\n1. What will you mainly use it for?\n   • Gaming\n   • Programming\n   • College / Studies\n   • Office & Productivity\n   • Video / Photo Editing\n\n2. What is your approximate budget?`,
        followUps: ["Gaming (under ₹70,000)", "College & Office (under ₹50,000)", "Programming (under ₹80,000)"],
        memory: updatedMemory
      };
    }

    // 7. COMPARISONS (PART 3 & 4)
    if (lower.includes('compare') || lower.includes('vs') || lower.includes('difference')) {
      const subjectDesc = updatedMemory.subject ? `${updatedMemory.subject}s` : 'products';
      const budgetDesc = updatedMemory.budget ? ` under ₹${updatedMemory.budget.toLocaleString()}` : '';

      // Filter matched products for comparison
      let matchedProds = allProducts.filter(p => {
        if (updatedMemory.category && p.category !== updatedMemory.category) return false;
        if (updatedMemory.budget && p.price > updatedMemory.budget) return false;
        return true;
      }).slice(0, 4);

      if (matchedProds.length === 0) matchedProds = allProducts.slice(0, 3);

      return {
        text: `**Comparison Overview for ${subjectDesc}${budgetDesc}:**\n\n• **Performance & Specs**: Models in this segment feature powerful processors, fast SSD storage, and crisp displays.\n• **Value for Money**: We recommend comparing build quality, battery life, and warranty coverage.\n\nReason:\n✔ Selected options fit your specified constraints\n✔ High customer ratings & verified reviews\n\nWould you like detailed side-by-side specs for any of these items?`,
        reasoning: `Matched ${matchedProds.length} top candidates fitting your request.`,
        recommendations: "Click any product card below to inspect full specs or add to your shopping cart.",
        products: matchedProds,
        followUps: ["Show specs", "Find cheaper alternatives", "Check customer ratings"],
        memory: updatedMemory
      };
    }

    // 8. GENERAL PRODUCT RECOMMENDATION / SEARCH FALLBACK
    let targetCategory = updatedMemory.category;
    let targetPrice = updatedMemory.budget || Infinity;

    let matched = allProducts.filter(p => {
      const catOk = !targetCategory || p.category === targetCategory;
      const priceOk = p.price <= targetPrice;
      const nameMatch = p.name.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower);
      return (catOk || nameMatch) && priceOk;
    });

    if (matched.length === 0 && targetPrice < Infinity) {
      matched = allProducts.filter(p => p.price <= targetPrice);
    }
    if (matched.length === 0) {
      matched = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 5);
    } else {
      matched = matched.slice(0, 5);
    }

    const priceText = targetPrice < Infinity ? ` under ₹${targetPrice.toLocaleString()}` : '';
    const subjectText = updatedMemory.subject || queryText;

    return {
      text: `Based on your request for **"${subjectText}"**${priceText}, here are top recommendations tailored for you:\n\nReason:\n✔ Top customer ratings & reliable performance\n✔ High build quality & verified seller warranty\n✔ Excellent price-to-performance ratio\n\nWould you like me to compare these options or look for alternative models?`,
      reasoning: `Analyzed catalog items for "${queryText}" matching rating, category, and budget criteria.`,
      recommendations: "You can add items directly to your cart or save them to your wishlist.",
      products: matched,
      followUps: ["Compare these models", "Show cheaper options", "Refine budget"],
      memory: updatedMemory
    };
  };

  const handleSendMessage = async (text) => {
    const userMsgId = Date.now().toString();
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMessage = {
      id: userMsgId,
      sender: 'user',
      text: text,
      timestamp: userTimestamp
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Build rich query string including conversational memory context
      let contextualQuery = text;
      if (contextMemory.subject || contextMemory.budget) {
        const memContext = [
          contextMemory.subject ? `Subject: ${contextMemory.subject}` : '',
          contextMemory.budget ? `Budget limit: ₹${contextMemory.budget}` : '',
          contextMemory.lastQuery ? `Previous request: ${contextMemory.lastQuery}` : ''
        ].filter(Boolean).join('; ');
        
        contextualQuery = `[Context: ${memContext}]. User current request: "${text}"`;
      }

      // Call existing public Gemini AI search endpoint
      const res = await api.post('/ai/search', { query: contextualQuery });

      // Generate conversational structure combining Gemini response with natural formatting
      const fallbackEngine = generateConversationalResponse(text, contextMemory);
      setContextMemory(fallbackEngine.memory);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: fallbackEngine.text || `Here are the top results I found for your request:`,
        reasoning: res.data?.reasoning || fallbackEngine.reasoning,
        recommendations: res.data?.recommendations || fallbackEngine.recommendations,
        products: (res.data?.products && res.data.products.length > 0) ? res.data.products : fallbackEngine.products,
        followUps: fallbackEngine.followUps,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('AI API Search failure, invoking smart client-side catalog search fallback:', err);
      
      const fallbackResult = generateConversationalResponse(text, contextMemory);
      setContextMemory(fallbackResult.memory);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: fallbackResult.text,
        reasoning: fallbackResult.reasoning,
        recommendations: fallbackResult.recommendations,
        products: fallbackResult.products,
        followUps: fallbackResult.followUps,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([buildWelcomeMessage(firstName)]);
    setContextMemory({
      subject: '',
      budget: null,
      category: '',
      lastQuery: ''
    });
    toast.success('Conversation history cleared!');
  };

  return (
    <div className={`flex flex-col bg-neutral-900/90 backdrop-blur-2xl border border-emerald-900/40 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)] w-full ${containerHeight} overflow-hidden transition-all duration-500 relative`}>
      {/* Header */}
      <ChatHeader onClose={onClose} onClearChat={clearChat} hasMessages={messages.length > 1} />

      {/* Internal Scrollable Message Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-gradient-to-b from-gray-900/30 to-black/40 scrollbar-thin scrollbar-thumb-emerald-900/50 scrollbar-track-transparent"
      >
        {displayMessages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} onFollowUpClick={handleSendMessage} />
        ))}

        {/* Suggested Starter Chips (Show when only welcome message exists) */}
        {messages.length === 1 && (
          <div className="pl-9 pr-2 py-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <SuggestedPrompts onPromptClick={handleSendMessage} />
          </div>
        )}

        {/* Animated Typing Indicator */}
        {isLoading && (
          <div className="flex gap-2.5 items-start w-full animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-700 to-green-600 text-white flex items-center justify-center text-xs shrink-0 select-none shadow-md border border-emerald-400/20 mt-0.5">
              🤖
            </div>
            <div className="bg-white/95 border border-emerald-900/10 rounded-2xl rounded-tl-none px-4 py-3 shadow-md text-xs text-gray-700 max-w-[80%] flex items-center gap-2">
              <span className="font-semibold text-emerald-800 text-[11px]">NexaCart AI is thinking</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer input area */}
      <div className="p-3 border-t border-white/10 bg-neutral-950/80 backdrop-blur-md rounded-b-[2rem] space-y-2 shrink-0">
        <div className="flex items-center justify-between text-[9px] text-gray-400 font-extrabold px-2">
          <span className="flex items-center gap-1 text-emerald-400">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Powered by Gemini AI
          </span>
          {messages.length > 1 && (
            <button 
              onClick={clearChat} 
              className="text-gray-400 hover:text-rose-400 flex items-center gap-1 transition-colors font-bold uppercase tracking-wider text-[8px]"
              title="Reset conversation"
            >
              <Trash2 className="w-3 h-3" /> Clear History
            </button>
          )}
        </div>
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default AIChatBox;
