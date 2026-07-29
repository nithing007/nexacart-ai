import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyOrders, cancelOrderThunk, requestReturnThunk } from '../redux/slices/ordersSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { 
  ShoppingBag, ChevronRight, Calendar, CreditCard, Search, Filter, 
  ArrowUpDown, Truck, Sparkles, FileText, XCircle, RefreshCw, Eye, ShoppingCart, QrCode
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import toast from 'react-hot-toast';

import OrderTrackingModal from '../components/Orders/OrderTrackingModal';
import InvoiceModal from '../components/Orders/InvoiceModal';
import CancelOrderModal from '../components/Orders/CancelOrderModal';
import ReturnOrderModal from '../components/Orders/ReturnOrderModal';
import { generateInvoicePDF } from '../utils/generateInvoice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Search, Filter, & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Modal States
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState(null);
  const [activeCancelOrder, setActiveCancelOrder] = useState(null);
  const [activeReturnOrder, setActiveReturnOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const handleBuyAgain = (item) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return;
    }
    dispatch(addToCart({ productId: item.product, quantity: item.quantity || 1 }))
      .unwrap()
      .then(() => toast.success(`Added ${item.name} back to cart`))
      .catch((err) => toast.error(err || 'Failed to add to cart'));
  };

  const handleConfirmCancel = async (orderId, reason) => {
    try {
      await dispatch(cancelOrderThunk({ orderId, reason })).unwrap();
      toast.success('Order cancelled successfully', { icon: '❌' });
      dispatch(fetchMyOrders());
    } catch (err) {
      toast.error(err || 'Failed to cancel order');
    }
  };

  const handleConfirmReturn = async (orderId, reason) => {
    try {
      await dispatch(requestReturnThunk({ orderId, reason })).unwrap();
      toast.success('Return request submitted successfully', { icon: '↩️' });
      dispatch(fetchMyOrders());
    } catch (err) {
      toast.error(err || 'Failed to submit return request');
    }
  };

  const handleNeedHelp = (order) => {
    toast(`NexaCart AI Copilot initialized for Order #${order._id.substring(12).toUpperCase()}`, {
      icon: '🤖',
      duration: 4000
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
      case 'Waiting for Payment':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Waiting for Payment</span>;
      case 'Payment Submitted':
        return <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-300">Payment Submitted</span>;
      case 'Confirmed':
      case 'Admin Verified':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Confirmed</span>;
      case 'Packed':
        return <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Packed</span>;
      case 'Shipped':
      case 'In Transit':
      case 'Out for Delivery':
        return <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">{status}</span>;
      case 'Delivered':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Delivered</span>;
      case 'Cancelled':
      case 'Payment Rejected':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Payment Rejected</span>;
      case 'Returned':
        return <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Returned</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">{status}</span>;
    }
  };

  const getPaymentBadge = (order) => {
    if (order.status === 'Refunded') {
      return <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Refunded</span>;
    }
    if (order.isPaid) {
      return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Paid ✓</span>;
    }
    if (order.status === 'Payment Submitted') {
      return <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Verification Pending</span>;
    }
    return <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Payment Pending</span>;
  };

  // Filter & Sort Logic
  const processedOrders = useMemo(() => {
    let result = [...orders];

    // 1. Search Query Filter (Order ID, Product Name, Tracking Number)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(order => {
        const orderIdMatch = (order._id || '').toLowerCase().includes(q);
        const trackingMatch = (order.trackingNumber || '').toLowerCase().includes(q);
        const itemMatch = order.orderItems?.some(item => (item.name || '').toLowerCase().includes(q));
        return orderIdMatch || trackingMatch || itemMatch;
      });
    }

    // 2. Status Filter
    if (statusFilter !== 'All') {
      result = result.filter(order => order.status === statusFilter);
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'highest') return b.totalPrice - a.totalPrice;
      if (sortBy === 'lowest') return a.totalPrice - b.totalPrice;
      return 0;
    });

    return result;
  }, [orders, searchQuery, statusFilter, sortBy]);

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto py-6">
        <div className="h-8 bg-gray-100 rounded w-1/4 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-44 bg-white rounded-3xl border border-gray-100 animate-pulse"></div>
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
        <Button onClick={() => dispatch(fetchMyOrders())} className="bg-emerald-600 text-white rounded-xl">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-sm gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            📦 My Orders ({orders.length})
          </h1>
          <p className="text-xs text-gray-400 font-semibold">Track shipments, view UPI transaction status, and download invoices.</p>
        </div>
        <div className="text-xs font-bold text-gray-500 bg-emerald-50 text-emerald-800 px-3.5 py-2 rounded-xl border border-emerald-100 shrink-0 text-center sm:text-right">
          Active Orders: <span className="font-black text-emerald-600">{orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length}</span>
        </div>
      </div>

      {/* Control Bar: Search, Status Filter Chips, & Sort Dropdown */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Product Name, or Tracking #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 rounded-2xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer w-full md:w-auto"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="highest">Sort: Highest Price</option>
              <option value="lowest">Sort: Lowest Price</option>
            </select>
          </div>

        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200">
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1 pr-2 shrink-0">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {['All', 'Payment Submitted', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === status 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {processedOrders.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-16 space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-gray-800">No Orders Found</h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'All' 
              ? 'No orders match your active search or filter selection.' 
              : "You haven't placed any orders yet. Start shopping and explore our AI shopping recommendations!"}
          </p>
          <Link to="/products" className="inline-block">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-3 font-semibold shadow-md flex items-center gap-2 cursor-pointer">
              Browse Catalog <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {processedOrders.map((order) => {
            const isEligibleCancel = ['Pending', 'Waiting for Payment', 'Confirmed', 'Packed'].includes(order.status);
            const isEligibleReturn = order.status === 'Delivered';

            return (
              <Card key={order._id} className="border-gray-100 rounded-3xl shadow-sm bg-white hover:shadow-md transition-all overflow-hidden border">
                
                {/* Order Top Bar Info */}
                <div className="bg-gray-50/80 px-6 py-3.5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-gray-900">Order #{order._id.substring(12).toUpperCase()}</span>
                    {getStatusBadge(order.status)}
                    {getPaymentBadge(order)}
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 font-semibold text-[11px]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  
                  {/* Order Line Items & Delivery Information */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6">
                    
                    {/* Line Items */}
                    <div className="space-y-4">
                      {order.orderItems?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-2xl border border-gray-100/60">
                          <div className="w-16 h-16 rounded-xl bg-white p-2 border border-gray-100 shrink-0 flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="object-contain max-h-full max-w-full rounded-lg" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-gray-800 truncate">{item.name}</h4>
                            <div className="text-[11px] text-gray-400 font-semibold mt-0.5">
                              Qty: {item.quantity} • Unit Price: ₹{item.price.toLocaleString()}
                            </div>
                          </div>
                          <button
                            onClick={() => handleBuyAgain(item)}
                            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-extrabold flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                            title="Buy Again"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" /> Buy Again
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Partner & Arrival Info Card */}
                    <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/60 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase text-emerald-900">
                          <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-emerald-600" /> Carrier Partner</span>
                          <span className="text-emerald-700 font-extrabold">{order.deliveryPartner || 'Delhivery'}</span>
                        </div>
                        <div className="text-xs font-bold text-gray-800">
                          Tracking ID: <span className="font-mono text-emerald-800">{order.trackingNumber || 'DELHIVERY982142IN'}</span>
                        </div>
                        <div className="text-xs text-gray-600 font-semibold">
                          Expected Delivery: <span className="font-extrabold text-emerald-900">{order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '3-5 Days'}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-emerald-100/80 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-bold">Total Amount:</span>
                        <span className="text-base font-black text-emerald-950">₹{order.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                    
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Track Order Button */}
                      <button
                        onClick={() => setActiveTrackingOrder(order)}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" /> Track Order
                      </button>

                      {/* Download Invoice Button */}
                      <button
                        onClick={() => generateInvoicePDF(order)}
                        className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-600" /> Download Invoice
                      </button>

                      {/* AI Order Assistant */}
                      <button
                        onClick={() => handleNeedHelp(order)}
                        className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> Need AI Help
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Cancel Order trigger */}
                      {isEligibleCancel && (
                        <button
                          onClick={() => setActiveCancelOrder(order)}
                          className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs rounded-xl flex items-center gap-1 border border-rose-200/60 transition-colors cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel Order
                        </button>
                      )}

                      {/* Return/Replace trigger */}
                      {isEligibleReturn && (
                        <button
                          onClick={() => setActiveReturnOrder(order)}
                          className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs rounded-xl flex items-center gap-1 border border-indigo-200/60 transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Return / Replace
                        </button>
                      )}

                      {/* View Details Link */}
                      <Link to={`/order/${order._id}`}>
                        <button className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer">
                          <Eye className="w-3.5 h-3.5" /> View Details
                        </button>
                      </Link>
                    </div>

                  </div>

                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <OrderTrackingModal 
        order={activeTrackingOrder}
        isOpen={Boolean(activeTrackingOrder)}
        onClose={() => setActiveTrackingOrder(null)}
      />

      <InvoiceModal
        order={activeInvoiceOrder}
        isOpen={Boolean(activeInvoiceOrder)}
        onClose={() => setActiveInvoiceOrder(null)}
      />

      <CancelOrderModal
        order={activeCancelOrder}
        isOpen={Boolean(activeCancelOrder)}
        onClose={() => setActiveCancelOrder(null)}
        onConfirmCancel={handleConfirmCancel}
      />

      <ReturnOrderModal
        order={activeReturnOrder}
        isOpen={Boolean(activeReturnOrder)}
        onClose={() => setActiveReturnOrder(null)}
        onConfirmReturn={handleConfirmReturn}
      />

    </div>
  );
};

export default Orders;
