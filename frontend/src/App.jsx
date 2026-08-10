import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, googleLoginAsync } from './redux/slices/authSlice';
import { fetchCart } from './redux/slices/cartSlice';
import { fetchWishlist } from './redux/slices/wishlistSlice';
import ProtectedRoute from './components/ProtectedRoute';
import AdminErrorBoundary from './components/AdminErrorBoundary';

// Lazy load Customer pages
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

// Lazy load Operational Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const AdminCategories = lazy(() => import('./pages/admin/Categories'));
const AdminInventory = lazy(() => import('./pages/admin/Inventory'));
const AdminMissingRequests = lazy(() => import('./pages/admin/MissingRequests'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminCustomerQueries = lazy(() => import('./pages/admin/CustomerQueries'));
const AdminSmartCoupons = lazy(() => import('./pages/admin/SmartCoupons'));
const AdminExportReports = lazy(() => import('./pages/admin/ExportReports'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));
const AdminPayments = lazy(() => import('./pages/admin/PaymentManagement'));

// Layouts
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  // Handle OAuth Popup Messages and Clean Raw URL Parameters
  useEffect(() => {
    // 1. If inside an OAuth popup, post message to opener window and close popup immediately
    if (window.opener && (window.location.search.includes('access_token') || window.location.hash.includes('access_token') || window.location.search.includes('iss='))) {
      const searchParams = new URLSearchParams(window.location.search || window.location.hash.replace('#', '?'));
      const accessToken = searchParams.get('access_token');
      const idToken = searchParams.get('id_token') || searchParams.get('credential');
      if (accessToken || idToken) {
        window.opener.postMessage({ type: 'NEXACART_GOOGLE_OAUTH', accessToken, idToken }, window.location.origin);
        window.close();
        return;
      }
    }

    // 2. Clean raw OAuth parameters from visible address bar if present
    if (window.location.search.includes('iss=') || window.location.search.includes('access_token=') || window.location.hash.includes('access_token=')) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 3. Listen for postMessage from OAuth popups in main window
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.type === 'NEXACART_GOOGLE_OAUTH') {
        const { accessToken, idToken } = event.data;
        if (accessToken || idToken) {
          dispatch(googleLoginAsync({ accessToken, idToken }));
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dispatch]);

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
        {/* Standalone Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Customer eCommerce Routes */}
        <Route element={<ProtectedRoute adminOnly={false} />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="search" element={<Search />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success/:orderId" element={<OrderSuccess />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<OrderDetail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="budget-assistant" element={<BudgetAssistant />} />
            <Route path="ai-recommendations" element={<AiRecommendations />} />
            <Route path="user/dashboard" element={<UserDashboard />} />
          </Route>
        </Route>

        {/* Protected Operational Admin Routes (Shopify / Seller Hub Style) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminErrorBoundary>
                <AdminLayout />
              </AdminErrorBoundary>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="missing-requests" element={<AdminMissingRequests />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="customer-queries" element={<AdminCustomerQueries />} />
          <Route path="smart-coupons" element={<AdminSmartCoupons />} />
          <Route path="reports" element={<AdminExportReports />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
