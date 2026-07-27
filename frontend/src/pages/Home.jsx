import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Search, ArrowRight, CheckCircle2, 
  TrendingUp, ChevronRight, GitCompare, LayoutList 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import AIChatBox from '../components/AIChat/AIChatBox';
import AIDiscovery from '../components/SmartShoppingHub/AIDiscovery';
import AICompare from '../components/SmartShoppingHub/AICompare';
import ShoppingPlanner from '../components/SmartShoppingHub/ShoppingPlanner';
import toast from 'react-hot-toast';

const AnimatedCounter = ({ value, duration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const numericStr = value.replace(/[^0-9.]/g, '');
    const target = parseFloat(numericStr);
    if (isNaN(target)) {
      const rafId = requestAnimationFrame(() => {
        setDisplayValue(value);
      });
      return () => cancelAnimationFrame(rafId);
    }

    const isPercent = value.includes('%');
    const isCurrency = value.includes('₹');
    const isPlus = value.includes('+');

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rate = Math.min(progress / duration, 1);
      const easeRate = rate * (2 - rate);
      const current = easeRate * target;

      if (isPercent) {
        setDisplayValue(`${current.toFixed(1)}%`);
      } else {
        const formatted = Math.floor(current).toLocaleString();
        setDisplayValue(`${isCurrency ? '₹' : ''}${formatted}${isPlus ? '+' : ''}`);
      }

      if (rate < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Active Tab for Smart Shopping Hub
  const [activeHubTab, setActiveHubTab] = useState('discovery');

  // Hero Search States
  const [searchQuery, setSearchQuery] = useState('');

  // General Categories
  const categoriesList = [
    { name: 'Electronics', count: '1,240+ Items', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=300&q=80', color: 'from-blue-500 to-indigo-600' },
    { name: 'Groceries', count: '850+ Items', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80', color: 'from-green-500 to-emerald-600' },
    { name: 'Home & Office', count: '980+ Items', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=300&q=80', color: 'from-orange-500 to-amber-600' },
    { name: 'Fashion', count: '2,150+ Items', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80', color: 'from-pink-500 to-rose-600' }
  ];

  const handleSmartSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Please enter a natural search query');
      return;
    }
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSuggestionClick = (queryText) => {
    setSearchQuery(queryText);
    navigate(`/search?q=${encodeURIComponent(queryText.trim())}`);
  };

  return (
    <div className="space-y-20 pb-12">
      
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-green-950 via-neutral-950 to-black rounded-[28px] p-8 md:p-12 lg:p-16 flex flex-col items-center gap-8 md:gap-12 shadow-[0_20px_50px_rgba(8,112,65,0.15)] border border-emerald-900/30 relative overflow-hidden">
        
        {/* Animated Glow Backdrops */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Small Badge */}
        <div className="w-full flex justify-center lg:justify-start z-10 pt-2 lg:pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shadow-inner hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> AI-Powered Shopping Platform
          </div>
        </div>

        {/* Content Columns Wrapper */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
          
          {/* Text & Search Area (Left Column - 55%) */}
          <div className="lg:w-[55%] space-y-7 text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
            
            {/* Large Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
              The Smartest Way <br className="hidden lg:block"/>To Shop Online <br />Powered By <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">AI</span>
            </h1>
            
            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Natural language search, personalized product recommendations, AI-powered shopping assistance, and intelligent budgeting — all tailored specifically for you.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSmartSearch} className="relative w-full max-w-xl mx-auto lg:mx-0 z-20 group">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-emerald-500/80 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search for laptops, mobiles, groceries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-white placeholder-gray-400 text-sm pl-12 pr-32 py-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute right-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95"
                >
                  <span>Ask AI</span>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </button>
              </div>
            </form>

            {/* Suggestion Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-xl">
              {['Gaming Laptop', 'iPhone', 'Groceries', 'Shoes', 'Home Office', 'Budget Setup'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSuggestionClick(chip)}
                  className="px-3.5 py-1.5 bg-white/5 hover:bg-emerald-500/10 text-gray-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <Link to="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 font-bold shadow-lg shadow-emerald-950/50 hover:scale-105 hover:shadow-emerald-500/20 transition-all duration-300 py-6">
                  Start Shopping <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="#hub" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 text-emerald-400 border-emerald-500/30 bg-transparent hover:bg-emerald-500/10 hover:text-white transition-all py-6">
                  Explore AI Hub
                </Button>
              </a>
            </div>

          </div>

          {/* Embedded Conversational AI Assistant (Right Column - 45%) */}
          <div className="hidden lg:flex lg:w-[45%] z-10 w-full justify-center items-center">
            <div className="w-full max-w-md hover:scale-[1.01] transition-transform duration-300">
              <AIChatBox containerHeight="h-[480px]" />
            </div>
          </div>

        </div>

      </section>

      {/* Features Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Sparkles className="text-emerald-600" />, title: "AI Discovery", desc: "Natural language discovery & advice", color: "bg-emerald-50" },
          { icon: <GitCompare className="text-purple-600" />, title: "AI Compare", desc: "Side-by-side spec comparison", color: "bg-purple-50" },
          { icon: <LayoutList className="text-orange-600" />, title: "Shopping Planner", desc: "Scenario-based shopping lists", color: "bg-orange-50" },
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

      {/* 2. Redesigned Smart Shopping Hub */}
      <section id="hub" className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="text-emerald-600" /> Smart Shopping Hub
            </h2>
            <p className="text-gray-500 text-sm">Experience our specialized Gemini-powered AI features below.</p>
          </div>

          {/* Redesigned Hub Tab Switchers */}
          <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 w-full sm:w-fit overflow-x-auto">
            {[
              { id: 'discovery', label: 'AI Discovery', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'compare', label: 'AI Compare', icon: <GitCompare className="w-4 h-4" /> },
              { id: 'planner', label: 'Shopping Planner', icon: <LayoutList className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveHubTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeHubTab === tab.id
                    ? 'bg-white text-emerald-700 font-extrabold shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents with Smooth Transition */}
        <div className="pt-2 min-h-[350px]">
          {activeHubTab === 'discovery' && <AIDiscovery />}
          {activeHubTab === 'compare' && <AICompare />}
          {activeHubTab === 'planner' && <ShoppingPlanner />}
        </div>
      </section>

      {/* 3. Trending Categories */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <TrendingUp className="text-emerald-600 w-6 h-6" /> Trending Categories
          </h2>
          <Link to="/products">
            <Button variant="link" className="text-emerald-600 font-bold flex items-center gap-1">
              Explore All <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoriesList.map((cat, i) => (
            <div 
              key={i}
              onClick={() => navigate(`/products?category=${cat.name}`)}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-300/80 hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden cursor-pointer group flex flex-col justify-between h-56"
            >
              {/* Category Image */}
              <div className="h-2/3 bg-gray-50 overflow-hidden relative">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 to-transparent"></div>
              </div>

              {/* Title & Count */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-gray-800">{cat.name}</h3>
                  <p className="text-[10px] text-gray-400 font-semibold">{cat.count}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
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
            { title: "AI Product Discovery", desc: "No more scrolling endlessly. Describe what you need in plain words, and our system maps matching items instantly.", icon: <Sparkles className="w-6 h-6 text-emerald-600" /> },
            { title: "AI Compare", desc: "Evaluate products side-by-side with Gemini AI breakdown of key differences, pros, cons, and recommendations.", icon: <GitCompare className="w-6 h-6 text-purple-600" /> },
            { title: "Shopping Planner", desc: "Describe your scenario (apartment, hostel, gaming setup), and our AI curates a complete shopping list.", icon: <LayoutList className="w-6 h-6 text-orange-600" /> },
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

      {/* 5. AI Shopping Insights */}
      <section className="bg-gradient-to-tr from-emerald-50 to-green-50 border border-emerald-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-sm text-center md:text-left">
          <span className="bg-emerald-200 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            Shopping Dashboard
          </span>
          <h2 className="text-2xl font-black text-gray-900">AI Shopping Insights</h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Here are simulated metrics representing the average performance across all customers shopping with NexaCart AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
          {[
            { label: "Time Saved", value: "65%", sub: "Faster discovery" },
            { label: "Avg. Savings", value: "₹4,200", sub: "Per shopping basket" },
            { label: "AI Recommendations", value: "98%+", sub: "User satisfaction" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-1">
              <span className="font-black text-2xl text-emerald-700">
                <AnimatedCounter value={stat.value} />
              </span>
              <p className="font-bold text-xs text-gray-800">{stat.label}</p>
              <p className="text-[10px] text-gray-400 font-medium">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
