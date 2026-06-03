import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchMyOrders } from '../../redux/slices/ordersSlice';
import { User, ShoppingBag, Heart, Wallet, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-50';
      case 'Pending':
        return 'text-amber-600 bg-amber-50';
      case 'Cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      <h1 className="text-2xl font-black text-gray-900">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
            
            {/* Avatar */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-2xl font-black shadow-inner border-2 border-white mb-4">
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
                className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:text-green-600 hover:bg-green-50/50 rounded-xl transition-all flex items-center gap-2"
              >
                <User className="w-4 h-4 text-green-600" /> Edit Profile
              </button>
              <button 
                onClick={() => navigate('/orders')}
                className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:text-green-600 hover:bg-green-50/50 rounded-xl transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-green-600" /> My Orders
              </button>
              <button 
                onClick={() => navigate('/wishlist')}
                className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:text-green-600 hover:bg-green-50/50 rounded-xl transition-all flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-green-600" /> My Wishlist
              </button>
              <button 
                onClick={() => navigate('/budget-assistant')}
                className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:text-green-600 hover:bg-green-50/50 rounded-xl transition-all flex items-center gap-2"
              >
                <Wallet className="w-4 h-4 text-green-600" /> Budget Assistant
              </button>
            </nav>
          </div>
        </div>

        {/* Dashboard Main Stats & Lists */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Quick AI Assist Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-3xl shadow-sm border border-green-100 relative overflow-hidden">
             <div className="relative z-10 space-y-3">
               <span className="bg-green-200 text-green-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                 AI Insights
               </span>
               <h3 className="font-extrabold text-gray-800 text-base">Shopping Assistant Status</h3>
               <p className="text-xs text-gray-500 max-w-md leading-relaxed">
                 You can use our interactive AI Budget Assistant to calculate product bundles or view tailored recommendations on your AI Picks dashboard!
               </p>
               <div className="flex gap-3 pt-2">
                 <Link to="/budget-assistant">
                   <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs">
                     Open Assistant
                   </Button>
                 </Link>
                 <Link to="/ai-recommendations">
                   <Button size="sm" variant="outline" className="border-green-200 hover:bg-green-50 text-green-700 font-bold text-xs">
                     View AI Picks
                   </Button>
                 </Link>
               </div>
             </div>
             <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-4 translate-y-4">
               <Sparkles className="w-48 h-48 text-green-700" />
             </div>
          </div>

          {/* Delivery Address Display Card */}
          {user?.address && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-3">
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                <MapPin className="w-4.5 h-4.5 text-green-600" /> Delivery Address
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
                        <ChevronRight className="w-4 h-4 text-gray-400 hover:text-green-600 transition-colors" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {orders.length > 0 && (
              <button 
                onClick={() => navigate('/orders')}
                className="w-full mt-6 text-center text-xs font-bold text-green-600 hover:text-green-700 flex items-center justify-center gap-1"
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
