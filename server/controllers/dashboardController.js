const Ride = require('../models/Ride');
const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Get driver dashboard stats
// @route   GET /api/dashboard/driver
// @access  Protected
exports.getDriverDashboard = async (req, res, next) => {
  try {
    const rides = await Ride.find({ driver: req.user.id });
    const totalRidesPosted = rides.length;

    const rideIds = rides.map(r => r._id);

    const bookings = await Booking.find({ ride: { $in: rideIds }, status: 'approved' }).populate('ride');
    
    let totalPassengersCarried = 0;
    let totalEarnings = 0;

    bookings.forEach(booking => {
      totalPassengersCarried += booking.seatsBooked;
      totalEarnings += booking.seatsBooked * booking.ride.costPerSeat;
    });

    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        totalRidesPosted,
        totalPassengersCarried,
        totalEarnings,
        avgRating: user.avgRating || 0
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get passenger dashboard stats
// @route   GET /api/dashboard/passenger
// @access  Protected
exports.getPassengerDashboard = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ passenger: req.user.id, status: 'approved' }).populate('ride');
    
    const totalRidesTaken = bookings.length;
    let totalSpent = 0;
    const routesCount = {};

    bookings.forEach(booking => {
      if (booking.ride) {
        totalSpent += booking.seatsBooked * booking.ride.costPerSeat;
        const routeKey = `${booking.ride.origin} → ${booking.ride.destination}`;
        routesCount[routeKey] = (routesCount[routeKey] || 0) + 1;
      }
    });

    let favouriteRoute = 'N/A';
    let maxCount = 0;
    for (const [route, count] of Object.entries(routesCount)) {
      if (count > maxCount) {
        favouriteRoute = route;
        maxCount = count;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        totalRidesTaken,
        totalSpent,
        favouriteRoute
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
