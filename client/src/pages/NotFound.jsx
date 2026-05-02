import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white mb-4 drop-shadow-lg">404</h1>
        <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Page Not Found</h2>
        <p className="text-xl text-white mb-8 drop-shadow-lg">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-white opacity-80 drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition transform hover:-translate-y-1 shadow-lg"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition transform hover:-translate-y-1 shadow-lg"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/search')}
            className="px-8 py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition transform hover:-translate-y-1 shadow-lg"
          >
            Search Rides
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
