// @desc    Get system health status
// @route   GET /api/health
// @access  Public
exports.getHealthStatus = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'API is running successfully',
    timestamp: new Date().toISOString()
  });
};
