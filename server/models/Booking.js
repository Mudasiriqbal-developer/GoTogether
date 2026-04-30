const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ride: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ride',
    required: true
  },
  passenger: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },
  seatsBooked: {
    type: Number,
    default: 1,
    min: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent user from double booking the same ride
bookingSchema.index({ ride: 1, passenger: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
