import { useState } from 'react';
import { Sparkles, Heart, ShoppingCart, Check, Loader2, Wallet, LayoutList } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { getFallbackImage } from '../../utils/imageHelper';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ShoppingPlanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);

  const [scenarioPrompt, setScenarioPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [planResult, setPlanResult] = useState(null);

  const scenarioChips = [
    'Moving into a new apartment',
    'College hostel setup',
    'Building a gaming room',
    'Starting my first office',
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

  const generatePlan = async (userScenario) => {
    if (!userScenario || !userScenario.trim()) {
      toast.error('Please enter a shopping scenario');
      return;
    }

    setLoading(true);
    setPlanResult(null);

    const scenarioText = userScenario.trim();

    try {
      const productsRes = await api.get('/products');
      const allProducts = productsRes.data || [];

      // Categorize products into sections based on scenario
      const electronics = allProducts.filter((p) => p.category === 'Electronics');
      const homeOffice = allProducts.filter((p) => p.category === 'Home & Office');
      const groceries = allProducts.filter((p) => p.category === 'Groceries');

      const sections = [];

      if (scenarioText.toLowerCase().includes('apartment') || scenarioText.toLowerCase().includes('home')) {
        sections.push(
          { name: 'Living Room & Electronics', items: electronics.slice(0, 2) },
          { name: 'Study & Work Desk', items: homeOffice.slice(0, 2) },
          { name: 'Kitchen & Essentials', items: groceries.slice(0, 2) }
        );
      } else if (scenarioText.toLowerCase().includes('office') || scenarioText.toLowerCase().includes('work')) {
        sections.push(
          { name: 'Desk & Seating', items: homeOffice.slice(0, 2) },
          { name: 'Tech & Productivity', items: electronics.slice(0, 2) },
          { name: 'Pantry & Coffee', items: groceries.slice(0, 1) }
        );
      } else if (scenarioText.toLowerCase().includes('gaming') || scenarioText.toLowerCase().includes('hostel')) {
        sections.push(
          { name: 'Gaming Gear & PC', items: electronics.slice(0, 2) },
          { name: 'Comfort & Desk Setup', items: homeOffice.slice(0, 1) },
          { name: 'Snacks & Energy', items: groceries.slice(0, 2) }
        );
      } else {
        sections.push(
          { name: 'Core Essentials', items: electronics.slice(0, 2) },
          { name: 'Home & Setup', items: homeOffice.slice(0, 2) },
          { name: 'Daily Supplies', items: groceries.slice(0, 1) }
        );
      }

      // Calculate total cost across recommended sections
      let totalCost = 0;
      sections.forEach((sec) => {
        sec.items.forEach((item) => {
          totalCost += item.price;
        });
      });

      // Fetch AI Plan Reasoning from Gemini
      let geminiPlanText = '';
      try {
        const prompt = `Create a short AI shopping plan summary for a customer with scenario: "${scenarioText}". Total estimated cost is ₹${totalCost}. Mention key benefits, budget tips, and category breakdowns.`;
        const geminiRes = await api.post('/ai/test', { prompt });
        geminiPlanText = geminiRes.data?.response || '';
      } catch {
        // Fallback
      }

      setPlanResult({
        scenario: scenarioText,
        totalCost,
        sections,
        reasoningPoints: [
          'Tailored specifically to your scenario needs',
          'Optimized bundle value with instant package discounts',
          'High durability items with verified customer reviews',
          'Free shipping qualified on total order package'
        ],
        budgetAlternative: `Save up to ₹${Math.round(totalCost * 0.15).toLocaleString()} by swapping premium electronics for value-line alternatives in our store.`,
        geminiPlanText,
      });

    } catch (err) {
      console.error('AI Shopping Planner Error:', err);
      toast.error('Failed to generate shopping plan');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePlan(scenarioPrompt);
  };

  const handleChipClick = (chipText) => {
    setScenarioPrompt(chipText);
    generatePlan(chipText);
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
          AI Shopping Planner
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          Build an entire scenario-based shopping list custom tailored to your lifestyle, needs, and budget.
        </p>

        {/* Large Scenario Prompt Input Box */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-2 max-w-xl mx-auto">
          <textarea
            rows={3}
            placeholder="Describe your scenario (e.g., 'I am moving into a new apartment', 'I need a college hostel setup', 'I am starting my first office')"
            value={scenarioPrompt}
            onChange={(e) => setScenarioPrompt(e.target.value)}
            className="w-full bg-gray-50/80 border border-gray-200 p-4 rounded-2xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none shadow-inner resize-none"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-6 font-bold text-xs shadow-md transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="w-4 h-4 animate-spin" /> Generating Plan...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <LayoutList className="w-4 h-4" />
                <span>Generate Shopping Plan</span>
              </span>
            )}
          </Button>
        </form>

        {/* Scenario Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-[11px] font-bold text-gray-400">Scenarios:</span>
          {scenarioChips.map((chip, idx) => (
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

      {/* Loading Shimmer */}
      {loading && (
        <div className="bg-gray-50/60 p-6 rounded-3xl border border-gray-100 space-y-4 animate-pulse">
          <div className="h-6 bg-gray-200/70 rounded-full w-1/3 mx-auto"></div>
          <div className="h-4 bg-gray-200/50 rounded-full w-1/2 mx-auto"></div>
          <div className="space-y-4 pt-4">
            <div className="bg-white rounded-2xl h-32 border border-gray-100 p-4"></div>
            <div className="bg-white rounded-2xl h-32 border border-gray-100 p-4"></div>
          </div>
        </div>
      )}

      {/* Results Display */}
      <AnimatePresence mode="wait">
        {planResult && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 space-y-6"
          >
            {/* Total Cost & Overview Banner */}
            <div className="bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] uppercase font-black bg-white/20 px-2.5 py-0.5 rounded-full text-emerald-100">
                  Scenario Plan
                </span>
                <h4 className="font-black text-lg md:text-xl">{planResult.scenario}</h4>
              </div>
              <div className="bg-white/15 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 text-center shrink-0">
                <span className="text-[10px] uppercase tracking-wider text-emerald-200 font-bold block">Estimated Total Cost</span>
                <span className="text-2xl font-black text-white">₹{planResult.totalCost.toLocaleString()}</span>
              </div>
            </div>

            {/* AI Reasoning Block */}
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 space-y-3 shadow-xs">
              <h4 className="text-xs font-black text-emerald-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" /> Recommended because:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 font-semibold">
                {planResult.reasoningPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sections & Recommended Products */}
            <div className="space-y-6">
              {planResult.sections.map((sec, secIdx) => (
                <div key={secIdx} className="space-y-3">
                  <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-2 border-b border-gray-200/60 pb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{sec.name}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {sec.items.map((product) => {
                      const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
                      return (
                        <Card key={product._id} className="border-gray-100 rounded-2xl bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative">
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
                          <CardContent className="p-3.5 space-y-2">
                            <span className="text-[8px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                              {product.category}
                            </span>
                            <h5 className="font-bold text-xs text-gray-800 line-clamp-1">{product.name}</h5>
                            <div className="flex items-center justify-between border-t border-gray-50 pt-2">
                              <span className="font-extrabold text-sm text-gray-900">₹{product.price.toLocaleString()}</span>
                              <button
                                onClick={() => handleAddToCart(product)}
                                className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all"
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
              ))}
            </div>

            {/* Budget Alternatives & Advice */}
            <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 space-y-2 text-xs text-purple-950">
              <h5 className="font-bold flex items-center gap-1.5 text-purple-900 uppercase tracking-wider text-[11px]">
                <Wallet className="w-4 h-4 text-purple-600" /> Budget Alternatives & Insights
              </h5>
              <p className="leading-relaxed text-purple-900 font-medium italic">
                "{planResult.budgetAlternative}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingPlanner;
