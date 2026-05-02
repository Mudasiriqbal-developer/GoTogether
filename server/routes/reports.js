const express = require('express');
const { createReport } = require('../controllers/reportController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createReport);

module.exports = router;
