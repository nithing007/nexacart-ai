import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

const CancelOrderModal = ({ order, isOpen, onClose, onConfirmCancel }) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    setLoading(true);
    await onConfirmCancel(order._id, reason);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-gray-100">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 text-rose-600">
            <AlertTriangle className="w-5 h-5 text-rose-600" /> Cancel Order #{order._id?.substring(12).toUpperCase()}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Are you sure you want to cancel this order? Stock will be released and payment will be refunded to your original payment method.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Reason for Cancellation</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="">Select a reason...</option>
              <option value="Order placed by mistake">Order placed by mistake</option>
              <option value="Item price dropped elsewhere">Item price dropped elsewhere</option>
              <option value="Delivery time is too long">Delivery time is too long</option>
              <option value="Need to change shipping address">Need to change shipping address</option>
              <option value="Other reason">Other reason</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl text-xs font-bold border-gray-200"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={loading || !reason}
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md"
            >
              {loading ? 'Cancelling...' : 'Confirm Cancellation'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelOrderModal;
