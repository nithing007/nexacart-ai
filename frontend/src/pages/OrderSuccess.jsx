import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../redux/slices/ordersSlice';
import { generateInvoicePDF } from '../utils/generateInvoice';
import { CheckCircle, ShoppingBag, Download, ArrowRight, Calendar, ShieldCheck, Clock, Hash, CreditCard, QrCode } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderDetails } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  const handleDownloadInvoice = () => {
    if (orderDetails) {
      generateInvoicePDF(orderDetails, {});
    }
  };

  const isPaid = orderDetails?.isPaid;
  const isSubmitted = orderDetails?.status === 'Payment Submitted' || orderDetails?.status === 'Waiting for Payment';

  const deliveryDateFormatted = orderDetails?.expectedDeliveryDate
    ? new Date(orderDetails.expectedDeliveryDate).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'In 3-5 Business Days';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8 font-sans">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-xl text-center space-y-4 relative overflow-hidden"
      >
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <ShieldCheck className="w-64 h-64" />
        </div>
        
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white shadow-lg mx-auto">
          {isPaid ? <CheckCircle className="w-10 h-10 text-white animate-bounce" /> : <Clock className="w-10 h-10 text-amber-200 animate-pulse" />}
        </div>

        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest bg-emerald-700/60 px-4 py-1.5 rounded-full border border-emerald-400/30">
            {isPaid ? 'Payment Confirmed & Verified' : 'Dynamic UPI QR Payment'}
          </span>
          <h1 className="text-3xl font-black tracking-tight pt-2">
            {isPaid ? 'Order Confirmed & Paid!' : 'Payment Submitted - Awaiting Verification'}
          </h1>
          <p className="text-emerald-100 text-sm max-w-md mx-auto">
            {isPaid 
              ? 'Thank you for your purchase. Your payment is verified and order sent for fulfillment.' 
              : 'Your payment transaction reference has been recorded. Our Admin team will verify and confirm your order shortly.'}
          </p>
        </div>
      </motion.div>

      {/* Transaction & Order Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Payment Details */}
        <Card className="rounded-3xl border-emerald-100 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3">
              <QrCode className="w-5 h-5 text-emerald-600" /> UPI Payment Details
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" /> Order ID
                </span>
                <span className="font-mono font-bold text-gray-900">{orderId}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold">UPI UTR / Txn Ref</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200/60">
                  {orderDetails?.upiTransactionRef || orderDetails?.paymentResult?.id || `UTR_${orderId?.substring(0, 8)}`}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold">Total Amount</span>
                <span className="font-black text-sm text-gray-900">
                  ₹{orderDetails?.totalPrice?.toLocaleString('en-IN') || 0}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold">Payment Method</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-[11px]">
                  {orderDetails?.paymentMethod || 'UPI QR Code'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold">Status</span>
                <span className={`font-bold px-2.5 py-1 rounded-full text-[11px] ${
                  isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {orderDetails?.status || 'Payment Submitted'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Delivery & Shipping */}
        <Card className="rounded-3xl border-emerald-100 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3">
              <Calendar className="w-5 h-5 text-emerald-600" /> Delivery Information
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold">Expected Delivery</span>
                <span className="font-bold text-gray-900">{deliveryDateFormatted}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Estimated Slot
                </span>
                <span className="font-semibold text-gray-700">
                  {orderDetails?.estimatedDeliveryTime || '2:00 PM – 7:00 PM'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold">Delivery Partner</span>
                <span className="font-bold text-gray-800">
                  {orderDetails?.deliveryPartner || 'Delhivery'}
                </span>
              </div>

              <div className="py-1">
                <span className="text-gray-500 font-semibold block mb-1">Shipping Address</span>
                <p className="font-medium text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-100 leading-relaxed">
                  {orderDetails?.shippingAddress || 'Address details saved'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Item Summary List */}
      <Card className="rounded-3xl border-gray-100 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">
            Ordered Items ({orderDetails?.orderItems?.length || 0})
          </h2>

          <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-2">
            {(orderDetails?.orderItems || []).map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs first:pt-0">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-xl object-cover border border-gray-100 bg-gray-50"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <p className="text-gray-400">Qty: {item.quantity} x ₹{item.price?.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">
                  ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Button
          onClick={handleDownloadInvoice}
          variant="outline"
          className="w-full sm:w-auto px-6 py-6 rounded-2xl border-emerald-600 text-emerald-700 font-bold text-xs hover:bg-emerald-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Download Tax Invoice
        </Button>

        <Button
          onClick={() => navigate('/orders')}
          className="w-full sm:w-auto px-6 py-6 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" /> Go To My Orders
        </Button>

        <Button
          onClick={() => navigate('/products')}
          className="w-full sm:w-auto px-6 py-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 cursor-pointer"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

    </div>
  );
};

export default OrderSuccess;
