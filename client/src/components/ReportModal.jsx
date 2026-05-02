import React, { useState } from 'react';
import api from '../utils/api';

function ReportModal({ isOpen, onClose, reportedUserId, rideId }) {
  const [reason, setReason] = useState('Fake profile');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/reports', {
        reportedUser: reportedUserId,
        ride: rideId,
        reason
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit report');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold mb-4 text-red-600">Report User</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">Report submitted successfully.</div>}
        
        {!success && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Reason for reporting</label>
              <select 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded-lg p-3 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="Fake profile">Fake profile</option>
                <option value="Inappropriate behavior">Inappropriate behavior</option>
                <option value="No show">No show</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Your report is completely anonymous. Our trust and safety team will review this incident.
            </p>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ReportModal;
