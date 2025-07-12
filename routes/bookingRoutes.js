const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create booking
router.post('/', bookingController.createBooking);

router.get('/getHotelBooking/:hotelId', bookingController.getAllHotelBookings);

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get bookings by user ID
router.get('/user/:userId', bookingController.getBookingsByUser);

// Cancel booking
router.delete('/:id', bookingController.cancelBooking);

module.exports = router;
