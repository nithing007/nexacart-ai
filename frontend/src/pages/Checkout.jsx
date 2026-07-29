import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, resetOrderSuccess, fetchMyOrders } from '../redux/slices/ordersSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { loadUserBudget, saveUserBudget, calculateBudgetMetrics, formatINR } from '../ai/budgetEngine';
import UpiQrPaymentModal from '../components/Payment/UpiQrPaymentModal';
import api from '../services/api';
import { 
  CreditCard, 
  MapPin, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Smartphone, 
  Landmark, 
  Wallet, 
  Banknote, 
  RefreshCcw,
  ArrowRight
} from 'lucide-react';
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
  const { orders, success, loading: orderLoading } = useSelector((state) => state.orders);

  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // Default & Recommended

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [upiOrderData, setUpiOrderData] = useState(null);
  const [showUpiModal, setShowUpiModal] = useState(false);

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

  // Consolidated Payment Options
  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI (Recommended)',
      desc: 'Pay via GPay, PhonePe, Paytm, BHIM, or Dynamic QR Code',
      icon: Smartphone,
      isRecommended: true,
      badge: 'Fastest & Zero Fee'
    },
    {
      id: 'debit',
      name: 'Debit Card',
      desc: 'Visa, Mastercard, RuPay, Maestro via UPI QR',
      icon: CreditCard,
      badge: 'Secure'
    },
    {
      id: 'credit',
      name: 'Credit Card',
      desc: 'Visa, Mastercard, Amex via UPI QR',
      icon: CreditCard,
      badge: 'Rewards'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      desc: 'HDFC, ICICI, SBI, Axis & 50+ Banks via UPI QR',
      icon: Landmark,
      badge: 'All Banks'
    },
    {
      id: 'wallet',
      name: 'Wallet',
      desc: 'Paytm Wallet, Amazon Pay, Mobikwik',
      icon: Wallet,
      badge: 'Fast'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      desc: 'Pay cash upon doorstep delivery',
      icon: Banknote,
      badge: 'Pay Later'
    }
  ];

  // Executes UPI QR Payment Order Creation or COD Flow
  const executePaymentFlow = async () => {
    setShowAnalysisModal(false);

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
      paymentMethod,
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

    // Dynamic UPI QR Payment Flow
    try {
      setIsProcessingPayment(true);
      toast.loading('Generating Dynamic UPI Payment Order...', { id: 'upi-init' });

      const res = await api.post('/payment/create-upi-order', orderPayload);

      toast.dismiss('upi-init');

      if (res.data.success && res.data.order) {
        setUpiOrderData({
          ...res.data.order,
          upiUri: res.data.upiUri,
          upiId: res.data.upiId
        });
        setShowUpiModal(true);
      } else {
        toast.error(res.data.message || 'Failed to create UPI order');
      }
    } catch (err) {
      console.error('UPI Order Error:', err);
      toast.dismiss('upi-init');
      toast.error(err.response?.data?.message || 'Failed to initialize UPI QR payment');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentSubmitted = (updatedOrder) => {
    setShowUpiModal(false);
    dispatch(clearCart());
    navigate(`/order-success/${updatedOrder._id}`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      toast.error('Please enter a complete shipping address');
      return;
    }

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
    <div className="max-w-6xl mx-auto space-y-6 py-2 font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Checkout</h1>
          <p className="text-xs text-slate-500 font-medium">Dynamic UPI QR Payment Integration</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit Encrypted UPI Payment</span>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Section: Shipping Address & Payment Selection */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Shipping Address */}
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

          {/* Section 2: Payment Method Selection */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" /> 2. Payment Method
              </h2>
              <span className="text-[11px] text-slate-400 font-semibold">Select preferred payment mode</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                const isSelected = paymentMethod === method.name;

                return (
                  <div 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.name)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-2.5 relative ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input 
                          type="radio" 
                          name="paymentMethodRadio" 
                          id={method.id}
                          checked={isSelected}
                          onChange={() => setPaymentMethod(method.name)}
                          className="accent-emerald-600 cursor-pointer w-4 h-4"
                        />
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <label htmlFor={method.id} className="font-extrabold text-xs text-slate-900 cursor-pointer">
                          {method.name}
                        </label>
                      </div>

                      {method.badge && (
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          method.isRecommended 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {method.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">
                      {method.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary & Action */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Order Summary Card */}
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

              <Button 
                type="submit"
                disabled={isProcessingPayment || orderLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-6 font-bold text-xs shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessingPayment || orderLoading ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    {paymentMethod === 'Cash on Delivery' ? 'Place COD Order' : `Pay via Dynamic UPI QR (₹${total.toLocaleString('en-IN')})`} <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* AI Budget & Savings Insight Card */}
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

      {/* AI Pre-Purchase Analysis Modal */}
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
                  disabled={isProcessingPayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-5 font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {paymentMethod === 'Cash on Delivery' ? 'Confirm & Place Order' : 'Confirm & Generate Dynamic UPI QR'} <ArrowRight className="w-4 h-4" />
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

      {/* Dynamic UPI QR Payment Modal */}
      <UpiQrPaymentModal
        isOpen={showUpiModal}
        onClose={() => setShowUpiModal(false)}
        orderData={upiOrderData}
        onPaymentSubmitted={handlePaymentSubmitted}
      />

    </div>
  );
};

export default Checkout;
