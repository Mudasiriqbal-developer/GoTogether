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
      <div className="max-w-xl mx-auto mt-20 text-center p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
        <span className="text-6xl mb-6 block">🚫</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h2>
        <p className="text-gray-500 mb-8">You must be registered as a Driver to offer a ride. Please update your profile settings.</p>
        <button onClick={() => navigate('/profile')} className="text-blue-600 font-bold hover:underline">Go to Profile</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">Offer a Ride</h1>
        <p className="text-gray-500 dark:text-gray-400">Fill in the details to start sharing your journey and earning.</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {error && (
          <div className="bg-red-50 border-b border-red-100 text-red-700 px-8 py-4 flex items-center gap-3">
             <span className="text-xl">⚠️</span>
             <p className="font-bold text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={onSubmit} className="p-8 md:p-12">
          
          <div className="mb-12">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-50 dark:border-gray-700 pb-2">Route Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Origin City</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">📍</span>
                  <input type="text" name="origin" value={origin} onChange={onChange} required className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 pl-12 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Departure city" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Destination City</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">🏁</span>
                  <input type="text" name="destination" value={destination} onChange={onChange} required className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 pl-12 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Arrival city" />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-50 dark:border-gray-700 pb-2">Schedule & Capacity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Travel Date</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">📅</span>
                  <input type="date" name="date" value={date} onChange={onChange} required className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 pl-12 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Departure Time</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">⏰</span>
                  <input type="time" name="time" value={time} onChange={onChange} required className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 pl-12 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Total Seats</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">👥</span>
                  <input type="number" name="totalSeats" value={totalSeats} onChange={onChange} min="1" max="10" required className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 pl-12 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-50 dark:border-gray-700 pb-2">Pricing & Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price per Seat</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-xs">PKR</span>
                  <input type="number" name="costPerSeat" value={costPerSeat} onChange={onChange} min="0" required className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 pl-12 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" placeholder="1500" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Vehicle Type</label>
                <select name="vehicleType" value={vehicleType} onChange={onChange} className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all">
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Gender Preference</label>
                <select name="genderPreference" value={genderPreference} onChange={onChange} className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all">
                  <option value="any">No Preference (Mixed)</option>
                  <option value="male">Male Only</option>
                  <option value="female">Female Only</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Additional Notes</h3>
            <textarea name="description" value={description} onChange={onChange} rows="4" className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-3xl p-6 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Any specific details like meeting point, luggage space, or music preferences..."></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
            {loading ? 'POSTING JOURNEY...' : 'POST RIDE NOW'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostRide;

