const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: { 
    type: String,
    required: true,
    unique: true
  },
  orderId: { 
    type: String, 
    required: true 
  },
  userOrder: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order' 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  currency: { 
    type: String, 
    default: 'INR' 
  },
  paymentMethod: { 
    type: String, 
    required: true,
    default: 'UPI'
  },
  upiId: {
    type: String,
    default: 'nexacart@upi'
  },
  upiUri: {
    type: String,
    default: ''
  },
  upiTransactionRef: {
    type: String,
    default: ''
  },
  paymentScreenshot: {
    type: String,
    default: ''
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Waiting for Payment', 'Payment Submitted', 'Admin Verified', 'Captured', 'Failed', 'Rejected', 'Request Again', 'Refunded'], 
    default: 'Waiting for Payment' 
  },
  transactionId: { 
    type: String 
  },
  gateway: { 
    type: String, 
    default: 'UPI QR' 
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
