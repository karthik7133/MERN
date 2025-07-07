const express = require('express');
const Car = require('../models/Car');

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  try {
    const { location, fromDate, toDate, category, minPrice, maxPrice } = req.query;
    
    let query = { availability: true };
    
    // Add filters
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    const cars = await Car.find(query).sort({ rating: -1 });

    res.json({
      status: 'success',
      results: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch cars',
      error: error.message
    });
  }
});

// Get car by ID
router.get('/:id', async (req, res) => {
  try {
    console.log("Fetching car with ID:", req.params.id);
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        status: 'error',
        message: 'Car not found'
      });
    }

    res.json({
      status: 'success',
      data: car
    });
  } catch (error) {
    console.error('Error in /cars/:id route:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch car',
      error: error.message
    });
  }
});


// Add new car (Admin only)
router.post('/', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();

    res.status(201).json({
      status: 'success',
      message: 'Car added successfully',
      data: car
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to add car',
      error: error.message
    });
  }
});

module.exports = router;