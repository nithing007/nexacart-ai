import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { Sparkles, Heart, ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import api from '../services/api';
import toast from 'react-hot-toast';

const AiRecommendations = () => {
  const dispatch = useDispatch();
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [reasoning, setReasoning] = useState('');
  const [error, setError] = useState(null);

  const fetchAiPicks = () => {
    setLoading(true);
    setError(null);
    api.get('/ai/recommendations')
      .then((res) => {
        setRecommendations(res.data.recommendations || []);
        setReasoning(res.data.reasoning || '');
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to generate recommendations');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAiPicks();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => toast.success(`Added ${product.name} to cart`))
      .catch((err) => toast.error(err || 'Failed to add to cart'));
  };

  const handleWishlistToggle = (product) => {
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
      <div className="space-y-6 max-w-5xl mx-auto py-6 animate-pulse">
        <div className="h-32 bg-gray-100 rounded-3xl"></div>
        <div className="h-6 bg-gray-100 rounded w-1/4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="bg-white rounded-3xl h-64 border border-gray-100 p-4">
              <div className="h-2/3 bg-gray-100 rounded-2xl mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-2/3"></div>
            </div>
          ))}
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
        <Button onClick={fetchAiPicks} className="bg-green-600 text-white rounded-xl">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Hero Intro */}
      <section className="bg-gradient-to-r from-purple-700 via-indigo-700 to-violet-800 rounded-3xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-xl">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5" /> Powered by NexaCart AI
          </span>
          <h1 className="text-3xl md:text-4xl font-black leading-tight">Your Personalized AI Picks</h1>
          <p className="text-purple-100 text-sm md:text-base">
            We analyze your browsing patterns, wishlist activities, and purchase history to suggest products custom-tailored to your exact interests.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-6 translate-y-6 hidden md:block">
          <Sparkles className="w-64 h-64" />
        </div>
      </section>

      {/* AI Reasoning box */}
      {reasoning && (
        <section className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
          <h3 className="font-bold text-purple-950 text-sm mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" /> AI Insights
          </h3>
          <p className="text-purple-900 text-xs sm:text-sm leading-relaxed italic">
            " {reasoning} "
          </p>
        </section>
      )}

      {/* Products list */}
      <section className="space-y-6">
        <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
          Recommended for You
        </h2>

        {recommendations.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center space-y-4 shadow-sm">
            <h3 className="font-bold text-lg text-gray-800">No Recommendations Yet</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Start searching for products or adding them to your wishlist/cart so our AI recommendation engine can learn about your interests.
            </p>
            <Link to="/products">
              <Button className="bg-green-600 text-white rounded-xl">Go to Shop</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((product) => {
              const isWishlisted = wishlistProducts.some((item) => item._id === product._id);

              return (
                <Card key={product._id} className="border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col justify-between h-full rounded-3xl relative bg-white">
                  
                  {/* Wishlist button */}
                  <button 
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-white text-gray-400 hover:text-red-500"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <Link to={`/products/${product._id}`} className="bg-gray-50 p-4 h-36 flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="object-contain max-h-full" />
                  </Link>

                  {/* Details */}
                  <CardContent className="p-4 flex flex-col justify-between flex-grow">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100/50">
                        {product.category}
                      </span>
                      <Link to={`/products/${product._id}`} className="block">
                        <h3 className="font-bold text-gray-800 hover:text-purple-600 line-clamp-2 transition-colors text-xs leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-gray-700">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-3">
                      <div className="font-extrabold text-sm text-gray-900">₹{product.price.toLocaleString()}</div>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-8 h-8 rounded-full bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>

                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default AiRecommendations;
