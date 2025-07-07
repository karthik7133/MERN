const express = require('express');
const Booking = require('../models/Booking');
const Car = require('../models/Car');

const router = express.Router();

// 📦 Create new booking
router.post('/', async (req, res) => {
  try {
    console.log('🔍 Incoming Booking Request:');
    console.log(JSON.stringify(req.body, null, 2));

    const { user, carId, bookingDetails, paymentDetails } = req.body;

    // ✅ Validate required fields
    if (!user || !carId || !bookingDetails || !paymentDetails) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields (user, carId, bookingDetails, or paymentDetails)'
      });
    }

    const { fromDate, toDate, name, email, phone, location } = bookingDetails;
    const { cardNumber, cardName, expiryDate } = paymentDetails;

    if (!fromDate || !toDate || !name || !email || !phone || !location || !cardNumber || !cardName || !expiryDate) {
      return res.status(400).json({
        status: 'error',
        message: 'Some bookingDetails or paymentDetails fields are missing'
      });
    }

    console.log('🚗 Fetching car with ID:', carId);
    const car = await Car.findById(carId);
    if (!car) {
      console.log('❌ Car not found');
      return res.status(404).json({
        status: 'error',
        message: 'Car not found'
      });
    }

    console.log('✅ Car found:', car.name);

    // ✅ Calculate totalDays and totalAmount
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const totalDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
    const totalAmount = totalDays * car.pricePerDay;

    // ✅ Generate bookingId BEFORE saving
    const generatedBookingId = 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();

    const booking = new Booking({
      user,
      car: carId,
      bookingDetails,
      paymentDetails: {
        cardNumber: cardNumber.slice(-4),
        cardName,
        expiryDate
      },
      totalAmount,
      totalDays,
      status: 'confirmed',
      bookingId: generatedBookingId // ✅ Add bookingId manually
    });

    await booking.save();

    console.log('✅ Booking saved successfully:', booking.bookingId);

    return res.status(201).json({
      status: 'success',
      message: 'Booking created successfully',
      data: {
        bookingId: booking.bookingId,
        totalAmount,
        totalDays,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('❌ Booking error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Booking failed',
      error: error.message
    });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('car', 'name image')
      .sort({ createdAt: -1 });

    res.json({
      status: 'success',
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});


// 📦 Get booking by ID
router.get('/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId })
      .populate('car', 'name price image')
      .populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    return res.json({
      status: 'success',
      data: booking
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
});

// 📦 Get all bookings (admin only)
router.get('/', async (req, res) => {
  try {
    
    
    const bookings = await Booking.find()
      .populate('car', 'name price image')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

      console.log('Fetching bookings for user:', req.params.userId);
    console.log('Found bookings:', bookings);
    return res.json({
      status: 'success',
      results: bookings.length,
      data: bookings
    });
    
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

module.exports = router;
