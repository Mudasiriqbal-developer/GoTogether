# GoTogether - Frontend

A modern React/Vite application for the GoTogether carpooling platform. Built with Tailwind CSS and featuring responsive design, dark mode support, and real-time notifications.

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Backend server running on `http://localhost:5000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# App will be available at http://localhost:5173
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview

# Run ESLint
npm lint
```

## 📁 Project Structure

```
src/
├── components/              # Reusable React components
│   ├── LoadingSpinner.jsx  # Loading indicator
│   ├── Navbar.jsx          # Navigation bar
│   ├── PrivateRoute.jsx    # Protected route wrapper
│   ├── RatingModal.jsx     # Rating component
│   ├── ReportModal.jsx     # Report component
│   ├── RideCard.jsx        # Ride listing card
│   └── StarDisplay.jsx     # Star rating display
│
├── pages/                  # Page components
│   ├── Dashboard.jsx       # User dashboard with stats
│   ├── Home.jsx            # Landing page
│   ├── Login.jsx           # Login page
│   ├── Register.jsx        # Registration page
│   ├── Profile.jsx         # User profile with photo upload
│   ├── PostRide.jsx        # Create ride
│   ├── SearchRides.jsx     # Search and filter rides
│   ├── RideDetail.jsx      # Ride details with WhatsApp contact
│   ├── UserProfile.jsx     # View other user profiles
│   ├── MyRides.jsx         # Driver's rides
│   ├── MyBookings.jsx      # Passenger's bookings
│   ├── RideRequests.jsx    # Driver's booking requests
│   ├── Bookings.jsx        # All bookings
│   └── NotFound.jsx        # 404 page
│
├── context/
│   └── AuthContext.jsx     # Authentication state management
│
├── utils/
│   └── api.js              # Axios API client
│
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
└── index.css               # Global styles

public/                     # Static files

```

## 🎯 Key Features

### Dashboard
- **Real-time statistics** for drivers and passengers
- **Conditional rendering** based on user role
- **Quick action buttons** for navigation
- **Responsive grid layout**

### Profile Management
- **Photo upload** to Cloudinary
- **Photo preview** before upload
- **Editable name and phone**
- **User info display** with verification status

### Ride Details
- **WhatsApp integration** for direct driver contact
- **Seat selection** and booking
- **Driver information** with ratings
- **Ride status indicators**

### Search & Filter
- **Advanced ride filters** (origin, destination, date, time)
- **Ride cards** with driver info and ratings
- **Sorting options**
- **Pagination support**

### Notifications
- **Toast notifications** using react-hot-toast
- **Success, error, and info messages**
- **Auto-dismiss functionality**

### Dark Mode
- **Automatic dark mode** support
- **Tailwind dark class** for styling
- **Consistent colors** across all components

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - DOM rendering
- `react-router-dom` - Client-side routing
- `vite` - Build tool

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `@tailwindcss/vite` - Tailwind Vite plugin

### Forms & State
- `react-hook-form` - Form management and validation

### API & Communication
- `axios` - HTTP client

### Notifications
- `react-hot-toast` - Toast notifications

### Development
- `eslint` - Code linting
- `@vitejs/plugin-react` - React support for Vite

## 🔧 Configuration

### API Configuration

Edit `src/utils/api.js` to change the backend URL:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Tailwind Configuration

Customize styles in `tailwind.config.js` and `postcss.config.js`.

## 🌙 Dark Mode

The app uses Tailwind's dark mode class. Dark mode is triggered by:
- System preference (prefers-color-scheme)
- Manual toggle (can be added to Navbar)

To use dark mode styles:
```jsx
// Example
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-white">Content</p>
</div>
```

## 📱 Responsive Design

The app uses Tailwind's responsive prefixes:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

Example:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Responsive grid */}
</div>
```

## 🔐 Authentication

### How It Works
1. Login/Register sends credentials to backend
2. Backend returns JWT token
3. Token stored in `localStorage`
4. Token sent in Authorization header for protected requests
5. `AuthContext` manages user state

### Protected Routes

Wrap pages with `PrivateRoute` component:
```jsx
<Route 
  path="/dashboard" 
  element={<PrivateRoute><Dashboard /></PrivateRoute>} 
/>
```

## 📡 API Integration

### Making API Calls

```javascript
import api from '../utils/api';

// GET request
const res = await api.get('/rides');

// POST request
const res = await api.post('/bookings', { rideId, seatsBooked });

// PUT request
const res = await api.put('/users/profile', { name, phone });

// File upload
const formData = new FormData();
formData.append('profilePhoto', file);
const res = await api.put('/users/upload-photo', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

## 🚨 Error Handling

```javascript
try {
  const res = await api.get('/rides');
  setRides(res.data.data);
} catch (err) {
  const errorMsg = err.response?.data?.error || 'An error occurred';
  toast.error(errorMsg);
}
```

## 🎨 Component Examples

### Loading Spinner
```jsx
import LoadingSpinner from '../components/LoadingSpinner';

<LoadingSpinner />
```

### Toast Notifications
```javascript
import toast from 'react-hot-toast';

toast.success('Action successful!');
toast.error('Something went wrong');
toast.loading('Loading...');
```

### useAuth Hook
```javascript
import { useAuth } from '../context/AuthContext';

const { user, isAuthenticated, login, logout } = useAuth();
```

## 🌐 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure project settings (already in `vercel.json`)
4. Add environment variables if needed
5. Deploy

### Environment Variables (Production)

Create `.env` file:
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

Use in code:
```javascript
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
```

## 📝 Code Style

- Use functional components with hooks
- Follow React best practices
- Use Tailwind utility classes
- Keep components modular and reusable
- Document complex logic

## 🐛 Debugging

### Browser DevTools
1. Open DevTools (F12)
2. Check Network tab for API calls
3. Check Console for errors
4. Check Storage for tokens

### React DevTools
- Install React DevTools browser extension
- Inspect component props and state

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)
- [React Router](https://reactrouter.com)
- [React Hook Form](https://react-hook-form.com)
- [React Hot Toast](https://react-hot-toast.com)

## 📧 Support

For issues or questions about the frontend, please open an issue on GitHub.

---

**Last Updated**: May 2, 2026
