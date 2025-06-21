const Hotel = require('../dbmodel/hotelModel');

const createHotel = async (data) => {
  const { name, city, pincode } = data;

  // Check if hotel already exists with same name, city, and pincode
  const existingHotel = await Hotel.findOne({ name, city, pincode });
  if (existingHotel) {
    throw new Error('Hotel already exists in this city with the same pincode');
  }
  const hotel = new Hotel(data);
  return await hotel.save();
};



// Get All
const getAllHotels = async () => {
  return await Hotel.find();
};

// Get One
const getHotelById = async (id) => {
  const hotel = await Hotel.findById(id);
  if (!hotel) throw new Error('Hotel not found');
  return hotel;
};

// Update
const updateHotel = async (id, data) => {
  const hotel = await Hotel.findByIdAndUpdate(id, data, { new: true });
  if (!hotel) throw new Error('Hotel not found');
  return hotel;
};

// Delete
const deleteHotel = async (id) => {
  const hotel = await Hotel.findByIdAndDelete(id);
  if (!hotel) throw new Error('Hotel not found');
  return hotel;
};

// Search by city or pincode
const searchHotels = async (query) => {
  const { city, pincode } = query;
  const filter = {};
  if (city) filter.city = city;
  if (pincode) filter.pincode = pincode;
  return await Hotel.find(filter);
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  searchHotels,
};
