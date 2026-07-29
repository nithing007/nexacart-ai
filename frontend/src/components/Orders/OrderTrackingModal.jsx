import { X, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';

const TRACKING_STEPS = [
  { id: 'Order Placed', label: 'Order Placed', icon: Package, desc: 'Order submitted by customer' },
  { id: 'Confirmed', label: 'Payment Confirmed', icon: ShieldCheck, desc: 'Payment verified & order confirmed' },
  { id: 'Packed', label: 'Packed', icon: Package, desc: 'Package sealed at fulfillment center' },
  { id: 'Ready for Shipment', label: 'Ready for Shipment', icon: Package, desc: 'Handed to logistics carrier' },
  { id: 'Shipped', label: 'Picked Up', icon: Truck, desc: 'Picked up by delivery courier' },
  { id: 'In Transit', label: 'In Transit', icon: Truck, desc: 'En route to regional sorting facility' },
  { id: 'Out for Delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Courier agent out for final delivery' },
  { id: 'Delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully delivered to recipient' }
];

const OrderTrackingModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const currentStatus = order.status || 'Pending';
  
  // Determine current active step index in timeline
  const activeIndex = TRACKING_STEPS.findIndex(step => 
    step.id.toLowerCase() === currentStatus.toLowerCase()
  );
  
  const currentStepIdx = activeIndex !== -1 ? activeIndex : (currentStatus === 'Cancelled' ? -1 : 1);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              🚚 Real-Time Order Tracking
            </h2>
            <p className="text-xs text-gray-400 font-semibold mt-1">
              Order #{order._id ? order._id.substring(12).toUpperCase() : ''} • Carrier: <span className="text-emerald-600 font-bold">{order.deliveryPartner || 'Delhivery'}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracking Details Summary Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-green-800 text-white p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-300">
              Tracking Number: {order.trackingNumber || 'DELHIVERY892182IN'}
            </span>
            <span className="text-[10px] bg-white/20 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
              {order.status}
            </span>
          </div>
          <div className="text-base font-extrabold">
            Estimated Delivery: {order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : '3–5 Business Days'} ({order.estimatedDeliveryTime || '2:00 PM – 7:00 PM'})
          </div>
          <p className="text-xs text-emerald-200 font-semibold">
            Deliver to: {order.shippingAddress}
          </p>
        </div>

        {/* Amazon-style Step-by-Step Progress Timeline */}
        <div className="space-y-6 pt-2">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Shipment Progress Timeline</h3>
          
          <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
            {TRACKING_STEPS.map((step, idx) => {
              const isCompleted = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.id} className="relative flex items-start gap-4 group">
                  {/* Step Status Node Indicator */}
                  <div className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                      : 'bg-white border-gray-300 text-gray-300'
                  } ${isCurrent ? 'ring-4 ring-emerald-500/20 scale-125' : ''}`}>
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs font-extrabold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </h4>
                      {isCurrent && (
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse">
                          Current Stage
                        </span>
                      )}
                    </div>
                    <p className={`text-[11px] font-medium ${isCompleted ? 'text-gray-600' : 'text-gray-300'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Close trigger */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderTrackingModal;
