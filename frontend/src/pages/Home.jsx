import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Wallet, Search, ArrowRight, CheckCircle2, 
  Mail, Heart, ShoppingCart, Star, 
  TrendingUp, ChevronRight 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { getFallbackImage } from '../utils/imageHelper';
import AIChatBox from '../components/AIChat/AIChatBox';
import api from '../services/api';
import toast from 'react-hot-toast';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);

  // Active Tab for Smart Shopping Hub
  const [activeHubTab, setActiveHubTab] = useState('search');

  // AI-Powered Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  // Personalized Picks States
  const [picksLoading, setPicksLoading] = useState(false);
  const [personalizedPicks, setPersonalizedPicks] = useState(null);

  // Smart Budgeting States
  const [budgetVal, setBudgetVal] = useState('');
  const [budgetCat, setBudgetCat] = useState('All');
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [budgetResults, setBudgetResults] = useState(null);

  // General Categories
  const categoriesList = [
    { name: 'Electronics', count: '1,240+ Items', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=300&q=80', color: 'from-blue-500 to-indigo-600' },
    { name: 'Groceries', count: '850+ Items', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80', color: 'from-green-500 to-emerald-600' },
    { name: 'Home & Office', count: '980+ Items', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=300&q=80', color: 'from-orange-500 to-amber-600' },
    { name: 'Fashion', count: '2,150+ Items', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80', color: 'from-pink-500 to-rose-600' }
  ];

  const fetchPersonalizedPicks = async () => {
    setPicksLoading(true);
    try {
      const res = await api.get('/ai/recommendations');
      setPersonalizedPicks(res.data);
    } catch {
      toast.error('Failed to retrieve personalized recommendations');
    } finally {
      setPicksLoading(false);
    }
  };

  // Auto-fetch personalized picks on tab select or login state
  useEffect(() => {
    if (activeHubTab === 'picks' && isAuthenticated) {
      const timer = setTimeout(() => {
        fetchPersonalizedPicks();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeHubTab, isAuthenticated]);

  const handleSmartSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Please enter a natural search query');
      return;
    }

    setSearchLoading(true);
    try {
      const res = await api.get(`/ai/smart-search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(res.data);
    } catch {
      toast.error('AI Search failed to generate recommendations');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleBudgetAssistant = async (e) => {
    e.preventDefault();
    const amount = Number(budgetVal);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    setBudgetLoading(true);
    try {
      const res = await api.post('/ai/budget-assistant', { budget: amount, category: budgetCat });
      setBudgetResults(res.data);
    } catch {
      toast.error('Budget analysis failed');
    } finally {
      setBudgetLoading(false);
    }
  };

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

  return (
    <div className="space-y-20 pb-12">
      
      {/* 1. Hero Section Upgrade */}
      <section className="bg-gradient-to-tr from-green-950 via-gray-900 to-emerald-950 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between shadow-2xl border border-emerald-900/50 relative overflow-hidden">
        
        {/* Animated Glow Backdrops */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

        {/* Text Area */}
        <div className="lg:w-1/2 space-y-6 z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> AI-Powered Shopping Platform
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            The Smartest Way To Shop Online Powered By <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">AI</span>
          </h1>
          
          <p className="text-gray-300 text-base md:text-lg max-w-md mx-auto lg:mx-0 font-medium">
            Natural language search, personalized catalog curation, and automated budgeting models - custom tailored just for you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link to="/products">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 font-bold shadow-lg shadow-green-900/20 hover:scale-105 transition-transform py-6">
                Start Shopping <ArrowRight className="w-4.5 h-4.5 ml-2" />
              </Button>
            </Link>
            <a href="#hub">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-green-400 border-green-500/30 bg-transparent hover:bg-emerald-500/10 hover:text-white transition-all py-6">
                Explore AI Hub
              </Button>
            </a>
          </div>
        </div>

        {/* Upgrade Hero Graphic: Embedded Conversational AI Assistant */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center z-10 w-full">
          <div className="w-full max-w-md">
            <AIChatBox containerHeight="h-[430px]" />
          </div>
        </div>

      </section>

      {/* Features Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Search className="text-green-600" />, title: "AI-Powered Search", desc: "Natural language catalog lookup", color: "bg-green-50" },
          { icon: <Sparkles className="text-purple-600" />, title: "Personalized Picks", desc: "Catalog matching based on history", color: "bg-purple-50" },
          { icon: <Wallet className="text-orange-600" />, title: "Smart Budgeting", desc: "Curated shopping baskets in limit", color: "bg-orange-50" },
          { icon: <CheckCircle2 className="text-blue-600" />, title: "Fast Checkout", desc: "Secure orders & quick logistics", color: "bg-blue-50" }
        ].map((feat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${feat.color}`}>{feat.icon}</div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm leading-tight">{feat.title}</h3>
                <p className="text-xs text-gray-500">{feat.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* 2. Smart Shopping Hub */}
      <section id="hub" className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="text-green-600" /> Smart Shopping Hub
            </h2>
            <p className="text-gray-500 text-sm">Experience our real OpenAI-powered assistant components below.</p>
          </div>

          {/* Hub Tab Switchers */}
          <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 w-fit">
            {[
              { id: 'search', label: 'AI Search', icon: <Search className="w-4 h-4" /> },
              { id: 'picks', label: 'Personalized Picks', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'budget', label: 'Smart Budgeting', icon: <Wallet className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveHubTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeHubTab === tab.id
                    ? 'bg-white text-green-700 font-extrabold shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="pt-4 min-h-[300px]">
          
          {/* Tab 1: AI Search */}
          {activeHubTab === 'search' && (
            <div className="space-y-6">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <h3 className="font-extrabold text-gray-800 text-lg">Natural Language Product Search</h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Describe what you are looking for in natural English (e.g. category, budget limits, user traits). Our AI mappings will resolve the best choices.
                </p>
                <form onSubmit={handleSmartSearch} className="flex gap-2 relative">
                  <Input 
                    type="text" 
                    placeholder="Describe what you want (e.g., 'Best gaming laptop for students under 150000')" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-50 border-gray-200 py-6 pr-12 rounded-xl text-xs sm:text-sm focus:bg-white"
                  />
                  <Button type="submit" disabled={searchLoading} className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 font-bold text-xs shrink-0 px-6">
                    {searchLoading ? 'Searching...' : 'Search'}
                  </Button>
                </form>

                {/* Example Quick queries */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-gray-400 font-medium">
                  <span>Try:</span>
                  {[
                    "Best phone under ₹20000",
                    "Gaming laptop for students",
                    "Running shoes under ₹3000",
                    "Budget office setup"
                  ].map((example, i) => (
                    <button 
                      key={i}
                      type="button"
                      onClick={() => { setSearchQuery(example); }}
                      className="px-3 py-1 bg-gray-50 hover:bg-green-50 text-gray-500 hover:text-green-700 border border-gray-100 rounded-full transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Search Results Panel */}
              <AnimatePresence mode="wait">
                {searchResults && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 space-y-6"
                  >
                    {/* Insights Block */}
                    <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100 space-y-2">
                      <h4 className="text-xs font-black text-green-950 flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-green-600 animate-pulse" /> AI Assistant Reasoning
                      </h4>
                      <p className="text-xs sm:text-sm text-green-900 leading-relaxed italic">
                        "{searchResults.reasoning}"
                      </p>
                      {searchResults.recommendations && (
                        <p className="text-[11px] text-gray-400 font-medium pl-6">
                          Advice: {searchResults.recommendations}
                        </p>
                      )}
                    </div>

                    {/* Products list grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {searchResults.products.map((product) => {
                        const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
                        return (
                          <Card key={product._id} className="border-gray-100 rounded-2xl bg-white overflow-hidden flex flex-col justify-between group relative">
                            {/* Wishlist */}
                            <button 
                              onClick={() => handleWishlistToggle(product)}
                              className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 shadow-sm text-gray-400 hover:text-red-500"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>

                            <Link to={`/products/${product._id}`} className="bg-gray-50 p-3 h-28 flex items-center justify-center">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="object-contain h-full max-h-full"
                                onError={(e) => { e.target.src = getFallbackImage(product.category, product.name); }}
                              />
                            </Link>

                            <CardContent className="p-4 flex flex-col justify-between flex-grow space-y-2">
                              <div>
                                <span className="text-[9px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                  {product.category}
                                </span>
                                <Link to={`/products/${product._id}`} className="block mt-1 font-bold text-xs text-gray-800 hover:text-green-600 line-clamp-1">
                                  {product.name}
                                </Link>
                              </div>
                              <div className="flex items-center justify-between border-t border-gray-50 pt-2">
                                <span className="font-extrabold text-sm text-gray-900">₹{product.price.toLocaleString()}</span>
                                <button 
                                  onClick={() => handleAddToCart(product)}
                                  className="w-7 h-7 rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white flex items-center justify-center transition-all"
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

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}

          {/* Tab 2: Personalized Picks */}
          {activeHubTab === 'picks' && (
            <div className="space-y-6">
              {!isAuthenticated ? (
                <div className="max-w-md mx-auto text-center space-y-4 py-8">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto text-purple-500">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Personalized AI Picks</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Log in to analyze your browsing history, cart lists, and wishlist selections for tailored recommendations.
                  </p>
                  <Link to="/login">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">Login Now</Button>
                  </Link>
                </div>
              ) : picksLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} className="bg-gray-50 rounded-2xl h-48"></div>
                  ))}
                </div>
              ) : personalizedPicks ? (
                <div className="space-y-6">
                  {/* Reasoning */}
                  <div className="bg-purple-50/80 p-5 rounded-2xl border border-purple-100 space-y-1.5">
                    <h4 className="text-xs font-black text-purple-950 flex items-center gap-1.5 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" /> Personalized Recommendations
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-900 leading-relaxed italic">
                      "{personalizedPicks.reasoning}"
                    </p>
                  </div>

                  {/* Recommendations list */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(personalizedPicks.recommendations || []).map((product) => {
                      const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
                      return (
                        <Card key={product._id} className="border-gray-100 rounded-2xl bg-white overflow-hidden flex flex-col justify-between group relative">
                          <button 
                            onClick={() => handleWishlistToggle(product)}
                            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 shadow-sm text-gray-400 hover:text-red-500"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>

                          <Link to={`/products/${product._id}`} className="bg-gray-50 p-3 h-28 flex items-center justify-center">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="object-contain h-full max-h-full"
                              onError={(e) => { e.target.src = getFallbackImage(product.category, product.name); }}
                            />
                          </Link>

                          <CardContent className="p-4 flex flex-col justify-between flex-grow space-y-2">
                            <div>
                              <span className="text-[9px] uppercase font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100/50">
                                {product.category}
                              </span>
                              <Link to={`/products/${product._id}`} className="block mt-1 font-bold text-xs text-gray-800 hover:text-purple-600 line-clamp-1">
                                {product.name}
                              </Link>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-50 pt-2">
                              <span className="font-extrabold text-sm text-gray-900">₹{product.price.toLocaleString()}</span>
                              <button 
                                onClick={() => handleAddToCart(product)}
                                className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-all"
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
                  
                  <div className="text-right">
                    <Link to="/ai-recommendations" className="inline-flex items-center gap-1 text-xs text-purple-600 font-bold hover:underline">
                      See full dashboard <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  Click 'Fetch recommendations' to run AI Picks logic.
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Smart Budgeting */}
          {activeHubTab === 'budget' && (
            <div className="space-y-8">
              {!isAuthenticated ? (
                <div className="max-w-md mx-auto text-center space-y-4 py-8">
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-500">
                    <Wallet className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Smart Budget Assistant</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Please log in to curate product bundles fitting your budget and view calculated savings insights.
                  </p>
                  <Link to="/login">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl">Login Now</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Budget form */}
                  <form onSubmit={handleBudgetAssistant} className="flex flex-col sm:flex-row items-end gap-4 max-w-xl mx-auto bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <div className="flex-1 space-y-2 text-left">
                      <label className="text-xs font-bold text-gray-600 block">Total Budget (₹)</label>
                      <Input 
                        type="number" 
                        placeholder="e.g., 20000"
                        value={budgetVal}
                        onChange={(e) => setBudgetVal(e.target.value)}
                        className="bg-white border-gray-200"
                        required
                      />
                    </div>
                    <div className="w-full sm:w-40 space-y-2 text-left">
                      <label className="text-xs font-bold text-gray-600 block">Category</label>
                      <select 
                        value={budgetCat}
                        onChange={(e) => setBudgetCat(e.target.value)}
                        className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs sm:text-sm focus:outline-none"
                      >
                        {['All', 'Electronics', 'Groceries', 'Home & Office', 'Fashion'].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <Button type="submit" disabled={budgetLoading} className="bg-orange-600 hover:bg-orange-700 text-white font-bold w-full sm:w-auto h-10">
                      {budgetLoading ? 'Analyzing...' : 'Calculate'}
                    </Button>
                  </form>

                  {/* Budget Results */}
                  <AnimatePresence mode="wait">
                    {budgetResults && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-left"
                      >
                        {/* Selected items */}
                        <div className="md:col-span-2 space-y-3">
                          <h4 className="font-bold text-sm text-gray-800">Allocated Bundle</h4>
                          <div className="space-y-3">
                            {budgetResults.items.map((item) => (
                              <Card key={item._id} className="border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm">
                                <CardContent className="p-3.5 flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gray-50 rounded-lg p-1 border border-gray-100 flex items-center justify-center shrink-0">
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className="object-contain max-h-full"
                                      onError={(e) => { e.target.src = getFallbackImage(item.category, item.name); }}
                                    />
                                  </div>
                                  <div className="flex-grow space-y-0.5 text-xs">
                                    <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                                    <p className="text-green-600 font-extrabold">₹{item.price.toLocaleString()}</p>
                                  </div>
                                  <button 
                                    onClick={() => handleAddToCart(item)}
                                    className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-colors shrink-0"
                                    title="Add to Cart"
                                  >
                                    <ShoppingCart className="w-3.5 h-3.5" />
                                  </button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        {/* Calculations & Advice */}
                        <div className="space-y-4">
                          <Card className="border-gray-100 rounded-2xl shadow-sm bg-white overflow-hidden">
                            <CardContent className="p-5 space-y-4">
                              <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider border-b pb-2">Analysis</h4>
                              <div className="space-y-2 text-xs text-gray-600">
                                <div className="flex justify-between">
                                  <span>Total Cost</span>
                                  <span className="font-bold text-gray-900">₹{budgetResults.totalCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Remaining</span>
                                  <span className="font-bold text-gray-900">₹{budgetResults.remaining.toLocaleString()}</span>
                                </div>
                                {budgetResults.estimatedSavings > 0 && (
                                  <div className="flex justify-between text-green-600 font-bold">
                                    <span>Discount Saved</span>
                                    <span>₹{budgetResults.estimatedSavings.toLocaleString()}</span>
                                  </div>
                                )}
                              </div>

                              {/* Progress bar */}
                              <div className="space-y-1">
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                  <div 
                                    className="bg-green-500 h-full rounded-full transition-all"
                                    style={{ width: `${Math.round((budgetResults.totalCost / budgetResults.budget) * 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* AI Budget Advice */}
                          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 space-y-2 text-xs">
                            <h5 className="font-bold text-purple-950 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI Advice
                            </h5>
                            {budgetResults.aiTips.map((tip, index) => (
                              <p key={index} className="text-purple-900 leading-relaxed italic">&bull; {tip}</p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* 3. Trending Categories */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <TrendingUp className="text-green-600 w-6 h-6" /> Trending Categories
          </h2>
          <Link to="/products">
            <Button variant="link" className="text-green-600 font-bold flex items-center gap-1">
              Explore All <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoriesList.map((cat, i) => (
            <div 
              key={i}
              onClick={() => navigate(`/products?category=${cat.name}`)}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-green-200 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between h-56"
            >
              {/* Category Image */}
              <div className="h-2/3 bg-gray-50 overflow-hidden relative">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 to-transparent"></div>
              </div>

              {/* Title & Count */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-gray-800">{cat.name}</h3>
                  <p className="text-[10px] text-gray-400 font-semibold">{cat.count}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Shop With NexaCart AI */}
      <section className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-12 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-gray-900">Why Shop With NexaCart AI?</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">We integrate advanced artificial intelligence services to create a truly seamless and custom eCommerce experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Natural AI Search", desc: "No more scrolling endlessly. Describe what you need in plain words, and our system maps matching items instantly.", icon: <Search className="w-6 h-6 text-green-600" /> },
            { title: "Smart Budgeting", desc: "Define your total purchase limit and shop category. Our assistant automatically curates packages matching your budget.", icon: <Wallet className="w-6 h-6 text-purple-600" /> },
            { title: "Personalized Shopping", desc: "Enjoy recommendations custom tailored to your exact tastes based on wishlists, cart lists, and user tags.", icon: <Sparkles className="w-6 h-6 text-orange-600" /> },
            { title: "Instant Checkout", desc: "Secure transaction channels, robust address pre-fills, and instant payment validation mechanisms.", icon: <CheckCircle2 className="w-6 h-6 text-blue-600" /> }
          ].map((perk, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto shadow-inner">{perk.icon}</div>
              <h3 className="font-extrabold text-sm text-gray-800">{perk.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AI Shopping Insights (Stats dashboard) */}
      <section className="bg-gradient-to-tr from-green-50 to-emerald-50 border border-green-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-sm text-center md:text-left">
          <span className="bg-green-200 text-green-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            Shopping Dashboard
          </span>
          <h2 className="text-2xl font-black text-gray-900">AI Shopping Insights</h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Here are simulated metrics representing the average performance across all customers shopping with NexaCart AI.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-4 text-center">
          {[
            { value: "₹1,850", label: "Avg. Monthly Savings" },
            { value: "12,450+", label: "Products Curated" },
            { value: "98.4%", label: "Satisfaction Rate" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-green-100/50 shadow-sm space-y-1">
              <span className="text-xl md:text-2xl font-black text-green-700 block">{stat.value}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-gray-900 text-center">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Aarav Mehta", role: "Software Engineer", comment: "The AI search is a game changer. I typed 'gaming laptop for students under 1.5L' and got matches with detailed custom reasoning instantly!", avatar: "AM", stars: 5 },
            { name: "Neha Sharma", role: "Graphic Designer", comment: "The Budget Assistant allowed me to decorate my home office with beautiful items within my target limit. Extremely useful tool!", avatar: "NS", stars: 5 },
            { name: "Rahul Verma", role: "Business Lead", comment: "Personalized picks recommended organic coffee and snacks that I love. The checkout is quick, and shipping is reliably fast.", avatar: "RV", stars: 4 }
          ].map((test, i) => (
            <Card key={i} className="border-gray-100 rounded-3xl shadow-sm bg-white overflow-hidden">
              <CardContent className="p-6 space-y-4 text-left">
                {/* Stars */}
                <div className="flex text-amber-400 gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star 
                      key={idx} 
                      className={`w-4 h-4 ${idx < test.stars ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                  "{test.comment}"
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                  <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {test.avatar}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-gray-800">{test.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">{test.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="bg-gradient-to-tr from-green-900 to-emerald-950 text-white rounded-3xl p-8 md:p-12 text-center border border-emerald-800/40 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mt-20"></div>

        <div className="max-w-md mx-auto space-y-4 z-10 relative">
          <Mail className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
          <h2 className="text-2xl font-black">Subscribe to AI Shopping Tips</h2>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Receive updates on premium product launches, budget hacks, and curated custom suggestions direct to your inbox.
          </p>
          <form 
            onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed successfully!'); }} 
            className="flex flex-col sm:flex-row gap-2 pt-2"
          >
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-white/10 border-white/20 text-white placeholder-white/50 rounded-xl"
              required 
            />
            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl px-6">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;
