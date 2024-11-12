const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/usuariosController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/', verifyToken, getUser);

module.exports = router;
