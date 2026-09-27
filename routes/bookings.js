const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/booking');

// Create booking tied to logged-in user
router.post('/create', auth, async (req, res) => {
  try {
    const { tripId } = req.body;

    const booking = new Booking({
      user: req.user.id,   // automatically tie to logged-in user
      trip: tripId,
      status: 'confirmed'
    });

    await booking.save();
    res.json({ message: 'Booking created successfully', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bookings for logged-in user
router.get('/me', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('trip');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
