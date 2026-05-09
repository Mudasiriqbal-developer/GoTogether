import React from 'react';
import { Link } from 'react-router-dom';

function RideCard({ ride }) {
  const dateObj = new Date(ride.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300 group">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        
        {/* Left Side: Time and Route */}
        <div className="flex gap-6 items-start flex-1">
          <div className="text-center min-w-[60px]">
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{ride.time}</p>
            <div className="w-0.5 h-10 bg-gray-100 dark:bg-gray-700 mx-auto my-1 relative transition-none">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-2 border-blue-600 bg-white dark:bg-gray-800 transition-none"></div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-600 transition-none"></div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formattedDate}</p>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
               <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                 {ride.vehicleType}
               </span>
               <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                 {ride.genderPreference === 'any' ? 'Mixed' : `${ride.genderPreference} Only`}
               </span>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-1">
              {ride.origin} → {ride.destination}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {ride.seatsAvailable} {ride.seatsAvailable === 1 ? 'seat' : 'seats'} available
            </p>
          </div>
        </div>

        {/* Right Side: Driver and Price */}
        <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:min-w-[150px] border-t md:border-t-0 pt-4 md:pt-0 border-gray-50 dark:border-gray-700">
          <div className="flex items-center md:flex-row-reverse gap-3">
             <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-600 shadow-sm overflow-hidden bg-gray-100 flex items-center justify-center font-bold text-blue-600">
                {ride.driver?.profilePhoto && ride.driver.profilePhoto !== 'default.jpg' ? (
                  <img src={ride.driver.profilePhoto} alt={ride.driver.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{ride.driver?.name?.charAt(0)}</span>
                )}
             </div>
             <div className="text-left md:text-right">
                <Link to={`/user/${ride.driver?._id}`} className="block text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                  {ride.driver?.name}
                </Link>
                <div className="flex items-center md:justify-end gap-1 text-xs text-yellow-500 font-bold">
                  ★ {ride.driver?.avgRating?.toFixed(1) || 'New'}
                </div>
             </div>
          </div>

          <div className="text-right">
             <p className="text-2xl font-black text-gray-900 dark:text-white">
               <span className="text-sm font-bold text-blue-600 mr-1">PKR</span>
               {ride.costPerSeat}
             </p>
             <Link 
               to={`/ride/${ride._id}`} 
               className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-xs font-bold shadow-md shadow-blue-600/10 transition-all hover:scale-105"
             >
               Book Now
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RideCard;

