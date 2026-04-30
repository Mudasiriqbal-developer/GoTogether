import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function RideRequests() {
  const [rides, setRides] = useState([]);
  const [selectedRideId, setSelectedRideId] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState('');

  // Fetch active rides to populate dropdown
  useEffect(() => {
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
  }, []);

  // Fetch requests for selected ride
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
      // Update local state to reflect change
      setRequests(requests.map(req => 
        req._id === id ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' } : req
      ));
    } catch (err) {
      alert(err.response?.data?.error || `Failed to ${action} booking`);
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ride Requests</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      {rides.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 mb-4">You don't have any active rides to receive requests for.</p>
          <Link to="/post-ride" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Post a Ride
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Select Ride</label>
            <select 
              value={selectedRideId} 
              onChange={(e) => setSelectedRideId(e.target.value)}
              className="w-full md:w-1/2 border rounded-lg p-3 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 shadow-sm"
            >
              {rides.map(ride => {
                const date = new Date(ride.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return (
                  <option key={ride._id} value={ride._id}>
                    {ride.origin} → {ride.destination} ({date} at {ride.time})
                  </option>
                );
              })}
            </select>
          </div>

          {loadingRequests ? (
            <div className="text-center py-8">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center text-gray-500">
              No bookings requested for this ride yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requests.map(request => (
                <div key={request._id} className="border border-gray-200 dark:border-gray-700 p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      {request.passenger?.profilePhoto && request.passenger.profilePhoto !== 'default.jpg' ? (
                        <img src={request.passenger.profilePhoto} alt="Passenger" className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
                          {request.passenger?.name?.charAt(0) || '?'}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{request.passenger?.name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">
                          Rating: ★ {request.passenger?.avgRating?.toFixed(1) || 'N/A'}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                  
                  <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p><strong>Seats requested:</strong> {request.seatsBooked}</p>
                    <p><strong>Phone:</strong> {request.passenger?.phone || 'N/A'}</p>
                    <p className="text-xs text-gray-400">Requested on: {new Date(request.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex gap-2 border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                      <button 
                        onClick={() => handleStatusChange(request._id, 'approve')}
                        className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 py-2 rounded-lg font-medium transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleStatusChange(request._id, 'reject')}
                        className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 py-2 rounded-lg font-medium transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RideRequests;
