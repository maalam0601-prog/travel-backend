const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

module.exports = mongoose.model('Trip', TripSchema);
