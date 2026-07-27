import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  BarChart3, 
  PackageX, 
  MessageSquareCode, 
  Sparkles, 
  Boxes, 
  TicketPercent, 
  Users, 
  Wallet, 
  Activity, 
  FileSpreadsheet,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { useState } from 'react';
import AdminAIAssistantModal from '../admin/components/AdminAIAssistantModal';

const AdminSidebar = () => {
  const location = useLocation();
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/admin' },
    { name: 'My Profile', icon: <User className="w-4 h-4" />, path: '/admin/profile' },
    { name: 'Store Settings', icon: <Settings className="w-4 h-4" />, path: '/admin/settings' },
    { name: 'AI Analytics', icon: <BarChart3 className="w-4 h-4" />, path: '/admin/ai-analytics', badge: 'LIVE' },
    { name: 'Missing Requests', icon: <PackageX className="w-4 h-4" />, path: '/admin/missing-requests', badge: '5 NEW' },
    { name: 'AI Conversation Logs', icon: <MessageSquareCode className="w-4 h-4" />, path: '/admin/ai-logs' },
    { name: 'Product Insights', icon: <Sparkles className="w-4 h-4" />, path: '/admin/product-insights' },
    { name: 'Inventory Prediction', icon: <Boxes className="w-4 h-4" />, path: '/admin/inventory-prediction' },
    { name: 'Smart Coupons', icon: <TicketPercent className="w-4 h-4" />, path: '/admin/smart-coupons' },
    { name: 'User Analytics', icon: <Users className="w-4 h-4" />, path: '/admin/user-analytics' },
    { name: 'Budget Analytics', icon: <Wallet className="w-4 h-4" />, path: '/admin/budget-analytics' },
    { name: 'AI Performance', icon: <Activity className="w-4 h-4" />, path: '/admin/ai-performance' },
    { name: 'Export Reports', icon: <FileSpreadsheet className="w-4 h-4" />, path: '/admin/reports' },
  ];

  return (
    <>
      <aside className="w-64 bg-white border-r border-slate-100 h-screen fixed left-0 top-0 overflow-y-auto flex flex-col shadow-xs z-20">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/60">
          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 block leading-none">
                NexaCart<span className="text-emerald-600"> AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Admin Dashboard</span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-xs duration-150 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <span className={isActive ? 'text-emerald-600' : 'text-slate-400'}>{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      item.badge.includes('NEW')
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin AI Copilot Sidebar CTA */}
        <div className="p-4 mx-3 mb-4 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl relative overflow-hidden shadow-md">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
              <h4 className="font-bold text-xs">Admin AI Copilot</h4>
            </div>
            <p className="text-[10px] text-slate-300 mb-3 leading-relaxed">
              Ask store questions, check stock alerts, & generate reports.
            </p>
            <button
              onClick={() => setShowAIAssistant(true)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              Open AI Assistant <span className="text-xs">→</span>
            </button>
          </div>
        </div>
      </aside>

      {showAIAssistant && (
        <AdminAIAssistantModal onClose={() => setShowAIAssistant(false)} />
      )}
    </>
  );
};

export default AdminSidebar;
