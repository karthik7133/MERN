const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Car name is required'],
    trim: true
  },
  price: {
    type: String,
    required: [true, 'Price is required']
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Price per day is required']
  },
  image: {
    type: String,
    required: [true, 'Car image is required']
  },
  features: [{
    type: String
  }],
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 1,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['Economy', 'Compact', 'SUV', 'Luxury', 'Sports'],
    default: 'Economy'
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic', 'CVT'],
    default: 'Manual'
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    default: 'Petrol'
  },
  seats: {
    type: Number,
    default: 5
  },
  availability: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  }
}, {
  timestamps: true
});

// Index for better search performance
carSchema.index({ name: 'text', description: 'text' });
carSchema.index({ location: 1, availability: 1 });
carSchema.index({ pricePerDay: 1 });

module.exports = mongoose.model('Car', carSchema);