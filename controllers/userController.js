const Joi = require('joi');
const userService = require('../service/userService');  // Import user service

// Joi validation schema for creating/updating a user
const userValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
    city: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().min(6).required(),
    pincode:Joi.number().max(6)
});

// CREATE User
const createUser = async (req, res) => {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const user = await userService.createUserService(req.body);
        res.status(201).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {


    try {
        const user = await userService.loginService(req.body);
        res.status(201).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ User (Get User by ID)
const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await userService.getUserByIdService(userId);
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// UPDATE User
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { error } = userValidationSchema.validate(req.body);  // Validate input using Joi
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const updatedUser = await userService.updateUserService(userId, req.body);
        res.status(200).json({ data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE User
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        await userService.deleteUserService(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// GET All Users (optional)
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsersService();
        res.status(200).json({data:users});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
    loginUser
};
