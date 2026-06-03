import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getFallbackImage } from '../utils/imageHelper';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId, productName) => {
    dispatch(removeFromWishlist(productId))
      .unwrap()
      .then(() => toast.success(`Removed ${productName} from wishlist`))
      .catch((err) => toast.error(err || 'Failed to remove from wishlist'));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success(`Moved ${product.name} to cart`);
        dispatch(removeFromWishlist(product._id));
      })
      .catch((err) => toast.error(err || 'Failed to add to cart'));
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto py-6">
        <div className="h-8 bg-gray-100 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="bg-white rounded-3xl h-64 border border-gray-100 animate-pulse p-4">
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
        <Button onClick={() => dispatch(fetchWishlist())} className="bg-green-600 text-white rounded-xl">
          Retry
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mt-8">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
          <Heart className="w-10 h-10 fill-red-500 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-800">Your Wishlist is Empty</h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Keep track of items you love. Save them here, check back later, or add them directly to your cart at any time.
        </p>
        <Link to="/products" className="inline-block">
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 font-semibold shadow-md shadow-green-100 flex items-center gap-2">
            Explore Products <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
        <Heart className="text-red-500 fill-red-500 w-7 h-7" /> My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => {
          if (!product) return null;
          const { _id, name, price, image, category } = product;

          return (
            <Card key={_id} className="border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between h-full rounded-3xl group relative">
              {/* Product Image */}
              <div className="bg-gray-50 p-4 h-40 flex items-center justify-center relative">
                <button 
                  onClick={() => handleRemove(_id, name)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <img 
                  src={image || getFallbackImage(category, name)} 
                  alt={name} 
                  className="object-contain max-h-full" 
                  onError={(e) => { e.target.src = getFallbackImage(category, name); }}
                />
              </div>

              {/* Card Content */}
              <CardContent className="p-4 flex flex-col justify-between flex-grow">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    {category}
                  </span>
                  <Link to={`/products/${_id}`} className="block">
                    <h3 className="font-bold text-gray-800 hover:text-green-600 line-clamp-2 transition-colors text-sm">
                      {name}
                    </h3>
                  </Link>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-50 mt-3">
                  <div className="font-extrabold text-lg text-gray-900">₹{price.toLocaleString()}</div>
                  <Button 
                    onClick={() => handleMoveToCart(product)}
                    className="w-full bg-green-50 hover:bg-green-600 text-green-600 hover:text-white rounded-xl py-4 font-bold border-transparent hover:border-transparent transition-all flex items-center justify-center gap-1 text-xs shadow-inner"
                  >
                    <ShoppingCart className="w-4 h-4" /> Move to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
