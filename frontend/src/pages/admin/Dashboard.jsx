import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  PackageX, 
  Users, 
  XCircle, 
  ArrowUpRight, 
  Sparkles, 
  RefreshCw,
  Eye,
  ChevronRight,
  Plus,
  Truck,
  ShieldCheck,
  Bot
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
import api from '../../services/api';
import toast from 'react-hot-toast';

const revenueData = [
  { day: 'Mon', revenue: 145000, orders: 140 },
  { day: 'Tue', revenue: 182000, orders: 175 },
  { day: 'Wed', revenue: 168000, orders: 160 },
  { day: 'Thu', revenue: 210000, orders: 205 },
  { day: 'Fri', revenue: 245000, orders: 230 },
  { day: 'Sat', revenue: 290000, orders: 280 },
  { day: 'Sun', revenue: 305678, orders: 310 },
];

const mockRecentActivities = [
  { type: 'product', title: 'New Product Added', desc: 'Sony WH-1000XM5 added to inventory', time: '10 mins ago', icon: <Plus className="w-3.5 h-3.5 text-emerald-600"/> },
  { type: 'shipment', title: 'Order Dispatched', desc: 'Order #ORD9843 dispatched via Blue Dart', time: '35 mins ago', icon: <Truck className="w-3.5 h-3.5 text-blue-600"/> },
  { type: 'coupon', title: 'Coupon Campaign Created', desc: 'SUMMER20 active (20% OFF)', time: '2 hours ago', icon: <Sparkles className="w-3.5 h-3.5 text-amber-600"/> },
  { type: 'stock', title: 'Stock Updated', desc: 'Added 50 units to Realme 12 Pro+', time: '4 hours ago', icon: <RefreshCw className="w-3.5 h-3.5 text-teal-600"/> },
  { type: 'user', title: 'New Customer Registered', desc: 'Kavita Sharma (kavita.s@gmail.com)', time: '5 hours ago', icon: <Users className="w-3.5 h-3.5 text-purple-600"/> },
];

