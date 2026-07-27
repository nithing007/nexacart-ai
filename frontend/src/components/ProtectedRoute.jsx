import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
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
