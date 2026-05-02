import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
