import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import ReportModal from '../components/ReportModal';
import toast from 'react-hot-toast';

function RideDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const [seatsToBook, setSeatsToBook] = useState(1);

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await api.get(`/rides/${id}`);
        setRide(res.data.data);
      } catch (err) {
        setError('Failed to load ride details or ride not found');
      }
      setLoading(false);
    };

    fetchRide();
  }, [id]);

  const handleBook = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/ride/${id}` } });
      return;
    }
    
    setBookingStatus({ type: 'loading', msg: 'Processing booking...' });
    try {
      await api.post('/bookings', { rideId: id, seatsBooked: seatsToBook });
      setBookingStatus({ type: 'success', msg: 'Booking requested successfully! Waiting for driver approval.' });
      toast.success('Booking request sent!');
    } catch (err) {
      setBookingStatus({ type: 'error', msg: err.response?.data?.error || 'Failed to request booking.' });
      toast.error(err.response?.data?.error || 'Failed to request booking');
    }
  };

  const handleWhatsAppContact = () => {
    if (!ride?.driver?.phone) {
      toast.error('Driver phone number not available');
      return;
    }
    
    // Format phone number for WhatsApp (remove special characters, add country code if needed)
    let phoneNumber = ride.driver.phone.replace(/\D/g, '');
    // If number doesn't start with country code, assume Pakistan (+92)
    if (!phoneNumber.startsWith('92')) {
      phoneNumber = '92' + phoneNumber.replace(/^0+/, '');
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !ride) {
    return <div className="text-center mt-10 p-6 bg-red-100 text-red-700 rounded-lg">{error}</div>;
  }

  const dateObj = new Date(ride.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const postedDate = new Date(ride.createdAt).toLocaleDateString('en-US');

  return (
    <div className="max-w-3xl mx-auto">
      {bookingStatus && (
        <div className={`mb-4 border px-4 py-3 rounded relative ${
          bookingStatus.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' :
          bookingStatus.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' :
          'bg-blue-100 border-blue-400 text-blue-700'
        }`}>
          {bookingStatus.msg}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-start mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${ride.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {ride.status}
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {ride.vehicleType}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {ride.origin} <span className="text-gray-400 mx-2">→</span> {ride.destination}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              {formattedDate} at {ride.time}
            </p>
          </div>
          <div className="text-right bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">PKR {ride.costPerSeat}</p>
            <p className="text-sm text-gray-500 font-medium">per seat</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Ride Details</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex justify-between">
                <span className="text-gray-500">Total Seats</span>
                <span className="font-semibold">{ride.totalSeats}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Available Seats</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{ride.seatsAvailable}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Gender Preference</span>
                <span className="font-semibold capitalize">{ride.genderPreference === 'any' ? 'Mixed' : `${ride.genderPreference} Only`}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Posted On</span>
                <span className="font-semibold">{postedDate}</span>
              </li>
            </ul>

            {ride.description && (
              <div className="mt-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Driver's Notes</h4>
                <p className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-gray-700 dark:text-gray-300 italic text-sm">
                  "{ride.description}"
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Driver Information</h3>
              {isAuthenticated && user?._id !== ride.driver?._id && (
                <button 
                  onClick={() => setIsReportModalOpen(true)}
                  className="text-xs text-red-500 hover:text-red-700 underline"
                >
                  Report
                </button>
              )}
            </div>
            {ride.driver ? (
              <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  {ride.driver.profilePhoto && ride.driver.profilePhoto !== 'default.jpg' ? (
                    <img src={ride.driver.profilePhoto} alt={ride.driver.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 border-2 border-white shadow-sm">
                      {ride.driver.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">{ride.driver.name}</p>
                    <div className="flex items-center text-yellow-500 text-sm mt-1">
                      {'★'.repeat(Math.round(ride.driver.avgRating || 0))}
                      {'☆'.repeat(5 - Math.round(ride.driver.avgRating || 0))}
                      <span className="text-gray-500 ml-2">({ride.driver.totalRatings || 0} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <span>💬</span> Contact via WhatsApp
                </button>
              </div>
            ) : (
              <p className="text-gray-500 italic">Driver information unavailable</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          {ride.seatsAvailable > 0 && ride.status === 'active' && (
            <div className="flex items-center gap-2">
              <label className="text-gray-700 dark:text-gray-300 font-medium">Seats:</label>
              <input 
                type="number" 
                min="1" 
                max={ride.seatsAvailable}
                value={seatsToBook}
                onChange={(e) => setSeatsToBook(Number(e.target.value))}
                className="w-20 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          )}
          <button 
            onClick={handleBook}
            disabled={ride.seatsAvailable === 0 || ride.status !== 'active'}
            className={`flex-1 py-4 rounded-xl text-lg font-bold shadow-md transition-all
              ${ride.seatsAvailable === 0 || ride.status !== 'active' 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'}`}
          >
            {ride.seatsAvailable === 0 ? 'Fully Booked' : ride.status !== 'active' ? `Ride ${ride.status}` : 'Book Seat(s)'}
          </button>
        </div>
      </div>
      
      {ride?.driver && (
        <ReportModal 
          isOpen={isReportModalOpen} 
          onClose={() => setIsReportModalOpen(false)} 
          reportedUserId={ride.driver._id} 
          rideId={ride._id} 
        />
      )}
    </div>
  );
}

export default RideDetail;
