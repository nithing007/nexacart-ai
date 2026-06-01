import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Grid, ShoppingBag, Users, Percent, Boxes, BarChart3, HelpCircle, Settings } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin' },
    { name: 'Products', icon: <Package className="w-5 h-5" />, path: '/admin/products' },
    { name: 'Categories', icon: <Grid className="w-5 h-5" />, path: '/admin/categories' },
    { name: 'Orders', icon: <ShoppingBag className="w-5 h-5" />, path: '/admin/orders' },
    { name: 'Users', icon: <Users className="w-5 h-5" />, path: '/admin/users' },
    { name: 'Offers & Coupons', icon: <Percent className="w-5 h-5" />, path: '/admin/offers' },
    { name: 'Inventory', icon: <Boxes className="w-5 h-5" />, path: '/admin/inventory' },
    { name: 'AI Analytics', icon: <BarChart3 className="w-5 h-5" />, path: '/admin/analytics', badge: 'NEW' },
    { name: 'Support Center', icon: <HelpCircle className="w-5 h-5" />, path: '/admin/support' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 overflow-y-auto flex flex-col shadow-sm z-10">
      <div className="p-6">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-lg text-green-600 font-bold flex items-center justify-center">
            <span className="text-xl">AI</span>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-800 block leading-tight">NexaCart</span>
            <span className="text-xs text-gray-500 font-medium">Admin Panel</span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-green-50 text-green-600 font-semibold' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mx-4 mb-6 bg-green-50 rounded-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-bold text-gray-800 mb-1 text-sm">AI Assistant</h4>
          <p className="text-xs text-gray-500 mb-3">Get smart insights and grow your business with AI.</p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm">
            Ask AI Assistant <span className="text-sm">→</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
