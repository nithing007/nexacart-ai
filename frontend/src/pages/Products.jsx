import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { 
  Heart, ShoppingCart, Star, LayoutGrid, Cpu, 
  ShoppingBag, Shirt, Home, Watch, Dumbbell, BookOpen, 
  Sparkles, Search, Menu, X 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getFallbackImage } from '../utils/imageHelper';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error } = useSelector((state) => state.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Filter States derived directly from URL parameters (avoids useEffect setState warning)
  const selectedCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

  // Real Category counts state
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products once to compute category item counts dynamically
  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        const res = await api.get('/products');
        setAllProducts(res.data || []);
      } catch (err) {
        console.warn('Failed to load category counts', err);
      }
    };
    loadAllProducts();
  }, []);

  const getCategoryCount = (categoryName) => {
    if (categoryName === 'All') {
      return allProducts.length;
    }
    return allProducts.filter((p) => p.category === categoryName).length;
  };

  const categoryDetails = [
    { name: 'All', label: 'All Products', icon: LayoutGrid, count: '4,500+ Items' },
    { name: 'Electronics', label: 'Electronics', icon: Cpu, count: '1,240+ Items' },
    { name: 'Groceries', label: 'Groceries', icon: ShoppingBag, count: '850+ Items' },
    { name: 'Fashion', label: 'Fashion', icon: Shirt, count: '2,150+ Items' },
    { name: 'Home & Office', label: 'Home & Office', icon: Home, count: '980+ Items' },
    { name: 'Accessories', label: 'Accessories', icon: Watch, count: '620+ Items' },
    { name: 'Sports', label: 'Sports', icon: Dumbbell, count: '450+ Items' },
    { name: 'Books', label: 'Books', icon: BookOpen, count: '310+ Items' },
    { name: 'Beauty', label: 'Beauty', icon: Sparkles, count: '740+ Items' },
  ];

  // Derive previous and next category for navigation
  const currentIdx = categoryDetails.findIndex((cat) => cat.name === selectedCategory);
  const prevIdx = currentIdx <= 0 ? categoryDetails.length - 1 : currentIdx - 1;
  const nextIdx = currentIdx >= categoryDetails.length - 1 ? 0 : currentIdx + 1;
  const prevCategory = categoryDetails[prevIdx];
  const nextCategory = categoryDetails[nextIdx];

  // Sync local input with URL query parameter in the render phase
  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setLocalSearchQuery(searchQuery);
  }
  
  // Mobile drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync data fetching with URL parameters
  useEffect(() => {
    dispatch(fetchProducts({ 
      category: selectedCategory === 'All' ? '' : selectedCategory, 
      search: searchQuery
    }));
  }, [dispatch, selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
    setIsDrawerOpen(false);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (!localSearchQuery.trim()) {
      newParams.delete('search');
    } else {
      newParams.set('search', localSearchQuery);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setLocalSearchQuery('');
    setSearchParams({});
    setIsDrawerOpen(false);
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => toast.success(`Added ${product.name} to cart`))
      .catch((err) => toast.error(err || 'Failed to add to cart'));
  };

  const handleWishlistToggle = (product) => {
    if (!isAuthenticated) {
      toast.error('Please log in to manage your wishlist');
      return;
    }

    const isWishlisted = wishlistProducts.some((item) => item._id === product._id);

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id))
        .unwrap()
        .then(() => toast.success(`Removed ${product.name} from wishlist`))
        .catch((err) => toast.error(err || 'Failed to update wishlist'));
    } else {
      dispatch(addToWishlist(product._id))
        .unwrap()
        .then(() => toast.success(`Added ${product.name} to wishlist`))
        .catch((err) => toast.error(err || 'Failed to update wishlist'));
    }
  };

  // Products listing directly uses products (Max Price filter is removed)
  const filteredProducts = products;

  // Category list JSX content to share between drawer and desktop layout
  const categoriesPanelContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="font-extrabold text-gray-800 text-lg flex items-center gap-2">
            📂 Browse Categories
          </h2>
          <p className="text-xs text-gray-400 mt-1 font-semibold">Explore products by category</p>
        </div>
        <button 
          onClick={handleResetFilters} 
          className="text-xs text-emerald-600 hover:text-emerald-700 font-extrabold flex items-center gap-1 transition-colors px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/80"
        >
          See All
        </button>
      </div>

      {/* Categories Cards List */}
      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {categoryDetails.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group text-left ${
                isActive
                  ? 'bg-gradient-to-tr from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-700/20 scale-[1.02] border border-emerald-500/20'
                  : 'bg-white hover:bg-emerald-50/30 text-gray-600 hover:text-emerald-700 border border-gray-50 hover:border-emerald-100/50 shadow-sm hover:shadow-[0_4px_20px_rgba(16,185,129,0.08)] hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`p-2 rounded-xl transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600'
                }`}>
                  <IconComponent className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-bold tracking-tight">{cat.label}</span>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {getCategoryCount(cat.name)} Items
              </span>
            </button>
          );
        })}
      </div>

      <hr className="border-gray-100" />

      {/* Category Summary */}
      <div className="bg-gradient-to-tr from-emerald-50/50 to-green-50/50 border border-emerald-100/50 p-4 rounded-2xl space-y-2.5 text-left">
        <h4 className="text-[10px] font-black text-emerald-900 uppercase tracking-wider">Category Summary</h4>
        <div className="space-y-1 text-xs text-emerald-800">
          <p className="flex justify-between"><span className="text-gray-400">Category:</span> <span className="font-bold text-emerald-955">{selectedCategory}</span></p>
          <p className="flex justify-between"><span className="text-gray-400">Products:</span> <span className="font-bold text-emerald-955">{filteredProducts.length}</span></p>
          <p className="flex justify-between"><span className="text-gray-400">Showing:</span> <span className="font-bold text-emerald-955">{filteredProducts.length} Products</span></p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[28%_1fr] gap-8 relative items-start">
      
      {/* LEFT PANEL - Browse Categories (Desktop 28%) */}
      <div className="hidden lg:block bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
        {categoriesPanelContent}
      </div>

      {/* Mobile Drawer Trigger Bar */}
      <div className="lg:hidden w-full flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm z-30">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
        >
          <Menu className="w-4 h-4" /> Browse Categories
        </button>
        <div className="text-xs text-gray-555 font-bold">
          Category: <span className="text-emerald-600">{selectedCategory}</span>
        </div>
      </div>

      {/* Mobile drawer element */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 p-6 shadow-2xl flex flex-col overflow-y-auto lg:hidden"
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {categoriesPanelContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* RIGHT PANEL - Catalog List (Desktop 72%) */}
      <div className="space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-sm gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Browse Products</h1>
            <p className="text-xs text-gray-400 font-semibold">Discover AI-curated shopping recommendations.</p>
          </div>
          <div className="text-xs font-bold text-gray-500 bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-100 shrink-0 text-center sm:text-right">
            Showing <span className="text-emerald-600 font-black">{filteredProducts.length}</span> Products
          </div>
        </div>

        {/* Premium search bar */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600/70" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full bg-gray-55 border border-gray-150 rounded-full pl-12 pr-28 py-3.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-inner animate-fade-in"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-5 py-2 text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95"
            >
              Search
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-100">
            <h3 className="font-bold text-lg mb-2">Error Loading Products</h3>
            <p className="text-sm">{error}</p>
            <Button onClick={() => dispatch(fetchProducts({}))} className="mt-4 bg-red-600 text-white rounded-xl">
              Retry
            </Button>
          </div>
        )}
        {/* Loading state: Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-100 p-4 space-y-4 animate-pulse shadow-sm">
                <div className="h-48 bg-gray-100 rounded-2xl"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-gray-100 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-100 rounded-full w-8"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-gray-800">No products found</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Try another category or search to discover our premium catalogs.
            </p>
            <Button onClick={handleResetFilters} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-6 py-2 shadow-md">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 animate-fade-in">
            {filteredProducts.map((product) => {
              const discount = product.originalPrice > product.price 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
              const isAIRecommended = product.rating >= 4.5;

              return (
                <Card key={product._id} className="border-gray-100 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden flex flex-col h-full rounded-2xl sm:rounded-[24px] relative bg-white">
                  
                  {/* Discount & AI Badge */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex flex-col gap-1 items-start">
                    {discount > 0 && (
                      <span className="bg-red-500 text-white text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
                        {discount}% OFF
                      </span>
                    )}
                    {isAIRecommended && (
                      <span className="bg-gradient-to-r from-emerald-600 to-green-500 text-white text-[7px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2 sm:w-2.5 h-2 sm:h-2.5 animate-pulse" /> AI RECOMMENDED
                      </span>
                    )}
                  </div>

                  {/* Wishlist toggle absolute position */}
                  <button 
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-white hover:scale-110 active:scale-95 transition-all text-gray-400 hover:text-red-500 hover:shadow-md"
                  >
                    <Heart className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 transition-colors duration-300 ${isWishlisted ? 'fill-red-500 text-red-500 animate-pulse' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <Link to={`/products/${product._id}`} className="bg-gray-50/50 p-3 sm:p-6 h-32 sm:h-52 flex items-center justify-center overflow-hidden relative border-b border-gray-55">
                    <img 
                      src={product.image || getFallbackImage(product.category, product.name)} 
                      alt={product.name} 
                      className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500 ease-out"
                      onError={(e) => { e.target.src = getFallbackImage(product.category, product.name); }}
                    />
                  </Link>

                  {/* Card Content */}
                  <CardContent className="p-3 sm:p-5 flex flex-col justify-between flex-grow space-y-2 sm:space-y-4">
                    <div className="space-y-1 sm:space-y-2">
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                        {product.category}
                      </span>
                      <Link to={`/products/${product._id}`} className="block">
                        <h3 className="font-bold text-xs sm:text-sm text-gray-800 hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {/* Star rating */}
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold">({product.numReviews || 120})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 sm:pt-3.5 border-t border-gray-50 mt-auto">
                      <div>
                        <div className="font-extrabold text-sm sm:text-lg text-gray-900">₹{product.price.toLocaleString()}</div>
                        {discount > 0 && (
                          <div className="text-[8px] sm:text-[10px] text-gray-400 line-through font-medium">₹{product.originalPrice.toLocaleString()}</div>
                        )}
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-7.5 sm:w-9 h-7.5 sm:h-9 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 hover:shadow-emerald-500/20"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Category Navigation Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100 mt-10">
          <button
            onClick={() => handleCategoryChange(prevCategory.name)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-gray-200 hover:border-emerald-500 rounded-2xl text-xs font-bold text-gray-700 hover:text-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span>&larr;</span> GO TO PREV CATEGORY: {prevCategory.label.toUpperCase()}
          </button>
          
          <button
            onClick={() => handleCategoryChange(nextCategory.name)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95"
          >
            GO TO NEXT CATEGORY: {nextCategory.label.toUpperCase()} <span>&rarr;</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Products;
