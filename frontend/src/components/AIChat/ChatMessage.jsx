import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Sparkles, Check, X } from 'lucide-react';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { getFallbackImage } from '../../utils/imageHelper';
import toast from 'react-hot-toast';

// Helper to format text with Markdown bold (**text**), bullet points, and checkmarks
const FormattedText = ({ content }) => {
  if (!content) return null;

  // Split content into lines for structured paragraph and list rendering
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed text-xs">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Parse bold syntax **text**
        const parseBold = (str) => {
          const parts = str.split(/(\*\*.*?\*\*)/g);
          return parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-extrabold text-gray-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });
        };

        // Bullet point lines
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('* ')) {
          const listText = trimmed.replace(/^[-•*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div className="flex-1 text-gray-800 font-medium">{parseBold(listText)}</div>
            </div>
          );
        }

        // Pros / Cons or Checkmarks
        if (trimmed.startsWith('✔') || trimmed.startsWith('✓')) {
          return (
            <div key={idx} className="flex items-start gap-1.5 text-emerald-700 font-semibold my-0.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>{parseBold(trimmed.slice(1).trim())}</span>
            </div>
          );
        }

        if (trimmed.startsWith('✖') || trimmed.startsWith('✕')) {
          return (
            <div key={idx} className="flex items-start gap-1.5 text-rose-700 font-semibold my-0.5">
              <X className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
              <span>{parseBold(trimmed.slice(1).trim())}</span>
            </div>
          );
        }

        // Section Headers (e.g. "Reason:", "Pros:", "Cons:")
        if (/^(Reason|Pros|Cons|Recommendations|Next steps|Shopping Advice|Price Comparison|Budget Summary):/i.test(trimmed)) {
          return (
            <div key={idx} className="font-extrabold text-[11px] uppercase tracking-wider text-emerald-800 pt-1 border-t border-gray-100/60 mt-1.5">
              {parseBold(trimmed)}
            </div>
          );
        }

        return <p key={idx} className="text-gray-800">{parseBold(line)}</p>;
      })}
    </div>
  );
};

const ChatMessage = ({ message, onFollowUpClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);

  const isUser = message.sender === 'user';
  const timestamp = message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
      <div className="flex flex-col items-end w-full animate-in fade-in slide-in-from-bottom-1 duration-200">
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-600 to-green-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] shadow-md text-xs font-semibold leading-relaxed">
          {message.text}
        </div>
        <span className="text-[9px] text-gray-400 font-medium mt-1 mr-1">{timestamp}</span>
      </div>
    );
  }

  // Assistant message formatting
  return (
    <div className="flex gap-2.5 items-start w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Bot Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-700 via-green-600 to-emerald-500 text-white flex items-center justify-center text-xs shrink-0 select-none shadow-md border border-emerald-400/20 mt-0.5">
        🤖
      </div>

      <div className="flex-1 space-y-2.5 max-w-[88%]">
        {/* Main Bubble */}
        <div className="bg-white/95 border border-emerald-950/10 rounded-2xl rounded-tl-none px-4 py-3 shadow-md text-xs text-gray-900 leading-relaxed space-y-2">
          {message.text && <FormattedText content={message.text} />}

          {/* AI Insights block */}
          {message.reasoning && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50/70 border border-emerald-100 rounded-xl p-3 space-y-1 text-[11px] text-emerald-950 shadow-inner">
              <span className="font-extrabold text-[10px] text-emerald-800 tracking-wide uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> AI Insights
              </span>
              <p className="italic leading-relaxed">"{message.reasoning}"</p>
            </div>
          )}

          {/* Recommendations tip */}
          {message.recommendations && (
            <div className="text-[11px] text-gray-600 font-semibold border-t border-gray-100 pt-2 mt-2 flex items-start gap-1.5">
              <span className="text-amber-500">💡</span>
              <span className="flex-1">{message.recommendations}</span>
            </div>
          )}

          {/* Smart Interactive Follow-up Chips */}
          {message.followUps && message.followUps.length > 0 && (
            <div className="pt-2 border-t border-gray-100/80 space-y-1.5">
              <p className="text-[10px] uppercase font-extrabold text-emerald-800 tracking-wider">Suggested Next Steps:</p>
              <div className="flex flex-wrap gap-1.5">
                {message.followUps.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onFollowUpClick && onFollowUpClick(chip)}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200/60 rounded-full transition-all duration-150 shadow-sm hover:scale-105 active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className="text-[9px] text-gray-400 font-medium text-right pt-1">
            {timestamp}
          </div>
        </div>

        {/* Inline Product Recommendations Cards */}
        {message.products && message.products.length > 0 && (
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent -mx-1 px-1">
            {message.products.map((product) => {
              const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
              const discount = product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product._id}
                  className="w-44 bg-white border border-emerald-900/10 rounded-2xl p-3 flex flex-col justify-between shrink-0 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all relative group"
                >
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full z-10 shadow-sm">
                      {discount}% OFF
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/90 shadow-sm border border-gray-100 hover:text-rose-500 text-gray-400 z-10 transition-colors"
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <Link
                    to={`/products/${product._id}`}
                    className="bg-gray-50/70 rounded-xl p-2 h-20 flex items-center justify-center mb-2 overflow-hidden group-hover:scale-105 transition-transform"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain max-h-full"
                      onError={(e) => { e.target.src = getFallbackImage(product.category, product.name); }}
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      {product.category}
                    </span>
                    <Link
                      to={`/products/${product._id}`}
                      className="block font-bold text-[10px] text-gray-800 hover:text-emerald-600 line-clamp-1 leading-normal"
                    >
                      {product.name}
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-0.5 text-[9px] text-gray-400">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-600">{product.rating}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-gray-50 mt-1">
                      <span className="font-extrabold text-[11px] text-gray-900">₹{product.price.toLocaleString()}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-6 h-6 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
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
