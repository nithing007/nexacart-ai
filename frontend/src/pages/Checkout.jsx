import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, resetOrderSuccess, fetchMyOrders } from '../redux/slices/ordersSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { loadUserBudget, calculateBudgetMetrics, formatINR } from '../ai/budgetEngine';
import { CreditCard, MapPin, Sparkles, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { items, subtotal, tax, shipping, total } = useSelector((state) => state.cart);
  const { orders, success, loading, error } = useSelector((state) => state.orders);

  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  // AI Checkout Analysis Modal State
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  // Fetch orders for budget calculation
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  // If cart is empty, redirect back
  useEffect(() => {
    if (items.length === 0 && !success) {
      navigate('/cart');
    }
  }, [items, success, navigate]);

  // Handle successful order creation
  useEffect(() => {
    if (success) {
      dispatch(clearCart()); // Clear cart in state & DB
      dispatch(resetOrderSuccess()); // Reset success flag in orders slice
      toast.success('Order placed successfully!');
      navigate('/orders');
    }
  }, [success, dispatch, navigate]);

  const executeOrderDispatch = () => {
    setShowAnalysisModal(false);
    const orderItems = items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      image: item.product.image,
      price: item.product.price,
    }));

    dispatch(
      createOrder({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total,
      })
    );
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }

    // Load active budget
    const userId = user?._id || user?.id || 'guest';
    const userBudget = loadUserBudget(userId);
    const metrics = calculateBudgetMetrics(orders, userBudget);

    const purchaseTotal = total;
    const remainingBudget = metrics.remainingBudget;
    const budgetAfterPurchase = remainingBudget - purchaseTotal;
    const isExceeded = budgetAfterPurchase < 0;

    const recommendation = !isExceeded
      ? `This purchase is within your budget. However, you will have only ${formatINR(budgetAfterPurchase)} remaining for the rest of the month.`
      : `This purchase exceeds your monthly budget by ${formatINR(Math.abs(budgetAfterPurchase))}.`;

    setAnalysisData({
      purchaseTotal,
      remainingBudget,
      budgetAfterPurchase,
      isExceeded,
      recommendation,
    });

    setShowAnalysisModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-gray-900">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Columns: Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2 border-b border-gray-50 pb-4">
              <MapPin className="w-5 h-5 text-emerald-600" /> Shipping Details
            </h2>
            <div className="space-y-2">
              <Label htmlFor="address">Full Delivery Address</Label>
              <Input 
                id="address" 
                placeholder="123 Main St, Apartment 4B, City, Postal Code"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="bg-gray-50 border-gray-200 py-6"
                required
              />
              <p className="text-[10px] text-gray-400">
                Please enter a complete address including city name and PIN code to ensure prompt delivery.
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2 border-b border-gray-50 pb-4">
              <CreditCard className="w-5 h-5 text-emerald-600" /> Payment Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'cod', label: 'Cash on Delivery', desc: 'Pay with cash upon delivery' },
                { id: 'upi', label: 'UPI / NetBanking', desc: 'Pay instantly via UPI (Simulated)' }
              ].map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setPaymentMethod(method.label)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === method.label
                      ? 'border-emerald-600 bg-emerald-50/30'
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      id={method.id}
                      checked={paymentMethod === method.label}
                      onChange={() => setPaymentMethod(method.label)}
                      className="accent-emerald-600 cursor-pointer"
                    />
                    <label htmlFor={method.id} className="font-bold text-sm text-gray-800 cursor-pointer">
                      {method.label}
                    </label>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 pl-5">{method.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order summary & Submit */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-gray-100 rounded-3xl shadow-sm bg-white overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <h2 className="font-black text-gray-800 text-lg border-b border-gray-50 pb-4">Items Summary</h2>

              {/* Items list */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 divide-y divide-gray-50">
                {items.map((item) => {
                  if (!item.product) return null;
                  return (
                    <div key={item.product._id} className="flex justify-between items-center text-xs py-2 first:pt-0">
                      <div className="space-y-0.5">
                        <p className="font-bold text-gray-800 line-clamp-1">{item.product.name}</p>
                        <p className="text-gray-400">Qty: {item.quantity} x ₹{item.product.price.toLocaleString()}</p>
                      </div>
                      <span className="font-bold text-gray-900 shrink-0">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>

              <hr className="border-gray-50" />

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span className="font-bold text-gray-900">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-bold text-emerald-600">
                    {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <hr className="border-gray-50" />

              <div className="flex justify-between items-center text-lg font-black text-gray-900">
                <span>Total</span>
                <span className="text-emerald-600">₹{total.toLocaleString()}</span>
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-100">
                  {error}
                </div>
              )}

              <Button 
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-6 font-bold shadow-md shadow-emerald-100 flex items-center justify-center gap-2"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </div>

      </form>

      {/* Feature 7: AI Checkout Analysis Modal */}
      <AnimatePresence>
        {showAnalysisModal && analysisData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 overflow-hidden space-y-6 p-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-gray-900">AI Budget Analysis</h3>
                    <p className="text-[10px] text-gray-400 font-semibold">Pre-purchase financial evaluation</p>
                  </div>
                </div>
                <button onClick={() => setShowAnalysisModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Financial Stats Breakdown */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Purchase Total</span>
                  <p className="font-black text-sm text-gray-900 mt-0.5">{formatINR(analysisData.purchaseTotal)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Remaining</span>
                  <p className="font-black text-sm text-emerald-700 mt-0.5">{formatINR(analysisData.remainingBudget)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">After Purchase</span>
                  <p className={`font-black text-sm mt-0.5 ${analysisData.isExceeded ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {formatINR(analysisData.budgetAfterPurchase)}
                  </p>
                </div>
              </div>

              {/* AI Recommendation Message */}
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${analysisData.isExceeded ? 'bg-rose-50 border-rose-200 text-rose-950' : 'bg-emerald-50 border-emerald-200 text-emerald-950'}`}>
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                  {analysisData.isExceeded ? <AlertTriangle className="w-4 h-4 text-rose-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  <span>AI Recommendation</span>
                </div>
                <p className="font-semibold">{analysisData.recommendation}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                {!analysisData.isExceeded ? (
                  <>
                    <Button
                      onClick={executeOrderDispatch}
                      disabled={loading}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-5 font-bold text-xs shadow-md"
                    >
                      {loading ? 'Placing Order...' : 'Continue Purchase'}
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        onClick={() => navigate('/products')}
                        variant="outline"
                        className="w-full text-xs font-semibold rounded-xl border-gray-200"
                      >
                        View Cheaper Alternatives
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setShowAnalysisModal(false)}
                        variant="ghost"
                        className="w-full text-xs font-semibold text-gray-500"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        onClick={() => navigate('/products')}
                        variant="outline"
                        className="w-full text-xs font-semibold rounded-xl border-gray-200"
                      >
                        View Alternatives
                      </Button>
                      <Button
                        type="button"
                        onClick={() => navigate('/cart')}
                        variant="outline"
                        className="w-full text-xs font-semibold rounded-xl border-gray-200"
                      >
                        Remove Items
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        onClick={() => navigate('/budget-assistant')}
                        variant="outline"
                        className="w-full text-xs font-semibold border-emerald-300 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100"
                      >
                        Increase Budget
                      </Button>
                      <Button
                        onClick={executeOrderDispatch}
                        disabled={loading}
                        className="w-full bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs shadow-md"
                      >
                        Proceed Anyway
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
