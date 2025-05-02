const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController } = require('../controllers/userController')
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

// Delete User || DELETE
router.delete('/deleteUser/:id', authMiddleware, deleteUserController);

module.exports = router;