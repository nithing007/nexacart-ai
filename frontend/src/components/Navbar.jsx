import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, Search, Heart, Wallet, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);

  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-lg text-white font-bold flex items-center justify-center shadow-md">
              <span className="text-xl">AI</span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-green-700 to-green-600 bg-clip-text text-transparent">
              NexaCart
            </span>
          </Link>
          
          {/* Cart & Heart icons for mobile */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/wishlist" className="text-gray-600 hover:text-green-600 relative">
              <Heart className="w-6 h-6" />
              {wishlistProducts.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistProducts.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-green-600 relative">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="w-full md:flex-1 md:max-w-xl flex items-center relative">
          <Input 
            type="text" 
            placeholder="Search for premium products, electronics, groceries..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-full border-gray-200 focus:border-green-500 focus:ring-green-500 bg-gray-50 focus:bg-white transition-all shadow-inner"
          />
          <button type="submit" className="absolute right-3 text-gray-400 hover:text-green-600">
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Action Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/products" className="text-gray-600 hover:text-green-600 transition-colors">
            Shop Products
          </Link>
          
          <Link to="/budget-assistant" className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors">
            <Wallet className="w-4 h-4 text-orange-500" />
            <span className="hidden sm:inline">Budget Assistant</span>
          </Link>

          <Link to="/wishlist" className="hidden md:flex items-center gap-1 text-gray-600 hover:text-green-600 relative transition-colors">
            <Heart className="w-5 h-5" />
            <span className="hidden lg:inline">Wishlist</span>
            {wishlistProducts.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold px-1">
                {wishlistProducts.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-green-600 relative transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden lg:inline">Cart</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-600 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold px-1">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown Container */}
          <div className="relative border-l border-gray-100 pl-4" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none hover:bg-gray-50 py-1.5 px-3 rounded-full transition-all border border-gray-100 shadow-sm"
            >
              {isAuthenticated ? (
                <>
                  <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                    {user?.firstName ? user.firstName[0].toUpperCase() : 'U'}
                  </div>
                  <span className="hidden md:inline font-semibold text-gray-700 text-xs">
                    {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Account'}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="hidden md:inline font-semibold text-gray-700 text-xs">Account</span>
                </>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Signed in as</p>
                      <p className="font-semibold text-gray-800 truncate text-xs">{user?.email}</p>
                    </div>
                    <Link
                      to="/user/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 text-gray-400" />
                      <span>Cart</span>
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Welcome to NexaCart</p>
                      <p className="font-medium text-gray-600 text-xs mt-0.5">Manage your orders & list</p>
                    </div>
                    <Link
                      to="/login"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <span>Log In</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold transition-colors"
                    >
                      <User className="w-4 h-4 text-green-600" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
