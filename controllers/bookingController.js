const Joi = require('joi');
const bookingService = require('../service/bookingService');

// Validation
const bookingSchema = Joi.object({
  hotel: Joi.string().required(),
  user: Joi.string().required(),
  room: Joi.string().required(),
  checkInDate: Joi.date().required(),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required(),
  totalPrice: Joi.number().required(),
  roomsBooked: Joi.number().required(),
 
});

// Create Booking
const createBooking = async (req, res) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllHotelBookings = async (req, res) => {
  try {
     const { hotelId } = req.params;
    const bookings = await bookingService.getAllHotelBookings(hotelId);
    res.json(bookings);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

// Get bookings by user
const getBookingsByUser = async (req, res) => {
  try {
    const bookings = await bookingService.getBookingsByUser(req.params.userId);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    await bookingService.cancelBooking(req.params.id);
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingsByUser,
  cancelBooking,
  getAllHotelBookings
};
