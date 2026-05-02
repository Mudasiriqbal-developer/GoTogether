import React from 'react';
import { Link } from 'react-router-dom';

function RideCard({ ride }) {
  const dateObj = new Date(ride.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center bg-white dark:bg-gray-800 gap-4 hover:shadow-md transition-shadow">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 capitalize">
            {ride.vehicleType}
          </span>
          <span className="text-sm text-gray-500">
            {ride.genderPreference !== 'any' ? `${ride.genderPreference} only` : 'Any gender'}
          </span>
        </div>
        <p className="font-bold text-lg text-gray-900 dark:text-white">
          {ride.origin} → {ride.destination}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {formattedDate} at {ride.time} • {ride.seatsAvailable} {ride.seatsAvailable === 1 ? 'seat' : 'seats'} left
        </p>
        
        {ride.driver && (
          <div className="flex items-center gap-2 mt-3">
            {ride.driver.profilePhoto ? (
              <img src={ride.driver.profilePhoto === 'default.jpg' ? '/default-avatar.png' : ride.driver.profilePhoto} alt="Driver" className="w-8 h-8 rounded-full object-cover bg-gray-200" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-600">
                {ride.driver.name?.charAt(0)}
              </div>
            )}
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1">
                <Link to={`/user/${ride.driver._id}`} className="hover:underline">{ride.driver.name}</Link>
                {ride.driver.avgRating >= 4 && ride.driver.totalRatings >= 3 && (
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded" title="Verified Driver">
                    ✓ Verified
                  </span>
                )}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                ★ {ride.driver.avgRating?.toFixed(1) || 'New'} ({ride.driver.totalRatings || 0})
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="sm:text-right flex justify-between sm:flex-col items-center sm:items-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-200 dark:border-gray-700">
        <div>
          <p className="font-bold text-xl text-blue-600 dark:text-blue-400">PKR {ride.costPerSeat}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">per seat</p>
        </div>
        <Link 
          to={`/ride/${ride._id}`} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors text-center"
        >
          View & Book
        </Link>
      </div>
    </div>
  );
}

export default RideCard;
