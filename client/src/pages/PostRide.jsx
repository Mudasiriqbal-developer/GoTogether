import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

function PostRide() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    totalSeats: 3,
    costPerSeat: '',
    vehicleType: 'car',
    genderPreference: 'any',
    description: ''
  });

  const { origin, destination, date, time, totalSeats, costPerSeat, vehicleType, genderPreference, description } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/rides', formData);
      navigate('/my-rides');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post ride');
      setLoading(false);
    }
  };

  if (user && user.role === 'Passenger') {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h2>
        <p>You must be a Driver to offer a ride. Please update your profile role.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Offer a Ride</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Origin</label>
            <input type="text" name="origin" value={origin} onChange={onChange} required className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="E.g., Peshawar" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Destination</label>
            <input type="text" name="destination" value={destination} onChange={onChange} required className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="E.g., Islamabad" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date</label>
            <input type="date" name="date" value={date} onChange={onChange} required className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Time</label>
            <input type="time" name="time" value={time} onChange={onChange} required className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Total Seats</label>
            <input type="number" name="totalSeats" value={totalSeats} onChange={onChange} min="1" max="10" required className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Price per Seat (PKR)</label>
            <input type="number" name="costPerSeat" value={costPerSeat} onChange={onChange} min="0" required className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="1500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Vehicle Type</label>
            <select name="vehicleType" value={vehicleType} onChange={onChange} className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500">
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Gender Preference</label>
          <select name="genderPreference" value={genderPreference} onChange={onChange} className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500">
            <option value="any">Any (Mixed)</option>
            <option value="male">Male Only</option>
            <option value="female">Female Only</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description (Optional)</label>
          <textarea name="description" value={description} onChange={onChange} rows="3" className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Luggage info, meeting point, etc."></textarea>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50">
          {loading ? 'Posting...' : 'Post Ride'}
        </button>
      </form>
    </div>
  );
}

export default PostRide;
