const Ride = require('../models/Ride');

// @desc    Create new ride
// @route   POST /api/rides
// @access  Protected
exports.createRide = async (req, res, next) => {
  try {
    // Add driver to req.body
    req.body.driver = req.user.id;
    
    // Set seatsAvailable to totalSeats initially
    req.body.seatsAvailable = req.body.totalSeats;

    const ride = await Ride.create(req.body);

    res.status(201).json({
      success: true,
      data: ride
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get all rides
// @route   GET /api/rides
// @access  Public
exports.getRides = async (req, res, next) => {
  try {
    let query;
    
    const reqQuery = { ...req.query };
    
    // Fields to exclude from normal matching
    const removeFields = ['maxCost', 'sort'];
    removeFields.forEach(param => delete reqQuery[param]);
    
    let queryStr = JSON.stringify(reqQuery);
    
    query = Ride.find(JSON.parse(queryStr)).populate({
      path: 'driver',
      select: 'name profilePhoto avgRating totalRatings'
    });
    
    // If maxCost is specified
    if (req.query.maxCost) {
      query = query.where('costPerSeat').lte(req.query.maxCost);
    }
    
    // Default sort by date
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('date');
    }

    const rides = await query;

    res.status(200).json({
      success: true,
      count: rides.length,
      data: rides
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single ride
// @route   GET /api/rides/:id
// @access  Public
exports.getRide = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.id).populate({
      path: 'driver',
      select: 'name email phone profilePhoto avgRating totalRatings'
    });

    if (!ride) {
      return res.status(404).json({ success: false, error: 'Ride not found' });
    }

    res.status(200).json({
      success: true,
      data: ride
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update ride
// @route   PUT /api/rides/:id
// @access  Protected
exports.updateRide = async (req, res, next) => {
  try {
    let ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ success: false, error: 'Ride not found' });
    }

    // Make sure user is ride driver
    if (ride.driver.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to update this ride' });
    }

    ride = await Ride.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: ride
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete ride
// @route   DELETE /api/rides/:id
// @access  Protected
exports.deleteRide = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ success: false, error: 'Ride not found' });
    }

    // Make sure user is ride driver
    if (ride.driver.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this ride' });
    }

    await ride.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get logged in user rides
// @route   GET /api/rides/my-rides
// @access  Protected
exports.getMyRides = async (req, res, next) => {
  try {
    const rides = await Ride.find({ driver: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: rides.length,
      data: rides
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
