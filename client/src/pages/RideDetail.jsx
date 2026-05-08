import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
    
    let phoneNumber = ride.driver.phone.replace(/\D/g, '');
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
    return (
      <div className="max-w-xl mx-auto mt-20 text-center p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
        <span className="text-6xl mb-6 block">🚫</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error}</h2>
        <button onClick={() => navigate('/search')} className="text-blue-600 font-bold hover:underline">Go back to search</button>
      </div>
    );
  }

  const dateObj = new Date(ride.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      {/* Alert Banner */}
      {bookingStatus && (
        <div className={`mb-8 p-4 rounded-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300 ${
          bookingStatus.type === 'error' ? 'bg-red-50 border-red-100 text-red-700' :
          bookingStatus.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' :
          'bg-blue-50 border-blue-100 text-blue-700'
        }`}>
          <span className="text-xl">{bookingStatus.type === 'success' ? '✅' : bookingStatus.type === 'error' ? '❌' : '⏳'}</span>
          <p className="font-bold text-sm">{bookingStatus.msg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Ride Info */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Main Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
             <div className="p-8 md:p-12 border-b border-gray-50 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${ride.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                    {ride.status}
                  </span>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {ride.vehicleType}
                  </span>
                  <span className="bg-gray-50 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {ride.genderPreference === 'any' ? 'Mixed Gender' : `${ride.genderPreference} Only`}
                  </span>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="relative">
                    {/* Route Timeline Visual */}
                    <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-gray-100 dark:bg-gray-700"></div>
                    
                    <div className="flex gap-6 relative mb-12">
                      <div className="w-4 h-4 rounded-full border-4 border-blue-600 bg-white z-10 mt-1"></div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pickup Point</p>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{ride.origin}</h2>
                        <p className="text-gray-500 mt-1">{formattedDate} • {ride.time}</p>
                      </div>
                    </div>

                    <div className="flex gap-6 relative">
                      <div className="w-4 h-4 rounded-full bg-blue-600 z-10 mt-1"></div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Destination</p>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{ride.destination}</h2>
                        <p className="text-gray-500 mt-1">Estimated Arrival: 2h 30m</p>
                      </div>
                    </div>
                  </div>
                </div>
             </div>

             <div className="p-8 md:p-12 bg-gray-50/50 dark:bg-gray-900/20">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Driver's Notes</h3>
                <div className="relative">
                  <span className="absolute -left-2 -top-2 text-4xl text-blue-100 dark:text-blue-900/30 font-serif">"</span>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed relative z-10 italic">
                    {ride.description || "No specific instructions provided by the driver. Standard luggage space available."}
                  </p>
                </div>
             </div>
          </div>

          {/* Features/Rules Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Ride Features</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <FeatureItem icon="❄️" label="AC Available" value="Yes" />
                <FeatureItem icon="🚭" label="No Smoking" value="Strictly" />
                <FeatureItem icon="🎵" label="Music" value="On Request" />
                <FeatureItem icon="🧳" label="Luggage" value="1 Medium" />
             </div>
          </div>

        </div>

        {/* Right Column: Driver & Booking */}
        <div className="flex flex-col gap-8">
          
          {/* Price & Booking Card */}
          <div className="bg-blue-600 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
             {/* Decorative pattern */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8"></div>
             
             <div className="relative z-10">
                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-2">Price Per Seat</p>
                <div className="flex items-baseline gap-2 mb-8">
                   <span className="text-5xl font-black">PKR {ride.costPerSeat}</span>
                </div>

                <div className="space-y-6 mb-8">
                   <div className="flex justify-between items-center text-sm font-medium border-b border-white/10 pb-4">
                      <span className="text-blue-100">Available Seats</span>
                      <span className="text-xl font-bold">{ride.seatsAvailable} / {ride.totalSeats}</span>
                   </div>
                   
                   {ride.seatsAvailable > 0 && ride.status === 'active' && (
                     <div className="flex flex-col gap-3">
                        <label className="text-blue-100 text-xs font-bold uppercase tracking-widest">Select Seats</label>
                        <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-2">
                           <button 
                             onClick={() => setSeatsToBook(Math.max(1, seatsToBook - 1))}
                             className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold hover:bg-white/30 transition-colors"
                           >-</button>
                           <span className="flex-1 text-center font-bold text-lg">{seatsToBook}</span>
                           <button 
                             onClick={() => setSeatsToBook(Math.min(ride.seatsAvailable, seatsToBook + 1))}
                             className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold hover:bg-white/30 transition-colors"
                           >+</button>
                        </div>
                     </div>
                   )}
                </div>

                <button 
                  onClick={handleBook}
                  disabled={ride.seatsAvailable === 0 || ride.status !== 'active'}
                  className={`w-full py-4 rounded-2xl text-lg font-bold transition-all transform active:scale-95 shadow-lg
                    ${ride.seatsAvailable === 0 || ride.status !== 'active' 
                      ? 'bg-blue-400 text-blue-200 cursor-not-allowed' 
                      : 'bg-white text-blue-600 hover:bg-blue-50 hover:shadow-white/20'}`}
                >
                  {ride.seatsAvailable === 0 ? 'Fully Booked' : ride.status !== 'active' ? `Ride ${ride.status}` : 'Book This Ride'}
                </button>
             </div>
          </div>

          {/* Driver Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">The Driver</h3>
               {isAuthenticated && user?._id !== ride.driver?._id && (
                  <button onClick={() => setIsReportModalOpen(true)} className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline">Report</button>
               )}
             </div>

             <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-gray-50 dark:border-gray-700 overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center">
                    {ride.driver?.profilePhoto && ride.driver.profilePhoto !== 'default.jpg' ? (
                      <img src={ride.driver.profilePhoto} alt={ride.driver.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-blue-600">{ride.driver?.name?.charAt(0)}</span>
                    )}
                  </div>
                  {ride.driver?.avgRating >= 4 && (
                    <div className="absolute bottom-0 right-0 bg-green-500 p-1.5 rounded-full border-4 border-white dark:border-gray-800 shadow-sm" title="Top Rated">
                       <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  )}
                </div>

                <Link to={`/user/${ride.driver?._id}`} className="text-xl font-extrabold text-gray-900 dark:text-white hover:text-blue-600 transition-colors mb-1">
                  {ride.driver?.name}
                </Link>
                <div className="flex items-center gap-1 text-sm font-bold text-gray-500 mb-6">
                  <span className="text-yellow-500">★ {ride.driver?.avgRating?.toFixed(1) || 'New'}</span>
                  <span>({ride.driver?.totalRatings || 0} reviews)</span>
                </div>

                <button 
                  onClick={handleWhatsAppContact}
                  className="w-full py-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-2xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-lg">💬</span> Contact via WhatsApp
                </button>
             </div>
          </div>

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

// Helper Components
const FeatureItem = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-2xl mb-1">{icon}</span>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-extrabold text-gray-900 dark:text-white">{value}</p>
  </div>
);

export default RideDetail;

