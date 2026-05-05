const express = require('express');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../utils/cloudinaryService');

// @route   POST /api/upload
// @desc    Upload an image to Cloudinary
// @access  Public (protect if needed)
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    const fileName = Date.now() + '-' + req.file.originalname;
    const result = await uploadToCloudinary(req.file.buffer, fileName);
    res.json({ success: true, url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
