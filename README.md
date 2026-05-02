# RideShare PK - Carpooling Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for facilitating peer-to-peer carpooling services in Pakistan. Connect drivers with passengers, manage bookings, earn money, and save on transportation costs.

## 📋 Features

### Driver Features
- **Post Rides**: Create and manage ride listings with details (origin, destination, date, time, seats, price, vehicle type, gender preference)
- **Dashboard Statistics**: View total rides posted, passengers carried, total earnings, and average rating
- **Booking Management**: Receive booking requests from passengers, approve/reject bookings
- **Profile Management**: Upload profile photo, update name and contact information
- **Rating System**: Receive ratings from passengers (1-5 stars)
- **Email Notifications**: Get notified when passengers request rides

### Passenger Features
- **Search Rides**: Find available rides with filters by origin, destination, and date
- **Book Rides**: Request seats on available rides
- **Dashboard Statistics**: View total rides taken, total spending, and favorite routes
- **WhatsApp Integration**: Contact drivers directly via WhatsApp
- **Booking History**: View all your bookings (pending, approved, rejected, cancelled)
- **Rate Drivers**: Leave ratings and reviews for drivers
- **Profile Management**: Upload profile photo, update contact information

### General Features
- **User Authentication**: Secure JWT-based authentication
- **Role-Based Access**: Users can be drivers, passengers, or both
- **Email Notifications**: Automated email confirmations and request notifications via Gmail SMTP
- **Cloudinary Integration**: Upload and manage profile photos
- **Dark Mode Support**: Full dark mode support across the application
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Report System**: Report inappropriate users or rides

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.5 - UI library
- **Vite** 8.0.10 - Build tool
- **Tailwind CSS** 4.2.4 - Styling
- **Axios** 1.15.2 - HTTP client
- **React Router** 7.14.2 - Client-side routing
- **React Hook Form** 7.74.0 - Form management
- **React Hot Toast** 2.6.0 - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express** 5.2.1 - Web framework
- **MongoDB** 9.6.1 (Mongoose) - NoSQL database
- **JWT** 9.0.3 - Authentication
- **Bcryptjs** 3.0.3 - Password hashing
- **Nodemailer** 8.0.7 - Email sending
- **Cloudinary** 2.10.0 - Cloud image storage
- **Multer** 2.1.1 - File upload handling
- **Helmet** 8.1.0 - Security headers
- **CORS** 2.8.6 - Cross-origin requests
- **Morgan** 1.10.1 - HTTP logging

### Deployment
- **Frontend**: Vercel (Vite/React)
- **Backend**: Render (Node.js)
- **Database**: MongoDB Atlas
- **Email**: Gmail SMTP
- **Images**: Cloudinary

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Gmail account with app password
- Cloudinary account
- Git

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/gotogether.git
cd gotogether
```

#### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Configure .env with your values (see Environment Variables section)

# Start the server
npm run dev
# Server runs on http://localhost:5000
```

#### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
# App runs on http://localhost:5173
```

### Environment Variables

#### Backend (.env)

Create a `.env` file in the `server` directory with the following variables:

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

#### Frontend Configuration

The frontend uses `http://localhost:5000/api` as the base API URL by default. Update `client/src/utils/api.js` if needed for different environments.

### Getting Required API Keys

#### MongoDB Atlas
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database
3. Get connection string from "Connect" button
4. Add `MONGO_URI` to .env

#### Gmail SMTP (for email notifications)
1. Enable 2-factor authentication on your Google account
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. Use the 16-character password as `GMAIL_APP_PASSWORD`
4. Add your email as `GMAIL_EMAIL`

#### Cloudinary (for profile photo uploads)
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get API credentials from Dashboard
3. Add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

#### JWT Secret
1. Generate a strong secret key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
2. Add to `JWT_SECRET` in .env

## 🚀 Deployment

### Deploy Backend on Render

1. **Create Render Account**: https://render.com
2. **Create New Web Service**:
   - Connect your GitHub repository
   - Set `Build Command`: `npm install`
   - Set `Start Command`: `npm start`
   - Add environment variables in Render dashboard
3. **Deploy**: Push to GitHub, Render auto-deploys

### Deploy Frontend on Vercel

1. **Create Vercel Account**: https://vercel.com
2. **Import Project**:
   - Select `client` directory as root
   - Vercel auto-detects Vite configuration
3. **Environment Variables**: Set API base URL if needed
4. **Deploy**: Vercel auto-deploys on push to main

### Production Environment Variables

Make sure all production environment variables are set in:
- Render dashboard (backend)
- Vercel dashboard (frontend API URL if different from localhost)
- MongoDB Atlas (whitelist deployment IPs)

