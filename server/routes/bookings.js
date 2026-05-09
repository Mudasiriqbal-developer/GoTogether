const express = require('express');
const {
  createBooking,
  getMyBookings,
  getRideBookings,
  approveBooking,
  rejectBooking,
  cancelBooking,
  directAction
} = require('../controllers/bookingController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Public routes (accessible from email links)
router.get('/:id/direct-action', directAction);

router.use(protect); // Remaining booking routes are protected

router.route('/')
  .post(createBooking);

router.route('/my-bookings')
  .get(getMyBookings);

router.route('/ride/:rideId')
  .get(getRideBookings);

router.route('/:id/approve')
  .put(approveBooking);

router.route('/:id/reject')
  .put(rejectBooking);

router.route('/:id')
  .delete(cancelBooking);

module.exports = router;
