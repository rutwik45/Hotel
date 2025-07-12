const Hotel = require('../dbmodel/hotelModel');
const roomModel = require('../dbmodel/roomModel');

const createHotel = async (data) => {
  const { name, city, pincode } = data;

  // Check if hotel already exists with same name, city, and pincode
  const existingHotel = await Hotel.findOne({ name, city, pincode });
  if (existingHotel) {
    throw new Error('Hotel already exists in this city with the same pincode');
  }
  console.log(data)
  const hotel = new Hotel(data);
  return await hotel.save();
};



// Get All
const getAllHotels = async () => {
  return await Hotel.find();
};

const getAllManagerHotels = async (data) => {
  const { manager } = data;

  // 1. Get all hotels for this manager
  const hotels = await Hotel.find({ manager }).lean();
  const hotelIds = hotels.map(h => h._id);

  // 2. Get all rooms linked to these hotels
  const rooms = await roomModel.find({ hotel: { $in: hotelIds } }).lean();

  // 3. Group rooms by hotel and sum totalRooms
  const roomsByHotel = {};
  const roomTotals = {};

  rooms.forEach(room => {
    const hotelId = room.hotel.toString();

    if (!roomsByHotel[hotelId]) {
      roomsByHotel[hotelId] = [];
      roomTotals[hotelId] = 0;
    }

    roomsByHotel[hotelId].push(room);
    roomTotals[hotelId] += room.totalRooms;
  });

  // 4. Add availableRooms and totalRoomsCount to each hotel
  const hotelsWithRoomDetails = hotels.map(hotel => {
    const hotelId = hotel._id.toString();

    return {
      ...hotel,
      availableRooms: roomsByHotel[hotelId] || [],
      totalRoomsCount: roomTotals[hotelId] || 0
    };
  });

  return hotelsWithRoomDetails;
};

// Get One
const getHotelById = async (id) => {
  const hotel = await Hotel.findById(id);
  if (!hotel) throw new Error('Hotel not found');
  return hotel;
};

// Update
const updateHotel = async (id, data) => {
  console.log({data},"kkkk")
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
  getAllManagerHotels
};
