import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Upload, 
  X, 
  CheckCircle2, 
  RefreshCcw,
  Sparkles,
  Smartphone,
  Info
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../../services/api';

const UpiQrPaymentModal = ({ 
  isOpen, 
  onClose, 
  orderData, 
  onPaymentSubmitted 
}) => {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 15-Minute Countdown Timer (900 seconds)
  const [timeLeft, setTimeLeft] = useState(900);
  const canvasRef = useRef(null);

  const upiUri = orderData?.upiUri || `upi://pay?pa=nexacart@upi&pn=NexaCart%20AI&am=${orderData?.totalPrice || 0}&tn=${orderData?._id || ''}&cu=INR`;
  const upiId = orderData?.upiId || import.meta.env.VITE_UPI_ID || 'nexacart@upi';
  const amount = orderData?.totalPrice || 0;

  // Generate QR Code data URL when upiUri changes
  useEffect(() => {
    if (upiUri && isOpen) {
      QRCode.toDataURL(upiUri, {
        width: 320,
        margin: 2,
        color: {
          dark: '#059669', // Emerald green
          light: '#FFFFFF'
        }
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Error generating QR Code:', err));
    }
  }, [upiUri, isOpen]);

  // Countdown timer interval
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success('UPI ID copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `NexaCart-UPI-QR-${orderData?._id || 'Order'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('QR Code downloaded!');
  };

  const handleOpenUpiApp = () => {
    window.location.href = upiUri;
    toast('Opening UPI Payment App...', { icon: '📱' });
  };

  const handleSubmitProof = async (e) => {
    e.preventDefault();

    if (!utrNumber.trim()) {
      toast.error('Please enter the 12-digit UPI UTR / Transaction Reference ID');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post('/payment/submit-upi-payment', {
        orderId: orderData._id,
        upiTransactionRef: utrNumber.trim(),
        paymentScreenshot: screenshotUrl.trim()
      });

      if (res.data.success) {
        setIsSubmitted(true);
        toast.success('Payment submitted for Admin verification!');
        if (onPaymentSubmitted) {
          onPaymentSubmitted(res.data.order);
        }
      }
    } catch (err) {
      console.error('Error submitting payment:', err);
      toast.error(err.response?.data?.message || 'Failed to submit payment details');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !orderData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-lg text-white tracking-tight flex items-center gap-2">
                Dynamic UPI QR Payment
              </h2>
              <p className="text-xs text-slate-400">Order #{orderData._id?.substring(0, 10)}...</p>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto font-sans">

          {/* Submitted Waiting View */}
          {isSubmitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-sm animate-bounce">
                <Clock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">Waiting for Payment Confirmation</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Your payment transaction reference <span className="font-bold text-slate-800">({utrNumber})</span> has been received! Our Admin team is verifying your payment.
                </p>
              </div>
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 font-medium max-w-md mx-auto space-y-1">
                <p className="font-bold">Next Steps:</p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Once verified, your order status will automatically update to <span className="font-bold text-emerald-700">Paid & Confirmed</span>. You can track status anytime in "My Orders".
                </p>
              </div>
              <Button 
                onClick={onClose} 
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl px-8 py-5 text-xs font-bold shadow-lg shadow-emerald-100 cursor-pointer"
              >
                Go to Order Confirmation
              </Button>
            </div>
          ) : (
            <>
              {/* Top Banner: Amount & Timer */}
              <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">Amount to Pay</span>
                  <p className="text-2xl font-black text-emerald-700">₹{amount.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> Time Remaining
                  </span>
                  <p className={`text-lg font-black tracking-mono ${timeLeft < 180 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
                    {formatTimer(timeLeft)}
                  </p>
                </div>
              </div>

              {/* QR Code & Mobile UPI Action Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                
                {/* QR Code Container */}
                <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center space-y-3">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt="UPI QR Code" 
                      className="w-48 h-48 mx-auto rounded-2xl border border-slate-100 shadow-inner p-1 bg-white"
                    />
                  ) : (
                    <div className="w-48 h-48 mx-auto rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-xs">
                      Generating QR...
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      onClick={handleDownloadQr}
                      variant="outline"
                      size="sm"
                      className="text-[11px] font-bold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download QR
                    </Button>
                  </div>
                </div>

                {/* UPI Details & App Buttons */}
                <div className="space-y-4">
                  {/* Copy UPI ID */}
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-slate-700">Official UPI VPA</Label>
                    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="font-mono text-xs font-bold text-slate-800 truncate flex-1">{upiId}</span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="p-1.5 bg-white rounded-lg border border-slate-200 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors shrink-0"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Deep Link Button */}
                  <div className="space-y-2">
                    <Button
                      type="button"
                      onClick={handleOpenUpiApp}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-5 text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4 text-emerald-400" /> Open UPI App (GPay / PhonePe / Paytm)
                    </Button>
                    <p className="text-[10px] text-slate-400 text-center leading-normal">
                      Scan QR code or click above to launch installed UPI apps directly.
                    </p>
                  </div>

                  {/* Supported Payment Logos */}
                  <div className="pt-1 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-100">GPay</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100">PhonePe</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100">Paytm</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100">BHIM</span>
                  </div>
                </div>
              </div>

              {/* Payment Proof Submission Form */}
              <form onSubmit={handleSubmitProof} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider border-b border-slate-200 pb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Confirm Payment Completion
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="utr" className="text-xs font-bold text-slate-700">
                      UPI UTR / Transaction Reference ID <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="utr"
                      placeholder="e.g. 420918239012 (12-digit UPI reference)"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="bg-white border-slate-300 text-xs py-5 font-mono"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="screenshot" className="text-xs font-bold text-slate-700">
                      Payment Screenshot URL (Optional)
                    </Label>
                    <Input
                      id="screenshot"
                      placeholder="https://..."
                      value={screenshotUrl}
                      onChange={(e) => setScreenshotUrl(e.target.value)}
                      className="bg-white border-slate-300 text-xs py-5"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-5 text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCcw className="w-4 h-4 animate-spin" /> Submitting Proof...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> I Have Completed Payment
                    </>
                  )}
                </Button>
              </form>
            </>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default UpiQrPaymentModal;
