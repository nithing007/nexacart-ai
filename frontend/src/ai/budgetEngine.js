/**
 * AI Smart Budget Manager Engine
 * Calculates real-time spending, category breakdowns, savings insights,
 * AI shopping scores, and savings goals without backend schema modifications.
 */

// Helper to format currency into INR
export const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
};

// Default monthly budget generator for current month
export const getDefaultBudgetConfig = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

  return {
    monthlyAmount: 25000,
    startDate: firstDay,
    endDate: lastDay,
    autoReset: true,
    goals: [
      {
        id: 'goal-1',
        title: 'MacBook Air M2',
        targetAmount: 98000,
        savedAmount: 42000,
        category: 'Electronics'
      }
    ]
  };
};

/**
 * Load user's persisted budget configuration from localStorage
 */
export const loadUserBudget = (userId = 'guest') => {
  const key = `nexacart_budget_${userId}`;
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      const now = new Date().toISOString().split('T')[0];

      // Auto-reset check if current date is past endDate and autoReset is enabled
      if (parsed.autoReset && parsed.endDate && now > parsed.endDate) {
        const resetConfig = getDefaultBudgetConfig();
        localStorage.setItem(key, JSON.stringify(resetConfig));
        return resetConfig;
      }
      return parsed;
    }
  } catch (err) {
    console.warn('Failed to parse user budget from localStorage:', err);
  }

  const defaultConfig = getDefaultBudgetConfig();
  try {
    localStorage.setItem(key, JSON.stringify(defaultConfig));
  } catch {
    // Fallback
  }
  return defaultConfig;
};

/**
 * Save user's budget configuration to localStorage
 */
export const saveUserBudget = (userId = 'guest', budgetConfig) => {
  const key = `nexacart_budget_${userId}`;
  try {
    localStorage.setItem(key, JSON.stringify(budgetConfig));
  } catch (err) {
    console.error('Failed to save user budget to localStorage:', err);
  }
};

/**
 * Calculate Real-time Budget Metrics from Redux orders array
 */
export const calculateBudgetMetrics = (userOrders = [], budgetConfig = getDefaultBudgetConfig()) => {
  const { monthlyAmount = 25000, startDate, endDate } = budgetConfig;

  // Filter non-cancelled orders within current budget cycle
  const currentOrders = userOrders.filter((order) => {
    if (order.status === 'Cancelled') return false;
    const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
    if (startDate && orderDate < startDate) return false;
    if (endDate && orderDate > endDate) return false;
    return true;
  });

  // Calculate total spent
  const totalSpent = currentOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const remainingBudget = monthlyAmount - totalSpent;
  const percentUsed = monthlyAmount > 0 ? Math.min(100, Math.round((totalSpent / monthlyAmount) * 100)) : 0;

  // Calculate category spending breakdown
  const categorySpending = {
    'Electronics': 0,
    'Groceries': 0,
    'Fashion': 0,
    'Home & Office': 0,
  };

  let estimatedSavings = 0;

  currentOrders.forEach((order) => {
    const items = order.orderItems || [];
    items.forEach((item) => {
      const category = item.product?.category || item.category || 'Electronics';
      const itemPrice = (item.price || 0) * (item.quantity || 1);
      
      if (categorySpending[category] !== undefined) {
        categorySpending[category] += itemPrice;
      } else {
        categorySpending['Electronics'] += itemPrice;
      }

      // Calculate discount savings if original price available
      if (item.product?.originalPrice && item.product.originalPrice > item.price) {
        estimatedSavings += (item.product.originalPrice - item.price) * (item.quantity || 1);
      }
    });
  });

  // If estimated savings is 0, estimate 12% savings off retail
  if (estimatedSavings === 0 && totalSpent > 0) {
    estimatedSavings = Math.round(totalSpent * 0.12);
  }

  // Identify highest & lowest spending category
  let highestCategory = { name: 'Electronics', amount: 0 };
  let lowestCategory = { name: 'Home & Office', amount: Infinity };

  Object.entries(categorySpending).forEach(([cat, amt]) => {
    if (amt > highestCategory.amount) {
      highestCategory = { name: cat, amount: amt };
    }
    if (amt < lowestCategory.amount) {
      lowestCategory = { name: cat, amount: amt };
    }
  });
  if (lowestCategory.amount === Infinity) lowestCategory.amount = 0;

  // Calculate AI Shopping Score (0 - 100)
  let score = 100;
  if (totalSpent > monthlyAmount) {
    const overspendPercent = Math.min(50, ((totalSpent - monthlyAmount) / monthlyAmount) * 100);
    score -= Math.round(overspendPercent * 1.2);
  } else if (percentUsed > 85) {
    score -= 10;
  }

  if (estimatedSavings > 1000) score += 5;
  score = Math.max(30, Math.min(100, score));

  let scoreRating = 'Excellent';
  let scoreColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (score < 75) {
    scoreRating = 'Needs Improvement';
    scoreColor = 'text-rose-600 bg-rose-50 border-rose-200';
  } else if (score < 90) {
    scoreRating = 'Good';
    scoreColor = 'text-amber-600 bg-amber-50 border-amber-200';
  }

  // Calculate Average Order Value
  const avgOrderValue = currentOrders.length > 0 ? Math.round(totalSpent / currentOrders.length) : 0;

  // Determine Budget Alert State
  let alert = {
    level: 'normal',
    message: 'Great! You still have plenty of budget remaining.',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  };

  if (totalSpent > monthlyAmount) {
    alert = {
      level: 'exceeded',
      message: `You have exceeded your monthly shopping budget by ${formatINR(totalSpent - monthlyAmount)}.`,
      color: 'text-rose-700 bg-rose-50 border-rose-200'
    };
  } else if (percentUsed >= 90) {
    alert = {
      level: 'warning_90',
      message: `You only have ${formatINR(remainingBudget)} remaining for this month.`,
      color: 'text-rose-600 bg-rose-50/80 border-rose-200'
    };
  } else if (percentUsed >= 75) {
    alert = {
      level: 'warning_75',
      message: `You've used ${percentUsed}% of your monthly budget.`,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    };
  } else if (percentUsed >= 50) {
    alert = {
      level: 'info_50',
      message: `You have reached 50% of your monthly budget limit.`,
      color: 'text-blue-700 bg-blue-50 border-blue-200'
    };
  }

  return {
    monthlyBudget: monthlyAmount,
    totalSpent,
    remainingBudget,
    percentUsed,
    ordersCount: currentOrders.length,
    categorySpending,
    estimatedSavings,
    highestCategory,
    lowestCategory,
    avgOrderValue,
    score,
    scoreRating,
    scoreColor,
    alert,
    currentOrders
  };
};
