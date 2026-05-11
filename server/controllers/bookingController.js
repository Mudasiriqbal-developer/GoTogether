const Booking = require('../models/Booking');
const Ride = require('../models/Ride');
const User = require('../models/User');
const { sendEmailAsync } = require('../utils/emailService');
const { newBookingRequestEmail, bookingRejectionEmail, bookingCancellationEmail } = require('../utils/bookingEmailTemplate');
const { bookingConfirmationEmail } = require('../utils/emailTemplates');


exports.createBooking = async (req, res, next) => {
  try {
    const { rideId, seatsBooked = 1 } = req.body;

    const ride = await Ride.findById(rideId).populate('driver');
    if (!ride) {
      return res.status(404).json({ success: false, error: 'Ride not found' });
    }

    if (ride.seatsAvailable < seatsBooked) {
      return res.status(400).json({ success: false, error: 'Not enough seats available' });
    }

    // Driver cannot book their own ride
    if (ride.driver._id.toString() === req.user.id) {
      return res.status(400).json({ success: false, error: 'You cannot book your own ride' });
    }

    // Check for existing active booking
    const existingBooking = await Booking.findOne({
      ride: rideId,
      passenger: req.user.id,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingBooking) {
      return res.status(400).json({ success: false, error: 'You have already booked this ride' });
    }

    const passenger = await User.findById(req.user.id);

    const booking = await Booking.create({
      ride: rideId,
      passenger: req.user.id,
      seatsBooked
    });

    // Send email to driver about new booking request
    const baseUrl = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`;
    const emailHtml = newBookingRequestEmail(
      ride.driver.name,
      passenger.name,
      { origin: ride.origin, destination: ride.destination, date: ride.date, time: ride.time },
      seatsBooked,
      booking._id,
      baseUrl
    );
    sendEmailAsync(
      ride.driver.email,
      `New Booking Request - ${ride.origin} to ${ride.destination}`,
      emailHtml
    );

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, error: 'You have already booked this ride' });
    }
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get logged in passenger bookings
// @route   GET /api/bookings/my-bookings
// @access  Protected
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ passenger: req.user.id })
      .populate({
        path: 'ride',
        populate: {
          path: 'driver',
          select: 'name profilePhoto avgRating phone'
        }
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get bookings for a specific ride (for driver)
// @route   GET /api/bookings/ride/:rideId
// @access  Protected
exports.getRideBookings = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.rideId);

    if (!ride) {
      return res.status(404).json({ success: false, error: 'Ride not found' });
    }

    if (ride.driver.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to view these bookings' });
    }

    const bookings = await Booking.find({ ride: req.params.rideId })
      .populate({
        path: 'passenger',
        select: 'name profilePhoto avgRating phone'
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Approve booking
// @route   PUT /api/bookings/:id/approve
// @access  Protected
exports.approveBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('ride passenger');

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    if (booking.ride.driver.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ success: false, error: 'Booking is not pending' });
    }

    if (booking.ride.seatsAvailable < booking.seatsBooked) {
      return res.status(400).json({ success: false, error: 'Not enough seats available on ride' });
    }

    booking.status = 'approved';
    await booking.save();

    // Decrement seats on ride
    const ride = await Ride.findById(booking.ride._id);
    ride.seatsAvailable -= booking.seatsBooked;
    await ride.save();

    // Send confirmation email to passenger
    const driver = await User.findById(booking.ride.driver);
    const emailHtml = bookingConfirmationEmail(
      booking.passenger.name,
      driver.name,
      { origin: booking.ride.origin, destination: booking.ride.destination, date: booking.ride.date, time: booking.ride.time }
    );
    sendEmailAsync(
      booking.passenger.email,
      `Booking Confirmed - ${booking.ride.origin} to ${booking.ride.destination}`,
      emailHtml
    );

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Reject booking
// @route   PUT /api/bookings/:id/reject
// @access  Protected
exports.rejectBooking = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'ride',
        populate: { path: 'driver' }
      })
      .populate('passenger');

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    if (booking.ride.driver._id.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ success: false, error: 'Can only reject pending bookings' });
    }

    booking.status = 'rejected';
    await booking.save();

    // Send rejection email to passenger
    const emailHtml = bookingRejectionEmail(
      booking.passenger.name,
      booking.ride.driver.name,
      { 
        origin: booking.ride.origin, 
        destination: booking.ride.destination, 
        date: booking.ride.date, 
        time: booking.ride.time 
      },
      reason || 'Your request did not match my requirements'
    );
    sendEmailAsync(
      booking.passenger.email,
      `Booking Request Rejected - ${booking.ride.origin} to ${booking.ride.destination}`,
      emailHtml
    );

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Protected
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'ride',
        populate: { path: 'driver' }
      })
      .populate('passenger');

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    if (booking.passenger._id.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, error: 'Booking is already cancelled' });
    }

    // If it was already approved, restore the seat count
    if (booking.status === 'approved') {
      const ride = await Ride.findById(booking.ride._id);
      ride.seatsAvailable += booking.seatsBooked;
      await ride.save();
    }

    booking.status = 'cancelled';
    await booking.save();

    // Send cancellation email to driver
    const emailHtml = bookingCancellationEmail(
      booking.ride.driver.name,
      booking.passenger.name,
      { 
        origin: booking.ride.origin, 
        destination: booking.ride.destination, 
        date: booking.ride.date, 
        time: booking.ride.time 
      },
      booking.seatsBooked
    );
    sendEmailAsync(
      booking.ride.driver.email,
      `Booking Cancelled - ${booking.ride.origin} to ${booking.ride.destination}`,
      emailHtml
    );

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
// @desc    Direct action from email (Approve/Reject)
// @route   GET /api/bookings/:id/direct-action
// @access  Public (Token-less for ease, but ideally should have a token)
exports.directAction = async (req, res, next) => {
  try {
    const { action } = req.query;
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'ride',
        populate: { path: 'driver' }
      })
      .populate('passenger');

    if (!booking) {
      return res.redirect(`${process.env.CLIENT_URL}/dashboard?error=Booking not found`);
    }

    if (booking.status !== 'pending') {
      return res.redirect(`${process.env.CLIENT_URL}/ride-requests?message=Booking already ${booking.status}`);
    }

    if (action === 'approve') {
      // Logic from approveBooking
      if (booking.ride.seatsAvailable < booking.seatsBooked) {
        return res.redirect(`${process.env.CLIENT_URL}/ride-requests?error=Not enough seats`);
      }

      booking.status = 'approved';
      await booking.save();

      const ride = await Ride.findById(booking.ride._id);
      ride.seatsAvailable -= booking.seatsBooked;
      await ride.save();

      // Send confirmation email
      const emailHtml = bookingConfirmationEmail(
        booking.passenger.name,
        booking.ride.driver.name,
        { origin: booking.ride.origin, destination: booking.ride.destination, date: booking.ride.date, time: booking.ride.time }
      );
      sendEmailAsync(
        booking.passenger.email,
        `Booking Confirmed - ${booking.ride.origin} to ${booking.ride.destination}`,
        emailHtml
      );

      return res.redirect(`${process.env.CLIENT_URL}/ride-requests?message=Booking approved successfully`);
    } else if (action === 'reject') {
      // Logic from rejectBooking
      booking.status = 'rejected';
      await booking.save();

      const emailHtml = bookingRejectionEmail(
        booking.passenger.name,
        booking.ride.driver.name,
        { origin: booking.ride.origin, destination: booking.ride.destination, date: booking.ride.date, time: booking.ride.time },
        'Request declined via email'
      );
      sendEmailAsync(
        booking.passenger.email,
        `Booking Request Rejected - ${booking.ride.origin} to ${booking.ride.destination}`,
        emailHtml
      );

      return res.redirect(`${process.env.CLIENT_URL}/ride-requests?message=Booking rejected successfully`);
    }

    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (err) {
    res.redirect(`${process.env.CLIENT_URL}/dashboard?error=${encodeURIComponent(err.message)}`);
  }
};
