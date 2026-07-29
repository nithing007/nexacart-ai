const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
    }
  ],
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true, default: 'Cash on Delivery' },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String }
  },
  itemsPrice: { type: Number, required: true, default: 0.0 },
  taxPrice: { type: Number, required: true, default: 0.0 },
  shippingPrice: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true, default: 0.0 },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date },
  status: { 
    type: String, 
    required: true, 
    enum: ['Pending', 'Confirmed', 'Packed', 'Ready for Shipment', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned', 'Refunded'], 
    default: 'Pending' 
  },
  deliveryPartner: { type: String, default: 'Delhivery' },
  trackingNumber: { type: String, default: '' },
  expectedDeliveryDate: { type: Date },
  estimatedDeliveryTime: { type: String, default: '2:00 PM – 7:00 PM' },
  cancellationReason: { type: String, default: '' },
  returnReason: { type: String, default: '' },
  returnStatus: { type: String, enum: ['None', 'Requested', 'Approved', 'Rejected', 'Completed'], default: 'None' },
  timeline: [
    {
      status: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      description: { type: String }
    }
  ]
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
