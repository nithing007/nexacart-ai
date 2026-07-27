import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './redux/slices/authSlice';
import { fetchCart } from './redux/slices/cartSlice';
import { fetchWishlist } from './redux/slices/wishlistSlice';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Search = lazy(() => import('./pages/Search'));

const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const Profile = lazy(() => import('./pages/Profile'));
const BudgetAssistant = lazy(() => import('./pages/BudgetAssistant'));
const AiRecommendations = lazy(() => import('./pages/AiRecommendations'));
const UserDashboard = lazy(() => import('./pages/user/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminAIAnalytics = lazy(() => import('./pages/admin/AIAnalytics'));
const AdminMissingRequests = lazy(() => import('./pages/admin/MissingRequests'));
const AdminAILogs = lazy(() => import('./pages/admin/AIConversationLogs'));
const AdminProductInsights = lazy(() => import('./pages/admin/AIProductInsights'));
const AdminInventoryPrediction = lazy(() => import('./pages/admin/InventoryPrediction'));
const AdminSmartCoupons = lazy(() => import('./pages/admin/SmartCoupons'));
const AdminUserAnalytics = lazy(() => import('./pages/admin/UserAnalytics'));
const AdminBudgetAnalytics = lazy(() => import('./pages/admin/BudgetAnalytics'));
const AdminAIPerformance = lazy(() => import('./pages/admin/AIPerformance'));
const AdminExportReports = lazy(() => import('./pages/admin/ExportReports'));

// Layouts
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  // Restore session if token exists
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  // Fetch Cart and Wishlist once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    }>
      <Routes>
        {/* Standalone Login and Register Pages (No Navbar/Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected eCommerce Routes (Requires Login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="search" element={<Search />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<OrderDetail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="budget-assistant" element={<BudgetAssistant />} />
            <Route path="ai-recommendations" element={<AiRecommendations />} />
            <Route path="user/dashboard" element={<UserDashboard />} />
          </Route>

          {/* Admin Protected BI Routes */}
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="ai-analytics" element={<AdminAIAnalytics />} />
            <Route path="missing-requests" element={<AdminMissingRequests />} />
            <Route path="ai-logs" element={<AdminAILogs />} />
            <Route path="product-insights" element={<AdminProductInsights />} />
            <Route path="inventory-prediction" element={<AdminInventoryPrediction />} />
            <Route path="smart-coupons" element={<AdminSmartCoupons />} />
            <Route path="user-analytics" element={<AdminUserAnalytics />} />
            <Route path="budget-analytics" element={<AdminBudgetAnalytics />} />
            <Route path="ai-performance" element={<AdminAIPerformance />} />
            <Route path="reports" element={<AdminExportReports />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
