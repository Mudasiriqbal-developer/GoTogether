const express = require('express');
const {
  createRide,
  getRides,
  getRide,
  updateRide,
  deleteRide,
  getMyRides
} = require('../controllers/rideController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

// Protected routes for the logged-in user's rides
router.get('/my-rides', protect, getMyRides);

// Public and protected standard routes
router
  .route('/')
  .get(getRides)
  .post(protect, createRide);

router
  .route('/:id')
  .get(getRide)
  .put(protect, updateRide)
  .delete(protect, deleteRide);

module.exports = router;
