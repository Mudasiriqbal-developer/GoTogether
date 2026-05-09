const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { sendEmailAsync } = require('../utils/emailService');
const { registrationWelcomeEmail } = require('../utils/registrationEmailTemplate');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Get token from model, create cookie and send response
// const sendTokenResponse = (user, statusCode, res) => {
//   // Create token
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });

//   res.status(statusCode).json({
//     success: true,
//     token,
//     user: {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       profilePhoto: user.profilePhoto,
//       avgRating: user.avgRating,
//       isVerified: user.isVerified
//     }
//   });
// };

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public

const sendTokenResponse = (user, statusCode, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  console.log('[sendTokenResponse] JWT_SECRET value:', jwtSecret);
  console.log('[sendTokenResponse] JWT_SECRET is empty?:', !jwtSecret);
  console.log('[sendTokenResponse] Process env keys:', Object.keys(process.env).filter(k => k.includes('JWT') || k.includes('MONGO') || k.includes('PORT')));
  
  if (!jwtSecret) {
    console.error('[sendTokenResponse] CRITICAL: JWT_SECRET is not configured');
    return res.status(500).json({
      success: false,
      error: "JWT_SECRET is not configured"
    });
  }

  try {
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: '30d',
    });

    res.status(statusCode).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePhoto: user.profilePhoto,
        avgRating: user.avgRating,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('[sendTokenResponse] Error signing JWT:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, phone, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Create user (password is automatically hashed by User model's pre-save hook)
    user = await User.create({
      name,
      email,
      password,
      phone,
      role,
    });

    // Send welcome email asynchronously (fire and forget - non-blocking)
    // This won't delay the API response or crash if email fails
    const welcomeEmail = registrationWelcomeEmail(user.name);
    sendEmailAsync(
      user.email,
      'Welcome to RideShare PK! 🚗',
      welcomeEmail
    );

    // Always return success to client, regardless of email status
    sendTokenResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    // Check for user (include password field which is normally excluded)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    // user is already available in req due to the protect middleware
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public
exports.googleLogin = async (req, res, next) => {
  try {
    const { token, isAccessToken } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    let name, email, googleId, picture;

    if (isAccessToken) {
      console.log('[googleLogin] Using access token flow');
      // Fetch user info using access token
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
      const data = await response.json();
      
      console.log('[googleLogin] Google UserInfo Response:', data);

      if (data.error || !data.sub) {
        console.error('[googleLogin] Google UserInfo Error:', data.error || 'No sub field found');
        throw new Error(data.error_description || 'Invalid access token');
      }
      
      name = data.name;
      email = data.email;
      googleId = data.sub;
      picture = data.picture;
    } else {
      console.log('[googleLogin] Using ID token flow');
      // Verify Google ID Token
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      console.log('[googleLogin] Google ID Token Payload:', payload);
      name = payload.name;
      email = payload.email;
      googleId = payload.sub;
      picture = payload.picture;
    }


    // Check if user exists with this googleId
    let user = await User.findOne({ googleId });


    if (!user) {
      // Check if user exists with this email but different provider
      user = await User.findOne({ email });

      if (user) {
        // Link Google account to existing user
        user.googleId = googleId;
        user.authProvider = 'google';
        if (!user.avatar) user.avatar = picture;
        user.isVerified = true;
        await user.save();
      } else {
        // Create new user
        user = await User.create({
          name,
          email,
          googleId,
          authProvider: 'google',
          avatar: picture,
          isVerified: true,
          // phone and password are optional for google provider
        });

        // Send welcome email
        const welcomeEmail = registrationWelcomeEmail(user.name);
        sendEmailAsync(
          user.email,
          'Welcome to GoTogether! 🚗',
          welcomeEmail
        );
      }
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('Google Login Error:', err);
    res.status(401).json({ success: false, error: 'Google authentication failed' });
  }
};
