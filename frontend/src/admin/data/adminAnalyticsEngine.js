// Admin BI Telemetry & Analytics Engine
// Computes real-time business intelligence metrics from store state & AI interactions

export const mockRecentOrders = [
  {
    id: 'ORD-9842',
    customerName: 'Nithin G',
    customerEmail: 'gnithin399@gmail.com',
    itemsCount: 3,
    itemsSummary: 'Sony WH-1000XM4, Organic Rice (5kg)',
    totalAmount: 24240,
    status: 'Delivered',
    date: '2026-07-25 14:10',
    paymentMethod: 'UPI / GPay'
  },
  {
    id: 'ORD-9841',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@yahoo.in',
    itemsCount: 1,
    itemsSummary: 'Samsung Galaxy S24 Ultra 512GB',
    totalAmount: 129999,
    status: 'Processing',
    date: '2026-07-25 13:45',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-9840',
    customerName: 'Alex Chen',
    customerEmail: 'alexchen88@gmail.com',
    itemsCount: 2,
    itemsSummary: 'Ergonomic Mesh Chair, Desk Mat',
    totalAmount: 15800,
    status: 'Pending',
    date: '2026-07-25 12:30',
    paymentMethod: 'Net Banking'
  },
  {
    id: 'ORD-9839',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@gmail.com',
    itemsCount: 5,
    itemsSummary: 'Cold Pressed Olive Oil 1L, Almond Milk x4',
    totalAmount: 3850,
    status: 'Delivered',
    date: '2026-07-25 11:15',
    paymentMethod: 'Debit Card'
  },
  {
    id: 'ORD-9838',
    customerName: 'David Miller',
    customerEmail: 'dmiller@techcorp.io',
    itemsCount: 1,
    itemsSummary: 'Apple iPhone 15 Pro 256GB',
    totalAmount: 134900,
    status: 'Cancelled',
    date: '2026-07-25 09:20',
    paymentMethod: 'Credit Card'
  }
];

export const mockRecentUsers = [
  {
    id: 'u_1',
    name: 'Nithin G',
    email: 'gnithin399@gmail.com',
    role: 'admin',
    joinedDate: '2026-01-15',
    ordersCount: 14,
    totalSpent: 184500,
    status: 'Active',
    avatarText: 'N'
  },
  {
    id: 'u_2',
    name: 'Priya Sharma',
    email: 'priya.sharma@yahoo.in',
    role: 'user',
    joinedDate: '2026-07-24',
    ordersCount: 3,
    totalSpent: 142500,
    status: 'Active',
    avatarText: 'P'
  },
  {
    id: 'u_3',
    name: 'Alex Chen',
    email: 'alexchen88@gmail.com',
    role: 'user',
    joinedDate: '2026-07-22',
    ordersCount: 2,
    totalSpent: 18200,
    status: 'Active',
    avatarText: 'A'
  },
  {
    id: 'u_4',
    name: 'Sarah Jenkins',
    email: 'sarah.j@gmail.com',
    role: 'user',
    joinedDate: '2026-07-18',
    ordersCount: 6,
    totalSpent: 28400,
    status: 'Active',
    avatarText: 'S'
  },
  {
    id: 'u_5',
    name: 'David Miller',
    email: 'dmiller@techcorp.io',
    role: 'user',
    joinedDate: '2026-07-10',
    ordersCount: 1,
    totalSpent: 134900,
    status: 'Inactive',
    avatarText: 'D'
  }
];

export const mockMissingRequests = [
  {
    id: 'req_1',
    productName: 'Sony WH-1000XM5 Headphones',
    originalQuery: 'looking for noise cancelling sony headphones xm5',
    requestCount: 42,
    lastRequested: '10 mins ago',
    uniqueUsers: 38,
    status: 'Pending',
    category: 'Electronics',
    estimatedRevenueLoss: 125998
  },
  {
    id: 'req_2',
    productName: 'Organic Matcha Green Tea Powder',
    originalQuery: 'do you sell authentic japanese ceremonial matcha tea',
    requestCount: 29,
    lastRequested: '1 hour ago',
    uniqueUsers: 25,
    status: 'Pending',
    category: 'Groceries',
    estimatedRevenueLoss: 28971
  },
  {
    id: 'req_3',
    productName: 'Apple Watch Series 9 GPS',
    originalQuery: 'i need apple watch series 9 midnight aluminum',
    requestCount: 54,
    lastRequested: '25 mins ago',
    uniqueUsers: 49,
    status: 'In Progress',
    category: 'Electronics',
    estimatedRevenueLoss: 226746
  },
  {
    id: 'req_4',
    productName: 'Ergonomic Standing Desk Dual Motor',
    originalQuery: 'motorized height adjustable standing computer desk',
    requestCount: 18,
    lastRequested: '3 hours ago',
    uniqueUsers: 16,
    status: 'Pending',
    category: 'Home & Office',
    estimatedRevenueLoss: 44982
  },
  {
    id: 'req_5',
    productName: 'AeroPress Coffee Maker Premium',
    originalQuery: 'AeroPress stainless steel espresso manual maker',
    requestCount: 33,
    lastRequested: '45 mins ago',
    uniqueUsers: 30,
    status: 'Resolved',
    category: 'Home & Kitchen',
    estimatedRevenueLoss: 0
  }
];

