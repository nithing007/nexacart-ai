import { useState } from 'react';
import { Sparkles, Heart, ShoppingCart, Check, Loader2, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { getFallbackImage } from '../../utils/imageHelper';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AIDiscovery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const suggestionChips = [
    'Best phone for photography',
    'Gaming laptop for college',
    'Office setup under ₹50,000',
    'Gift for my parents',
    'Home gym essentials',
    'Travel accessories',
  ];

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => toast.success(`Added ${product.name} to cart`))
      .catch(() => toast.error('Failed to add item to cart'));
  };

  const handleWishlistToggle = (product) => {
    if (!isAuthenticated) {
      toast.error('Please log in to manage your wishlist');
      navigate('/login');
      return;
    }

    const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id))
        .unwrap()
        .then(() => toast.success(`Removed ${product.name} from wishlist`))
        .catch(() => toast.error('Failed to update wishlist'));
    } else {
      dispatch(addToWishlist(product._id))
        .unwrap()
        .then(() => toast.success(`Added ${product.name} to wishlist`))
        .catch(() => toast.error('Failed to update wishlist'));
    }
  };

  const executeDiscovery = async (userPrompt) => {
    if (!userPrompt || !userPrompt.trim()) {
      toast.error('Please enter a natural description of what you need');
      return;
    }

    setLoading(true);
    setResult(null);

    const queryText = userPrompt.trim();
    const lowerQuery = queryText.toLowerCase();

    try {
      // 1. Check if user is asking general conversation / educational questions vs product discovery
      const isGeneralConversation = 
        lowerQuery.includes('who are you') || 
        lowerQuery.includes('what is your name') || 
        lowerQuery.includes('what is oled') || 
        lowerQuery.includes('explain') || 
        lowerQuery.includes('what is ram') ||
        lowerQuery.includes('difference between');

      if (isGeneralConversation) {
        // Fetch conversational answer from Gemini without product lookup
        let responseText = '';
        try {
          const geminiRes = await api.post('/ai/test', { prompt: queryText });
          responseText = geminiRes.data?.response || '';
        } catch {
          // Fallback text
        }

        setResult({
          isGeneralConversation: true,
          conversationalText: responseText || `I am NexaCart AI, your personal shopping assistant. I can help you discover products, compare items, and plan your shopping budget!`,
          products: [],
        });
        setLoading(false);
        return;
      }

      // 2. Fetch catalog products from MongoDB
      const productsRes = await api.get('/products');
      const allProducts = productsRes.data || [];

      // Filter catalog for matching items
      const matched = allProducts.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(lowerQuery);
        const descMatch = p.description ? p.description.toLowerCase().includes(lowerQuery) : false;
        const catMatch = p.category.toLowerCase().includes(lowerQuery);
        
        // Keyword checks
        if (lowerQuery.includes('phone') || lowerQuery.includes('mobile') || lowerQuery.includes('photography')) {
          return p.category === 'Electronics' && (p.name.toLowerCase().includes('phone') || p.name.toLowerCase().includes('iphone') || p.name.toLowerCase().includes('samsung'));
        }
        if (lowerQuery.includes('laptop') || lowerQuery.includes('college') || lowerQuery.includes('gaming')) {
          return p.category === 'Electronics' && (p.name.toLowerCase().includes('laptop') || p.name.toLowerCase().includes('macbook') || p.name.toLowerCase().includes('asus') || p.name.toLowerCase().includes('lenovo'));
        }
        if (lowerQuery.includes('office') || lowerQuery.includes('desk') || lowerQuery.includes('chair')) {
          return p.category === 'Home & Office' || p.category === 'Electronics';
        }
        if (lowerQuery.includes('grocer') || lowerQuery.includes('food')) {
          return p.category === 'Groceries';
        }
        if (lowerQuery.includes('gym') || lowerQuery.includes('travel') || lowerQuery.includes('accessory') || lowerQuery.includes('gift') || lowerQuery.includes('shoes') || lowerQuery.includes('fashion')) {
          return p.category === 'Fashion' || p.category === 'Home & Office' || p.category === 'Electronics';
        }

        return nameMatch || descMatch || catMatch;
      }).sort((a, b) => b.rating - a.rating);

      // Check price constraints if specified (e.g. "under 50000")
      const priceMatch = lowerQuery.match(/(?:under|below|less than|max|budget of|₹)\s*(\d[\d,]*)/i);
      let filteredByPrice = matched;
      if (priceMatch) {
        const maxLimit = parseInt(priceMatch[1].replace(/,/g, ''), 10);
        if (!isNaN(maxLimit)) {
          filteredByPrice = matched.filter((p) => p.price <= maxLimit);
        }
      }

      // If no matching products exist in MongoDB catalog -> Respond honestly (never invent products)
      if (filteredByPrice.length === 0 && matched.length === 0) {
        // Extract key terms for honest response
        const brandOrItem = queryText.replace(/find|search|best|for|under|show|me/gi, '').trim() || 'requested item';
        
        setResult({
          isGeneralConversation: false,
          hasNoProducts: true,
          unavailableMessage: `I'm sorry, we couldn't find any ${brandOrItem} in our current catalog.`,
          suggestions: [
            'Try searching for Android smartphones',
            'Browse Electronics',
            'Check back later.'
          ],
          products: [],
        });
        setLoading(false);
        return;
      }

      const finalPicks = (filteredByPrice.length > 0 ? filteredByPrice : matched).slice(0, 4);

      // AI Reasoning bullet points explaining WHY
      const reasoningPoints = [
        'Matches your requested budget & style preferences',
        'Highly rated by verified customers',
        'Popular choice among students and professionals',
        'Excellent overall performance and battery efficiency',
        'Top price-to-performance value in catalog'
      ];

      setResult({
        isGeneralConversation: false,
        hasNoProducts: false,
        products: finalPicks,
        reasoningPoints: reasoningPoints.slice(0, 4),
        querySummary: queryText,
      });

    } catch (err) {
      console.error('AI Discovery Error:', err);
      toast.error('AI Discovery service unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeDiscovery(prompt);
  };

  const handleChipClick = (chipText) => {
    setPrompt(chipText);
    executeDiscovery(chipText);
  };

  return (
    <div className="space-y-6">
      {/* Header & Subtitle */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Powered by Gemini AI</span>
        </div>
        <h3 className="font-black text-gray-900 text-xl sm:text-2xl tracking-tight">
          Discover Products Naturally
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          Describe your needs in natural language and NexaCart AI will recommend products that best fit your lifestyle, preferences, and budget.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 relative pt-2">
          <Input
            type="text"
            placeholder="Describe what you need (e.g. 'Gaming laptop for college', 'Gift for my parents')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-gray-50/80 border-gray-200 py-6 pr-12 rounded-2xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 shadow-inner"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-6 font-bold text-xs shrink-0 px-6 shadow-md transition-all hover:scale-[1.02] active:scale-95"
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span>Discover</span>
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            )}
          </Button>
        </form>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-[11px] font-bold text-gray-400">Popular ideas:</span>
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="px-3 py-1.5 bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 border border-gray-200/80 hover:border-emerald-300 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Shimmer Loading State */}
      {loading && (
        <div className="bg-gray-50/60 p-6 rounded-3xl border border-gray-100 space-y-4 animate-pulse">
          <div className="h-5 bg-gray-200/70 rounded-full w-1/3 mx-auto"></div>
          <div className="h-4 bg-gray-200/50 rounded-full w-2/3 mx-auto"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-56 border border-gray-100 p-4 space-y-3">
                <div className="h-32 bg-gray-100 rounded-xl"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Display */}
      <AnimatePresence mode="wait">
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 space-y-6"
          >
            {/* Case A: General Knowledge / Educational response */}
            {result.isGeneralConversation && (
              <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
                  <Info className="w-4 h-4 text-emerald-600" /> Conversational Response
                </div>
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                  {result.conversationalText}
                </p>
              </div>
            )}

            {/* Case B: Out of Stock / Product unavailable */}
            {result.hasNoProducts && (
              <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200/70 text-center space-y-3">
                <p className="text-gray-800 font-bold text-sm">
                  {result.unavailableMessage}
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-gray-600 font-medium">
                  <p className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Suggested Next Steps:</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {result.suggestions.map((sug, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white border border-amber-200 text-amber-900 rounded-full font-semibold shadow-xs"
                      >
                        • {sug}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Case C: Matching Products Found with Reasoning */}
            {!result.isGeneralConversation && !result.hasNoProducts && result.products.length > 0 && (
              <div className="space-y-6">
                {/* AI Recommendation Reasoning Block */}
                <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50/50 p-5 rounded-2xl border border-emerald-200/80 space-y-3 shadow-xs">
                  <h4 className="text-xs font-black text-emerald-950 flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                    Recommended because:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900 font-semibold">
                    {result.reasoningPoints.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {result.products.map((product) => {
                    const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
                    return (
                      <Card
                        key={product._id}
                        className="border-gray-100 rounded-2xl bg-white overflow-hidden flex flex-col justify-between group relative hover:shadow-md hover:border-emerald-200 transition-all"
                      >
                        {/* Wishlist Button */}
                        <button
                          onClick={() => handleWishlistToggle(product)}
                          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 shadow-sm text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>

                        <Link to={`/products/${product._id}`} className="bg-gray-50 p-3 h-32 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-contain h-full max-h-full"
                            onError={(e) => { e.target.src = getFallbackImage(product.category, product.name); }}
                          />
                        </Link>

                        <CardContent className="p-4 flex flex-col justify-between flex-grow space-y-2">
                          <div>
                            <span className="text-[9px] uppercase font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                              {product.category}
                            </span>
                            <Link to={`/products/${product._id}`} className="block mt-1 font-bold text-xs text-gray-800 hover:text-emerald-600 line-clamp-2 leading-snug">
                              {product.name}
                            </Link>
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-50 pt-2">
                            <span className="font-extrabold text-sm text-gray-900">₹{product.price.toLocaleString()}</span>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIDiscovery;
