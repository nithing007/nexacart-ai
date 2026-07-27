import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  Bell, 
  Sparkles, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Shield, 
  KeyRound, 
  Activity,
  Package,
  ShoppingBag,
  PackageX
} from 'lucide-react';
import { logout } from '../../redux/slices/authSlice';
import AdminNotificationCenter from './AdminNotificationCenter';
import AdminAIAssistantModal from './AdminAIAssistantModal';
import { mockMissingRequests, mockRecentOrders, mockRecentUsers } from '../data/adminAnalyticsEngine';

const AdminHeader = ({ title = 'NexaCart AI Control Center' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products || { products: [] });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real-time multi-entity search
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults(null);
      setShowSearchDropdown(false);
      return;
    }

    const q = val.toLowerCase().trim();

    // 1. Products search
    const matchedProducts = (products.length > 0 ? products : [
      { _id: '1', name: 'Sony WH-1000XM4 Headphones', category: 'Electronics', price: 22990 },
      { _id: '2', name: 'Samsung Galaxy S24 Ultra', category: 'Electronics', price: 129999 },
      { _id: '3', name: 'Organic Cold Pressed Olive Oil 1L', category: 'Groceries', price: 1250 },
    ]).filter(p => p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q));

    // 2. Orders search
    const matchedOrders = mockRecentOrders.filter(o => 
      o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.itemsSummary.toLowerCase().includes(q)
    );

    // 3. Users search
    const matchedUsers = mockRecentUsers.filter(u => 
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );

    // 4. Missing requests search
    const matchedMissing = mockMissingRequests.filter(m => 
      m.productName.toLowerCase().includes(q) || m.originalQuery.toLowerCase().includes(q)
    );

    setSearchResults({
      products: matchedProducts.slice(0, 3),
      orders: matchedOrders.slice(0, 3),
      users: matchedUsers.slice(0, 3),
      missing: matchedMissing.slice(0, 3)
    });
    setShowSearchDropdown(true);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear JWT & cached values
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const adminName = user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Nithin G';

  return (
    <>
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 px-6 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        
        {/* Left Branding & Page Title */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black text-slate-900 tracking-tight">{title}</h1>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" /> NexaCart AI Admin
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Real-time e-commerce operations, order fulfillment & telemetry</p>
        </div>

        {/* Right Search, Actions & Admin Profile Menu */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          
          {/* Global Admin Search Input */}
          <div className="relative flex-1 md:w-80" ref={searchRef}>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search products, orders, users, missing items..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
            />

            {/* Live Search Results Dropdown */}
            {showSearchDropdown && searchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150 max-h-96 overflow-y-auto">
                {searchResults.products.length > 0 && (
                  <div className="px-4 py-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mb-1">
                      <Package className="w-3 h-3" /> Products
                    </span>
                    {searchResults.products.map(p => (
                      <div key={p._id} className="p-2 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex justify-between">
                        <span>{p.name}</span>
                        <span className="text-emerald-600">₹{p.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.orders.length > 0 && (
                  <div className="px-4 py-1.5 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mb-1">
                      <ShoppingBag className="w-3 h-3" /> Orders
                    </span>
                    {searchResults.orders.map(o => (
                      <div key={o.id} className="p-2 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex justify-between">
                        <span>{o.id} ({o.customerName})</span>
                        <span className="text-slate-900">₹{o.totalAmount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.users.length > 0 && (
                  <div className="px-4 py-1.5 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mb-1">
                      <User className="w-3 h-3" /> Registered Users
                    </span>
                    {searchResults.users.map(u => (
                      <div key={u.id} className="p-2 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex justify-between">
                        <span>{u.name} ({u.email})</span>
                        <span className="text-emerald-600 font-bold">{u.role}</span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.missing.length > 0 && (
                  <div className="px-4 py-1.5 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mb-1">
                      <PackageX className="w-3 h-3 text-rose-500" /> Missing Item Requests
                    </span>
                    {searchResults.missing.map(m => (
                      <div key={m.id} className="p-2 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex justify-between">
                        <span>{m.productName}</span>
                        <span className="text-rose-600">{m.requestCount} requests</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Admin AI Copilot Launcher */}
          <button
            onClick={() => setShowAIAssistant(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">Admin AI Copilot</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200/80 transition-colors cursor-pointer"
            title="Notification Center"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              4
            </span>
          </button>

          {/* Admin User Account Dropdown */}
          <div className="relative border-l border-slate-200 pl-3" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition-all border border-slate-200/60 focus:outline-none cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-emerald-400 font-bold flex items-center justify-center text-xs shadow-xs">
                {user?.firstName ? user.firstName[0].toUpperCase() : 'A'}
              </div>
              <div className="hidden xl:block text-left leading-tight">
                <p className="text-xs font-bold text-slate-900">{adminName}</p>
                <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wider">Store Administrator</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Administrator Account</p>
                  <p className="font-bold text-slate-900 text-xs truncate">{user?.email || 'gnithin399@gmail.com'}</p>
                </div>

                <div className="py-1">
                  <Link
                    to="/admin/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" /> My Profile
                  </Link>

                  <Link
                    to="/admin/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" /> Settings
                  </Link>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowNotifications(true);
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <Bell className="w-4 h-4 text-slate-400" /> Notifications
                  </button>

                  <Link
                    to="/admin/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <KeyRound className="w-4 h-4 text-slate-400" /> Change Password
                  </Link>

                  <Link
                    to="/admin/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <Activity className="w-4 h-4 text-slate-400" /> Activity Logs
                  </Link>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Slide-over Notification Drawer */}
      {showNotifications && (
        <AdminNotificationCenter onClose={() => setShowNotifications(false)} />
      )}

      {/* Admin AI Copilot Modal */}
      {showAIAssistant && (
        <AdminAIAssistantModal onClose={() => setShowAIAssistant(false)} />
      )}
    </>
  );
};

export default AdminHeader;
