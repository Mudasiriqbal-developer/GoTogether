const express = require('express');
const User = require('../models/User');
const { upload, uploadToCloudinary } = require('../utils/cloudinaryService');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name role avgRating totalRatings profilePhoto createdAt isVerified');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @desc    Upload user profile photo
// @route   PUT /api/users/upload-photo
// @access  Protected
router.put('/upload-photo', protect, upload.single('profilePhoto'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
console.log("file is", req.file);
    // Upload to Cloudinary
    const result = await uploadToCloudinary(
      req.file.buffer,
      `user_${req.user.id}_${Date.now()}`
    );

    // Update user profile photo URL
    user.profilePhoto = result.secure_url;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        profilePhoto: user.profilePhoto
      }
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Protected
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
