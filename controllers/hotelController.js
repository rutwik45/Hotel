const Joi = require('joi');
const hotelService = require('../service/hotelService');

// Joi validation schema
const hotelSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  city: Joi.string().required(),
  pincode: Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()).default([]),
  amenities: Joi.array().items(Joi.string()).default([]),
  manager: Joi.string().required()
});

// Create Hotel
const createHotel = async (req, res) => {
  const { error } = hotelSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const hotel = await hotelService.createHotel(req.body);
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await hotelService.getAllHotels();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get One Hotel
const getHotelById = async (req, res) => {
  try {
    const hotel = await hotelService.getHotelById(req.params.id);
    res.json(hotel);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update Hotel
const updateHotel = async (req, res) => {
  const { error } = hotelSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const hotel = await hotelService.updateHotel(req.params.id, req.body);
    res.json(hotel);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Delete Hotel
const deleteHotel = async (req, res) => {
  try {
    await hotelService.deleteHotel(req.params.id);
    res.json({ message: 'Hotel deleted' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Search Hotels
const searchHotels = async (req, res) => {
  try {
    const hotels = await hotelService.searchHotels(req.query);
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  searchHotels,
};
