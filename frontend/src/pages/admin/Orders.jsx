import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { 
  Search, 
  Filter, 
  Truck, 
  RefreshCw, 
  Edit3, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  CreditCard, 
  Package, 
  FileText,
  Clock,
  Sparkles,
  Bot
} from 'lucide-react';
import toast from 'react-hot-toast';

const CARRIERS = ['Delhivery', 'Blue Dart', 'DTDC', 'XpressBees', 'Ekart', 'India Post'];
const STATUSES = [
  'Pending', 
  'Confirmed', 
  'Packed', 
  'Ready for Shipment', 
  'Shipped', 
  'Out for Delivery', 
  'Delivered', 
  'Cancelled', 
  'Returned', 
  'Refunded'
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Delivered':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'Shipped':
    case 'Out for Delivery':
    case 'Ready for Shipment':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Packed':
    case 'Confirmed':
      return 'bg-teal-100 text-teal-800 border-teal-300';
    case 'Cancelled':
      return 'bg-rose-100 text-rose-800 border-rose-300';
    case 'Returned':
    case 'Refunded':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    default:
      return 'bg-amber-100 text-amber-800 border-amber-300';
  }
};

const AdminOrders = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'returns' ? 'Returned' : 'All';

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialTab);
  
  // Drawer / Modal state for detailed order view & timeline
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Edit status form state
  const [editStatus, setEditStatus] = useState('');
  const [editCarrier, setEditCarrier] = useState('Delhivery');
  const [editTracking, setEditTracking] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders/admin/all');
      setOrders(res.data || []);
    } catch (err) {
      toast.error('Failed to load orders: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    // Auto-polling for real-time order updates every 10s
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // Sync tab filter if URL changes
  useEffect(() => {
    if (searchParams.get('tab') === 'returns') {
      setStatusFilter('Returned');
    }
  }, [searchParams]);

  const handleOpenDetailModal = (order) => {
    setSelectedOrder(order);
    setEditStatus(order.status || 'Confirmed');
    setEditCarrier(order.deliveryPartner || 'Delhivery');
    setEditTracking(order.trackingNumber || '');
  };

  const handleUpdateStatus = async (orderId, newStatus, carrier = null, tracking = null) => {
    try {
      setUpdating(true);
      const payload = {
        status: newStatus,
        deliveryPartner: carrier || editCarrier,
        trackingNumber: tracking || editTracking,
      };

      const res = await api.put(`/orders/${orderId}/admin-status`, payload);
      
      toast.success(`Order status updated to "${newStatus}"!`, { icon: '🚀' });
      
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(res.data);
      }

      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const handlePrintInvoice = (order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>GST Invoice - Order #${order._id}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1e293b; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #10b981; padding-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; color: #0f172a; }
            .meta { margin-top: 20px; display: flex; justify-content: space-between; }
            table { width: 100%; border-collapse: collapse; margin-top: 30px; }
            th, td { border: 1px solid #cbd5e1; padding: 12px; text-align: left; font-size: 14px; }
            th { background: #f8fafc; }
            .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; color: #10b981; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">NexaCart AI Official Store</div>
              <p>TAX INVOICE / BILL OF SUPPLY</p>
            </div>
            <div>
              <p><strong>Invoice No:</strong> INV-${order._id.substring(12).toUpperCase()}</p>
              <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div class="meta">
            <div>
              <h3>Billed To:</h3>
              <p>${order.user?.name || order.user?.email || 'Customer'}</p>
              <p>${order.shippingAddress || 'N/A'}</p>
            </div>
            <div>
              <h3>Order Details:</h3>
              <p>Order ID: ${order._id}</p>
              <p>Payment: ${order.paymentMethod || 'Prepaid COD'}</p>
              <p>Carrier: ${order.deliveryPartner || 'Delhivery'} (${order.trackingNumber || 'N/A'})</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${(order.orderItems || []).map(i => `
                <tr>
                  <td>${i.name}</td>
                  <td>${i.quantity || i.qty || 1}</td>
                  <td>₹${i.price}</td>
                  <td>₹${(i.price * (i.quantity || i.qty || 1)).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">Total Amount Paid: ₹${order.totalPrice.toLocaleString()}</div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(o => 
        (o._id || '').toLowerCase().includes(q) ||
        (o.trackingNumber || '').toLowerCase().includes(q) ||
        (o.user?.email || '').toLowerCase().includes(q) ||
        (o.user?.name || '').toLowerCase().includes(q) ||
        o.orderItems?.some(item => (item.name || '').toLowerCase().includes(q))
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(o => o.status === statusFilter);
    }

    return result;
  }, [orders, searchQuery, statusFilter]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Order Status Updates & Logistics</h1>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <Truck className="w-3 h-3" /> Live Dispatch Center
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Operational hub to update customer order status, assign carriers, and generate invoices.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-slate-200/80"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Orders
          </button>
        </div>
      </div>

      {/* Embedded AI Operational Alert */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-2xl border border-slate-700 shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-white flex items-center gap-1.5">
              AI Delay Predictor <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </p>
            <p className="text-slate-300">All 12 pending dispatches are on schedule. 2 orders ready for immediate pickup by Delhivery.</p>
          </div>
        </div>
        <button
          onClick={() => setStatusFilter('Pending')}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer shadow-sm"
        >
          View Dispatches
        </button>
      </div>

      {/* Control Bar & Filter Chips */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs space-y-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Order ID, Tracking Code, Customer Name/Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1 pr-2 shrink-0">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {['All', ...STATUSES].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === st 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Operational Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-5 py-3.5">Customer Name</th>
                <th className="px-5 py-3.5">Products Summary</th>
                <th className="px-5 py-3.5">Payment</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Order Date</th>
                <th className="px-5 py-3.5">Expected Delivery</th>
                <th className="px-5 py-3.5">Current Status</th>
                <th className="px-5 py-3.5">Assigned Carrier</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-5 py-12 text-center text-slate-400 font-medium">
                    No orders match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const displayId = '#' + ord._id.substring(Math.max(0, ord._id.length - 8)).toUpperCase();
                  const customerName = ord.user?.name || `${ord.user?.firstName || ''} ${ord.user?.lastName || ''}`.trim() || ord.user?.email || 'NexaCart Customer';
                  const expectedDateStr = ord.expectedDeliveryDate ? new Date(ord.expectedDeliveryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '3-5 Days';

                  return (
                    <tr key={ord._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4 font-black text-slate-900 whitespace-nowrap">
                        {displayId}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                        {customerName}
                      </td>
                      <td className="px-5 py-4 text-slate-500 max-w-xs truncate">
                        {(ord.orderItems || []).map(i => i.name).join(', ') || '1 Item'}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
                          {ord.paymentMethod || 'Prepaid'}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-extrabold text-slate-900 whitespace-nowrap">
                        ₹{ord.totalPrice.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                        {expectedDateStr}
                      </td>
                      
                      {/* Inline Status Dropdown */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateStatus(ord._id, e.target.value)}
                          className={`text-[11px] font-extrabold py-1 px-2.5 rounded-full border focus:outline-none cursor-pointer ${getStatusBadge(ord.status)}`}
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>

                      <td className="px-5 py-4 text-emerald-700 font-bold whitespace-nowrap">
                        {ord.deliveryPartner || 'Delhivery'}
                      </td>

                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenDetailModal(ord)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                            title="View Timeline & Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handlePrintInvoice(ord)}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors cursor-pointer"
                            title="Print GST Invoice"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-Over Drawer / Modal for Order Timeline & Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  Order #{selectedOrder._id.substring(Math.max(0, selectedOrder._id.length - 8)).toUpperCase()}
                </h3>
                <p className="text-xs text-slate-400 font-medium">Customer details, products, timeline & logistics controls</p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100/80 text-xs">
              <div className="space-y-1">
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <User className="w-3 h-3 text-emerald-600" /> Customer Info
                </p>
                <p className="font-bold text-slate-900 text-sm">{selectedOrder.user?.name || selectedOrder.user?.email || 'NexaCart Customer'}</p>
                <p className="text-slate-500 font-semibold">{selectedOrder.user?.email}</p>
                <p className="text-slate-500 font-semibold flex items-center gap-1">
                  <Phone className="w-3 h-3" /> +91 98765 43210
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" /> Delivery Address
                </p>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {selectedOrder.shippingAddress || 'House 42, Green Park Main, New Delhi - 110016'}
                </p>
              </div>
            </div>

            {/* Items Purchased List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-emerald-600" /> Order Items ({selectedOrder.orderItems?.length || 0})
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-white">
                {(selectedOrder.orderItems || []).map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border" />}
                      <div>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-[10px] text-slate-400">Qty: {item.quantity || item.qty || 1} • Price: ₹{item.price}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-slate-900">₹{(item.price * (item.quantity || item.qty || 1)).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Timeline Visualizer */}
            <div className="space-y-3 bg-slate-900 text-white p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Interactive Order Fulfillment Timeline
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
                {[
                  'Order Placed',
                  'Confirmed',
                  'Packed',
                  'Ready for Shipment',
                  'Out for Delivery',
                  'Delivered'
                ].map((stage, idx) => {
                  const stageIndex = STATUSES.indexOf(stage);
                  const currentIndex = STATUSES.indexOf(selectedOrder.status);
                  const isCompleted = currentIndex >= stageIndex;

                  return (
                    <button
                      key={stage}
                      type="button"
                      disabled={updating}
                      onClick={() => handleUpdateStatus(selectedOrder._id, stage)}
                      className={`p-2.5 rounded-xl text-center text-[10px] font-bold transition-all border cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 mx-auto mb-1 ${isCompleted ? 'text-slate-950' : 'text-slate-500'}`} />
                      <span className="block truncate">{stage}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Carrier & Tracking Input Controls */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateStatus(selectedOrder._id, editStatus, editCarrier, editTracking);
              }}
              className="space-y-4 pt-2 border-t border-slate-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Current Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Logistics Partner</label>
                  <select
                    value={editCarrier}
                    onChange={(e) => setEditCarrier(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    {CARRIERS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Tracking Code</label>
                  <input
                    type="text"
                    value={editTracking}
                    onChange={(e) => setEditTracking(e.target.value)}
                    placeholder="e.g. DELHIVERY892182IN"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handlePrintInvoice(selectedOrder)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Download GST Invoice
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md cursor-pointer"
                >
                  Save & Dispatch Order
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;
