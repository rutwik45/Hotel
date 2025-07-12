const Joi = require('joi');
const roomService = require('../service/roomService');

// Joi Schema
const roomSchema = Joi.object({
  hotelId: Joi.string().required(),
  roomType: Joi.string().required(),
  pricePerDay: Joi.number().required(),
  totalRooms: Joi.number().required(),
});

// Create Room
const createRoom = async (req, res) => {
  const { error } = roomSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const room = await roomService.createRoom(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get room by ID
const getRoomById = async (req, res) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    res.json(room);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update room
const updateRoom = async (req, res) => {
  // const { error } = roomSchema.validate(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const room = await roomService.updateRoom(req.params.id, req.body);
    res.json(room);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  try {
    await roomService.deleteRoom(req.params.id);
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get rooms for specific hotel
const getRoomsByHotel = async (req, res) => {
  try {
    const rooms = await roomService.getRoomsByHotel(req.params.hotelId);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomsByHotel,
};
