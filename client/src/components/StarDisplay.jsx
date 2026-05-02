import React from 'react';

function StarDisplay({ rating, totalRatings }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {halfStar && <span>☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">★</span>
      ))}
      {totalRatings !== undefined && (
        <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({totalRatings})</span>
      )}
    </div>
  );
}

export default StarDisplay;
