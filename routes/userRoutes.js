const express = require('express');
const { getUserController, updateUserController, resetPasswordController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// routes
// GET USER || POST
router.get('/getUser', authMiddleware, getUserController);

// Update User || POST
router.post('/updateUser', authMiddleware, updateUserController);

// Passwod Reset || POST
router.post('/resetPassword', authMiddleware, resetPasswordController);

module.exports = router;