import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || 'default.jpg');
  const [photoPreview, setPhotoPreview] = useState(user?.profilePhoto || null);
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

      setProfilePhoto(res.data.data.profilePhoto);
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

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4 dark:border-gray-700">My Profile</h1>
      
      {/* Profile Photo Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Profile Photo</h3>
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-5xl font-bold overflow-hidden border-4 border-blue-600">
            {photoPreview && photoPreview !== 'default.jpg' ? (
              <img src={photoPreview} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-600 dark:text-gray-300">{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <label className="block mb-2">
              <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 inline-block">
                {uploadingPhoto ? 'Uploading...' : 'Choose Photo'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={uploadingPhoto}
              />
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Recommended: Square image, at least 200x200px
            </p>
          </div>
        </div>
      </div>

      {/* Account Details Section */}
      <form onSubmit={handleSaveProfile}>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Account Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded p-2 text-gray-700 dark:text-white focus:outline-none focus:border-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={user.email}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded p-2 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-600"
              disabled
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded p-2 text-gray-700 dark:text-white focus:outline-none focus:border-blue-600"
            required
          />
        </div>

        {/* User Info Display */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
              <p className="font-semibold text-gray-900 dark:text-white">{user.role}</p>
            </div>
            {user.role !== 'Passenger' && (
              <>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.avgRating?.toFixed(1)} ⭐</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Ratings</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.totalRatings || 0}</p>
                </div>
              </>
            )}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
              <p className="font-semibold text-green-600 dark:text-green-400">
                {user.isVerified ? '✓ Verified' : '○ Not Verified'}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || uploadingPhoto}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded transition duration-300"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default Profile;
