# GoTogether - Backend API

A robust Node.js/Express REST API server for the GoTogether carpooling platform. Features authentication, ride management, bookings, ratings, and email notifications.

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- MongoDB Atlas account
- Gmail account with app password
- Cloudinary account

### Installation

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Configure .env with your values

# Start development server
npm run dev

# Or start production server
npm start
```

The server will run on `http://localhost:5000` by default.

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gotogether?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_use_a_strong_random_string

# Environment
NODE_ENV=development
PORT=5000

# Email Configuration (Gmail SMTP)
GMAIL_EMAIL=your_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

See `.env.example` for a complete template.

## 📁 Project Structure

```
server/
├── controllers/                    # Route handlers
│   ├── authController.js          # Authentication logic
│   ├── bookingController.js       # Booking management
│   ├── dashboardController.js     # Dashboard statistics
│   ├── healthController.js        # Health check
│   ├── ratingController.js        # Rating system
│   ├── reportController.js        # Report management
│   └── rideController.js          # Ride management
│
├── models/                         # MongoDB schemas
│   ├── User.js                    # User model
│   ├── Ride.js                    # Ride model
│   ├── Booking.js                 # Booking model
│   ├── Rating.js                  # Rating model
│   └── Report.js                  # Report model
│
├── routes/                         # API routes
│   ├── auth.js                    # Authentication routes
│   ├── bookings.js                # Booking routes
│   ├── dashboard.js               # Dashboard routes
│   ├── health.js                  # Health check route
│   ├── ratings.js                 # Rating routes
│   ├── reports.js                 # Report routes
│   ├── rides.js                   # Ride routes
│   └── users.js                   # User routes
│
├── middleware/                     # Express middleware
│   ├── authMiddleware.js          # JWT authentication
│   └── errorHandler.js            # Global error handler
│
├── utils/                          # Utility functions
│   ├── emailService.js            # Nodemailer configuration
│   ├── emailTemplates.js          # Booking confirmation email
│   ├── bookingEmailTemplate.js    # New booking request email
│   └── cloudinaryService.js       # Cloudinary configuration
│
├── server.js                       # Express server setup
├── package.json                    # Dependencies
├── .env.example                    # Environment variables template
└── .gitignore                      # Git ignore rules

```

## 📦 Dependencies

### Core
- `express` 5.2.1 - Web framework
- `mongoose` 9.6.1 - MongoDB ODM
- `dotenv` 17.4.2 - Environment variables
- `cors` 2.8.6 - Cross-origin requests
- `helmet` 8.1.0 - Security headers
- `morgan` 1.10.1 - HTTP logging

### Authentication & Security
- `jsonwebtoken` 9.0.3 - JWT tokens
- `bcryptjs` 3.0.3 - Password hashing
- `express-validator` 7.3.2 - Input validation

### File Upload & Storage
- `multer` 2.1.1 - File upload handling
- `cloudinary` 2.10.0 - Cloud image storage

### Email
- `nodemailer` 8.0.7 - SMTP email sending

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
GET    /api/auth/me           - Get current user (protected)
```

### Dashboard
```
GET    /api/dashboard/driver      - Get driver statistics (protected)
GET    /api/dashboard/passenger   - Get passenger statistics (protected)
```

### Rides
```
POST   /api/rides                 - Create ride (protected)
GET    /api/rides                 - Get all rides
GET    /api/rides/:id             - Get ride details
PUT    /api/rides/:id             - Update ride (protected)
DELETE /api/rides/:id             - Delete ride (protected)
```

### Bookings
```
POST   /api/bookings              - Create booking (protected)
GET    /api/bookings/my-bookings  - Get user bookings (protected)
GET    /api/bookings/ride/:id     - Get ride bookings (protected)
PUT    /api/bookings/:id/approve  - Approve booking (protected)
PUT    /api/bookings/:id/reject   - Reject booking (protected)
DELETE /api/bookings/:id          - Cancel booking (protected)
```

### Ratings
```
POST   /api/ratings          - Create rating (protected)
GET    /api/ratings/user/:id - Get user ratings
```

### Reports
```
POST   /api/reports          - Report user/ride (protected)
GET    /api/reports          - Get all reports
```

### Users
```
GET    /api/users/:id              - Get user profile
PUT    /api/users/profile          - Update profile (protected)
PUT    /api/users/upload-photo     - Upload photo (protected)
```

### Health
```
GET    /api/health          - Health check
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **CORS Protection**: Configured allowed origins
- **Helmet Security Headers**: XSS, clickjacking protection
- **Input Validation**: express-validator for all inputs
- **Protected Routes**: Middleware for authentication checks
- **Error Handling**: Global error handler

## 📧 Email Features

