const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  checkInDate: Date,
  checkOutDate: Date,
  totalPrice: Number,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
