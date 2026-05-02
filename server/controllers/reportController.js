const Report = require('../models/Report');

// @desc    Create a report
// @route   POST /api/reports
// @access  Protected
exports.createReport = async (req, res, next) => {
  try {
    const { reportedUser, ride, reason } = req.body;
    
    if (reportedUser === req.user.id) {
      return res.status(400).json({ success: false, error: 'You cannot report yourself' });
    }

    const report = await Report.create({
      reporter: req.user.id,
      reportedUser,
      ride,
      reason
    });

    res.status(201).json({
      success: true,
      data: report
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
