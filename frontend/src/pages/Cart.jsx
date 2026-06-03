import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateCartItemQty, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getFallbackImage } from '../utils/imageHelper';
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, subtotal, tax, shipping, total } = useSelector((state) => state.cart);

  const handleQtyChange = (productId, currentQty, type) => {
    let newQty = type === 'inc' ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) return;

    dispatch(updateCartItemQty({ productId, quantity: newQty }))
      .unwrap()
      .then(() => toast.success('Cart updated'))
      .catch((err) => toast.error(err || 'Failed to update quantity'));
  };

  const handleRemove = (productId, productName) => {
    dispatch(removeFromCart(productId))
      .unwrap()
      .then(() => toast.success(`Removed ${productName} from cart`))
      .catch((err) => toast.error(err || 'Failed to remove item'));
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart())
        .unwrap()
        .then(() => toast.success('Cart cleared'))
        .catch((err) => toast.error(err || 'Failed to clear cart'));
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mt-8">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Before you proceed to checkout, you must add some products to your shopping cart. You will find lots of interesting products on our shop page.
        </p>
        <Link to="/products" className="inline-block">
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 font-semibold shadow-md shadow-green-100 flex items-center gap-2">
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Cart items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-sm">
                Cart Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
              <button 
                onClick={handleClear} 
                className="text-xs text-red-500 hover:text-red-700 font-bold transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Cart
              </button>
            </div>

            <div className="divide-y divide-gray-50">
              {items.map((item) => {
                if (!item.product) return null;
                const { _id, name, price, originalPrice, image, category } = item.product;
                const discount = originalPrice > price 
                  ? Math.round(((originalPrice - price) / originalPrice) * 100)
                  : 0;

                return (
                  <div key={_id} className="p-6 flex flex-col sm:flex-row items-center gap-6 group hover:bg-gray-50/50 transition-colors">
                    {/* Image */}
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-100 shrink-0">
                      <img 
                        src={image || getFallbackImage(category, name)} 
                        alt={name} 
                        className="object-contain max-h-full" 
                        onError={(e) => { e.target.src = getFallbackImage(category, name); }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow space-y-1 text-center sm:text-left">
                      <span className="text-[10px] uppercase font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        {category}
                      </span>
                      <Link to={`/products/${_id}`} className="block">
                        <h3 className="font-bold text-gray-800 hover:text-green-600 line-clamp-2 transition-colors text-sm">
                          {name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                        <span className="font-extrabold text-gray-900">₹{price.toLocaleString()}</span>
                        {discount > 0 && (
                          <span className="text-xs text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-inner">
                      <button 
                        onClick={() => handleQtyChange(_id, item.quantity, 'dec')}
                        disabled={loading}
                        className="p-2 hover:bg-gray-50 text-gray-500 disabled:opacity-50"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 font-bold text-gray-800 text-xs">{item.quantity}</span>
                      <button 
                        onClick={() => handleQtyChange(_id, item.quantity, 'inc')}
                        disabled={loading}
                        className="p-2 hover:bg-gray-50 text-gray-500 disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total item cost and Delete */}
                    <div className="text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-2 w-full sm:w-auto shrink-0">
                      <div className="font-black text-gray-900">₹{(price * item.quantity).toLocaleString()}</div>
                      <button 
                        onClick={() => handleRemove(_id, name)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Remove from Cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order summary */}
        <div className="lg:col-span-1">
          <Card className="border-gray-100 rounded-3xl shadow-sm bg-white overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <h2 className="font-black text-gray-800 text-lg border-b border-gray-50 pb-4">Order Summary</h2>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Price ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span className="font-bold text-gray-900">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-green-600">
                    {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-orange-500 bg-orange-50 p-2 rounded border border-orange-100">
                    Add items worth ₹{(1500 - subtotal).toLocaleString()} more to get FREE shipping!
                  </p>
                )}
              </div>

              <hr className="border-gray-50" />

              <div className="flex justify-between items-center text-lg font-black text-gray-900">
                <span>Total Amount</span>
                <span className="text-green-600">₹{total.toLocaleString()}</span>
              </div>

              <Button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 font-bold shadow-md shadow-green-100 flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Cart;
