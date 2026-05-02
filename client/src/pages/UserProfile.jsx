import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import StarDisplay from '../components/StarDisplay';
import ReportModal from '../components/ReportModal';
import { useAuth } from '../context/AuthContext';

function UserProfile() {
  const { id } = useParams();
  const { isAuthenticated, user: currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfileAndRatings = async () => {
      try {
        const [resUser, resRatings] = await Promise.all([
          api.get(`/users/${id}`),
          api.get(`/ratings/user/${id}`)
        ]);
        
        setUserProfile(resUser.data.data);
        setRatings(resRatings.data.data);
      } catch (err) {
        setError('Failed to fetch user profile');
      }
      setLoading(false);
    };

    fetchProfileAndRatings();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  if (error || !userProfile) {
    return <div className="text-center mt-10 p-6 bg-red-100 text-red-700 rounded-lg">{error || 'User not found'}</div>;
  }

  const isVerified = userProfile.avgRating >= 4 && userProfile.totalRatings >= 3;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8 relative">
        {isAuthenticated && currentUser?._id !== id && (
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="absolute top-6 right-6 text-sm text-red-500 hover:text-red-700 underline"
          >
            Report User
          </button>
        )}
        
        <div className="flex items-center gap-6">
          {userProfile.profilePhoto && userProfile.profilePhoto !== 'default.jpg' ? (
            <img src={userProfile.profilePhoto} alt={userProfile.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600 border-4 border-white shadow-md">
              {userProfile.name?.charAt(0) || 'U'}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {userProfile.name}
              {isVerified && (
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded flex items-center">
                  ✓ Verified
                </span>
              )}
            </h1>
            <div className="mt-2 flex items-center gap-3 text-lg">
              <StarDisplay rating={userProfile.avgRating} totalRatings={userProfile.totalRatings} />
            </div>
            <p className="mt-1 text-gray-500 capitalize">{userProfile.role} • Member since {new Date(userProfile.createdAt).getFullYear()}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Reviews Received ({ratings.length})</h2>
      
      {ratings.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center text-gray-500">
          This user hasn't received any reviews yet.
        </div>
      ) : (
        <div className="space-y-4">
          {ratings.map(rating => (
            <div key={rating._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    {rating.reviewer?.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{rating.reviewer?.name || 'Anonymous'}</p>
                    <p className="text-xs text-gray-500">{new Date(rating.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <StarDisplay rating={rating.stars} />
              </div>
              {rating.ride && (
                <p className="text-xs text-gray-400 mb-2">
                  Ride: {rating.ride.origin} → {rating.ride.destination} on {new Date(rating.ride.date).toLocaleDateString()}
                </p>
              )}
              {rating.comment && (
                <p className="text-gray-700 dark:text-gray-300 italic">"{rating.comment}"</p>
              )}
            </div>
          ))}
        </div>
      )}

      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        reportedUserId={id} 
      />
    </div>
  );
}

export default UserProfile;
