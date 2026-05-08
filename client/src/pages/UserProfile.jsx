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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
        <span className="text-6xl mb-6 block">👤</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error || 'User not found'}</h2>
      </div>
    );
  }

  const isVerified = userProfile.avgRating >= 4 && userProfile.totalRatings >= 3;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-10">
        <div className="bg-blue-600 h-32 relative">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        </div>
        
        <div className="px-8 md:px-12 pb-12 -mt-16 relative">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-xl bg-gray-100 flex items-center justify-center">
                {userProfile.profilePhoto && userProfile.profileProfilePhoto !== 'default.jpg' ? (
                  <img src={userProfile.profilePhoto} alt={userProfile.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-black text-blue-600">{userProfile.name?.charAt(0) || 'U'}</span>
                )}
              </div>
              {isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl border-4 border-white dark:border-gray-800 shadow-lg" title="Verified Member">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                </div>
              )}
            </div>

            <div className="flex-1">
               <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-2">
                      {userProfile.name}
                    </h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      {userProfile.role} • Joined {new Date(userProfile.createdAt).getFullYear()}
                    </p>
                  </div>
                  
                  {isAuthenticated && currentUser?._id !== id && (
                    <button 
                      onClick={() => setIsReportModalOpen(true)}
                      className="text-[10px] font-black text-red-500 uppercase tracking-widest border-2 border-red-100 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                    >
                      Report Profile
                    </button>
                  )}
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-50 dark:border-gray-700">
             <div className="bg-gray-50 dark:bg-gray-900/40 p-6 rounded-3xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Average Rating</p>
                <div className="flex items-center gap-3">
                   <span className="text-3xl font-black text-gray-900 dark:text-white">{userProfile.avgRating?.toFixed(1) || '0.0'}</span>
                   <StarDisplay rating={userProfile.avgRating} size="lg" />
                </div>
             </div>
             <div className="bg-gray-50 dark:bg-gray-900/40 p-6 rounded-3xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Reviews</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">{userProfile.totalRatings || 0}</p>
             </div>
             <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl">
                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Trust Score</p>
                <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{isVerified ? 'Excellent' : 'Good'}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 ml-1">Reviews & Feedback</h2>
            
            {ratings.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 p-12 rounded-[2rem] shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <span className="text-4xl mb-4 block">💬</span>
                <p className="text-gray-500 font-medium">This user hasn't received any reviews yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {ratings.map(rating => (
                  <div key={rating._id} className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-blue-600 border-2 border-white shadow-sm">
                          {rating.reviewer?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="font-extrabold text-gray-900 dark:text-white">{rating.reviewer?.name || 'Anonymous'}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(rating.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="bg-amber-50 px-2 py-1 rounded-lg">
                        <StarDisplay rating={rating.stars} />
                      </div>
                    </div>
                    
                    {rating.ride && (
                      <div className="bg-gray-50 dark:bg-gray-900/40 px-4 py-2 rounded-xl inline-block mb-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          Ride: {rating.ride.origin} → {rating.ride.destination}
                        </p>
                      </div>
                    )}
                    
                    {rating.comment && (
                      <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed relative">
                        <span className="absolute -left-2 top-0 text-blue-100 dark:text-blue-900/30 text-4xl">"</span>
                        {rating.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
         </div>

         {/* Sidebar Stats/Badges */}
         <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 p-8 sticky top-10">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">User Badges</h3>
               <div className="space-y-4">
                  <BadgeItem 
                    icon="🎖️" 
                    title="Early Adopter" 
                    desc={`Joined in ${new Date(userProfile.createdAt).getFullYear()}`} 
                    active={true}
                  />
                  <BadgeItem 
                    icon="⭐" 
                    title="Top Rated" 
                    desc="Consistently high ratings" 
                    active={userProfile.avgRating >= 4.5}
                  />
                  <BadgeItem 
                    icon="✅" 
                    title="Identity Verified" 
                    desc="Email & Phone confirmed" 
                    active={true}
                  />
                  <BadgeItem 
                    icon="🚀" 
                    title="Fast Responder" 
                    desc="Replies within minutes" 
                    active={userProfile.totalRatings > 5}
                  />
               </div>
            </div>
         </div>
      </div>

      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        reportedUserId={id} 
      />
    </div>
  );
}

// Helper Components
const BadgeItem = ({ icon, title, desc, active }) => (
  <div className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
    <span className="text-3xl">{icon}</span>
    <div>
      <p className="font-extrabold text-sm text-gray-900 dark:text-white">{title}</p>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{desc}</p>
    </div>
  </div>
);

export default UserProfile;

