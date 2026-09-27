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
// Root route
app.get('/', (req, res) => {
  res.send('Backend is live and working!');
});
// Health check route
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState; 
  // 0 = disconnected, 1 = connected
  res.json({ status: 'ok', dbState });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
