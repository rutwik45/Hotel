const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  city: String,
  pincode: String,
  description: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  amenities: [String],
  images: [String],
});

module.exports = mongoose.model('Hotel', hotelSchema);
