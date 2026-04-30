import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">My Rides</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">View rides you have posted or offered.</p>
          <Link to="/profile" className="text-blue-500 hover:underline">Manage Rides</Link>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">View your upcoming and past bookings.</p>
          <Link to="/bookings" className="text-blue-500 hover:underline">View Bookings</Link>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Update your personal information.</p>
          <Link to="/profile" className="text-blue-500 hover:underline">Edit Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
