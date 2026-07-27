import { useState } from 'react';
import { 
  Wallet, 
  ShoppingBag, 
  Users, 
  Package, 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';
import { mockRecentOrders, mockInventoryPredictions } from '../../admin/data/adminAnalyticsEngine';

const revenueData = [
  { day: 'Mon', revenue: 145000, orders: 140 },
  { day: 'Tue', revenue: 182000, orders: 175 },
  { day: 'Wed', revenue: 168000, orders: 160 },
  { day: 'Thu', revenue: 210000, orders: 205 },
  { day: 'Fri', revenue: 245000, orders: 230 },
  { day: 'Sat', revenue: 290000, orders: 280 },
  { day: 'Sun', revenue: 205678, orders: 195 },
];

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState('7d');

  const dynamicInsights = [
    { text: "Electronics generated 42% of store revenue this week.", tag: "Category Spike", isPositive: true },
    { text: "Wishlist saves increased 12% following AI recommendation tips.", tag: "User Telemetry", isPositive: true },
    { text: "Sony WH-1000XM4 has highest conversion rate (28.5%).", tag: "High CTR", isPositive: true },
    { text: "Budget Assistant usage rose 18% among returning customers.", tag: "Feature Adoption", isPositive: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            NexaCart AI Control Center
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </h2>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            Production-grade store analytics, order velocity, and automated stock predictions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-white/10 text-white text-xs font-bold py-2 px-3 rounded-xl border border-white/20 focus:outline-none cursor-pointer"
          >
            <option value="24h" className="text-slate-800">Last 24 Hours</option>
            <option value="7d" className="text-slate-800">Last 7 Days</option>
            <option value="30d" className="text-slate-800">Last 30 Days</option>
          </select>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Telemetry
          </button>
        </div>
      </div>

      {/* Top Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "₹12,45,678", trend: "+14.2%", isUp: true, icon: <Wallet className="w-5 h-5 text-emerald-600"/>, bg: "bg-emerald-50" },
          { label: "Total Orders", value: "1,245", trend: "+8.4%", isUp: true, icon: <ShoppingBag className="w-5 h-5 text-emerald-600"/>, bg: "bg-emerald-50" },
          { label: "Registered Users", value: "3,542", trend: "+15.3%", isUp: true, icon: <Users className="w-5 h-5 text-emerald-600"/>, bg: "bg-emerald-50" },
          { label: "Products Sold", value: "4,832", trend: "+10.2%", isUp: true, icon: <Package className="w-5 h-5 text-emerald-600"/>, bg: "bg-emerald-50" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all group hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{card.label}</span>
              <div className={`p-2 rounded-xl ${card.bg} group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</h3>
              <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {card.trend}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${70 + idx * 5}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section: Revenue Graph & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Velocity Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Revenue & Order Volume</h3>
              <p className="text-xs text-slate-400 font-medium">Weekly store income breakdown</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Revenue (₹)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
                  formatter={(val) => [`₹${val.toLocaleString()}`, 'Value']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic AI Insights Widget */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Real Store Insights
              </span>
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>

            <h3 className="text-base font-black mb-3">AI Intelligence Telemetry</h3>

            <div className="space-y-3">
              {dynamicInsights.map((ins, i) => (
                <div key={i} className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-xs">
                  <span className="font-bold text-amber-300 text-[10px] block mb-0.5 uppercase tracking-wider">{ins.tag}</span>
                  <p className="text-slate-200 leading-relaxed font-normal">{ins.text}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/admin/smart-coupons"
            className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl transition-all text-center flex items-center justify-center gap-1 shadow-sm"
          >
            Launch AI Campaign <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Recent Orders & Recent Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base">Latest Customer Orders</h3>
            <span className="text-xs text-slate-400 font-medium">Real-time store activity</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items Summary</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockRecentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">{ord.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{ord.customerName}</td>
                    <td className="px-4 py-3 text-slate-500 truncate max-w-xs">{ord.itemsSummary}</td>
                    <td className="px-4 py-3 font-extrabold text-slate-900">₹{ord.totalAmount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-700'
                            : ord.status === 'Processing'
                            ? 'bg-blue-100 text-blue-700'
                            : ord.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Replenishment Widget */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> Low Stock Restock Widget
            </h3>
            <Link to="/admin/inventory-prediction" className="text-xs text-emerald-600 font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {mockInventoryPredictions.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{item.productName}</h4>
                  <p className="text-[10px] text-rose-600 font-extrabold mt-0.5">
                    Stock: {item.currentStock} units • Out of stock in {item.outOfStockDays} days
                  </p>
                </div>
                <Link
                  to="/admin/inventory-prediction"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
                >
                  Restock
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
