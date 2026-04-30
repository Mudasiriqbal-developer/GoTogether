import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/my-bookings');
      setBookings(res.data.data);
    } catch (err) {
      setError('Failed to fetch your bookings');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.delete(`/bookings/${id}`);
        // Refresh bookings
        fetchBookings();
      } catch (err) {
        alert(err.response?.data?.error || 'Error cancelling booking');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Pending</span>;
      case 'approved': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Approved</span>;
      case 'rejected': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Rejected</span>;
      case 'cancelled': return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Cancelled</span>;
      default: return null;
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Bookings</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      {bookings.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No Bookings Yet</h3>
          <p className="text-gray-500 mb-6">You haven't requested any rides yet.</p>
          <Link to="/search" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Find a ride
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => {
            const dateObj = new Date(booking.ride?.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            
            return (
              <div key={booking._id} className="border border-gray-200 dark:border-gray-700 p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusBadge(booking.status)}
                    {booking.ride && (
                      <span className="text-gray-500 text-sm">
                        {formattedDate} at {booking.ride.time}
                      </span>
                    )}
                  </div>
                  {booking.ride ? (
                    <>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {booking.ride.origin} → {booking.ride.destination}
                      </h3>
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span>Driver: <span className="font-medium text-gray-900 dark:text-gray-200">{booking.ride.driver?.name || 'Unknown'}</span></span>
                        {booking.status === 'approved' && booking.ride.driver?.phone && (
                          <span className="bg-blue-50 dark:bg-gray-700 px-2 py-0.5 rounded text-blue-700 dark:text-blue-300">
                            📞 {booking.ride.driver.phone}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Booked: {booking.seatsBooked} {booking.seatsBooked === 1 ? 'seat' : 'seats'} • Total: PKR {booking.ride.costPerSeat * booking.seatsBooked}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500 italic">This ride has been removed</p>
                  )}
                </div>
                
                <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                  {booking.ride && (
                    <Link 
                      to={`/ride/${booking.ride._id}`}
                      className="flex-1 md:flex-none text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      View Ride
                    </Link>
                  )}
                  {['pending', 'approved'].includes(booking.status) && (
                    <button 
                      onClick={() => handleCancel(booking._id)}
                      className="flex-1 md:flex-none bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
