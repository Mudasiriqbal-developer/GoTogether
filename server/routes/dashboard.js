const express = require('express');
const { getDriverDashboard, getPassengerDashboard } = require('../controllers/dashboardController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/driver', getDriverDashboard);
router.get('/passenger', getPassengerDashboard);

module.exports = router;
