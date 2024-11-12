const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const usuarioRoutes = require('./routes/usuarios');
const { pool } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});