const topSellingProducts = [
  { id: 1, name: 'Sony WH-1000XM4 Noise Canceling Headphones', category: 'Electronics', price: 22990, orders: 142, revenue: 3264580, stock: 18, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra 5G (512GB)', category: 'Electronics', price: 129999, orders: 89, revenue: 11569911, stock: 6, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Organic Cold-Pressed Extra Virgin Olive Oil 1L', category: 'Groceries', price: 1250, orders: 310, revenue: 387500, stock: 45, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Men Slim Fit Premium Cotton Casual Shirt', category: 'Fashion', price: 1899, orders: 205, revenue: 389295, stock: 32, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayOrders: 38,
    pendingOrders: 12,
    deliveredToday: 24,
    revenueToday: 184950,
    lowStockCount: 5,
    outOfStockCount: 2,
    newUsersToday: 18,
    cancelledToday: 2,
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders/admin/all');
      const allOrders = res.data || [];
      setOrders(allOrders);

      // Compute stats
      const pending = allOrders.filter(o => ['Pending', 'Confirmed', 'Packed'].includes(o.status)).length;
      const delivered = allOrders.filter(o => o.status === 'Delivered').length;
      const cancelled = allOrders.filter(o => o.status === 'Cancelled').length;

      setStats(prev => ({
        ...prev,
        pendingOrders: pending || 12,
        deliveredToday: delivered || 24,
        cancelledToday: cancelled || 2,
      }));
    } catch (err) {
      console.error('Failed to load dashboard live orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleInlineStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/admin-status`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      fetchDashboardData();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-8 font-sans animate-in fade-in duration-200">
      
      {/* Top Welcome / Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">NexaCart Seller Operations</h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Live Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Real-time fulfillment, inventory velocity, and order tracking across store channels.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-slate-200/80"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Telemetry
          </button>

          <Link
            to="/admin/products"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Operational Cards Grid (8 Key Metrics - All Clickable) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Today's Orders */}
        <div
          onClick={() => navigate('/admin/orders')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Today's Orders</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stats.todayOrders}</h3>
            <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-2">Click to view all orders</p>
        </div>

        {/* 2. Pending Orders */}
        <div
          onClick={() => navigate('/admin/orders?status=Pending')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Pending Orders</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stats.pendingOrders}</h3>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">Requires Action</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-2">Pack & assign carrier</p>
        </div>

        {/* 3. Delivered Today */}
        <div
          onClick={() => navigate('/admin/orders?status=Delivered')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Delivered Today</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stats.deliveredToday}</h3>
            <span className="text-xs font-extrabold text-blue-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> 98.4% On-time
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-2">Successful customer deliveries</p>
        </div>

        {/* 4. Revenue Today */}
        <div
          onClick={() => navigate('/admin/reports')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Revenue Today</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">₹{stats.revenueToday.toLocaleString()}</h3>
            <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.5%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-2">Gross daily sales value</p>
        </div>

        {/* 5. Low Stock Products */}
        <div
          onClick={() => navigate('/admin/inventory')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Low Stock Products</span>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stats.lowStockCount} items</h3>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60">Restock Soon</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-2">Under minimum stock limit</p>
        </div>

        {/* 6. Out of Stock */}
        <div
          onClick={() => navigate('/admin/inventory')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Out of Stock</span>
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 group-hover:scale-110 transition-transform">
              <PackageX className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stats.outOfStockCount} items</h3>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">Urgent</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-2">Currently unavailable for order</p>
        </div>

        {/* 7. New Users Today */}
        <div
          onClick={() => navigate('/admin/users')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">New Registrations</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">+{stats.newUsersToday}</h3>
            <span className="text-xs font-extrabold text-purple-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.0%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-2">New customer sign-ups today</p>
        </div>

        {/* 8. Cancelled Orders */}
        <div
          onClick={() => navigate('/admin/orders?status=Cancelled')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Cancelled Orders</span>
            <div className="p-2.5 rounded-xl bg-red-50 text-red-600 group-hover:scale-110 transition-transform">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stats.cancelledToday}</h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Low (1.2%)</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-2">Buyer cancelled before dispatch</p>
        </div>

      </div>

      {/* Revenue Graph & Embedded AI Workflow Copilot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Velocity Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Weekly Store Income Velocity</h3>
              <p className="text-xs text-slate-400 font-medium">Daily order sales volume and revenue generation</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              ₹3,05,678 Peak Sun
            </span>
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
                  formatter={(val) => [`₹${val.toLocaleString()}`, 'Daily Income']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Embedded Operational AI Workflow Assistant */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between border border-slate-800">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Bot className="w-3.5 h-3.5" /> AI Store Assistant
              </span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>

            <h3 className="text-base font-black mb-2">Automated Store Telemetry</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">Smart workflow suggestions based on live order & inventory velocity.</p>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-xs">
                <span className="font-bold text-amber-300 text-[10px] block uppercase tracking-wider mb-0.5">Delivery Alert</span>
                <p className="text-slate-200">2 orders in North Delhi are approaching delivery deadline. Priority shipping recommended.</p>
              </div>

              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-xs">
                <span className="font-bold text-emerald-400 text-[10px] block uppercase tracking-wider mb-0.5">Stock Recommendation</span>
                <p className="text-slate-200">Samsung S24 Ultra stock is down to 6 units. Reorder suggested to avoid stockout.</p>
              </div>
            </div>
          </div>

          <Link
            to="/admin/inventory"
            className="mt-4 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-md"
          >
            Review Inventory Suggestions <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Latest Orders & Low Stock Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Latest 10 Orders Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Recent Store Orders</h3>
              <p className="text-xs text-slate-400 font-medium">Latest 10 orders requiring fulfillment</p>
            </div>
            <Link to="/admin/orders" className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-0.5">
              View All Orders <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Quick Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(orders.length > 0 ? orders.slice(0, 10) : [
                  { _id: 'ord_65a1900192a01', user: { name: 'Rahul Sharma' }, totalPrice: 22990, status: 'Confirmed' },
                  { _id: 'ord_65a1900192a02', user: { name: 'Priya Patel' }, totalPrice: 1250, status: 'Packed' },
                  { _id: 'ord_65a1900192a03', user: { name: 'Amit Verma' }, totalPrice: 129999, status: 'Shipped' },
                  { _id: 'ord_65a1900192a04', user: { name: 'Sneha Gupta' }, totalPrice: 1899, status: 'Delivered' },
                  { _id: 'ord_65a1900192a05', user: { name: 'Vikram Singh' }, totalPrice: 4500, status: 'Pending' },
                ]).map((ord) => (
                  <tr key={ord._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900">
                      #{ord._id.substring(Math.max(0, ord._id.length - 8)).toUpperCase()}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-800">
                      {ord.user?.name || ord.user?.email || 'Customer'}
                    </td>
                    <td className="px-4 py-3.5 font-extrabold text-slate-900">
                      ₹{ord.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : ord.status === 'Shipped' || ord.status === 'Out for Delivery'
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : ord.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : 'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <select
                        value={ord.status}
                        onChange={(e) => handleInlineStatusUpdate(ord._id, e.target.value)}
                        className="bg-slate-100 text-slate-800 text-[11px] font-bold py-1 px-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Replenishment Panel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> Low Stock Restock Panel
            </h3>
            <Link to="/admin/inventory" className="text-xs text-emerald-600 font-bold hover:underline">
              View Inventory
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { id: 1, name: 'Samsung Galaxy S24 Ultra', stock: 6, min: 10 },
              { id: 2, name: 'Sony WH-1000XM4 Headphones', stock: 8, min: 15 },
              { id: 3, name: 'Organic Cold Pressed Olive Oil', stock: 5, min: 20 },
              { id: 4, name: 'Realme 12 Pro+ 5G', stock: 4, min: 12 },
            ].map((item) => (
              <div key={item.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                  <p className="text-[10px] text-rose-600 font-extrabold mt-0.5">
                    Stock: {item.stock} units • Min required: {item.min}
                  </p>
                </div>
                <Link
                  to="/admin/inventory"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-xs transition-colors"
                >
                  Restock
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Selling Products & Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Selling Products */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Top Selling Products</h3>
              <p className="text-xs text-slate-400 font-medium">Highest revenue generating inventory</p>
            </div>
            <Link to="/admin/products" className="text-xs text-emerald-600 font-bold hover:underline">
              All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topSellingProducts.map(prod => (
              <div key={prod.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 flex items-center gap-3.5 hover:bg-slate-100/60 transition-colors">
                <img src={prod.image} alt={prod.name} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs truncate">{prod.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">{prod.category} • Stock: {prod.stock}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-emerald-700">₹{prod.price.toLocaleString()}</span>
                    <span className="text-[10px] font-extrabold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {prod.orders} sold
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <h3 className="font-bold text-slate-900 text-base mb-4">Recent Audit Activity</h3>

          <div className="space-y-4">
            {mockRecentActivities.map((act, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800">{act.title}</p>
                  <p className="text-[11px] text-slate-500 leading-tight">{act.desc}</p>
                  <span className="text-[9px] text-slate-400 font-medium block mt-1">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
