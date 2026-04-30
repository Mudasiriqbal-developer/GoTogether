const express = require('express');
const {
  createBooking,
  getMyBookings,
  getRideBookings,
  approveBooking,
  rejectBooking,
  cancelBooking
} = require('../controllers/bookingController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All booking routes are protected

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
