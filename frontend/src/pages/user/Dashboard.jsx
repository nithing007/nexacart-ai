import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchMyOrders } from '../../redux/slices/ordersSlice';
import { loadUserBudget, calculateBudgetMetrics, formatINR } from '../../ai/budgetEngine';
import { User, ShoppingBag, Heart, Wallet, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { getFallbackImage } from '../../utils/imageHelper';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'U';

  const recentOrders = orders.slice(0, 3); // Top 3 orders

  // Calculate real-time budget metrics
  const userId = user?._id || user?.id || 'guest';
  const userBudget = loadUserBudget(userId);
  const metrics = calculateBudgetMetrics(orders, userBudget);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-emerald-600 bg-emerald-50';
      case 'Pending':
        return 'text-amber-600 bg-amber-50';
      case 'Cancelled':
        return 'text-rose-600 bg-rose-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getProgressBarColor = (percent) => {
    if (percent < 50) return 'bg-emerald-500';
    if (percent < 75) return 'bg-emerald-600';
    if (percent < 90) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      <h1 className="text-2xl font-black text-gray-900">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
            
            {/* Avatar */}
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-2xl font-black shadow-inner border-2 border-white mb-4">
              {initials}
            </div>

            {/* Name & Email */}
            <h2 className="font-extrabold text-lg text-gray-800 text-center">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </h2>
            <p className="text-gray-400 text-xs text-center font-medium mb-6">
              {user?.email}
            </p>

            {/* Dashboard Sidebar Links */}
            <nav className="w-full space-y-2 border-t border-gray-50 pt-6">
              <button 
                onClick={() => navigate('/profile')}
                className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl transition-all flex items-center gap-2"
              >
                <User className="w-4 h-4 text-emerald-600" /> Edit Profile
              </button>
              <button 
                onClick={() => navigate('/orders')}
                className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" /> My Orders
              </button>
              <button 
                onClick={() => navigate('/wishlist')}
                className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl transition-all flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-emerald-600" /> My Wishlist
              </button>
              <button 
                onClick={() => navigate('/budget-assistant')}
                className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl transition-all flex items-center gap-2"
              >
                <Wallet className="w-4 h-4 text-emerald-600" /> Budget Manager
              </button>
            </nav>
          </div>
        </div>

        {/* Dashboard Main Stats & Lists */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Feature 12: Real-time AI Smart Budget Card */}
          <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100/60 p-6 sm:p-7 rounded-3xl shadow-sm border border-emerald-100 relative overflow-hidden space-y-4">
             <div className="relative z-10 space-y-3">
               <div className="flex justify-between items-center">
                 <span className="bg-emerald-200 text-emerald-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                   <Sparkles className="w-3 h-3 text-emerald-700" /> Real-time Budget Insights
                 </span>
                 <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${metrics.scoreColor}`}>
                   Score: {metrics.score}/100 ({metrics.scoreRating})
                 </span>
               </div>
               
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                 <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100/60 text-center">
                   <span className="text-[9px] uppercase font-bold text-gray-400">Monthly Budget</span>
                   <p className="font-extrabold text-sm text-gray-900">{formatINR(metrics.monthlyBudget)}</p>
                 </div>
                 <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100/60 text-center">
                   <span className="text-[9px] uppercase font-bold text-gray-400">Remaining</span>
                   <p className="font-extrabold text-sm text-emerald-700">{formatINR(metrics.remainingBudget)}</p>
                 </div>
                 <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100/60 text-center">
                   <span className="text-[9px] uppercase font-bold text-gray-400">Orders This Month</span>
                   <p className="font-extrabold text-sm text-gray-900">{metrics.ordersCount}</p>
                 </div>
                 <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100/60 text-center">
                   <span className="text-[9px] uppercase font-bold text-gray-400">Money Saved</span>
                   <p className="font-extrabold text-sm text-purple-700">{formatINR(metrics.estimatedSavings)}</p>
                 </div>
               </div>

               {/* Real-Time Progress Bar */}
               <div className="space-y-1.5 pt-1">
                 <div className="flex justify-between items-center text-[10px] font-extrabold text-gray-600">
                   <span>Budget Progress ({metrics.percentUsed}% used)</span>
                   <span>Spent: {formatINR(metrics.totalSpent)}</span>
                 </div>
                 <div className="w-full bg-white rounded-full h-3 overflow-hidden p-0.5 border border-emerald-200/50">
                   <div 
                     className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(metrics.percentUsed)}`}
                     style={{ width: `${metrics.percentUsed}%` }}
                   />
                 </div>
               </div>

               <div className="flex gap-3 pt-2">
                 <Link to="/budget-assistant">
                   <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md">
                     View Monthly Report
                   </Button>
                 </Link>
                 <Link to="/ai-recommendations">
                   <Button size="sm" variant="outline" className="border-emerald-200 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl">
                     View AI Picks
                   </Button>
                 </Link>
               </div>
             </div>
             <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4 pointer-events-none">
               <Sparkles className="w-48 h-48 text-emerald-800" />
             </div>
          </div>

          {/* Delivery Address Display Card */}
          {user?.address && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-3">
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                <MapPin className="w-4.5 h-4.5 text-emerald-600" /> Delivery Address
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                {user.address}
              </p>
            </div>
          )}

          {/* Recent Orders List Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm mb-4">Recent Orders</h3>
            
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-12 bg-gray-50 rounded-xl"></div>
                <div className="h-12 bg-gray-50 rounded-xl"></div>
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-6 text-xs text-gray-400 font-medium">
                No orders placed yet.
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between pt-4 first:pt-0">
                    <div className="flex items-center gap-4">
                      {/* Image Preview */}
                      <div className="w-10 h-10 bg-gray-50 rounded-lg p-1 border border-gray-100 flex items-center justify-center shrink-0">
                        <img 
                          src={order.orderItems[0]?.image || getFallbackImage('', order.orderItems[0]?.name)} 
                          alt="Order Item" 
                          className="object-contain max-h-full" 
                          onError={(e) => { e.target.src = getFallbackImage('', order.orderItems[0]?.name); }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-800">Order #{order._id.substring(12).toUpperCase()}</h4>
                        <p className="text-[10px] text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()} &bull; {order.orderItems.length} item(s)
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <p className="font-bold text-xs text-gray-800">₹{order.totalPrice.toLocaleString()}</p>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold inline-block mt-0.5 ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <Link to={`/order/${order._id}`}>
                        <ChevronRight className="w-4 h-4 text-gray-400 hover:text-emerald-600 transition-colors" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {orders.length > 0 && (
              <button 
                onClick={() => navigate('/orders')}
                className="w-full mt-6 text-center text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-1"
              >
                View All Orders <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
