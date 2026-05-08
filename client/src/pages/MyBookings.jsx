import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import RatingModal from '../components/RatingModal';
import toast from 'react-hot-toast';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingData, setRatingData] = useState(null);

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
        fetchBookings();
        toast.success('Booking cancelled successfully');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Error cancelling booking');
      }
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-600',
      approved: 'bg-green-50 text-green-600',
      rejected: 'bg-red-50 text-red-600',
      cancelled: 'bg-gray-50 text-gray-500',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${styles[status] || styles.cancelled}`}>
        {status}
      </span>
    );
  };

  const openRatingModal = (booking) => {
    setRatingData({
      revieweeId: booking.ride.driver._id,
      rideId: booking.ride._id,
      bookingId: booking._id
    });
    setIsRatingModalOpen(true);
  };

  const canLeaveReview = (booking) => {
    if (booking.status !== 'approved' || !booking.ride) return false;
    const rideDate = new Date(`${booking.ride.date.split('T')[0]}T${booking.ride.time}`);
    return new Date() > rideDate;
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
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">My Bookings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Track and manage your ride reservations and travel history.</p>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 mb-8 font-bold">{error}</div>}

      {bookings.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-20 rounded-3xl shadow-xl text-center border border-gray-100 dark:border-gray-700">
          <span className="text-6xl mb-6 block">🎫</span>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No Bookings Yet</h3>
          <p className="text-gray-500 mb-8">You haven't requested any rides yet. Ready to start your next adventure?</p>
          <Link to="/search" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all">
            Find a ride
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map(booking => {
            const dateObj = new Date(booking.ride?.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            return (
              <div key={booking._id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {getStatusBadge(booking.status)}
                      {booking.ride && (
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          📅 {formattedDate} • ⏰ {booking.ride.time}
                        </span>
                      )}
                    </div>
                    {booking.ride ? (
                      <>
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                          {booking.ride.origin} → {booking.ride.destination}
                        </h3>
                        <div className="flex flex-wrap gap-6 text-sm mb-4">
                           <div className="flex items-center gap-2">
                              <span className="text-blue-600 font-bold">Driver:</span>
                              <span className="text-gray-700 dark:text-gray-300 font-medium">{booking.ride.driver?.name || 'Unknown'}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-blue-600 font-bold">Seats:</span>
                              <span className="text-gray-700 dark:text-gray-300">{booking.seatsBooked} reserved</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-blue-600 font-bold">Total:</span>
                              <span className="text-gray-700 dark:text-gray-300 font-extrabold">PKR {booking.ride.costPerSeat * booking.seatsBooked}</span>
                           </div>
                        </div>
                        
                        {booking.status === 'approved' && booking.ride.driver?.phone && (
                          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100">
                             📞 {booking.ride.driver.phone}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-500 italic py-4 bg-gray-50 dark:bg-gray-700/50 px-6 rounded-2xl">This ride has been removed by the driver.</p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-3 lg:min-w-[180px]">
                    {booking.ride && (
                      <Link 
                        to={`/ride/${booking.ride._id}`}
                        className="flex-1 lg:w-full text-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-xl font-bold text-xs transition-all"
                      >
                        View Ride
                      </Link>
                    )}
                    {['pending', 'approved'].includes(booking.status) && !canLeaveReview(booking) && (
                      <button 
                        onClick={() => handleCancel(booking._id)}
                        className="flex-1 lg:w-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 px-6 py-2.5 rounded-xl font-bold text-xs transition-all"
                      >
                        Cancel Booking
                      </button>
                    )}
                    {canLeaveReview(booking) && (
                      <button 
                        onClick={() => openRatingModal(booking)}
                        className="flex-1 lg:w-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
                      >
                        <span>★</span> Leave Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {ratingData && (
        <RatingModal 
          isOpen={isRatingModalOpen}
          onClose={() => {
            setIsRatingModalOpen(false);
            setRatingData(null);
          }}
          revieweeId={ratingData.revieweeId}
          rideId={ratingData.rideId}
          bookingId={ratingData.bookingId}
          onRatingSubmitted={() => {
            toast.success('Review submitted successfully!');
            fetchBookings();
          }}
        />
      )}
    </div>
  );
}

export default MyBookings;

