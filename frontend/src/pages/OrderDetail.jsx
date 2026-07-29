import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchOrderDetails, clearOrderDetails } from '../redux/slices/ordersSlice';
import { ArrowLeft, MapPin, CreditCard, ShoppingBag, Truck, FileText, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getFallbackImage } from '../utils/imageHelper';
import toast from 'react-hot-toast';

import { generateInvoicePDF } from '../utils/generateInvoice';

import OrderTrackingModal from '../components/Orders/OrderTrackingModal';
import InvoiceModal from '../components/Orders/InvoiceModal';

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails: order, loading, error } = useSelector((state) => state.orders);

  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));

    return () => {
      dispatch(clearOrderDetails());
    };
  }, [dispatch, id]);

  const handleAIHelp = () => {
    toast(`AI Order Copilot initialized for Order #${order?._id?.substring(12).toUpperCase()}`, { icon: '🤖' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">Pending Approval</span>;
      case 'Confirmed':
        return <span className="bg-blue-100 text-blue-800 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">Confirmed</span>;
      case 'Packed':
        return <span className="bg-indigo-100 text-indigo-800 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">Packed</span>;
      case 'Shipped':
      case 'In Transit':
      case 'Out for Delivery':
        return <span className="bg-purple-100 text-purple-800 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">{status}</span>;
      case 'Delivered':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">Delivered</span>;
      case 'Cancelled':
        return <span className="bg-rose-100 text-rose-800 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">Cancelled</span>;
      case 'Returned':
        return <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">Returned</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-6 animate-pulse">
        <div className="h-6 bg-gray-100 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="h-28 bg-white rounded-3xl border border-gray-100"></div>
            <div className="h-48 bg-white rounded-3xl border border-gray-100"></div>
          </div>
          <div className="h-48 bg-white rounded-3xl border border-gray-100"></div>
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
        <Link to="/orders">
          <Button className="bg-emerald-600 text-white rounded-xl flex items-center gap-2 mx-auto">
            <ArrowLeft className="w-4 h-4" /> Back to My Orders
          </Button>
        </Link>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {/* Back button */}
      <Link to="/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 font-semibold transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to My Orders
      </Link>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Order Details</h1>
          <p className="text-xs text-gray-400 font-medium mt-1">
            Order ID: #{order._id.substring(12).toUpperCase()} &bull; Placed on: {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(order.status)}
          <button
            onClick={() => generateInvoicePDF(order)}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <FileText className="w-4 h-4" /> Download Invoice
          </button>
        </div>
      </div>

      {/* Shipment & Carrier Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-green-800 text-white p-6 rounded-3xl space-y-3 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-xs uppercase tracking-wider">
            <Truck className="w-4 h-4" /> Carrier: {order.deliveryPartner || 'Delhivery'}
          </div>
          <div className="text-sm font-bold">
            Tracking Code: <span className="font-mono text-white">{order.trackingNumber || 'DELHIVERY892142IN'}</span>
          </div>
          <p className="text-xs text-emerald-200">
            Expected Delivery: {order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : '3–5 Days'} ({order.estimatedDeliveryTime || '2:00 PM – 7:00 PM'})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTrackingOpen(true)}
            className="px-4 py-2 bg-white text-emerald-950 font-black text-xs rounded-xl hover:bg-emerald-50 transition-colors shadow-md flex items-center gap-1"
          >
            <Truck className="w-4 h-4 text-emerald-600" /> Real-Time Tracker
          </button>
          <button
            onClick={handleAIHelp}
            className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors"
            title="Ask AI Copilot about this order"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" /> Shipping & Delivery Address
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed pl-7 bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
              {order.shippingAddress}
            </p>
          </div>

          {/* Payment Method & Status */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" /> Payment & Billing Information
            </h3>
            <div className="pl-7 space-y-2">
              <div className="text-sm font-medium text-gray-600">
                Method: <span className="font-bold text-gray-800">{order.paymentMethod}</span>
              </div>
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                Payment Status: {order.isPaid ? (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full">PAID</span>
                ) : (
                  <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full">COD - Cash on Delivery</span>
                )}
              </div>
            </div>
          </div>

          {/* Ordered items */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" /> Ordered Items ({order.orderItems?.length || 0})
            </h3>
            
            <div className="divide-y divide-gray-50">
              {order.orderItems?.map((item, i) => (
                <div key={i} className="py-4 flex items-center gap-4 first:pt-0 last:pb-0">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl p-1 border border-gray-100 flex items-center justify-center shrink-0">
                    <img 
                      src={item.image || getFallbackImage('', item.name)} 
                      alt={item.name} 
                      className="object-contain max-h-full" 
                      onError={(e) => { e.target.src = getFallbackImage('', item.name); }}
                    />
                  </div>
                  <div className="flex-grow space-y-0.5 text-xs sm:text-sm">
                    <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-gray-400 text-xs">Qty: {item.quantity} x ₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="font-extrabold text-gray-900 shrink-0 text-sm">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing breakdown */}
        <div className="md:col-span-1">
          <Card className="border-gray-100 rounded-3xl shadow-sm bg-white overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-bold text-gray-800 text-lg border-b border-gray-50 pb-4">Bill Summary</h3>
              
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-gray-900">₹{(order.itemsPrice || order.totalPrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span className="font-bold text-gray-900">₹{(order.taxPrice || Math.round(order.totalPrice * 0.18)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-emerald-600">
                    {order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <hr className="border-gray-50" />

              <div className="flex justify-between items-center text-md font-black text-gray-900">
                <span>Grand Total</span>
                <span className="text-emerald-600 text-lg">₹{order.totalPrice.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Modals */}
      <OrderTrackingModal 
        order={order}
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      <InvoiceModal
        order={order}
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />

    </div>
  );
};

export default OrderDetail;
