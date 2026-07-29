import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShieldCheck } from 'lucide-react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, token, loading, user } = useSelector((state) => state.auth);

  // If session token exists but user profile is still being loaded, show loading state
  const isProfileLoading = loading || (token && !user);

  if (isProfileLoading) {
    if (adminOnly) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white font-sans">
          <div className="flex items-center gap-3 mb-6 animate-pulse">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-black tracking-tight text-white">NexaCart <span className="text-emerald-400">AI</span> Admin</h2>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Verifying Telemetry & Role</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-500 border-t-transparent"></div>
            <span className="text-xs font-semibold text-slate-300">Loading Control Center...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Not authenticated -> redirect to login
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  // If page requires Admin role, but user is not admin -> redirect to customer dashboard
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/user/dashboard" replace />;
  }

  // If authenticated user is an Admin, but attempting to access customer dashboard -> redirect to /admin
  if (!adminOnly && user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
