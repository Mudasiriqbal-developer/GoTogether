const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  reportedUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  ride: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ride'
  },
  reason: {
    type: String,
    required: [true, 'Please provide a reason for the report'],
    enum: ['Fake profile', 'Inappropriate behavior', 'No show', 'Other']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
