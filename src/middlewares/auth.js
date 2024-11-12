const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.email = decoded.email;
    next();
  });
};

module.exports = { verifyToken };
