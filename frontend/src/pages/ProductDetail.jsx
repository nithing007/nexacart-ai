import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProductDetails, clearProductDetails } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { fetchWishlist } from '../redux/slices/wishlistSlice';
import { Heart, ShoppingCart, Star, ArrowLeft, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getFallbackImage } from '../utils/imageHelper';
import api from '../services/api';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [aiReasoning, setAiReasoning] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProductDetails(id));

    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, id]);

  // Fetch AI Recommendations based on category once product is loaded
  useEffect(() => {
    if (product && isAuthenticated) {
      setAiLoading(true);
      api.get(`/ai/recommendations`)
        .then((res) => {
          // Filter out current product
          const filtered = (res.data.recommendations || []).filter(p => p._id !== product._id);
          setAiRecommendations(filtered.slice(0, 4));
          setAiReasoning(res.data.reasoning || '');
        })
        .catch((err) => {
          console.warn('Failed to load AI recommendations:', err);
        })
        .finally(() => {
          setAiLoading(false);
        });
    }
  }, [product, isAuthenticated]);

  const handleQtyChange = (type) => {
    if (type === 'inc') {
      if (quantity < (product?.countInStock || 10)) {
        setQuantity(q => q + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity(q => q - 1);
      }
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity }))
      .unwrap()
      .then(() => toast.success(`Added ${quantity} of ${product.name} to cart`))
      .catch((err) => toast.error(err || 'Failed to add to cart'));
  };

  const handleWishlistToggle = () => {
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

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse max-w-6xl mx-auto py-6">
        <div className="h-6 bg-gray-100 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-[400px] bg-gray-100 rounded-3xl"></div>
          <div className="space-y-6">
            <div className="h-4 bg-gray-100 rounded w-1/6"></div>
            <div className="h-8 bg-gray-100 rounded w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            <div className="h-20 bg-gray-100 rounded w-full"></div>
            <div className="h-10 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <div className="bg-red-50 text-red-600 p-6 rounded-3xl border border-red-100">
          <p className="font-semibold">{error}</p>
        </div>
        <Link to="/products">
          <Button className="bg-green-600 text-white rounded-xl flex items-center gap-2 mx-auto">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  if (!product) return null;

  const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
  const discount = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-4">
      {/* Back navigation */}
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 font-semibold transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      {/* Main product overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        
        {/* Left Column: Image */}
        <div className="bg-gray-50 rounded-3xl p-8 flex items-center justify-center border border-gray-100 relative h-[450px]">
          {discount > 0 && (
            <span className="absolute top-6 left-6 bg-red-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-md z-10">
              {discount}% OFF
            </span>
          )}
          <img 
            src={product.image || getFallbackImage(product.category, product.name)} 
            alt={product.name} 
            className="object-contain max-h-full max-w-full rounded-2xl hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.src = getFallbackImage(product.category, product.name); }}
          />
        </div>

        {/* Right Column: Information */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-wider font-extrabold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400 font-semibold">
                {product.rating || 4.5} ({product.numReviews || 120} verified reviews)
              </span>
              <span className="h-4 w-px bg-gray-200"></span>
              
              {/* Stock status */}
              {product.countInStock > 0 ? (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">In Stock</span>
              ) : (
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">Out of Stock</span>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                {discount > 0 && (
                  <span className="text-gray-400 line-through text-lg font-medium">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">Price is inclusive of all taxes.</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-gray-100">
            {/* Quantity Selector */}
            {product.countInStock > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-600">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-inner">
                  <button 
                    onClick={() => handleQtyChange('dec')}
                    className="px-4 py-2 hover:bg-gray-100 font-bold transition-colors text-gray-600"
                  >
                    -
                  </button>
                  <span className="px-6 font-bold text-gray-800 text-sm">{quantity}</span>
                  <button 
                    onClick={() => handleQtyChange('inc')}
                    className="px-4 py-2 hover:bg-gray-100 font-bold transition-colors text-gray-600"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  ({product.countInStock} items available)
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleAddToCart}
                disabled={product.countInStock <= 0}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-xl py-6 font-bold shadow-md shadow-green-100 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>

              <Button 
                onClick={handleWishlistToggle}
                variant="outline"
                className={`rounded-xl py-6 px-6 font-bold border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 transition-all ${
                  isWishlisted ? 'text-red-500 border-red-200 bg-red-50 hover:bg-red-100' : 'text-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </Button>
            </div>
          </div>

          {/* Delivery perks */}
          <div className="grid grid-cols-3 gap-4 pt-6 text-center text-xs text-gray-500">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-5 h-5 text-green-600" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RefreshCw className="w-5 h-5 text-green-600" />
              <span>7 Days Return</span>
            </div>
          </div>

        </div>
      </div>

      {/* AI Recommendations Module */}
      {isAuthenticated && (
        <section className="bg-gradient-to-r from-purple-50 via-white to-purple-50 p-8 rounded-3xl shadow-sm border border-purple-100 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />
            <h2 className="text-xl font-bold text-gray-800">AI recommendations based on this item</h2>
          </div>
          
          {aiReasoning && (
            <p className="text-sm bg-white/70 backdrop-blur-sm p-4 rounded-2xl text-purple-900 border border-purple-100 leading-relaxed max-w-3xl italic">
              " {aiReasoning} "
            </p>
          )}

          {aiLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="bg-white rounded-2xl h-48 border border-purple-100 animate-pulse p-4">
                  <div className="h-2/3 bg-gray-100 rounded-xl mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : aiRecommendations.length === 0 ? (
            <p className="text-sm text-gray-500">No other recommendations available in this category currently.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {aiRecommendations.map((item) => (
                <Card key={item._id} className="border-purple-100 hover:border-purple-300 hover:shadow-md transition-all rounded-2xl bg-white overflow-hidden flex flex-col justify-between">
                  <Link to={`/products/${item._id}`} className="bg-gray-50 p-3 h-28 flex items-center justify-center">
                    <img 
                      src={item.image || getFallbackImage(item.category, item.name)} 
                      alt={item.name} 
                      className="object-contain h-full" 
                      onError={(e) => { e.target.src = getFallbackImage(item.category, item.name); }}
                    />
                  </Link>
                  <div className="p-4 space-y-2 flex flex-col justify-between flex-grow">
                    <Link to={`/products/${item._id}`} className="block">
                      <h4 className="font-bold text-xs text-gray-800 hover:text-purple-600 line-clamp-2 leading-tight">
                        {item.name}
                      </h4>
                    </Link>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-extrabold text-sm text-gray-900">₹{item.price.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-400 font-semibold bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      )}

    </div>
  );
};

export default ProductDetail;
