import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [photoPreview, setPhotoPreview] = useState(user?.profilePhoto || null);
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [rideHistory, setRideHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/rides/my-rides');
        setRideHistory(res.data.data.slice(0, 2)); // Just show recent 2 for the profile preview
      } catch (err) {
        console.error('Failed to fetch ride history');
      }
    };
    if (user) fetchHistory();
  }, [user]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('profilePhoto', file);

      const res = await api.put('/users/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPhotoPreview(res.data.data.profilePhoto);
      toast.success('Profile photo uploaded successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/users/profile', { name, phone });
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const sidebarItems = [
    { name: 'Personal Info', icon: '👤' },
    { name: 'My Vehicles', icon: '🚗' },
    { name: 'Ride History', icon: '⏱' },
    { name: 'Payments', icon: '💳' },
    { name: 'Privacy', icon: '🛡' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Account Settings</h3>
              <nav className="flex flex-col gap-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeTab === item.name
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="px-6 pb-6 mt-4">
              <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                <Link to="/post-ride" className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all shadow-md">
                  Post New Ride
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Header Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 relative overflow-hidden">
             {/* Decorative Background Shape */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -mr-8 -mt-8"></div>
             
             <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden bg-gray-100">
                    {photoPreview && photoPreview !== 'default.jpg' ? (
                      <img src={photoPreview} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-blue-600">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-1 right-1 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform border border-gray-100 dark:border-gray-700">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" disabled={uploadingPhoto} />
                  </label>
                  {user.isVerified && (
                    <div className="absolute top-0 right-0 bg-green-500 p-1.5 rounded-full border-2 border-white dark:border-gray-700">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{user.name}</h1>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Verified Member
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <span className="text-blue-600 font-bold">★ {user.avgRating?.toFixed(1) || '0.0'}</span>
                      <span>({user.totalRatings || 0} reviews)</span>
                    </div>
                    <span>•</span>
                    <span>Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 max-w-xl text-sm leading-relaxed">
                    Enjoying sharing journeys and great conversations about tech and urban planning.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 rounded-xl transition-all border border-gray-100 dark:border-gray-600">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </button>
                  <button className="p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 rounded-xl transition-all border border-gray-100 dark:border-gray-600">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                  </button>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Column - Forms and Lists */}
            <div className="md:col-span-2 flex flex-col gap-6">
              
              {/* Personal Information Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                  <button className="text-blue-600 font-bold text-sm hover:underline" onClick={handleSaveProfile}>Update</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                    <p className="text-gray-900 dark:text-white font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-gray-900 dark:text-white font-medium bg-transparent border-none p-0 focus:ring-0 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Preferred Language</label>
                    <p className="text-gray-900 dark:text-white font-medium">English, Urdu</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                    <p className="text-gray-900 dark:text-white font-medium">Pakistan</p>
                  </div>
                </div>
              </div>

              {/* My Vehicles Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Vehicles</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm">+ Add Vehicle</button>
                </div>

                <div className="flex items-center gap-4 p-4 border border-gray-100 dark:border-gray-700 rounded-2xl">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl">🚗</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white">Honda Civic (2022)</h4>
                    <p className="text-xs text-gray-500">White • Plate: ABC-123</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">Primary</span>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                  </button>
                </div>
              </div>

               {/* Recent Ride History Card */}
               <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Ride History</h2>
                  <Link to="/my-rides" className="text-blue-600 font-bold text-sm hover:underline">View All</Link>
                </div>

                <div className="space-y-6">
                  {rideHistory.length > 0 ? (
                    rideHistory.map(ride => (
                      <div key={ride._id} className="flex items-center gap-6 pb-6 border-b border-gray-50 dark:border-gray-700 last:border-0 last:pb-0">
                        <div className="text-center min-w-[50px]">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(ride.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                          <p className="text-xl font-extrabold text-gray-900 dark:text-white">{new Date(ride.date).getDate()}</p>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">{ride.origin} → {ride.destination}</h4>
                          <p className="text-xs text-gray-500 capitalize">{ride.role || 'Driver'} • {ride.vehicleInfo || 'Sedan'}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest mb-1 inline-block">Completed</span>
                          <p className="text-sm font-extrabold text-gray-900 dark:text-white">PKR {ride.costPerSeat || ride.price}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4">No recent rides found.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column - Stats and Verification */}
            <div className="flex flex-col gap-6">
              
              {/* Trust & Verification Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Trust & Verification</h2>
                <div className="space-y-4 mb-8">
                  {[
                    { label: 'Identity Verified', checked: true },
                    { label: 'Email Confirmed', checked: true },
                    { label: 'Phone Confirmed', checked: phone ? true : false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.checked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 border border-blue-600 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors">
                  View Documents
                </button>
              </div>

              {/* Quick Stats Card */}
              <div className="bg-blue-600 rounded-3xl shadow-lg p-8 text-white relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-tl-full -mr-12 -mb-12"></div>
                
                <h2 className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-8">Quick Stats</h2>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-3xl font-extrabold mb-1">42</p>
                    <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">Rides Shared</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold mb-1">156</p>
                    <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">Seats Filled</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold mb-1">1.2k</p>
                    <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">CO2 Saved (kg)</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold mb-1">98%</p>
                    <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">Reliability</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

