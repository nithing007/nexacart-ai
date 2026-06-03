import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchOrderDetails, clearOrderDetails } from '../redux/slices/ordersSlice';
import { ArrowLeft, MapPin, CreditCard, ShoppingBag, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getFallbackImage } from '../utils/imageHelper';

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails: order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));

    return () => {
      dispatch(clearOrderDetails());
    };
  }, [dispatch, id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full">Pending Approval</span>;
      case 'Processing':
        return <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">Processing</span>;
      case 'Shipped':
        return <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full">Dispatched</span>;
      case 'Delivered':
        return <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">Delivered</span>;
      case 'Cancelled':
        return <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full">Cancelled</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full">{status}</span>;
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
          <Button className="bg-green-600 text-white rounded-xl flex items-center gap-2 mx-auto">
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
      <Link to="/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 font-semibold transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to My Orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Order Details</h1>
          <p className="text-xs text-gray-400 font-medium mt-1">
            Order ID: #{order._id.toUpperCase()} &bull; Placed on: {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div>
          {getStatusBadge(order.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" /> Shipping Details
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed pl-7 bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
              {order.shippingAddress}
            </p>
          </div>

          {/* Payment Method & Status */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" /> Payment Information
            </h3>
            <div className="pl-7 space-y-2">
              <div className="text-sm font-medium text-gray-600">
                Method: <span className="font-bold text-gray-800">{order.paymentMethod}</span>
              </div>
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                Status: {order.isPaid ? (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Paid</span>
                ) : (
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">COD - Pending Delivery</span>
                )}
              </div>
            </div>
          </div>

          {/* Ordered items */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-green-600" /> Ordered Items
            </h3>
            
            <div className="divide-y divide-gray-50">
              {order.orderItems.map((item, i) => (
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
                  <div className="font-bold text-gray-900 shrink-0 text-sm">
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
              <h3 className="font-bold text-gray-800 text-lg border-b border-gray-50 pb-4">Bill Breakdown</h3>
              
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{order.itemsPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span className="font-bold text-gray-900">₹{order.taxPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-green-600">
                    {order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <hr className="border-gray-50" />

              <div className="flex justify-between items-center text-md font-black text-gray-900">
                <span>Grand Total</span>
                <span className="text-green-600 text-lg">₹{order.totalPrice.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default OrderDetail;
