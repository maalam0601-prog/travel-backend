require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
