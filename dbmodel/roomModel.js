const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  roomType: String,
  pricePerDay: Number,
  totalRooms:Number
});

module.exports = mongoose.model('Room', roomSchema);
