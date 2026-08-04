import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ShoppingBag, 
  Package, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Receipt
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [fallbackDetails] = useState(() => ({
    orderId: 'NX-' + Math.floor(100000 + Math.random() * 900000),
    paymentId: 'pay_' + Math.random().toString(36).substring(2, 12)
  }));

  const successData = location.state || {};
  const {
    orderId = fallbackDetails.orderId,
    paymentId = fallbackDetails.paymentId,
    amount = 0,
    estimatedDelivery = '3 Business Days (2:00 PM – 7:00 PM)'
  } = successData;

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 font-sans bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 translate-x-4 -translate-y-4">
            <Sparkles className="w-40 h-40" />
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-inner"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
            Payment Successful!
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm font-medium">
            Thank you for shopping with NexaCart AI. Your order is confirmed!
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-emerald-600" /> Order Number
              </span>
              <span className="font-mono font-black text-slate-900 text-sm">
                #{typeof orderId === 'string' ? orderId.substring(0, 12).toUpperCase() : orderId}
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Razorpay Payment ID
              </span>
              <span className="font-mono font-bold text-slate-700 truncate max-w-[200px]">
                {paymentId}
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-emerald-600" /> Amount Paid
              </span>
              <span className="font-black text-emerald-700 text-base">
                ₹{Number(amount).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Estimated Delivery
              </span>
              <span className="font-bold text-slate-800 text-right">
                {estimatedDelivery}
              </span>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 text-center text-xs text-emerald-900 font-medium leading-relaxed">
            <p>
              A confirmation email and invoice have been sent to your registered account email. You can track your order status in real-time.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Button
              onClick={() => navigate('/orders')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-6 font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4" /> View Orders
            </Button>
            
            <Link to="/products" className="w-full">
              <Button
                variant="outline"
                className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl py-6 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
