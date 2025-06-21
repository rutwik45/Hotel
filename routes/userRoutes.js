const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Get user by ID
router.get('/:userId', userController.getUserById);

// Get all users (optional, for admin purposes)
router.get('/', userController.getAllUsers);

// Update user by ID
router.put('/:userId', userController.updateUser);

// Delete user by ID
router.delete('/:userId', userController.deleteUser);

module.exports = router;
