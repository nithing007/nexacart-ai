import { useState } from 'react';
import { X, AlertTriangle, TrendingUp, Sparkles, ShoppingBag, CheckCircle, PackageX } from 'lucide-react';
import { initialMockNotifications } from '../data/adminAnalyticsEngine';

const renderNotificationIcon = (type) => {
  switch (type) {
    case 'AlertTriangle':
      return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case 'PackageX':
      return <PackageX className="w-4 h-4 text-rose-500" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-4 h-4 text-emerald-500" />;
    case 'Sparkles':
      return <Sparkles className="w-4 h-4 text-purple-500" />;
    case 'TrendingUp':
      return <TrendingUp className="w-4 h-4 text-blue-500" />;
    default:
      return <AlertTriangle className="w-4 h-4 text-slate-500" />;
  }
};

const AdminNotificationCenter = ({ 
  onClose, 
  notifications: externalNotifications, 
  onMarkAllRead: externalMarkAllRead, 
  onRemoveNotification: externalRemoveNotification 
}) => {
  const [internalNotifications, setInternalNotifications] = useState(initialMockNotifications);

  const notifications = externalNotifications || internalNotifications;

  const markAllRead = () => {
    if (externalMarkAllRead) {
      externalMarkAllRead();
    } else {
      setInternalNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    }
  };

  const removeNotification = (id) => {
    if (externalRemoveNotification) {
      externalRemoveNotification(id);
    } else {
      setInternalNotifications((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-100 animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              Admin Notifications
              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-extrabold">
                {notifications.filter((n) => n.unread).length} New
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">Real-time business alerts & AI suggestions</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Alert History</span>
          <button
            onClick={markAllRead}
            className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <CheckCircle className="w-3.5 h-3.5" /> Mark all read
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-xs font-medium">
              No active notifications
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl transition-all flex items-start gap-3.5 ${
                  n.unread ? 'bg-emerald-50/40 border border-emerald-100/50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-100 flex-shrink-0">
                  {n.icon || renderNotificationIcon(n.iconType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 font-medium flex-shrink-0">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                </div>
                <button
                  onClick={() => removeNotification(n.id)}
                  className="text-slate-300 hover:text-rose-500 p-1 rounded-md transition-colors cursor-pointer"
                  title="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            Automated alerts generated by NexaCart AI Engine
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminNotificationCenter;
