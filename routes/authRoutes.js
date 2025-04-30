const express = require('express');
const { registerController } = require('../controllers/authController');

const router = express.Router();

// routes
// Register || POST
router.post('/register', registerController);

module.exports = router;