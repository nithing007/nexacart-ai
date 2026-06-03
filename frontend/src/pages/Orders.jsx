import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyOrders } from '../redux/slices/ordersSlice';
import { ShoppingBag, ChevronRight, Calendar, CreditCard, Box } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">Pending</span>;
      case 'Processing':
        return <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">Processing</span>;
      case 'Shipped':
        return <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">Shipped</span>;
      case 'Delivered':
        return <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Delivered</span>;
      case 'Cancelled':
        return <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">Cancelled</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-6">
        <div className="h-8 bg-gray-100 rounded w-1/4 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2].map((item) => (
            <div key={item} className="h-32 bg-white rounded-3xl border border-gray-100 animate-pulse"></div>
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
        <Button onClick={() => dispatch(fetchMyOrders())} className="bg-green-600 text-white rounded-xl">
          Retry
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mt-8">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-800">No Orders Found</h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          You haven't placed any orders yet. Start shopping and explore our advanced AI recommendations!
        </p>
        <Link to="/products" className="inline-block">
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 font-semibold shadow-md shadow-green-100 flex items-center gap-2">
            Browse Products <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-gray-900">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order._id} className="border-gray-100 rounded-3xl shadow-sm bg-white hover:shadow-md transition-all overflow-hidden">
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Order Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-black text-sm text-gray-800">Order ID: #{order._id.substring(12).toUpperCase()}</span>
                  {getStatusBadge(order.status)}
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Placed on: {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span>Method: {order.paymentMethod}</span>
                  </div>
                </div>

                {/* Items Thumbnails preview */}
                <div className="flex gap-2 pt-1">
                  {order.orderItems.map((item, i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-lg bg-gray-50 p-1 border border-gray-100 flex items-center justify-center"
                      title={item.name}
                    >
                      <img src={item.image} alt={item.name} className="object-contain max-h-full" />
                    </div>
                  ))}
                  {order.orderItems.length > 3 && (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                      +{order.orderItems.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Order pricing and detail link */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto border-t md:border-t-0 border-gray-50 pt-4 md:pt-0 shrink-0">
                <div className="text-left md:text-right">
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Price</div>
                  <div className="font-black text-lg text-green-600">₹{order.totalPrice.toLocaleString()}</div>
                </div>
                <Link to={`/order/${order._id}`} className="md:mt-3">
                  <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50 text-xs font-bold">
                    View Details
                  </Button>
                </Link>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
