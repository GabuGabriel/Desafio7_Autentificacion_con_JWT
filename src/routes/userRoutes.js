const express = require('express');
const { getUsers, getUser } = require('../controllers/userController.js');
const { authenticateToken } = require('../controllers/authController.js');
const router = express.Router();

router.get('/', authenticateToken, getUsers);
router.get('/me', authenticateToken, getUser);

module.exports = router;
