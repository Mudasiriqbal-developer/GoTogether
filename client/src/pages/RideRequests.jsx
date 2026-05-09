import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

function RideRequests() {
  const [rides, setRides] = useState([]);
  const [selectedRideId, setSelectedRideId] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    // Check for messages in URL
    const params = new URLSearchParams(location.search);
    const msg = params.get('message');
    const err = params.get('error');
    
    if (msg) toast.success(msg);
    if (err) toast.error(err);

    const fetchMyRides = async () => {
      try {
        const res = await api.get('/rides/my-rides');
        const activeRides = res.data.data.filter(ride => ride.status === 'active');
        setRides(activeRides);
        if (activeRides.length > 0) {
          setSelectedRideId(activeRides[0]._id);
        }
      } catch (err) {
        setError('Failed to fetch your rides');
      }
      setLoading(false);
    };

    fetchMyRides();
  }, [location]);

  useEffect(() => {
    if (!selectedRideId) return;

    const fetchRequests = async () => {
      setLoadingRequests(true);
      try {
        const res = await api.get(`/bookings/ride/${selectedRideId}`);
        setRequests(res.data.data);
      } catch (err) {
        setError('Failed to fetch requests for this ride');
      }
      setLoadingRequests(false);
    };

    fetchRequests();
  }, [selectedRideId]);

  const handleStatusChange = async (id, action) => {
    try {
      await api.put(`/bookings/${id}/${action}`);
      setRequests(requests.map(req => 
        req._id === id ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' } : req
      ));
      toast.success(`Booking ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
    } catch (err) {
      toast.error(err.response?.data?.error || `Failed to ${action} booking`);
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
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Booking Requests</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Review and manage passengers who want to join your journeys.</p>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 mb-8 font-bold">{error}</div>}

      {rides.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-20 rounded-3xl shadow-xl text-center border border-gray-100 dark:border-gray-700">
          <span className="text-6xl mb-6 block">📨</span>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No Active Rides</h3>
          <p className="text-gray-500 mb-8">You need an active ride to receive booking requests.</p>
          <Link to="/post-ride" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all">
            Post a Ride
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Left Column: Ride Selection */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Select Ride</h3>
            <div className="flex flex-col gap-3">
              {rides.map(ride => {
                const isSelected = selectedRideId === ride._id;
                const date = new Date(ride.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return (
                  <button 
                    key={ride._id}
                    onClick={() => setSelectedRideId(ride._id)}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-200'
                    }`}
                  >
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                      {date} • {ride.time}
                    </p>
                    <p className="font-extrabold text-sm truncate">{ride.origin} → {ride.destination}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Requests */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">
              Passenger Requests {requests.length > 0 && `(${requests.length})`}
            </h3>
            
            {loadingRequests ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700">
                <div className="animate-pulse flex flex-col items-center">
                   <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full mb-4"></div>
                   <div className="h-4 w-48 bg-gray-100 dark:bg-gray-700 rounded mb-2"></div>
                   <div className="h-3 w-32 bg-gray-100 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ) : requests.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700">
                <span className="text-4xl mb-4 block">📭</span>
                <p className="text-gray-500 font-medium">No bookings requested for this ride yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requests.map(request => (
                  <div key={request._id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm">
                          {request.passenger?.profilePhoto && request.passenger.profilePhoto !== 'default.jpg' ? (
                            <img src={request.passenger.profilePhoto} alt="Passenger" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xl font-bold text-blue-600">{request.passenger?.name?.charAt(0) || '?'}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-extrabold text-gray-900 dark:text-white leading-tight">{request.passenger?.name || 'Unknown'}</p>
                          <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mt-0.5">
                            ★ {request.passenger?.avgRating?.toFixed(1) || 'NEW'}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4 mb-6 space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 font-bold uppercase tracking-widest">Seats</span>
                        <span className="text-gray-900 dark:text-white font-black">{request.seatsBooked}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 font-bold uppercase tracking-widest">Contact</span>
                        <span className="text-gray-900 dark:text-white font-bold">{request.passenger?.phone || 'Private'}</span>
                      </div>
                    </div>
                    
                    {request.status === 'pending' ? (
                      <div className="flex gap-3 mt-auto">
                        <button 
                          onClick={() => handleStatusChange(request._id, 'approve')}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs transition-all shadow-lg shadow-blue-600/10"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleStatusChange(request._id, 'reject')}
                          className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-3 rounded-xl font-bold text-xs transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                           Processed on {new Date(request.updatedAt || request.createdAt).toLocaleDateString()}
                         </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default RideRequests;

