const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db.js');
const secret = 'your_jwt_secret';

exports.register = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query('INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *', [email, hashedPassword, rol, lenguage]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send('Error al registrar usuario');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(400).send('Usuario no encontrado');
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).send('Contraseña incorrecta');
    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Error al iniciar sesión');
  }
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Acceso denegado');
  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Token inválido');
  }
};
