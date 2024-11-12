const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const logger = require('./src/middlewares/logger');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