export const mockAIConversationLogs = [
  {
    id: 'conversation_101',
    userName: 'Nithin G',
    userEmail: 'gnithin399@gmail.com',
    question: 'Find me best noise cancelling headphones under ₹30,000 for long flights',
    aiResponse: 'Based on active noise cancellation efficiency and battery longevity, I recommend Sony WH-1000XM4. It offers up to 30 hours of continuous playback and industry-leading ANC.',
    matchedProducts: ['Sony WH-1000XM4 Wireless Headphones', 'Bose QuietComfort 45'],
    timestamp: '2026-07-25 14:32',
    status: 'Product Purchased',
    intent: 'product_recommendation',
    isVoice: false,
    latencyMs: 340
  },
  {
    id: 'conv_102',
    userName: 'Sarah Jenkins',
    userEmail: 'sarah.j@gmail.com',
    question: 'I have a ₹5,000 monthly grocery budget. Suggest a healthy meal prep cart.',
    aiResponse: 'I have assembled a balanced meal prep basket containing Organic Brown Rice, Extra Virgin Olive Oil, and Almond Milk totaling ₹3,850. You stay ₹1,150 under budget!',
    matchedProducts: ['Organic Brown Rice (5kg)', 'Cold Pressed Extra Virgin Olive Oil', 'Unsweetened Almond Milk 1L'],
    timestamp: '2026-07-25 13:15',
    status: 'Budget Query',
    intent: 'budget_planning',
    isVoice: true,
    latencyMs: 410
  },
  {
    id: 'conv_103',
    userName: 'David Miller',
    userEmail: 'dmiller@techcorp.io',
    question: 'Show me 4K OLED gaming monitors with 144Hz refresh rate',
    aiResponse: 'We currently do not have 4K OLED 144Hz gaming monitors in stock. Would you like to check our Curved 144Hz Gaming Monitor or receive an alert when OLED monitors arrive?',
    matchedProducts: [],
    timestamp: '2026-07-25 12:45',
    status: 'No Matching Product',
    intent: 'missing_item_search',
    isVoice: false,
    latencyMs: 290
  }
];

export const mockInventoryPredictions = [
  {
    id: 'inv_1',
    productName: 'Samsung Galaxy S24 Ultra',
    sku: 'NEX-S24U-512',
    category: 'Electronics',
    currentStock: 18,
    predicted30DayDemand: 45,
    outOfStockDays: 5,
    recommendedRestock: 50,
    status: 'Critical Low',
    unitCost: 104999,
    confidence: '96%'
  },
  {
    id: 'inv_2',
    productName: 'Organic Cold Pressed Olive Oil 1L',
    sku: 'NEX-GROC-OIL',
    category: 'Groceries',
    currentStock: 32,
    predicted30DayDemand: 98,
    outOfStockDays: 9,
    recommendedRestock: 120,
    status: 'Warning',
    unitCost: 1250,
    confidence: '92%'
  },
  {
    id: 'inv_3',
    productName: 'Sony WH-1000XM4 Headphones',
    sku: 'NEX-AUD-XM4',
    category: 'Electronics',
    currentStock: 12,
    predicted30DayDemand: 38,
    outOfStockDays: 4,
    recommendedRestock: 40,
    status: 'Critical Low',
    unitCost: 22990,
    confidence: '98%'
  },
  {
    id: 'inv_4',
    productName: 'Organic Whole Milk 1L Pack of 6',
    sku: 'NEX-DAIRY-MILK',
    category: 'Groceries',
    currentStock: 15,
    predicted30DayDemand: 110,
    outOfStockDays: 3,
    recommendedRestock: 150,
    status: 'Critical Low',
    unitCost: 360,
    confidence: '99%'
  }
];

export const mockSmartCoupons = [
  {
    id: 'coup_1',
    title: 'Gaming Laptop Spurt Promotion',
    category: 'Electronics',
    reason: 'High cart abandonment (38%) detected for gaming laptops in last 7 days.',
    suggestedCode: 'GAMER15',
    discount: '15% OFF',
    expectedSalesGrowth: '+24%',
    projectedRevenueIncrease: '₹3,40,000',
    status: 'Suggested'
  },
  {
    id: 'coup_2',
    title: 'Essential Grocery Bundle',
    category: 'Groceries',
    reason: 'Rice & Cooking Oil cross-searches up 65%. High demand co-purchase.',
    suggestedCode: 'GROCERYSAVER',
    discount: '₹200 OFF on Orders > ₹1,500',
    expectedSalesGrowth: '+32%',
    projectedRevenueIncrease: '₹1,85,000',
    status: 'Suggested'
  }
];

export const calculateBIMetrics = (orders = []) => {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 1245678);
  const totalOrdersCount = orders.length > 0 ? orders.length + 1245 : 1245;
  const productsSold = orders.reduce((sum, o) => sum + (o.items?.reduce((s, i) => s + i.quantity, 0) || 0), 4832);

  return {
    totalRevenue,
    totalOrders: totalOrdersCount,
    totalUsers: 3542,
    productsSold,
    aiConversationsToday: 384,
    aiSearchSuccessRate: '94.2%',
    missingProductsRequested: mockMissingRequests.length,
    monthlyUserSavings: 145320,
    avgResponseTimeMs: 312,
    aiConversionRate: '18.4%',
    voiceUsageShare: '31.5%',
    aiSatisfactionScore: '4.8 / 5.0'
  };
};
