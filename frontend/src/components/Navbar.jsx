import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, Search, Heart, Wallet, LogOut, ChevronDown, Clock, X, Shield, ShoppingBag } from 'lucide-react';
import { Input } from './ui/input';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('nexacart_recent_searches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchBoxRef = useRef(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);
  const dropdownRefMobile = useRef(null);

  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (dropdownRefMobile.current && !dropdownRefMobile.current.contains(event.target)) {
        setDropdownOpenMobile(false);
      }
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
        setIsMobileSearchExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const saveSearchToHistory = (queryStr) => {
    const trimmed = queryStr.trim();
    if (!trimmed) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('nexacart_recent_searches', JSON.stringify(updated));
      } catch {
        // Fallback if localStorage quota exceeded
      }
      return updated;
    });
  };

  const removeHistoryItem = (itemToRemove) => {
    setSearchHistory((prev) => {
      const updated = prev.filter((item) => item !== itemToRemove);
      try {
        localStorage.setItem('nexacart_recent_searches', JSON.stringify(updated));
      } catch {
        // Fallback
      }
      return updated;
    });
  };

  const clearAllHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem('nexacart_recent_searches');
    } catch {
      // Fallback
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearchToHistory(searchQuery.trim());
      setShowSearchDropdown(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectHistory = (queryItem) => {
    setSearchQuery(queryItem);
    saveSearchToHistory(queryItem);
    setShowSearchDropdown(false);
    navigate(`/search?q=${encodeURIComponent(queryItem)}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Filter history if user is actively typing
  const filteredHistory = searchQuery.trim()
    ? searchHistory.filter((item) => item.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : searchHistory;

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group">
            <img src="/logo.png" alt="NexaCart AI" className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-200" />
            <span className="font-black text-sm sm:text-lg md:text-xl tracking-tight text-gray-900 flex items-center select-none leading-none">
              NexaCart<span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent ml-0.5">AI</span>
            </span>
          </Link>
          
          {/* Cart & Heart & Shop & Profile dropdown for mobile */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-3">
            {/* Shop Products Link */}
            <Link to="/products" className="text-[11px] sm:text-xs font-black text-emerald-700 hover:text-emerald-800 transition-colors px-2 py-1 bg-emerald-50 rounded-lg hover:bg-emerald-100 flex-shrink-0">
              Shop
            </Link>

            {/* Mobile Search Button */}
            <button 
              type="button"
              onClick={() => setIsMobileSearchExpanded(true)}
              className="text-gray-600 hover:text-green-600 p-1 flex-shrink-0 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link to="/wishlist" className="text-gray-600 hover:text-green-600 relative p-1 flex-shrink-0">
              <Heart className="w-5 h-5" />
              {wishlistProducts.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {wishlistProducts.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="text-gray-600 hover:text-green-600 relative p-1 flex-shrink-0">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-green-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown for mobile */}
            <div className="relative pl-1 flex-shrink-0" ref={dropdownRefMobile}>
              <button
                onClick={() => setDropdownOpenMobile(!dropdownOpenMobile)}
                className="flex items-center justify-center gap-1 focus:outline-none hover:bg-gray-50 p-1 rounded-full transition-all border border-gray-100 shadow-sm flex-shrink-0"
              >
                {isAuthenticated ? (
                  <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-[11px] font-bold shadow-sm flex-shrink-0">
                    {user?.firstName ? user.firstName[0].toUpperCase() : 'U'}
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
              </button>

              {dropdownOpenMobile && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Signed in as</p>
                        <p className="font-semibold text-gray-800 truncate text-[11px]">{user?.email}</p>
                      </div>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setDropdownOpenMobile(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-purple-700 font-bold bg-purple-50 hover:bg-purple-100 transition-colors"
                        >
                          <Shield className="w-3.5 h-3.5 text-purple-600" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <Link
                        to="/user/dashboard"
                        onClick={() => setDropdownOpenMobile(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setDropdownOpenMobile(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-gray-400" />
                        <span>My Orders</span>
                      </Link>
                      <Link
                        to="/budget-assistant"
                        onClick={() => setDropdownOpenMobile(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        <Wallet className="w-3.5 h-3.5 text-orange-500" />
                        <span>Budget Assistant</span>
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setDropdownOpenMobile(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-gray-400" />
                        <span>Wishlist</span>
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setDropdownOpenMobile(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-gray-400" />
                        <span>Cart</span>
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={() => {
                          setDropdownOpenMobile(false);
                          handleLogout();
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-500" />
                        <span>Log Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Welcome to NexaCart</p>
                      </div>
                      <Link
                        to="/login"
                        onClick={() => setDropdownOpenMobile(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>Log In</span>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setDropdownOpenMobile(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-green-600" />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Search Bar Form with Recent Searches Dropdown */}
        <form onSubmit={handleSearchSubmit} ref={searchBoxRef} className="hidden md:flex md:flex-1 md:max-w-xl flex-col relative">
          <div className="relative w-full flex items-center">
            <Input 
              type="text" 
              placeholder="Search for premium products, electronics, groceries..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full pl-4 pr-10 py-2 rounded-full border-gray-200 focus:border-green-500 focus:ring-green-500 bg-gray-50 focus:bg-white transition-all shadow-inner"
            />
            <button type="submit" className="absolute right-3 text-gray-400 hover:text-green-600">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Recent Searches Dropdown */}
          {showSearchDropdown && filteredHistory.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between px-4 py-1.5 border-b border-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Recent Searches
                </span>
                <button
                  type="button"
                  onClick={clearAllHistory}
                  className="text-[10px] text-gray-400 hover:text-rose-600 transition-colors uppercase font-bold"
                >
                  Clear All
                </button>
              </div>
              <div className="py-1">
                {filteredHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-2 hover:bg-emerald-50/80 cursor-pointer text-xs font-semibold text-gray-700 hover:text-emerald-800 transition-colors group"
                    onClick={() => handleSelectHistory(item)}
                  >
                    <div className="flex items-center gap-2.5 flex-1 truncate">
                      <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeHistoryItem(item);
                      }}
                      className="text-gray-300 hover:text-rose-500 p-1 rounded-full hover:bg-rose-50 transition-colors shrink-0"
                      title="Remove from history"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* Action Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/products" className="hidden md:block text-gray-600 hover:text-green-600 transition-colors">
            Shop Products
          </Link>
          
          <Link to="/budget-assistant" className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors">
            <Wallet className="w-4 h-4 text-orange-500" />
            <span className="inline">Budget Assistant</span>
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
          <div className="hidden md:block relative border-l border-gray-100 pl-4" ref={dropdownRef}>
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
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-purple-700 font-bold bg-purple-50 hover:bg-purple-100 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
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

      {/* Mobile Search Overlay */}
      {isMobileSearchExpanded && (
        <div className="absolute inset-0 bg-white z-50 flex items-center px-4 gap-2 animate-in fade-in duration-200 md:hidden">
          <form onSubmit={handleSearchSubmit} ref={searchBoxRef} className="flex-1 flex flex-col relative">
            <div className="relative w-full flex items-center">
              <Input 
                type="text" 
                autoFocus
                placeholder="Search for premium products, electronics, groceries..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full pl-4 pr-10 py-2.5 rounded-full border-gray-200 focus:border-green-500 focus:ring-green-500 bg-gray-50 focus:bg-white transition-all shadow-inner text-sm"
              />
              <button type="submit" className="absolute right-3 text-gray-400 hover:text-green-600">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Recent Searches Dropdown inside Mobile Overlay */}
            {showSearchDropdown && filteredHistory.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between px-4 py-1.5 border-b border-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" /> Recent Searches
                  </span>
                  <button
                    type="button"
                    onClick={clearAllHistory}
                    className="text-[10px] text-gray-400 hover:text-rose-600 transition-colors uppercase font-bold"
                  >
                    Clear All
                  </button>
                </div>
                <div className="py-1">
                  {filteredHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-4 py-2 hover:bg-emerald-50/80 cursor-pointer text-xs font-semibold text-gray-700 hover:text-emerald-800 transition-colors group"
                      onClick={() => handleSelectHistory(item)}
                    >
                      <div className="flex items-center gap-2.5 flex-1 truncate">
                        <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeHistoryItem(item);
                        }}
                        className="text-gray-300 hover:text-rose-500 p-1 rounded-full hover:bg-rose-50 transition-colors shrink-0"
                        title="Remove from history"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
          <button 
            type="button"
            onClick={() => {
              setIsMobileSearchExpanded(false);
              setShowSearchDropdown(false);
            }} 
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
