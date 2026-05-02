import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [driverStats, setDriverStats] = useState(null);
  const [passengerStats, setPassengerStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user?.role === 'Driver' || user?.role === 'Both') {
          const driverRes = await api.get('/dashboard/driver');
          setDriverStats(driverRes.data.data);
        }

        if (user?.role === 'Passenger' || user?.role === 'Both') {
          const passengerRes = await api.get('/dashboard/passenger');
          setPassengerStats(passengerRes.data.data);
        }
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard</h1>

      {/* Driver Stats */}
      {(user?.role === 'Driver' || user?.role === 'Both') && driverStats && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🚗 Driver Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Total Rides Posted */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Rides Posted</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{driverStats.totalRidesPosted}</p>
                </div>
                <div className="text-4xl">🚗</div>
              </div>
            </div>

            {/* Total Passengers */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Passengers</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{driverStats.totalPassengersCarried}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>

            {/* Total Earnings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Earnings</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">Rs {driverStats.totalEarnings?.toLocaleString()}</p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>

            {/* Average Rating */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Average Rating</p>
                  <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mt-2">{driverStats.avgRating?.toFixed(1)} ⭐</p>
                </div>
                <div className="text-4xl">⭐</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate('/my-rides')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View My Rides
            </button>
            <button
              onClick={() => navigate('/ride-requests')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Manage Bookings
            </button>
            <button
              onClick={() => navigate('/post-ride')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Post New Ride
            </button>
          </div>
        </div>
      )}

      {/* Passenger Stats */}
      {(user?.role === 'Passenger' || user?.role === 'Both') && passengerStats && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🛣️ Passenger Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Rides Taken */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Rides Taken</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{passengerStats.totalRidesTaken}</p>
                </div>
                <div className="text-4xl">🎫</div>
              </div>
            </div>

            {/* Total Spent */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Spent</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">Rs {passengerStats.totalSpent?.toLocaleString()}</p>
                </div>
                <div className="text-4xl">💸</div>
              </div>
            </div>

            {/* Favourite Route */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Favourite Route</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-2 break-words">{passengerStats.favouriteRoute}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate('/search')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search Rides
            </button>
            <button
              onClick={() => navigate('/my-bookings')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              My Bookings
            </button>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/profile')}>
            <h3 className="text-xl font-semibold mb-2">👤 Edit Profile</h3>
            <p className="text-blue-100">Update your name, phone, and profile photo</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/search')}>
            <h3 className="text-xl font-semibold mb-2">🔍 Search Rides</h3>
            <p className="text-purple-100">Find available rides in your area</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/post-ride')}>
            <h3 className="text-xl font-semibold mb-2">✚ Post Ride</h3>
            <p className="text-green-100">Offer a ride and earn money</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
