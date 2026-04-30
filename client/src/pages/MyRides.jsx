import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

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
      } catch (err) {
        alert(err.response?.data?.error || 'Error cancelling ride');
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
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Posted Rides</h1>
        <Link to="/post-ride" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          Offer New Ride
        </Link>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      {rides.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No Rides Posted</h3>
          <p className="text-gray-500 mb-6">You haven't posted any rides yet.</p>
          <Link to="/post-ride" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Post your first ride
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {rides.map(ride => {
            const dateObj = new Date(ride.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            
            return (
              <div key={ride._id} className="border border-gray-200 dark:border-gray-700 p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-semibold uppercase ${
                      ride.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ride.status}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formattedDate} at {ride.time}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {ride.origin} → {ride.destination}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {ride.seatsAvailable} of {ride.totalSeats} seats available • PKR {ride.costPerSeat}/seat
                  </p>
                </div>
                
                <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                  <Link 
                    to={`/ride/${ride._id}`}
                    className="flex-1 md:flex-none text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => {
                      const newStatus = prompt('Enter new status (active, completed, cancelled):', ride.status);
                      if(newStatus && ['active', 'completed', 'cancelled'].includes(newStatus)) {
                         api.put(`/rides/${ride._id}`, { status: newStatus })
                           .then(() => fetchMyRides())
                           .catch(err => alert('Failed to update status'));
                      }
                    }}
                    className="flex-1 md:flex-none bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  >
                    Edit Status
                  </button>
                  <button 
                    onClick={() => handleCancel(ride._id)}
                    className="flex-1 md:flex-none bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  >
                    Cancel
                  </button>
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
