const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// routes
// GET USER || POST
router.get('/getUser', authMiddleware, getUserController);

// Update User || POST
router.post('/updateUser', authMiddleware, updateUserController);

// Passwod Reset || POST
router.post('/resetPassword', authMiddleware, resetPasswordController);

// Update Password || POST
router.post('/updatePassword', authMiddleware, updatePasswordController);

module.exports = router;