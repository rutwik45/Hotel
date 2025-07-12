const User = require('../dbmodel/userModel');

// Service to create a user
const createUserService = async (userData) => {
  const { username, email, phoneNumber, city, password,role,pincode } = userData;
  const userExists = await User.findOne({ email,role });
  if (userExists) {
    throw new Error('User already exists');
  }
  
  const user = new User({ username, email, phoneNumber, city, password,role });
  await user.save();
  return user;
};

// Service to get a user by ID
const getUserByIdService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const loginService = async (data) => {
  const {identifier,role}=data
  const user = await User.findOne({
    $or:[
      { email:identifier,},
      { phoneNumber:identifier}
    ],
    role
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Service to update a user
const updateUserService = async (userId, userData) => {
  const { username, email, phoneNumber, city, password,pincode } = userData;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.username = username || user.username;
  user.email = email || user.email;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.city = city || user.city;
  user.pincode = pincode || user.pincode;
  if (password) user.password = password;

  await user.save();
  return user;
};

// Service to delete a user
const deleteUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Service to get all users
const getAllUsersService = async () => {
  const users = await User.find();
  return users;
};

module.exports = {
  createUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  getAllUsersService,
  loginService
};
