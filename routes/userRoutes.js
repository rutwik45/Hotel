const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

router.post('/login', userController.loginUser);

// Get user by ID
router.get('/:userId', userController.getUserById);

// Get all users (optional, for admin purposes)
router.get('/', userController.getAllUsers);

// Update user by ID
router.put('/:userId', userController.updateUser);

// Delete user by ID
router.delete('/:userId', userController.deleteUser);

module.exports = router;
