import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { Heart, ShoppingCart, Star, Filter, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getFallbackImage } from '../utils/imageHelper';
import toast from 'react-hot-toast';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error } = useSelector((state) => state.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState(150000); // 1.5 Lakh max limit
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const categories = ['All', 'Electronics', 'Groceries', 'Home & Office', 'Fashion'];

  // Sync state with URL params
  useEffect(() => {
    const category = searchParams.get('category') || 'All';
    const search = searchParams.get('search') || '';
    setSelectedCategory(category);
    setSearchQuery(search);

    dispatch(fetchProducts({ 
      category: category === 'All' ? '' : category, 
      search 
    }));
  }, [dispatch, searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setPriceRange(150000);
    setSearchParams({});
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

  // Filter local products based on price range slider
  const filteredProducts = products.filter((p) => p.price <= priceRange);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      {/* Sidebar Filter Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <Filter className="w-5 h-5 text-green-600" /> Filters
            </h2>
            <button 
              onClick={handleResetFilters} 
              className="text-xs text-gray-400 hover:text-green-600 font-semibold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-700">Categories</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-green-50 text-green-700 font-semibold shadow-sm border border-green-100'
                      : 'text-gray-500 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 my-6" />

          {/* Price Range Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
              <h3>Max Price</h3>
              <span className="text-green-600">₹{priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100"
              max="250000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-600 focus:outline-none"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>₹100</span>
              <span>₹2,50,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Listing Grid */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium">
            Showing <span className="font-bold text-gray-800">{filteredProducts.length}</span> products
            {searchQuery && <span> for "<span className="font-bold text-gray-800">{searchQuery}</span>"</span>}
          </div>
        </div>

        {loading ? (
          // Skeleton Loader Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-3xl border border-gray-100 p-4 space-y-4 animate-pulse">
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
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-100">
            <h3 className="font-bold text-lg mb-2">Error Loading Products</h3>
            <p className="text-sm">{error}</p>
            <Button onClick={() => dispatch(fetchProducts({}))} className="mt-4 bg-red-600 text-white rounded-xl">
              Retry
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          // Empty State
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-gray-800">No Products Found</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              We couldn't find any products matching your filters. Try resetting or selecting a different category.
            </p>
            <Button onClick={handleResetFilters} className="bg-green-600 text-white rounded-xl px-6 py-2">
              Reset Filters
            </Button>
          </div>
        ) : (
          // Products Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const discount = product.originalPrice > product.price 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              const isWishlisted = wishlistProducts.some((item) => item._id === product._id);

              return (
                <Card key={product._id} className="border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col h-full rounded-3xl relative">
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {discount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist toggle absolute position */}
                  <button 
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-white hover:scale-110 transition-all text-gray-400 hover:text-red-500"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <Link to={`/products/${product._id}`} className="bg-gray-50 p-4 h-48 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image || getFallbackImage(product.category, product.name)} 
                      alt={product.name} 
                      className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = getFallbackImage(product.category, product.name); }}
                    />
                  </Link>

                  {/* Card Content */}
                  <CardContent className="p-5 flex flex-col justify-between flex-grow">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                      <Link to={`/products/${product._id}`} className="block">
                        <h3 className="font-bold text-gray-800 hover:text-green-600 transition-colors line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {/* Star rating */}
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4.5 h-4.5 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400 font-semibold">({product.numReviews || 120})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                      <div>
                        <div className="font-extrabold text-xl text-gray-900">₹{product.price.toLocaleString()}</div>
                        {discount > 0 && (
                          <div className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</div>
                        )}
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-10 h-10 rounded-full bg-green-50 hover:bg-green-600 text-green-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default Products;
