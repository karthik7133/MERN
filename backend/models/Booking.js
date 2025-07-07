const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Car is required']
  },
  bookingDetails: {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone is required']
    },
    location: {
      type: String,
      required: [true, 'Pickup location is required']
    },
    fromDate: {
      type: Date,
      required: [true, 'From date is required']
    },
    toDate: {
      type: Date,
      required: [true, 'To date is required']
    }
  },
  paymentDetails: {
    cardNumber: {
      type: String,
      required: [true, 'Card number is required']
    },
    cardName: {
      type: String,
      required: [true, 'Cardholder name is required']
    },
    expiryDate: {
      type: String,
      required: [true, 'Expiry date is required']
    }
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  totalDays: {
    type: Number,
    required: [true, 'Total days is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  bookingId: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});



module.exports = mongoose.model('Booking', bookingSchema);