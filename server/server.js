const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

dotenv.config();

const { errorHandler } = require('./middleware/errorHandler');
const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
const rideRoutes = require('./routes/rides');
app.use('/api/rides', rideRoutes);
const bookingRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingRoutes);
const ratingRoutes = require('./routes/ratings');
app.use('/api/ratings', ratingRoutes);
const reportRoutes = require('./routes/reports');
app.use('/api/reports', reportRoutes);
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

// Error handling middleware

const PORT = process.env.PORT || 5000;

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    app.listen(PORT, () => {});
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};


app.use(errorHandler);
connectDB();
