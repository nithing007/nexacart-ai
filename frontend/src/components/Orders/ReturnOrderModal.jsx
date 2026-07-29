import { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

const ReturnOrderModal = ({ order, isOpen, onClose, onConfirmReturn }) => {
  const [reason, setReason] = useState('');
  const [returnType, setReturnType] = useState('Return & Refund');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    setLoading(true);
    await onConfirmReturn(order._id, `${returnType}: ${reason}`);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-gray-100">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 text-indigo-600">
            <RefreshCw className="w-5 h-5 text-indigo-600" /> Return / Replace Request
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Order #{order._id?.substring(12).toUpperCase()} delivered. Please select whether you wish to return for a full refund or request a replacement.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Request Type</label>
            <select
              value={returnType}
              onChange={(e) => setReturnType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
            >
              <option value="Return & Refund">Return & Refund</option>
              <option value="Replacement">Replacement</option>
              <option value="Exchange for size/color">Exchange for size/color</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Reason for Return</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="">Select reason...</option>
              <option value="Damaged or defective item">Damaged or defective item</option>
              <option value="Item does not match description">Item does not match description</option>
              <option value="Wrong item delivered">Wrong item delivered</option>
              <option value="Quality not as expected">Quality not as expected</option>
              <option value="No longer needed">No longer needed</option>
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
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnOrderModal;
