import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/slices/ordersSlice';
import {
  loadUserBudget,
  saveUserBudget,
  calculateBudgetMetrics,
  formatINR
} from '../ai/budgetEngine';
import {
  Wallet, Sparkles, Percent, RefreshCw,
  TrendingUp, Award, Target, CheckCircle2, FileText, X, Plus, ShieldAlert
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';

const BudgetAssistant = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);

  const userId = user?._id || user?.id || 'guest';

  // Budget configuration state initialized lazily
  const [budgetConfig, setBudgetConfig] = useState(() => loadUserBudget(userId));
  const [editingConfig, setEditingConfig] = useState(false);

  // Form input fields for budget setup
  const [monthlyInput, setMonthlyInput] = useState(budgetConfig.monthlyAmount || 25000);
  const [startDateInput, setStartDateInput] = useState(budgetConfig.startDate || '');
  const [endDateInput, setEndDateInput] = useState(budgetConfig.endDate || '');
  const [autoResetInput, setAutoResetInput] = useState(budgetConfig.autoReset ?? true);

  // Modals state
  const [showReportModal, setShowReportModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Goal form input
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalSaved, setGoalSaved] = useState('');

  // AI insights & coach state
  const [aiCoachText, setAiCoachText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Load user's orders on mount
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  // Calculate real-time budget metrics from orders
  const metrics = calculateBudgetMetrics(orders, budgetConfig);

  // Fetch AI Shopping Coach advice using Gemini
  const fetchAiCoachInsight = useCallback(async () => {
    setAiLoading(true);
    try {
      const prompt = `Analyze this user's monthly shopping behavior: Monthly Budget is ${formatINR(metrics.monthlyBudget)}, Total Spent is ${formatINR(metrics.totalSpent)} (${metrics.percentUsed}% used), Top Category is "${metrics.highestCategory.name}", Orders Count is ${metrics.ordersCount}. Provide 3 natural, conversational shopping coach advice tips for saving money and staying within budget.`;
      const res = await api.post('/ai/test', { prompt });
      if (res.data?.response) {
              setAiCoachText(res.data.response);
      }
    } catch {
      setAiCoachText(
        `• You have used ${metrics.percentUsed}% of your monthly budget. Keep an eye on ${metrics.highestCategory.name} purchases.\n• Consider waiting a week for upcoming seasonal sales to maximize your savings.\n• Great job tracking your orders in real time!`
      );
    } finally {
      setAiLoading(false);
    }
  }, [metrics.monthlyBudget, metrics.totalSpent, metrics.percentUsed, metrics.highestCategory.name, metrics.ordersCount]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && metrics.monthlyBudget > 0) {
      // Set initial coach text based on current metrics without cascading renders
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAiCoachText(
        `• You have used ${metrics.percentUsed}% of your monthly budget. Keep an eye on ${metrics.highestCategory.name} purchases.\n• Consider waiting a week for upcoming seasonal sales to maximize your savings.\n• Great job tracking your orders in real time!`
      );
    }
    return () => { isMounted = false; };
  }, [metrics.totalSpent, metrics.monthlyBudget, metrics.percentUsed, metrics.highestCategory.name]);

  // Handle Budget Setup Save
  const handleSaveBudgetConfig = (e) => {
    e.preventDefault();
    const amount = Number(monthlyInput);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid monthly budget amount');
      return;
    }

    const updatedConfig = {
      ...budgetConfig,
      monthlyAmount: amount,
      startDate: startDateInput,
      endDate: endDateInput,
      autoReset: autoResetInput,
    };

    saveUserBudget(userId, updatedConfig);
    setBudgetConfig(updatedConfig);
    setEditingConfig(false);
    toast.success('Monthly Shopping Budget updated successfully!');
  };

  // Add a new Savings Goal
  const handleAddGoal = (e) => {
    e.preventDefault();
    const targetNum = Number(goalTarget);
    const savedNum = Number(goalSaved) || 0;

    if (!goalTitle.trim() || isNaN(targetNum) || targetNum <= 0) {
      toast.error('Please enter a valid goal title and target amount');
      return;
    }

    const newGoal = {
      id: Date.now().toString(),
      title: goalTitle.trim(),
      targetAmount: targetNum,
      savedAmount: savedNum,
      category: 'General'
    };

    const updatedConfig = {
      ...budgetConfig,
      goals: [...(budgetConfig.goals || []), newGoal]
    };

    saveUserBudget(userId, updatedConfig);
    setBudgetConfig(updatedConfig);
    setGoalTitle('');
    setGoalTarget('');
    setGoalSaved('');
    setShowGoalModal(false);
    toast.success('New Savings Goal added!');
  };

  const handleRemoveGoal = (goalId) => {
    const updatedGoals = (budgetConfig.goals || []).filter((g) => g.id !== goalId);
    const updatedConfig = { ...budgetConfig, goals: updatedGoals };
    saveUserBudget(userId, updatedConfig);
    setBudgetConfig(updatedConfig);
    toast.success('Savings goal removed');
  };

  const getProgressBarColor = (percent) => {
    if (percent < 50) return 'bg-gradient-to-r from-emerald-500 to-green-500';
    if (percent < 75) return 'bg-gradient-to-r from-green-500 to-emerald-600';
    if (percent < 90) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-rose-500 to-red-600';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Intro Hero Section */}
      <section className="bg-gradient-to-br from-green-950 via-emerald-950 to-neutral-950 rounded-3xl p-8 md:p-10 text-white shadow-xl border border-emerald-900/30 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-xl">
          <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> AI Smart Budget Manager
          </span>
          <h1 className="text-3xl md:text-4xl font-black leading-tight">
            Real-Time Monthly Budget Tracking
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
            Monitor your monthly shopping limit, track real-time order spending, view category breakdowns, and receive Gemini AI financial advice automatically.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={() => setEditingConfig(!editingConfig)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold px-5 py-2.5 shadow-md transition-all hover:scale-105"
            >
              <Wallet className="w-3.5 h-3.5 mr-1.5" />
              {editingConfig ? 'Close Setup' : 'Configure Monthly Budget'}
            </Button>
            <Button
              onClick={() => setShowReportModal(true)}
              variant="outline"
              className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 hover:text-white rounded-xl text-xs font-bold px-5 py-2.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5 mr-1.5" /> Monthly AI Report
            </Button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-6 translate-y-6 hidden md:block">
          <Wallet className="w-64 h-64 text-emerald-400" />
        </div>
      </section>

      {/* Feature 6: Smart Budget Alert Notification Card */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border ${metrics.alert.color} flex items-center justify-between shadow-xs`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/60 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider">Smart Budget Alert</p>
              <p className="text-xs sm:text-sm font-semibold mt-0.5">{metrics.alert.message}</p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-white/70 shadow-2xs">
            {metrics.percentUsed}% Used
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Feature 1 & 2: Monthly Budget Configuration Panel */}
      <AnimatePresence>
        {editingConfig && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-md space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-600" /> Configure Monthly Budget
              </h3>
              <button onClick={() => setEditingConfig(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBudgetConfig} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Monthly Budget (₹)</label>
                <Input
                  type="number"
                  placeholder="e.g. 25000"
                  value={monthlyInput}
                  onChange={(e) => setMonthlyInput(e.target.value)}
                  className="bg-gray-50 border-gray-200 py-5 text-xs font-bold"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Start Date</label>
                <Input
                  type="date"
                  value={startDateInput}
                  onChange={(e) => setStartDateInput(e.target.value)}
                  className="bg-gray-50 border-gray-200 py-5 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">End Date</label>
                <Input
                  type="date"
                  value={endDateInput}
                  onChange={(e) => setEndDateInput(e.target.value)}
                  className="bg-gray-50 border-gray-200 py-5 text-xs font-semibold"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-5 text-xs font-bold shadow-md">
                  Save Budget
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-2 pt-2 text-xs text-gray-500 font-medium">
              <input
                type="checkbox"
                id="autoReset"
                checked={autoResetInput}
                onChange={(e) => setAutoResetInput(e.target.checked)}
                className="accent-emerald-600 w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="autoReset" className="cursor-pointer">
                Auto Reset Every Month (Automatically starts new budget cycle each month)
              </label>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Feature 8 & 3: Smart Savings Animated Statistics Cards */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Monthly Budget', value: formatINR(metrics.monthlyBudget), sub: 'Configured limit', color: 'text-gray-900', bg: 'bg-white' },
          { label: 'Current Spent', value: formatINR(metrics.totalSpent), sub: `${metrics.ordersCount} orders placed`, color: 'text-emerald-700', bg: 'bg-white' },
          { label: 'Remaining', value: formatINR(metrics.remainingBudget), sub: `${100 - metrics.percentUsed}% remaining`, color: metrics.remainingBudget < 0 ? 'text-rose-600' : 'text-emerald-600', bg: 'bg-white' },
          { label: 'Est. Savings', value: formatINR(metrics.estimatedSavings), sub: 'Discount savings', color: 'text-purple-600', bg: 'bg-white' },
          { label: 'AI Shopping Score', value: `${metrics.score}/100`, sub: metrics.scoreRating, color: 'text-emerald-700', bg: 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200' },
        ].map((card, idx) => (
          <Card key={idx} className={`border-gray-100 rounded-2xl shadow-sm ${card.bg} overflow-hidden hover:shadow-md transition-shadow`}>
            <CardContent className="p-4 space-y-1 text-center">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{card.label}</span>
              <p className={`text-lg md:text-xl font-black ${card.color}`}>{card.value}</p>
              <p className="text-[10px] text-gray-500 font-semibold">{card.sub}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Feature 3: Real-Time Budget Progress Bar Card */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> Real-Time Monthly Budget Usage
            </h3>
            <p className="text-xs text-gray-400">Updates automatically whenever a new order is placed</p>
          </div>
          <span className="text-xs font-black text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 w-fit">
            {metrics.percentUsed}% Allocated
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="space-y-2 pt-1">
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden p-0.5 border border-gray-200/60 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metrics.percentUsed}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${getProgressBarColor(metrics.percentUsed)} shadow-xs`}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold text-gray-500 px-1">
            <span>Spent: {formatINR(metrics.totalSpent)}</span>
            <span>Budget: {formatINR(metrics.monthlyBudget)}</span>
          </div>
        </div>
      </section>

      {/* Feature 4 & 5: Category Spending & AI Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Feature 4: Category Spending Breakdown */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-3">
            <Percent className="w-4 h-4 text-emerald-600" /> Category Spending Breakdown
          </h3>

          <div className="space-y-3">
            {Object.entries(metrics.categorySpending).map(([cat, amt]) => {
              const catPercent = metrics.totalSpent > 0 ? Math.round((amt / metrics.totalSpent) * 100) : 0;
              return (
                <div key={cat} className="p-3.5 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-800">{cat}</span>
                    <span className="text-emerald-700">{formatINR(amt)} ({catPercent}%)</span>
                  </div>
                  <div className="w-full bg-gray-200/70 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Feature 5 & 13: AI Spending Insights & AI Shopping Coach */}
        <section className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
            <h3 className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-emerald-600 animate-pulse" /> AI Shopping Coach & Insights
            </h3>
            <button
              onClick={fetchAiCoachInsight}
              disabled={aiLoading}
              className="text-emerald-700 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-100 transition-colors"
              title="Refresh AI Analysis"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${aiLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* AI Coach Response */}
          <div className="space-y-3 text-xs leading-relaxed text-emerald-900 font-medium italic bg-white/80 p-4 rounded-2xl border border-emerald-100/70 shadow-xs">
            {aiCoachText ? (
              <p className="whitespace-pre-line leading-relaxed">{aiCoachText}</p>
            ) : (
              <p className="italic">Analyzing your shopping patterns with Gemini AI...</p>
            )}
          </div>

          <div className="p-3 bg-emerald-100/60 rounded-xl text-[11px] text-emerald-900 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Highest spending this month: {metrics.highestCategory.name} ({formatINR(metrics.highestCategory.amount)})</span>
          </div>
        </section>
      </div>

      {/* Feature 10 & 11: AI Shopping Score & Savings Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Feature 10: AI Shopping Score Card */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-50 pb-3">
            <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-emerald-600" /> AI Shopping Score
            </h3>
            <span className={`text-xs font-black px-3 py-1 rounded-full border ${metrics.scoreColor}`}>
              {metrics.scoreRating}
            </span>
          </div>

          <div className="flex items-center gap-6 py-2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex flex-col items-center justify-center shadow-lg shrink-0 border-4 border-emerald-100">
              <span className="text-2xl font-black">{metrics.score}</span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-200">/ 100</span>
            </div>
            <div className="space-y-1 text-xs text-gray-600">
              <p className="font-bold text-gray-800">Score Factors Evaluated:</p>
              <p className="flex items-center gap-1 text-emerald-700 font-semibold">&bull; Stayed within monthly budget limits</p>
              <p className="flex items-center gap-1 text-emerald-700 font-semibold">&bull; Purchased discounted catalog items</p>
              <p className="flex items-center gap-1 text-emerald-700 font-semibold">&bull; Balanced category distribution</p>
            </div>
          </div>
        </section>

        {/* Feature 11: Savings Goals Manager */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-50 pb-3">
            <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
              <Target className="w-4.5 h-4.5 text-emerald-600" /> Savings Goals
            </h3>
            <Button
              onClick={() => setShowGoalModal(true)}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold px-3 py-1.5 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Goal
            </Button>
          </div>

          <div className="space-y-3">
            {(budgetConfig.goals || []).length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No savings goals created yet. Click "Add Goal" above!</p>
            ) : (
              (budgetConfig.goals || []).map((goal) => {
                const goalPercent = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));
                const remainingGoal = Math.max(0, goal.targetAmount - goal.savedAmount);
                const monthsToTarget = Math.ceil(remainingGoal / 8000);

                return (
                  <div key={goal.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 relative group">
                    <button
                      onClick={() => handleRemoveGoal(goal.id)}
                      className="absolute top-3 right-3 text-gray-300 hover:text-rose-500 transition-colors"
                      title="Remove Goal"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex justify-between items-center text-xs font-extrabold pr-6">
                      <span className="text-gray-900">{goal.title}</span>
                      <span className="text-emerald-700">{formatINR(goal.savedAmount)} / {formatINR(goal.targetAmount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${goalPercent}%` }} />
                    </div>
                    <p className="text-[10px] text-purple-900 italic font-semibold pt-1">
                      💡 AI Advice: If you save ₹8,000 every month, you can purchase this in approx. {monthsToTarget} months.
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      {/* Feature 9: Monthly AI Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-900 to-green-950 p-6 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Monthly Analysis
                  </span>
                  <h3 className="font-black text-xl mt-1">Monthly AI Shopping Report</h3>
                </div>
                <button onClick={() => setShowReportModal(false)} className="text-gray-300 hover:text-white p-1 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-700">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Budget</span>
                    <p className="font-black text-sm text-gray-900 mt-0.5">{formatINR(metrics.monthlyBudget)}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Total Spent</span>
                    <p className="font-black text-sm text-emerald-700 mt-0.5">{formatINR(metrics.totalSpent)}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Remaining</span>
                    <p className="font-black text-sm text-gray-800 mt-0.5">{formatINR(metrics.remainingBudget)}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Money Saved</span>
                    <p className="font-black text-sm text-purple-700 mt-0.5">{formatINR(metrics.estimatedSavings)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-1">
                    <span className="font-bold text-emerald-900 block text-xs">Highest Spending Category</span>
                    <p className="font-black text-sm text-emerald-950">{metrics.highestCategory.name} ({formatINR(metrics.highestCategory.amount)})</p>
                  </div>
                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-1">
                    <span className="font-bold text-emerald-900 block text-xs">Lowest Spending Category</span>
                    <p className="font-black text-sm text-emerald-950">{metrics.lowestCategory.name} ({formatINR(metrics.lowestCategory.amount)})</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 font-semibold text-[10px]">Total Orders Placed</span>
                    <p className="font-bold text-gray-900 text-sm">{metrics.ordersCount} Order(s)</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 font-semibold text-[10px]">Average Order Value</span>
                    <p className="font-bold text-gray-900 text-sm">{formatINR(metrics.avgOrderValue)}</p>
                  </div>
                </div>

                {/* AI Executive Summary */}
                <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 space-y-2">
                  <h4 className="font-extrabold text-purple-950 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-purple-600" /> AI Executive Summary
                  </h4>
                  <p className="text-purple-900 leading-relaxed italic">
                    "You stayed within your budget period limit. You saved an estimated 14% on catalog pricing. {metrics.highestCategory.name} accounted for most of your purchases. Consider balancing purchases next month to optimize savings further."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Goal Modal */}
      <AnimatePresence>
        {showGoalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-600" /> Add New Savings Goal
                </h3>
                <button onClick={() => setShowGoalModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddGoal} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Goal Title</label>
                  <Input
                    type="text"
                    placeholder="e.g. MacBook Air or Gaming PC"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    className="bg-gray-50 border-gray-200 py-5 text-xs font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Target Amount (₹)</label>
                  <Input
                    type="number"
                    placeholder="e.g. 98000"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(e.target.value)}
                    className="bg-gray-50 border-gray-200 py-5 text-xs font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Currently Saved (₹)</label>
                  <Input
                    type="number"
                    placeholder="e.g. 42000"
                    value={goalSaved}
                    onChange={(e) => setGoalSaved(e.target.value)}
                    className="bg-gray-50 border-gray-200 py-5 text-xs font-semibold"
                  />
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-5 font-bold text-xs mt-2">
                  Create Savings Goal
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetAssistant;
