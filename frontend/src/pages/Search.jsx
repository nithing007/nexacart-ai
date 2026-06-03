import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { Search as SearchIcon, Heart, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import toast from 'react-hot-toast';

const Search = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { products, loading, error } = useSelector((state) => state.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts({ search: query }));
  }, [dispatch, query]);

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

  if (loading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto py-6 animate-pulse">
        <div className="h-6 bg-gray-100 rounded w-1/4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="bg-white rounded-3xl h-64 border border-gray-100 p-4 animate-pulse">
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
        <Button onClick={() => dispatch(fetchProducts({ search: query }))} className="bg-green-600 text-white rounded-xl">
          Retry Search
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Search Results</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Found <span className="font-bold text-gray-800">{products.length}</span> results matching "<span className="font-bold text-green-600">{query}</span>"
          </p>
        </div>
        <Link to="/products" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600 font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Browse Catalog
        </Link>
      </div>

      {products.length === 0 ? (
        // Empty state
        <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <SearchIcon className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-gray-800">No Match Found</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            We couldn't find any products matching your search term. Try checking your spelling or search for popular terms like "iPhone" or "Avocado".
          </p>
          <Link to="/products">
            <Button className="bg-green-600 text-white rounded-xl px-6">Explore Products</Button>
          </Link>
        </div>
      ) : (
        // Results grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => {
            const isWishlisted = wishlistProducts.some((item) => item._id === product._id);
            const discount = product.originalPrice > product.price 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <Card key={product._id} className="border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col justify-between h-full rounded-3xl relative bg-white">
                
                {/* Discount Badge */}
                {discount > 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold px-2 py-1 rounded-full shadow-sm z-10">
                    {discount}% OFF
                  </span>
                )}

                {/* Wishlist toggle */}
                <button 
                  onClick={() => handleWishlistToggle(product)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-white text-gray-400 hover:text-red-500"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Product Image */}
                <Link to={`/products/${product._id}`} className="bg-gray-50 p-4 h-40 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="object-contain max-h-full" />
                </Link>

                {/* Details */}
                <CardContent className="p-4 flex flex-col justify-between flex-grow">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                    <Link to={`/products/${product._id}`} className="block">
                      <h3 className="font-bold text-gray-800 hover:text-green-600 line-clamp-2 transition-colors text-xs leading-snug">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 pt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-700">{product.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-3">
                    <div className="font-extrabold text-sm text-gray-900">₹{product.price.toLocaleString()}</div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-8 h-8 rounded-full bg-green-50 hover:bg-green-600 text-green-600 hover:text-white flex items-center justify-center transition-all"
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

    </div>
  );
};

export default Search;
