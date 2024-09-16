// routes/app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./auth');
const bookingsRoutes = require('./bookings');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
