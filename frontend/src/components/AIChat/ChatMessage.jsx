import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Sparkles } from 'lucide-react';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { getFallbackImage } from '../../utils/imageHelper';
import toast from 'react-hot-toast';

const ChatMessage = ({ message }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);

  const isUser = message.sender === 'user';

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => toast.success(`Added ${product.name} to cart`))
      .catch(() => toast.error('Failed to add item to cart'));
  };

  const handleWishlistToggle = (product) => {
    if (!isAuthenticated) {
      toast.error('Please log in to manage your wishlist');
      navigate('/login');
      return;
    }

    const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id))
        .unwrap()
        .then(() => toast.success(`Removed ${product.name} from wishlist`))
        .catch(() => toast.error('Failed to update wishlist'));
    } else {
      dispatch(addToWishlist(product._id))
        .unwrap()
        .then(() => toast.success(`Added ${product.name} to wishlist`))
        .catch(() => toast.error('Failed to update wishlist'));
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end w-full">
        <div className="bg-gradient-to-tr from-green-600 to-emerald-700 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] shadow-md text-xs font-medium leading-relaxed">
          {message.text}
        </div>
      </div>
    );
  }

  // Assistant message formatting
  return (
    <div className="flex gap-2.5 items-start w-full">
      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-green-800 to-emerald-950 text-white flex items-center justify-center text-xs shrink-0 select-none shadow-sm mt-0.5">
        🤖
      </div>
      <div className="flex-1 space-y-3 max-w-[90%]">
        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-xs text-gray-800 leading-relaxed space-y-2">
          {message.text && <p className="whitespace-pre-line">{message.text}</p>}
          
          {message.reasoning && (
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 space-y-1 mt-1 text-[11px] text-emerald-900">
              <span className="font-extrabold text-[10px] text-emerald-800 tracking-wide uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" /> AI Insights
              </span>
              <p className="italic leading-relaxed">"{message.reasoning}"</p>
            </div>
          )}

          {message.recommendations && (
            <p className="text-[11px] text-gray-500 font-semibold border-t border-gray-50 pt-1.5 mt-1.5">
              💡 Suggestion: {message.recommendations}
            </p>
          )}
        </div>

        {/* Inline Product Cards */}
        {message.products && message.products.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent -mx-1 px-1">
            {message.products.map((product) => {
              const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
              const discount = product.originalPrice > product.price 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div 
                  key={product._id} 
                  className="w-44 bg-white border border-gray-100 rounded-2xl p-3 flex flex-col justify-between shrink-0 shadow-sm hover:border-green-200 transition-colors relative"
                >
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full z-10 shadow-sm">
                      {discount}% OFF
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button 
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/90 shadow-sm border border-gray-100 hover:text-red-500 text-gray-400 z-10 transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <Link 
                    to={`/products/${product._id}`} 
                    className="bg-gray-50/50 rounded-xl p-2 h-20 flex items-center justify-center mb-2 overflow-hidden"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-contain max-h-full"
                      onError={(e) => { e.target.src = getFallbackImage(product.category, product.name); }}
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="space-y-1.5">
                    <span className="text-[8px] uppercase font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                      {product.category}
                    </span>
                    <Link 
                      to={`/products/${product._id}`} 
                      className="block font-bold text-[10px] text-gray-800 hover:text-green-600 line-clamp-1 leading-normal"
                    >
                      {product.name}
                    </Link>
                    
                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5 text-[9px] text-gray-400">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-600">{product.rating}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-gray-50 mt-1">
                      <span className="font-extrabold text-[11px] text-gray-900">₹{product.price.toLocaleString()}</span>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-6 h-6 rounded-full bg-green-50 hover:bg-green-600 text-green-600 hover:text-white flex items-center justify-center transition-all"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
