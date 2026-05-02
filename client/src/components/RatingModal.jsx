import React, { useState } from 'react';
import api from '../utils/api';

function RatingModal({ isOpen, onClose, revieweeId, rideId, bookingId, onRatingSubmitted }) {
  const [stars, setStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stars === 0) {
      setError('Please select a star rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/ratings', {
        reviewee: revieweeId,
        ride: rideId,
        booking: bookingId,
        stars,
        comment
      });
      onRatingSubmitted();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit rating');
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
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Leave a Review</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex justify-center">
            <div className="flex gap-1 text-4xl cursor-pointer">
              {[1, 2, 3, 4, 5].map((num) => (
                <span 
                  key={num}
                  className={num <= (hoveredStars || stars) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}
                  onMouseEnter={() => setHoveredStars(num)}
                  onMouseLeave={() => setHoveredStars(0)}
                  onClick={() => setStars(num)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Comment (Optional)</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600"
              rows="4"
              placeholder="How was your experience?"
            ></textarea>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RatingModal;
