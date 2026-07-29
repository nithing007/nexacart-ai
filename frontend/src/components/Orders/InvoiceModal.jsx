import { X, Printer, Sparkles } from 'lucide-react';

const InvoiceModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `INV-${order._id ? order._id.substring(12).toUpperCase() : 'NEXA'}-2026`;
  const orderDate = new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 space-y-8 shadow-2xl relative border border-gray-100 max-h-[92vh] overflow-y-auto print:max-h-none print:p-0 print:shadow-none print:border-none">
        
        {/* Modal Controls (Hidden during print) */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-emerald-800 text-sm flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Official Tax Invoice
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE INVOICE CONTENT */}
        <div className="space-y-8 text-gray-800 text-xs">
          
          {/* Company Branding & Invoice Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-emerald-600 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-500 text-white flex items-center justify-center font-black text-lg">
                  N
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tight">NexaCart <span className="text-emerald-600">AI</span></span>
              </div>
              <p className="text-[11px] text-gray-400 font-semibold mt-1">NexaCart E-Commerce Private Limited</p>
              <p className="text-[10px] text-gray-400">GSTIN: 29AAAAA0000A1Z5 • FSSAI: 10019043002812</p>
            </div>
            <div className="text-left sm:text-right space-y-1">
              <h2 className="text-lg font-black text-emerald-900 uppercase tracking-wider">TAX INVOICE</h2>
              <p className="font-extrabold text-gray-900">Invoice No: {invoiceNumber}</p>
              <p className="text-gray-500">Order ID: #{order._id ? order._id.substring(12).toUpperCase() : ''}</p>
              <p className="text-gray-500">Date: {orderDate}</p>
            </div>
          </div>

          {/* Customer & Shipping Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <div>
              <h4 className="font-extrabold text-emerald-900 uppercase tracking-wider text-[10px] mb-1">Billed & Shipped To</h4>
              <p className="font-extrabold text-gray-900 text-sm">{order.user?.name || order.user?.firstName || 'Valued Customer'}</p>
              <p className="text-gray-600 leading-relaxed mt-1">{order.shippingAddress}</p>
              <p className="text-gray-500 mt-1">Email: {order.user?.email || 'customer@nexacart.com'}</p>
            </div>
            <div className="space-y-1 text-left sm:text-right">
              <h4 className="font-extrabold text-emerald-900 uppercase tracking-wider text-[10px] mb-1">Payment Details</h4>
              <p className="font-bold text-gray-800">Method: {order.paymentMethod}</p>
              <p className="text-gray-600">Status: <span className="font-bold text-emerald-600">{order.isPaid ? 'PAID' : 'Cash on Delivery'}</span></p>
              <p className="text-gray-500">Carrier: {order.deliveryPartner || 'Delhivery'}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-900 text-white text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="p-3">#</th>
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.orderItems?.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-400">{idx + 1}</td>
                    <td className="p-3 font-bold text-gray-800">{item.name}</td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right font-semibold">₹{item.price.toLocaleString()}</td>
                    <td className="p-3 text-right font-extrabold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Summary Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-2">
            <div className="text-[10px] text-gray-400 space-y-1 max-w-xs">
              <p className="font-bold text-gray-600">Terms & Conditions:</p>
              <p>1. All goods sold are inclusive of applicable GST taxes.</p>
              <p>2. Eligible returns can be requested within 7 days of delivery.</p>
            </div>

            <div className="w-full sm:w-64 space-y-2 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 text-emerald-950 font-medium">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold">₹{(order.itemsPrice || order.totalPrice).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (18% GST):</span>
                <span className="font-bold">₹{(order.taxPrice || Math.round(order.totalPrice * 0.18)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Delivery:</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <hr className="border-emerald-200" />
              <div className="flex justify-between text-base font-black text-emerald-950 pt-1">
                <span>Grand Total:</span>
                <span>₹{order.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="border-t border-gray-100 pt-6 flex justify-between items-end text-[10px] text-gray-400">
            <div>
              <p className="font-bold text-gray-600">Authorized Signatory</p>
              <p className="italic">NexaCart AI Logistics Fulfillment Team</p>
            </div>
            <p>Thank you for shopping with NexaCart AI!</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InvoiceModal;
