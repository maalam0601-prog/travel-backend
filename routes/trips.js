const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');

// Create a trip
router.post('/create', auth, async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.json({ message: 'Trip created successfully', trip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get trip by ID
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update trip
router.put('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip updated successfully', trip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete trip
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
