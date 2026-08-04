import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, resetOrderSuccess, fetchMyOrders } from '../redux/slices/ordersSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { loadUserBudget, calculateBudgetMetrics, formatINR } from '../ai/budgetEngine';
import api from '../services/api';
import { 
  MapPin, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  RefreshCcw,
  ArrowRight,
  Lock,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Helper to dynamically load Razorpay Checkout SDK
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { items, subtotal, tax, shipping, total } = useSelector((state) => state.cart);
  const { orders, success, loading: orderLoading } = useSelector((state) => state.orders);

  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // Default & Recommended

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  // AI Checkout Analysis Modal State
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  // Fetch user orders for budget calculations
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !success) {
      navigate('/cart');
    }
  }, [items, success, navigate]);

  // Handle COD Placement Success
  useEffect(() => {
    if (success && paymentMethod === 'Cash on Delivery') {
      dispatch(clearCart());
      dispatch(resetOrderSuccess());
      toast.success('Order placed successfully (Cash on Delivery)!');
      navigate('/orders');
    }
  }, [success, paymentMethod, dispatch, navigate]);

  // Calculate current user budget
  const userId = user?._id || user?.id || 'guest';
  const userBudget = loadUserBudget(userId);
  const metrics = calculateBudgetMetrics(orders, userBudget);

  // Executes Razorpay Test Checkout or COD Flow
  const executePaymentFlow = async () => {
    setShowAnalysisModal(false);
    setPaymentFailed(false);

    const orderItems = items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      image: item.product.image,
      price: item.product.price,
    }));

    const orderPayload = {
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod === 'Cash on Delivery' ? 'Cash on Delivery' : 'Razorpay',
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shipping,
      totalPrice: total,
    };

    // Cash on Delivery Direct Flow
    if (paymentMethod === 'Cash on Delivery') {
      dispatch(createOrder(orderPayload));
      return;
    }

    // Razorpay Payment Flow
    try {
      setIsProcessingPayment(true);
      toast.loading('Preparing Secure Payment...', { id: 'rzp-init' });

      // 1. Load Razorpay SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.dismiss('rzp-init');
        toast.error('Failed to load Razorpay SDK. Please check your network connection.');
        setIsProcessingPayment(false);
        return;
      }

      // 2. Call backend /api/payment/create-order
      const res = await api.post('/payment/create-order', {
        amount: total,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`
      });

      toast.dismiss('rzp-init');

      if (!res.data || !res.data.success) {
        toast.error(res.data?.message || 'Unable to initialize Razorpay payment order.');
        setIsProcessingPayment(false);
        return;
      }

      const { key, order_id, amount, currency } = res.data;

      // 3. Open Razorpay Standard Checkout Popup
      const options = {
        key: key || import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_NexaCartKeyId',
        amount: amount, // Amount in paise
        currency: currency || 'INR',
        name: 'NexaCart AI',
        description: 'Secure Payment',
        image: 'https://cdn-icons-png.flaticon.com/512/1170/1170576.png',
        order_id: order_id,
        prefill: {
          name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.name || 'Customer',
          email: user?.email || '',
          contact: user?.phoneNumber || ''
        },
        theme: {
          color: '#059669' // Emerald green theme matching NexaCart AI
        },
        handler: async (response) => {
          try {
            setIsVerifyingPayment(true);
            toast.loading('Verifying Payment Status...', { id: 'rzp-verify' });

            // 4. Call backend /api/payment/verify
            const verifyRes = await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderPayload
            });

            toast.dismiss('rzp-verify');

            if (verifyRes.data.success) {
              dispatch(clearCart());
              toast.success('Payment Verified & Order Confirmed!');
              navigate('/payment-success', {
                state: {
                  orderId: verifyRes.data.orderId || verifyRes.data.order?._id,
                  paymentId: response.razorpay_payment_id,
                  amount: total,
                  estimatedDelivery: '3 Business Days (2:00 PM – 7:00 PM)'
                }
              });
            } else {
              setPaymentFailed(true);
              toast.error(verifyRes.data.message || 'Payment verification failed.');
            }
          } catch (err) {
            console.error('Razorpay verification error:', err);
            toast.dismiss('rzp-verify');
            setPaymentFailed(true);
            toast.error(err.response?.data?.message || 'Payment verification failed.');
          } finally {
            setIsVerifyingPayment(false);
            setIsProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
            toast('Payment session cancelled by user', { icon: 'ℹ️' });
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on('payment.failed', (response) => {
        console.error('Razorpay Payment Failed Event:', response.error);
        setIsProcessingPayment(false);
        setPaymentFailed(true);
      });

      razorpayInstance.open();

    } catch (err) {
      console.error('Razorpay Order Creation Error:', err);
      toast.dismiss('rzp-init');
      toast.error(err.response?.data?.message || 'Failed to prepare secure payment. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  const handleCheckoutClick = (method) => {
    if (!shippingAddress.trim()) {
      toast.error('Please enter a complete shipping address');
      return;
    }
    setPaymentMethod(method);

    // AI Budget Analysis
    const purchaseTotal = total;
    const remainingBudget = metrics.remainingBudget;
    const budgetAfterPurchase = remainingBudget - purchaseTotal;
    const isExceeded = budgetAfterPurchase < 0;

    const recommendation = !isExceeded
      ? `This purchase is within your monthly spending limit. You will have ${formatINR(budgetAfterPurchase)} remaining.`
      : `This purchase exceeds your monthly budget limit by ${formatINR(Math.abs(budgetAfterPurchase))}.`;

    setAnalysisData({
      monthlyBudget: metrics.monthlyBudget,
      spentSoFar: metrics.totalSpent,
      purchaseTotal,
      remainingBudget,
      budgetAfterPurchase,
      estimatedSavings: metrics.estimatedSavings || Math.round(total * 0.12),
      isExceeded,
      recommendation,
    });

    setShowAnalysisModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-2 font-sans relative">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Checkout</h1>
          <p className="text-xs text-slate-500 font-medium">Razorpay Secure Payment Gateway</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit Encrypted Razorpay Checkout</span>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Section: Delivery Address */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <MapPin className="w-5 h-5 text-emerald-600" /> 1. Delivery Address
            </h2>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-xs font-bold text-slate-700">Full Shipping Address</Label>
              <Input 
                id="address" 
                placeholder="House/Flat No., Street, Landmark, City, State, PIN Code"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="bg-slate-50 border-slate-200 py-6 text-xs"
                required
              />
              <p className="text-[11px] text-slate-400">
                Deliver to: <span className="font-semibold text-slate-700">{user?.firstName} {user?.lastName} ({user?.email})</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary & Action */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-100 rounded-3xl shadow-sm bg-white overflow-hidden">
            <CardContent className="p-6 space-y-5">
              <h2 className="font-black text-slate-900 text-base border-b border-slate-100 pb-3">Order Summary</h2>

              {/* Items List */}
              <div className="space-y-3 max-h-52 overflow-y-auto pr-1 divide-y divide-slate-50">
                {items.map((item) => {
                  if (!item.product) return null;
                  return (
                    <div key={item.product._id} className="flex justify-between items-center text-xs py-2 first:pt-0">
                      <div className="space-y-0.5 max-w-[180px]">
                        <p className="font-bold text-slate-800 truncate">{item.product.name}</p>
                        <p className="text-slate-400">Qty: {item.quantity} x ₹{item.product.price?.toLocaleString('en-IN')}</p>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">
                        ₹{((item.product.price || 0) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>

              <hr className="border-slate-100" />

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span className="font-bold text-slate-900">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-emerald-600">
                    {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex justify-between items-center text-lg font-black text-slate-900">
                <span>Grand Total</span>
                <span className="text-emerald-600">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div className="space-y-3">
                <Button 
                  type="button"
                  onClick={() => handleCheckoutClick('UPI')}
                  disabled={isProcessingPayment || isVerifyingPayment || orderLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-6 font-bold text-xs shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  {isProcessingPayment || isVerifyingPayment ? (
                    <>
                      <RefreshCcw className="w-4 h-4 animate-spin" /> Preparing Secure Payment...
                    </>
                  ) : (
                    <>
                      Pay via Razorpay (₹{total.toLocaleString('en-IN')}) <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <Button 
                  type="button"
                  onClick={() => handleCheckoutClick('Cash on Delivery')}
                  disabled={isProcessingPayment || isVerifyingPayment || orderLoading}
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl py-6 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  {orderLoading && paymentMethod === 'Cash on Delivery' ? (
                    <>
                      <RefreshCcw className="w-4 h-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    'Place Cash on Delivery Order'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Budget Insight Card */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-5 space-y-2.5 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold uppercase text-[10px] tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600" /> AI Shopping & Budget Insight
            </div>
            <div className="space-y-1 text-slate-700 font-medium">
              <p>
                Remaining Monthly Budget: <span className="font-bold text-emerald-700">{formatINR(metrics.remainingBudget - total)}</span>
              </p>
              <p className="text-[11px] text-slate-500">
                This purchase is within your monthly spending limit.
              </p>
              <div className="pt-1.5 border-t border-emerald-200/60 flex items-center justify-between text-[11px] font-bold text-emerald-900">
                <span>Estimated Monthly Savings:</span>
                <span className="text-emerald-700">{formatINR(metrics.estimatedSavings || Math.round(total * 0.12))}</span>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* AI Pre-Purchase Evaluation Modal */}
      <AnimatePresence>
        {showAnalysisModal && analysisData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden space-y-5 p-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900">AI Financial Evaluation</h3>
                    <p className="text-[10px] text-slate-400 font-semibold">Pre-checkout budget health check</p>
                  </div>
                </div>
                <button onClick={() => setShowAnalysisModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Monthly Goal</span>
                  <p className="font-black text-xs text-slate-900 mt-0.5">{formatINR(analysisData.monthlyBudget)}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Spent So Far</span>
                  <p className="font-black text-xs text-slate-900 mt-0.5">{formatINR(analysisData.spentSoFar)}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Order Total</span>
                  <p className="font-black text-xs text-emerald-700 mt-0.5">{formatINR(analysisData.purchaseTotal)}</p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                analysisData.isExceeded 
                  ? 'bg-rose-50 border-rose-200 text-rose-950' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}>
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                  {analysisData.isExceeded ? <AlertTriangle className="w-4 h-4 text-rose-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  <span>AI Shopping Recommendation</span>
                </div>
                <p className="font-semibold">{analysisData.recommendation}</p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button
                  onClick={executePaymentFlow}
                  disabled={isProcessingPayment || isVerifyingPayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-5 font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {paymentMethod === 'Cash on Delivery' ? 'Confirm & Place Order' : 'Proceed to Secure Payment'} <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAnalysisModal(false)}
                  variant="ghost"
                  className="w-full text-xs font-semibold text-slate-500 py-3"
                >
                  Return to Checkout
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {(isProcessingPayment || isVerifyingPayment) && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md text-white p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-center space-y-4 max-w-sm w-full"
            >
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto animate-spin">
                <RefreshCcw className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-white">Preparing Secure Payment...</h3>
                <p className="text-xs text-slate-400">
                  {isVerifyingPayment ? 'Verifying payment signature with Razorpay...' : 'Connecting to Razorpay gateway...'}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 py-1.5 px-3 rounded-full border border-emerald-800/50">
                <Lock className="w-3 h-3" /> 256-Bit Encrypted
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Failed Modal */}
      <AnimatePresence>
        {paymentFailed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border border-slate-100 text-center space-y-5"
            >
              <div className="w-16 h-16 bg-rose-50 border border-rose-200 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-slate-900">Payment Unsuccessful</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your transaction was cancelled or could not be verified. Don't worry, no funds were deducted from your account.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  onClick={executePaymentFlow}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-5 text-xs font-bold shadow-md cursor-pointer"
                >
                  Retry Payment
                </Button>
                <Button
                  onClick={() => setPaymentFailed(false)}
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 rounded-2xl py-5 text-xs font-bold cursor-pointer"
                >
                  Return to Checkout
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Checkout;
