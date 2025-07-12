const Booking = require('../dbmodel/bookingModel');
const Room = require('../dbmodel/roomModel')

// Create Booking
const createBooking = async (data) => {
  try {
    const { room, checkInDate, checkOutDate } = data;

    const roomData = await Room.findOne({ _id: room });


    if (!roomData) throw new Error('Room not found');
    const totalRooms = roomData.totalRooms - data.roomsBooked
    await Room.updateOne({ _id: roomData._id }, { $set: { totalRooms } })
    const booking = new Booking(data);

    return await booking.save();

  } catch (err) {
    console.log(err)
    throw new Error(err.message || 'Booking failed');
  }
};



// Get all bookings
const getAllBookings = async () => {
  return await Booking.find().populate('hotel user room');
};

const getAllHotelBookings = async (hotelId) => {
  try {
    console.log(hotelId)
    return await Booking.find({ hotel: hotelId }).populate('hotel user room');
  } catch (error) {
    console.log(error)
  }

};

// Get bookings by user
const getBookingsByUser = async (userId) => {
  return await Booking.find({ user: userId }).populate('hotel room');
};

// Cancel (delete) a booking
const cancelBooking = async (bookingId) => {
  const booking = await Booking.findByIdAndDelete(bookingId);
  if (!booking) throw new Error('Booking not found');
  return booking;
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingsByUser,
  cancelBooking,
  getAllHotelBookings
};
