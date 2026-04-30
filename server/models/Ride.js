const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  origin: {
    type: String,
    required: [true, 'Please add an origin']
  },
  destination: {
    type: String,
    required: [true, 'Please add a destination']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  time: {
    type: String,
    required: [true, 'Please add a time']
  },
  totalSeats: {
    type: Number,
    required: [true, 'Please add total seats'],
    min: 1
  },
  seatsAvailable: {
    type: Number,
    required: true,
    min: 0
  },
  costPerSeat: {
    type: Number,
    required: [true, 'Please add cost per seat']
  },
  vehicleType: {
    type: String,
    enum: ['car', 'bike'],
    required: [true, 'Please specify vehicle type']
  },
  description: {
    type: String,
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  genderPreference: {
    type: String,
    enum: ['any', 'male', 'female'],
    default: 'any'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ride', rideSchema);
