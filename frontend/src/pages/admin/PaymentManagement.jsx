import { useState, useEffect } from 'react';
import api from '../../services/api';
import { generateInvoicePDF } from '../../utils/generateInvoice';
import { 
  CreditCard, 
  Search, 
  Download, 
  Eye, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Check,
  X,
  RotateCcw,
  ExternalLink,
  FileText
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/payment/admin/all');
      setPayments(res.data || []);
    } catch (err) {
      console.error('Failed to fetch admin payments:', err);
      toast.error('Failed to load payment records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleAdminVerifyAction = async (payment, action) => {
    const orderId = payment.userOrder?._id || payment.userOrder || payment.orderId;

    try {
      setActionLoading(true);
      toast.loading(`Processing payment action (${action})...`, { id: 'admin-action' });

      const res = await api.post('/payment/admin/verify-payment', {
        orderId,
        action, // 'Approve' | 'Reject' | 'Request Again'
        adminNotes
      });

      toast.dismiss('admin-action');

      if (res.data.success) {
        toast.success(res.data.message || `Payment ${action} completed!`);
        setSelectedPayment(null);
        setAdminNotes('');
        fetchPayments();
      }
    } catch (err) {
      console.error('Admin action error:', err);
      toast.dismiss('admin-action');
      toast.error(err.response?.data?.message || `Failed to execute ${action}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownloadInvoice = (payment) => {
    if (payment.userOrder) {
      const orderObj = typeof payment.userOrder === 'object' ? payment.userOrder : { _id: payment.userOrder };
      orderObj.user = payment.userId;
      generateInvoicePDF(orderObj, payment);
    } else {
      toast.error('Associated order details not available');
    }
  };

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      (p.paymentId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.orderId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.upiTransactionRef || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.userId?.firstName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.userId?.email || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCapturedAmount = payments
    .filter((p) => p.status === 'Captured' || p.status === 'Paid')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-lg border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl font-black">UPI Payment Verification Dashboard</h1>
          </div>
          <p className="text-xs text-slate-400">
            Verify customer UTR reference numbers, approve payments, and generate tax invoices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Verified Volume</span>
            <span className="text-base font-black text-emerald-400">₹{totalCapturedAmount.toLocaleString('en-IN')}</span>
          </div>
          <Button
            onClick={fetchPayments}
            variant="outline"
            className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 rounded-2xl p-3 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="rounded-3xl border-slate-200 shadow-sm bg-white">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <Input
              placeholder="Search by Payment ID, UTR, Order ID, Customer name or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-50 border-slate-200 rounded-2xl text-xs py-5"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {['All', 'Payment Submitted', 'Waiting for Payment', 'Captured', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  statusFilter === status
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="rounded-3xl border-slate-200 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
              <p className="text-xs font-semibold">Loading payment verification records...</p>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <CreditCard className="w-10 h-10 mx-auto text-slate-300" />
              <p className="font-bold text-slate-700">No payment logs found</p>
              <p className="text-xs">Try adjusting your search criteria or place a test order.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-4">Payment / Order ID</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">UTR / Txn Ref</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Gateway</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredPayments.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-slate-900">{p.paymentId}</div>
                        <div className="font-mono text-[10px] text-slate-400">Order: {p.orderId}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">
                          {p.userId ? `${p.userId.firstName} ${p.userId.lastName}` : 'Customer'}
                        </div>
                        <div className="text-[10px] text-slate-400">{p.userId?.email || 'N/A'}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        {p.upiTransactionRef || p.userOrder?.upiTransactionRef || 'Pending Submission'}
                      </td>
                      <td className="py-3.5 px-4 font-black text-slate-900">
                        ₹{(p.amount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px] border border-emerald-200">
                          {p.gateway || 'UPI QR'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 font-extrabold px-2.5 py-0.5 rounded-full text-[10px] ${
                          p.status === 'Captured' || p.status === 'Admin Verified'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : p.status === 'Payment Submitted'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : p.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {p.status === 'Captured' ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-amber-600" />}
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {new Date(p.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <button
                          onClick={() => {
                            setSelectedPayment(p);
                            setAdminNotes(p.adminNotes || '');
                          }}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Verify
                        </button>
                        <button
                          onClick={() => handleDownloadInvoice(p)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors cursor-pointer"
                          title="Download Invoice PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admin Verification Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-5 border border-slate-100 font-sans"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-slate-900 text-base">Verify UPI Payment</h3>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Payment ID</span>
                  <span className="font-mono font-bold text-slate-900">{selectedPayment.paymentId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Order ID</span>
                  <span className="font-mono font-bold text-slate-900">{selectedPayment.orderId}</span>
                </div>
              </div>

              <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-amber-800 uppercase font-bold tracking-wider block">Submitted UTR / Transaction Ref</span>
                <p className="font-mono font-black text-sm text-slate-900">
                  {selectedPayment.upiTransactionRef || selectedPayment.userOrder?.upiTransactionRef || 'Not Provided Yet'}
                </p>
              </div>

              {selectedPayment.paymentScreenshot || selectedPayment.userOrder?.paymentScreenshot ? (
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Payment Screenshot</span>
                  <a
                    href={selectedPayment.paymentScreenshot || selectedPayment.userOrder?.paymentScreenshot}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:underline font-bold flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View Payment Proof Image
                  </a>
                </div>
              ) : null}

              <div className="space-y-2 border-b border-slate-100 pb-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer</span>
                  <span className="font-bold text-slate-900">
                    {selectedPayment.userId ? `${selectedPayment.userId.firstName} ${selectedPayment.userId.lastName}` : 'Customer'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email</span>
                  <span className="font-semibold text-slate-700">{selectedPayment.userId?.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount</span>
                  <span className="font-black text-emerald-700">₹{(selectedPayment.amount || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Status</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {selectedPayment.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="adminNotes" className="text-[11px] font-bold text-slate-700">Admin Notes (Optional)</label>
                <Input
                  id="adminNotes"
                  placeholder="e.g. Verified with bank statement..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="bg-slate-50 text-xs py-5"
                />
              </div>
            </div>

            {/* Action Buttons: Approve / Reject / Request Again */}
            <div className="space-y-2 pt-2">
              <Button
                onClick={() => handleAdminVerifyAction(selectedPayment, 'Approve')}
                disabled={actionLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl py-5 text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" /> Approve Payment & Confirm Order
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleAdminVerifyAction(selectedPayment, 'Reject')}
                  disabled={actionLoading}
                  variant="outline"
                  className="w-full text-xs font-semibold rounded-xl border-rose-200 text-rose-700 hover:bg-rose-50 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Reject Payment
                </Button>
                <Button
                  onClick={() => handleAdminVerifyAction(selectedPayment, 'Request Again')}
                  disabled={actionLoading}
                  variant="ghost"
                  className="w-full text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Request Again
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default PaymentManagement;
