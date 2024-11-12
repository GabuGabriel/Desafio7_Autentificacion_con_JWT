const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'softjobs',
  password: 'postgres',
  port: 5432,
  allowExitOnIdle: true,
});

pool.on('connect', () => {
  console.log('Base de datos conectada con éxito');
});

pool.on('error', (err) => {
  console.error('Error en el pool de conexiones', err);
});

module.exports = pool;