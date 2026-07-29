import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Tags, 
  Boxes, 
  PackageX, 
  Users, 
  MessageSquare, 
  TicketPercent, 
  BarChart3, 
  Settings, 
  User, 
  LogOut, 
  ChevronDown, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  Bot
} from 'lucide-react';
import AdminAIAssistantModal from '../admin/components/AdminAIAssistantModal';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [openSections, setOpenSections] = useState({
    orders: true,
    products: true,
    customers: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 h-screen fixed left-0 top-0 overflow-y-auto flex flex-col shadow-xl z-20 font-sans">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/70">
          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block leading-none">
                NexaCart<span className="text-emerald-400"> Seller</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400/90 tracking-wider">Seller Central</span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto text-xs font-semibold">
          
          {/* Dashboard */}
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              location.pathname === '/admin'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'hover:bg-slate-800/80 hover:text-white text-slate-300'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          {/* Orders Collapsible Group */}
          <div>
            <button
              onClick={() => toggleSection('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                location.pathname.includes('/admin/orders')
                  ? 'text-emerald-400 font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              {openSections.orders ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {openSections.orders && (
              <div className="ml-4 pl-3 border-l border-slate-800 space-y-1 mt-1">
                <Link
                  to="/admin/orders"
                  className={`block px-3 py-2 rounded-lg text-[11px] transition-colors ${
                    location.pathname === '/admin/orders' && !location.search.includes('returns')
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : 'hover:text-white text-slate-400'
                  }`}
                >
                  Order Status Updates
                </Link>
                <Link
                  to="/admin/orders?tab=returns"
                  className={`block px-3 py-2 rounded-lg text-[11px] transition-colors ${
                    location.search.includes('returns')
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : 'hover:text-white text-slate-400'
                  }`}
                >
                  Returns & Refunds
                </Link>
              </div>
            )}
          </div>

          {/* Products Collapsible Group */}
          <div>
            <button
              onClick={() => toggleSection('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                ['/admin/products', '/admin/categories', '/admin/inventory', '/admin/missing-requests'].some(p => location.pathname === p)
                  ? 'text-emerald-400 font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Products</span>
              </div>
              {openSections.products ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {openSections.products && (
              <div className="ml-4 pl-3 border-l border-slate-800 space-y-1 mt-1">
                <Link
                  to="/admin/products"
                  className={`block px-3 py-2 rounded-lg text-[11px] transition-colors ${
                    location.pathname === '/admin/products'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : 'hover:text-white text-slate-400'
                  }`}
                >
                  All Products
                </Link>
                <Link
                  to="/admin/categories"
                  className={`block px-3 py-2 rounded-lg text-[11px] transition-colors ${
                    location.pathname === '/admin/categories'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : 'hover:text-white text-slate-400'
                  }`}
                >
                  Categories
                </Link>
                <Link
                  to="/admin/inventory"
                  className={`block px-3 py-2 rounded-lg text-[11px] transition-colors ${
                    location.pathname === '/admin/inventory'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : 'hover:text-white text-slate-400'
                  }`}
                >
                  Inventory
                </Link>
                <Link
                  to="/admin/missing-requests"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-[11px] transition-colors ${
                    location.pathname === '/admin/missing-requests'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : 'hover:text-white text-slate-400'
                  }`}
                >
                  <span>Missing Requests</span>
                  <span className="bg-rose-500/20 text-rose-300 text-[9px] px-1.5 py-0.5 rounded-full font-bold border border-rose-500/40">5</span>
                </Link>
              </div>
            )}
          </div>

          {/* Customers Collapsible Group */}
          <div>
            <button
              onClick={() => toggleSection('customers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                ['/admin/users', '/admin/customer-queries'].some(p => location.pathname === p)
                  ? 'text-emerald-400 font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </div>
              {openSections.customers ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {openSections.customers && (
              <div className="ml-4 pl-3 border-l border-slate-800 space-y-1 mt-1">
                <Link
                  to="/admin/users"
                  className={`block px-3 py-2 rounded-lg text-[11px] transition-colors ${
                    location.pathname === '/admin/users'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : 'hover:text-white text-slate-400'
                  }`}
                >
                  Users
                </Link>
                <Link
                  to="/admin/customer-queries"
                  className={`block px-3 py-2 rounded-lg text-[11px] transition-colors ${
                    location.pathname === '/admin/customer-queries'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : 'hover:text-white text-slate-400'
                  }`}
                >
                  Customer Queries
                </Link>
              </div>
            )}
          </div>

          {/* Coupons & Offers */}
          <Link
            to="/admin/smart-coupons"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              location.pathname === '/admin/smart-coupons'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'hover:bg-slate-800/80 hover:text-white text-slate-300'
            }`}
          >
            <TicketPercent className="w-4 h-4" />
            <span>Coupons & Offers</span>
          </Link>

          {/* Reports */}
          <Link
            to="/admin/reports"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              location.pathname === '/admin/reports'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'hover:bg-slate-800/80 hover:text-white text-slate-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Reports</span>
          </Link>

          {/* Settings */}
          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              location.pathname === '/admin/settings'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'hover:bg-slate-800/80 hover:text-white text-slate-300'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>

          {/* Admin Profile */}
          <Link
            to="/admin/profile"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              location.pathname === '/admin/profile'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'hover:bg-slate-800/80 hover:text-white text-slate-300'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Admin Profile</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 cursor-pointer text-left font-bold border border-transparent hover:border-rose-500/30 mt-4"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Logout</span>
          </button>
        </nav>

        {/* Embedded AI Copilot Widget */}
        <div className="p-4 mx-3 mb-4 bg-slate-950 rounded-2xl border border-slate-800 text-white relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h4 className="font-bold text-xs">AI Operations Assistant</h4>
          </div>
          <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">
            Smart inventory alerts, delivery predictions, & business insights.
          </p>
          <button
            onClick={() => setShowAIAssistant(true)}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            <Sparkles className="w-3 h-3" /> Ask Store AI Assistant
          </button>
        </div>
      </aside>

      {showAIAssistant && (
        <AdminAIAssistantModal onClose={() => setShowAIAssistant(false)} />
      )}
    </>
  );
};

export default AdminSidebar;
