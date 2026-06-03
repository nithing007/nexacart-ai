import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Wallet, Sparkles, AlertCircle, ShoppingCart, Percent, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import api from '../services/api';
import toast from 'react-hot-toast';

const BudgetAssistant = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [budgetInput, setBudgetInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFetchBudgetRecommendations = async (e) => {
    e.preventDefault();
    const amount = Number(budgetInput);

    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/ai/budget-assistant', { budget: amount });
      setResult(response.data);
      toast.success('Budget recommendations updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to analyze budget');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => toast.success(`Added ${product.name} to cart`))
      .catch((err) => toast.error(err || 'Failed to add to cart'));
  };

  const getPercentUsed = () => {
    if (!result) return 0;
    return Math.min(100, Math.round((result.totalCost / result.budget) * 100));
  };

  const getProgressBarColor = (percent) => {
    if (percent < 70) return 'bg-green-500';
    if (percent < 90) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Intro section */}
      <section className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-lg">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5" /> Powered by AI Assistant
          </span>
          <h1 className="text-3xl md:text-4xl font-black leading-tight">AI Budget Assistant</h1>
          <p className="text-emerald-100 text-sm md:text-base">
            Enter your target budget. Our smart shopping engine will curate the highest-rated product bundles within your limit and provide actionable savings insights.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-6 translate-y-6 hidden md:block">
          <Wallet className="w-64 h-64" />
        </div>
      </section>

      {/* Input Form Card */}
      <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <form onSubmit={handleFetchBudgetRecommendations} className="flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 space-y-2">
            <label htmlFor="budget" className="font-bold text-sm text-gray-700 block">Enter your total budget (in ₹)</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 font-bold text-gray-400">₹</span>
              <Input 
                id="budget" 
                type="number" 
                placeholder="e.g. 15000"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="bg-gray-50 border-gray-200 py-6 pl-8 font-bold text-gray-800"
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 px-8 font-bold shadow-md shadow-green-100 shrink-0 w-full sm:w-auto"
          >
            {loading ? 'Analyzing...' : 'Generate Recommendations'}
          </Button>
        </form>
      </section>

      {loading ? (
        <div className="space-y-6 py-6 animate-pulse">
          <div className="h-28 bg-white rounded-3xl border border-gray-100"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[350px] bg-white rounded-3xl border border-gray-100"></div>
            <div className="h-[350px] bg-white rounded-3xl border border-gray-100"></div>
          </div>
        </div>
      ) : result ? (
        <div className="space-y-8">
          
          {/* Budget allocation breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase">My Budget</span>
                <p className="text-xl md:text-2xl font-black text-gray-800">₹{result.budget.toLocaleString()}</p>
              </div>
              <div className="border-x border-gray-100">
                <span className="text-xs text-gray-400 font-semibold uppercase">Total Allocated</span>
                <p className="text-xl md:text-2xl font-black text-green-600">₹{result.totalCost.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase">Remaining</span>
                <p className="text-xl md:text-2xl font-black text-gray-500">₹{result.remaining.toLocaleString()}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                <span>Budget Usage</span>
                <span>{getPercentUsed()}% Used</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${getProgressBarColor(getPercentUsed())}`}
                  style={{ width: `${getPercentUsed()}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Products within budget */}
            <div className="space-y-4">
              <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-600" /> Recommended Bundle
              </h2>
              {result.items.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 text-center text-gray-500 text-sm">
                  We couldn't fit any single product within your entered budget. Try increasing it.
                </div>
              ) : (
                <div className="space-y-4">
                  {result.items.map((item) => (
                    <Card key={item._id} className="border-gray-100 rounded-3xl shadow-sm bg-white overflow-hidden hover:border-green-200 transition-colors">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-xl p-1 border border-gray-100 flex items-center justify-center shrink-0">
                          <img src={item.image} alt={item.name} className="object-contain max-h-full" />
                        </div>
                        <div className="flex-grow space-y-0.5 text-xs sm:text-sm">
                          <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                          <p className="text-green-600 font-extrabold">₹{item.price.toLocaleString()}</p>
                        </div>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="p-2.5 rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-colors shadow-sm shrink-0"
                          title="Add item to Cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Savings insights and tips */}
            <div className="space-y-6">
              {/* Savings Insights */}
              <div className="space-y-4">
                <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                  <Percent className="w-5 h-5 text-green-600" /> Savings Insights
                </h2>
                
                <div className="space-y-3">
                  {result.insights.map((insight, idx) => (
                    <div 
                      key={idx}
                      className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3"
                    >
                      <div className="bg-green-50 p-2 rounded-xl text-green-600 shrink-0">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-gray-800">{insight.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Financial tips */}
              <div className="space-y-4">
                <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" /> Smart AI Budget Advice
                </h2>
                <div className="bg-purple-50/50 p-5 rounded-3xl border border-purple-100/50 space-y-4">
                  {result.aiTips.map((tip, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <span className="text-purple-600 text-sm pt-0.5">&bull;</span>
                      <p className="text-xs text-purple-900 leading-relaxed italic">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        // Initial Help State
        <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Wallet className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-800">Ready to Shop Smart?</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Provide your total target shopping amount above to let our AI build the best-value organic and tech product baskets.
          </p>
        </div>
      )}

    </div>
  );
};

export default BudgetAssistant;
