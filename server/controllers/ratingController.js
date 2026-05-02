const Rating = require('../models/Rating');
const Booking = require('../models/Booking');
const Ride = require('../models/Ride');
const User = require('../models/User');

// @desc    Create new rating
// @route   POST /api/ratings
// @access  Protected
exports.createRating = async (req, res, next) => {
  try {
    const { reviewee, ride, booking, stars, comment } = req.body;
    const reviewer = req.user.id;

    // Check if trying to rate self
    if (reviewer === reviewee) {
      return res.status(400).json({ success: false, error: 'You cannot rate yourself' });
    }

    // Verify the booking
    const bookingDoc = await Booking.findById(booking).populate('ride');
    if (!bookingDoc) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Must be approved
    if (bookingDoc.status !== 'approved') {
      return res.status(400).json({ success: false, error: 'Booking must be approved to leave a rating' });
    }

    // Ride date must have passed
    const rideDate = new Date(`${bookingDoc.ride.date.toISOString().split('T')[0]}T${bookingDoc.ride.time}`);
    if (new Date() < rideDate) {
      return res.status(400).json({ success: false, error: 'You can only rate after the ride has occurred' });
    }

    // Ensure the users were part of this booking/ride
    const isPassenger = bookingDoc.passenger.toString() === reviewer;
    const isDriver = bookingDoc.ride.driver.toString() === reviewer;

    if (!isPassenger && !isDriver) {
      return res.status(401).json({ success: false, error: 'You are not authorized to rate for this ride' });
    }

    // Check if rating already exists
    const existingRating = await Rating.findOne({ reviewer, reviewee, ride });
    if (existingRating) {
      return res.status(400).json({ success: false, error: 'You have already rated this user for this ride' });
    }

    const rating = await Rating.create({
      reviewer,
      reviewee,
      ride,
      booking,
      stars,
      comment
    });

    res.status(201).json({
      success: true,
      data: rating
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get user ratings
// @route   GET /api/ratings/user/:userId
// @access  Public
exports.getUserRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find({ reviewee: req.params.userId })
      .populate({
        path: 'reviewer',
        select: 'name profilePhoto'
      })
      .populate({
        path: 'ride',
        select: 'origin destination date'
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
