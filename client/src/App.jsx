import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PostRide from './pages/PostRide';
import SearchRides from './pages/SearchRides';
import RideDetail from './pages/RideDetail';
import UserProfile from './pages/UserProfile';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import MyRides from './pages/MyRides';
import MyBookings from './pages/MyBookings';
import RideRequests from './pages/RideRequests';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<SearchRides />} />
              <Route path="/ride/:id" element={<RideDetail />} />
              <Route path="/user/:id" element={<UserProfile />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/post-ride" element={<PrivateRoute><PostRide /></PrivateRoute>} />
              <Route path="/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/my-rides" element={<PrivateRoute><MyRides /></PrivateRoute>} />
              <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
              <Route path="/ride-requests" element={<PrivateRoute><RideRequests /></PrivateRoute>} />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Footer />
        </div>

        {/* Toast Notifications */}
        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </AuthProvider>
  );
}

export default App;
