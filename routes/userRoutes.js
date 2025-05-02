const express = require('express');
const { getUserController } = require('../controllers/getUserController')
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// routes
// GET USER || POST
router.get('/getUser', authMiddleware, getUserController);

module.exports = router;