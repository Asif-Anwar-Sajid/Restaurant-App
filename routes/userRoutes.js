const express = require('express');
const { getUserController, updateUserController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// routes
// GET USER || POST
router.get('/getUser', authMiddleware, getUserController);

// Update User || POST
router.post('/updateUser', authMiddleware, updateUserController);

module.exports = router;