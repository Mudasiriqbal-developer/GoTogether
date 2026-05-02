const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { errorHandler } = require('./middleware/errorHandler');
const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');

// Load env vars
dotenv.config();

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

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