## 📚 API Endpoints

### Authentication Routes
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login user |
| GET | `/api/auth/me` | ✅ | Get current user |

### Dashboard Routes
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | `/api/dashboard/driver` | ✅ | Get driver statistics |
| GET | `/api/dashboard/passenger` | ✅ | Get passenger statistics |

### Rides Routes
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/rides` | ✅ | Create new ride |
| GET | `/api/rides` | ❌ | Get all rides (with filters) |
| GET | `/api/rides/:id` | ❌ | Get ride details |
| GET | `/api/rides/driver/:driverId` | ❌ | Get rides by driver |
| PUT | `/api/rides/:id` | ✅ | Update ride |
| DELETE | `/api/rides/:id` | ✅ | Delete ride |

### Bookings Routes
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/bookings` | ✅ | Create booking |
| GET | `/api/bookings/my-bookings` | ✅ | Get user's bookings |
| GET | `/api/bookings/ride/:rideId` | ✅ | Get ride's bookings (driver) |
| PUT | `/api/bookings/:id/approve` | ✅ | Approve booking (driver) |
| PUT | `/api/bookings/:id/reject` | ✅ | Reject booking (driver) |
| DELETE | `/api/bookings/:id` | ✅ | Cancel booking |

### Ratings Routes
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/ratings` | ✅ | Create rating |
| GET | `/api/ratings/user/:userId` | ❌ | Get user's ratings |

### User Routes
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | `/api/users/:id` | ❌ | Get user profile |
| PUT | `/api/users/profile` | ✅ | Update user profile |
| PUT | `/api/users/upload-photo` | ✅ | Upload profile photo |

### Reports Routes
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/reports` | ✅ | Report user/ride |
| GET | `/api/reports` | ❌ | Get all reports |

## 📱 Usage Examples

### Register a User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phone": "+923001234567",
  "role": "Passenger"
}
```

### Create a Ride
```bash
POST /api/rides
Authorization: Bearer <token>
Content-Type: application/json

{
  "origin": "Karachi",
  "destination": "Lahore",
  "date": "2026-06-15",
  "time": "09:00",
  "totalSeats": 4,
  "costPerSeat": 2500,
  "vehicleType": "car",
  "genderPreference": "any",
  "description": "Comfortable AC car, music system available"
}
```

### Book a Ride
```bash
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "rideId": "ride_id_here",
  "seatsBooked": 2
}
```

### Upload Profile Photo
```bash
PUT /api/users/upload-photo
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form data:
- profilePhoto: <image_file>
```

## 🎯 Project Structure

```
GoTogether/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Auth context
│   │   ├── utils/           # API client
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── vercel.json          # Vercel deployment config
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
│
└── server/                   # Node.js backend
    ├── controllers/         # Route handlers
    ├── models/              # MongoDB schemas
    ├── routes/              # API routes
    ├── middleware/          # Express middleware
    ├── utils/               # Utilities (email, Cloudinary, etc.)
    ├── server.js            # Express server
    ├── package.json         # Backend dependencies
    └── .env.example         # Environment variables template
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcryptjs for secure password storage
- **CORS Protection**: Controlled cross-origin requests
- **Helmet Security Headers**: Protection against common vulnerabilities
- **Input Validation**: Express-validator for request validation
- **Protected Routes**: Private routes require authentication
- **Role-Based Access**: Different endpoints for drivers and passengers

## 🐛 Troubleshooting

### Email Not Sending
- Verify Gmail app password (not regular password)
- Enable "Less secure app access" if not using app password
- Check GMAIL_EMAIL and GMAIL_APP_PASSWORD in .env
- Ensure internet connection is active

### Cloudinary Upload Fails
- Verify CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- Check file size is under 10MB
- Ensure file is an image format
- Verify Cloudinary account is active

### MongoDB Connection Issues
- Check MONGO_URI format
- Verify MongoDB Atlas IP whitelist includes your IP
- Check username and password in connection string
- Ensure database name matches in connection string

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check `client/src/utils/api.js` baseURL
- Allow CORS in backend `.env`
- Check browser console for CORS errors

## 📝 License

This project is licensed under the ISC License - see LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email support@gotogether.pk or open an issue on GitHub.

## 🎉 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Cloudinary](https://cloudinary.com) - Image hosting
- [Nodemailer](https://nodemailer.com) - Email sending
- [React Hot Toast](https://react-hot-toast.com) - Notifications
- MongoDB Atlas - Database hosting
- Vercel - Frontend deployment
- Render - Backend deployment

---

**Last Updated**: May 2, 2026  
**Version**: 1.0.0
