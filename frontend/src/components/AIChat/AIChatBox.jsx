import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedPrompts from './SuggestedPrompts';
import { Sparkles, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AIChatBox = ({ onClose, containerHeight = "h-[450px]" }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello 👋\nHow can I help you shop today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const messagesEndRef = useRef(null);

  // Prefetch products for local fallback search if API fails
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get('/products');
        setAllProducts(res.data || []);
      } catch (err) {
        console.warn('Failed to load products for local fallback search', err);
      }
    };
    loadProducts();
  }, []);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Client-side local search fallback logic
  const handleLocalFallback = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // 1. Extract price limits (e.g., "under 60000", "under ₹3000")
    let maxPrice = Infinity;
    const priceMatch = lowerQuery.match(/(?:under|below|less than|max|budget of)\s*₹?\s*(\d+)/i) 
      || lowerQuery.match(/(\d+)\s*(?:budget|price limit|rupees|rs)/i);
    
    if (priceMatch) {
      maxPrice = Number(priceMatch[1]);
    }

    // 2. Map category keywords
    let matchedCategory = '';
    if (lowerQuery.includes('phone') || lowerQuery.includes('mobile') || lowerQuery.includes('iphone') || lowerQuery.includes('samsung')) {
      matchedCategory = 'Electronics';
    } else if (lowerQuery.includes('headphone') || lowerQuery.includes('earbud') || lowerQuery.includes('audio') || lowerQuery.includes('sony') || lowerQuery.includes('music')) {
      matchedCategory = 'Electronics';
    } else if (lowerQuery.includes('laptop') || lowerQuery.includes('macbook') || lowerQuery.includes('computer') || lowerQuery.includes('pc') || lowerQuery.includes('gaming')) {
      matchedCategory = 'Electronics';
    } else if (lowerQuery.includes('avocado') || lowerQuery.includes('grocery') || lowerQuery.includes('groceries') || lowerQuery.includes('food') || lowerQuery.includes('fruit') || lowerQuery.includes('blueberry') || lowerQuery.includes('milk') || lowerQuery.includes('tea')) {
      matchedCategory = 'Groceries';
    } else if (lowerQuery.includes('chair') || lowerQuery.includes('desk') || lowerQuery.includes('lamp') || lowerQuery.includes('water bottle') || lowerQuery.includes('notebook') || lowerQuery.includes('office') || lowerQuery.includes('home')) {
      matchedCategory = 'Home & Office';
    } else if (lowerQuery.includes('sneaker') || lowerQuery.includes('shoe') || lowerQuery.includes('backpack') || lowerQuery.includes('jacket') || lowerQuery.includes('t-shirt') || lowerQuery.includes('fashion') || lowerQuery.includes('clothing') || lowerQuery.includes('wear') || lowerQuery.includes('glass')) {
      matchedCategory = 'Fashion';
    }

    // 3. Filter products
    let matches = matchedCategory
      ? allProducts.filter(p => p.category === matchedCategory && p.price <= maxPrice)
      : allProducts.filter(p => {
          const nameMatch = p.name.toLowerCase().includes(lowerQuery);
          const descMatch = p.description.toLowerCase().includes(lowerQuery);
          return (nameMatch || descMatch) && p.price <= maxPrice;
        });

    // Fallback search to any product below the price limit if no direct matches
    if (matches.length === 0) {
      matches = allProducts.filter(p => p.price <= maxPrice).slice(0, 5);
    }

    // If still empty, get top rated products
    if (matches.length === 0) {
      matches = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 5);
    }

    // Slice to 5 items max
    matches = matches.slice(0, 5);

    return {
      reasoning: `I searched our catalog for items related to "${query}"${maxPrice < Infinity ? ` under ₹${maxPrice}` : ''} and found these options. They offer the best ratings and prices matching your specifications.`,
      recommendations: matches.length > 0 ? `You might also want to search for similar items in the ${matches[0].category} category.` : "Try broad categories like Electronics, Groceries, Home & Office, or Fashion.",
      products: matches
    };
  };

  const handleSendMessage = async (text) => {
    const userMsgId = Date.now().toString();
    const newUserMessage = {
      id: userMsgId,
      sender: 'user',
      text: text
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Call the existing public AI search endpoint
      const res = await api.post('/ai/search', { query: text });
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `Here are the results I found for your request:`,
        reasoning: res.data.reasoning || null,
        recommendations: res.data.recommendations || null,
        products: res.data.products || []
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('AI API Search failure, invoking smart client-side catalog search fallback:', err);
      
      // Call client-side fallback
      const fallbackResult = handleLocalFallback(text);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `Here are matching recommendations from our store catalog:`,
        reasoning: fallbackResult.reasoning,
        recommendations: fallbackResult.recommendations,
        products: fallbackResult.products
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: "Hello 👋\nHow can I help you shop today?"
      }
    ]);
    toast.success('Conversation history cleared!');
  };

  return (
    <div className={`flex flex-col bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-xl w-full ${containerHeight} overflow-hidden transition-all duration-300 relative`}>
      <ChatHeader onClose={onClose} />

      {/* Message List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-gray-50/30">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Suggested Prompts (Only show at the beginning when only the welcome message is present) */}
        {messages.length === 1 && (
          <div className="pl-9 pr-4 py-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <SuggestedPrompts onPromptClick={handleSendMessage} />
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex gap-2.5 items-start w-full">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-green-800 to-emerald-950 text-white flex items-center justify-center text-xs shrink-0 select-none shadow-sm mt-0.5">
              🤖
            </div>
            <div className="bg-white border border-gray-50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-xs text-gray-500 max-w-[80%]">
              <div className="flex items-center gap-1.5 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer controls & Input area */}
      <div className="p-3.5 border-t border-gray-100/80 bg-white/95 rounded-b-3xl space-y-2">
        <div className="flex items-center justify-between text-[9px] text-gray-400 font-bold px-1.5">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-green-500" /> Powered by Gemini AI
          </span>
          {messages.length > 1 && (
            <button 
              onClick={clearChat} 
              className="text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors font-bold uppercase tracking-wider"
              title="Clear chat history"
            >
              <Trash2 className="w-3 h-3" /> Clear Chat
            </button>
          )}
        </div>
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default AIChatBox;
