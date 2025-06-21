const Room = require('../dbmodel/roomModel');

// Create Room (check for duplicate roomType for same hotel)
const createRoom = async (data) => {
  const existing = await Room.findOne({ hotelId: data.hotelId, roomType: data.roomType });
  if (existing) throw new Error('Room type already exists for this hotel');
  const createData={
    hotel:data.hotelId,
    roomType: data.roomType,
    pricePerDay: data.pricePerDay,
    totalRooms:data.totalRooms
  }
  return await Room.create(createData);
};

const getAllRooms = async () => {
  return await Room.find().populate('hotelId', 'name city');
};

const getRoomById = async (id) => {
  const room = await Room.findById(id).populate('hotelId');
  if (!room) throw new Error('Room not found');
  return room;
};

const updateRoom = async (id, data) => {
  const room = await Room.findByIdAndUpdate(id, data, { new: true });
  if (!room) throw new Error('Room not found');
  return room;
};

const deleteRoom = async (id) => {
  const room = await Room.findByIdAndDelete(id);
  if (!room) throw new Error('Room not found');
  return room;
};

const getRoomsByHotel = async (hotelId) => {
  return await Room.find({ hotelId });
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomsByHotel,
};
