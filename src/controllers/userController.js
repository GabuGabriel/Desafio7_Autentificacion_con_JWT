const pool = require('../config/db.js');

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send('Error al obtener usuarios');
  }
};

exports.getUser = async (req, res) => {
  const { email } = req.user;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send('Error al obtener usuario');
  }
};
