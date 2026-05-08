import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

function MyRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyRides = async () => {
    try {
      const res = await api.get('/rides/my-rides');
      setRides(res.data.data);
    } catch (err) {
      setError('Failed to fetch your rides');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyRides();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel and delete this ride?')) {
      try {
        await api.delete(`/rides/${id}`);
        setRides(rides.filter(ride => ride._id !== id));
        toast.success('Ride cancelled successfully');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Error cancelling ride');
      }
    }
  };

  const updateStatus = async (rideId, currentStatus) => {
    const newStatus = prompt('Enter new status (active, completed, cancelled):', currentStatus);
    if (newStatus && ['active', 'completed', 'cancelled'].includes(newStatus)) {
      try {
        await api.put(`/rides/${rideId}`, { status: newStatus });
        fetchMyRides();
        toast.success(`Status updated to ${newStatus}`);
      } catch (err) {
        toast.error('Failed to update status');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">My Posted Rides</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Manage the journeys you've shared with the community.</p>
        </div>
        <Link to="/post-ride" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5">
          + Offer New Ride
        </Link>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 mb-8 font-bold">{error}</div>}

      {rides.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-20 rounded-3xl shadow-xl text-center border border-gray-100 dark:border-gray-700">
          <span className="text-6xl mb-6 block">🚗</span>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No Rides Posted</h3>
          <p className="text-gray-500 mb-8">You haven't shared any journeys yet. Start sharing today!</p>
          <Link to="/post-ride" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all">
            Post your first ride
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {rides.map(ride => {
            const dateObj = new Date(ride.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            return (
              <div key={ride._id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        ride.status === 'active' ? 'bg-green-50 text-green-600' : 
                        ride.status === 'completed' ? 'bg-blue-50 text-blue-600' : 
                        'bg-red-50 text-red-600'
                      }`}>
                        {ride.status}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        📅 {formattedDate} • ⏰ {ride.time}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                      {ride.origin} → {ride.destination}
                    </h3>
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2">
                         <span className="text-blue-600 font-bold">Seats:</span>
                         <span className="text-gray-700 dark:text-gray-300">{ride.seatsAvailable} of {ride.totalSeats} available</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="text-blue-600 font-bold">Earnings:</span>
                         <span className="text-gray-700 dark:text-gray-300">PKR {ride.costPerSeat} / seat</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-3 lg:min-w-[180px]">
                    <Link 
                      to={`/ride/${ride._id}`}
                      className="flex-1 lg:w-full text-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-xl font-bold text-xs transition-all"
                    >
                      View Details
                    </Link>
                    <button 
                      onClick={() => updateStatus(ride._id, ride.status)}
                      className="flex-1 lg:w-full bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 px-6 py-2.5 rounded-xl font-bold text-xs transition-all"
                    >
                      Update Status
                    </button>
                    <button 
                      onClick={() => handleCancel(ride._id)}
                      className="flex-1 lg:w-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 px-6 py-2.5 rounded-xl font-bold text-xs transition-all"
                    >
                      Cancel Ride
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyRides;

