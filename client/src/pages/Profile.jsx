import React from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4 dark:border-gray-700">My Profile</h1>
      
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-4xl text-gray-600 dark:text-gray-300 font-bold uppercase overflow-hidden">
          {user.profilePhoto !== 'default.jpg' ? (
             <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user.name.charAt(0)
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          <div className="flex items-center mt-1 space-x-3">
             <span className="text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">{user.role}</span>
             {user.isVerified && <span className="text-sm text-green-600 dark:text-green-400 font-medium">✓ Verified User</span>}
          </div>
          {user.role !== 'Passenger' && (
            <p className="text-sm text-gray-500 mt-1">Rating: {user.avgRating} ★ ({user.totalRatings} reviews)</p>
          )}
        </div>
      </div>

      <form>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
            <input type="text" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded p-2 text-gray-700 dark:text-white" defaultValue={user.name} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded p-2 text-gray-700 dark:text-white" defaultValue={user.email} disabled />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
          <input type="tel" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded p-2 text-gray-700 dark:text-white" defaultValue={user.phone} />
        </div>
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