### Sending Emails
The application uses Gmail SMTP to send automated emails:

1. **Booking Confirmation Email** - Sent to passenger when driver approves
2. **New Booking Request Email** - Sent to driver when passenger books

### Email Configuration
Set up Gmail for SMTP:
1. Enable 2-factor authentication
2. Generate [App Password](https://myaccount.google.com/apppasswords)
3. Add credentials to .env

### Email Templates
Located in `utils/`:
- `emailTemplates.js` - Booking confirmation template
- `bookingEmailTemplate.js` - New booking request template

## 📸 Photo Upload with Cloudinary

### Configuration
Set up Cloudinary:
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get API credentials from Dashboard
3. Add to .env

### Upload Endpoint
```javascript
PUT /api/users/upload-photo
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:
- profilePhoto: <image_file>
```

### Features
- Maximum file size: 10MB
- Allowed formats: Images only (image/*)
- Automatic upload to Cloudinary
- URL saved to user.profilePhoto

## 🗄️ Database Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String (required),
  role: String enum('Driver', 'Passenger', 'Both'),
  profilePhoto: String,
  avgRating: Number (0-5),
  totalRatings: Number,
  isVerified: Boolean,
  timestamps: true
}
```

### Ride
```javascript
{
  driver: ObjectId (ref: User),
  origin: String (required),
  destination: String (required),
  date: Date (required),
  time: String (required),
  totalSeats: Number (required),
  seatsAvailable: Number (required),
  costPerSeat: Number (required),
  vehicleType: String enum('car', 'bike'),
  description: String,
  status: String enum('active', 'completed', 'cancelled'),
  genderPreference: String enum('any', 'male', 'female'),
  createdAt: Date
}
```

### Booking
```javascript
{
  ride: ObjectId (ref: Ride),
  passenger: ObjectId (ref: User),
  status: String enum('pending', 'approved', 'rejected', 'cancelled'),
  seatsBooked: Number,
  createdAt: Date
}
```

### Rating
```javascript
{
  ride: ObjectId (ref: Ride),
  ratedUser: ObjectId (ref: User),
  ratedBy: ObjectId (ref: User),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

### Report
```javascript
{
  reportedUser: ObjectId (ref: User),
  reportedBy: ObjectId (ref: User),
  ride: ObjectId (ref: Ride),
  reason: String (required),
  description: String,
  status: String enum('pending', 'resolved', 'dismissed'),
  createdAt: Date
}
```

## 🚨 Error Handling

The API uses a global error handler middleware that catches all errors and returns standardized responses:

```javascript
{
  success: false,
  error: "Error message"
}
```

HTTP Status Codes:
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## 🧪 Testing Endpoints

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+923001234567",
    "role": "Passenger"
  }'
```

### Create Ride
```bash
curl -X POST http://localhost:5000/api/rides \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "origin": "Karachi",
    "destination": "Lahore",
    "date": "2026-06-15",
    "time": "09:00",
    "totalSeats": 4,
    "costPerSeat": 2500,
    "vehicleType": "car",
    "genderPreference": "any"
  }'
```

## 📊 Database Setup

### MongoDB Atlas
1. Create account at [mongodb.com](https://www.mongodb.com)
2. Create cluster and database
3. Get connection string
4. Add IP to whitelist
5. Update MONGO_URI in .env

### Collections
The database automatically creates collections for:
- users
- rides
- bookings
- ratings
- reports

## 🌐 Deployment

### Render Deployment
1. Create [Render](https://render.com) account
2. Create new Web Service
3. Connect GitHub repository
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add environment variables
7. Deploy

### Environment Setup for Production
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Update all API keys
- Enable CORS for frontend domain
- Use production database

## 📝 API Documentation

For detailed API documentation, see the main [README.md](../README.md#-api-endpoints)

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check MONGO_URI format
- Verify IP in MongoDB Atlas whitelist
- Check username and password
- Ensure network connection is active

### Email Not Sending
- Verify Gmail credentials
- Check Gmail 2FA and app password
- Test SMTP connection
- Check logs for error messages

### Cloudinary Upload Fails
- Verify API credentials
- Check file size (max 10MB)
- Ensure file is image format
- Check Cloudinary account status

### JWT Token Issues
- Verify JWT_SECRET is set
- Check token expiration
- Ensure token format: `Bearer <token>`
- Check Authorization header

## 📚 Reference

- [Express.js](https://expressjs.com)
- [MongoDB/Mongoose](https://mongoosejs.com)
- [JWT](https://jwt.io)
- [Nodemailer](https://nodemailer.com)
- [Cloudinary](https://cloudinary.com)
- [Multer](https://github.com/expressjs/multer)

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Last Updated**: May 2, 2026  
**Version**: 1.0.0
