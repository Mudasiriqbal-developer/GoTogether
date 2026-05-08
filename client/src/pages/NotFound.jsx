import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700 p-12 md:p-20 text-center relative overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full -mr-16 -mt-16 z-0"></div>
        
        <div className="relative z-10">
          <span className="text-8xl md:text-9xl font-black text-blue-600 mb-6 block tracking-tighter animate-bounce">404</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Oops! Journey Interrupted.</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-md mx-auto">
            The page you're looking for has taken a different route. Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-10 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-bold rounded-2xl transition-all transform active:scale-95"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all transform active:scale-95"
            >
              Back to Home
            </button>
          </div>
          
          <div className="mt-12 pt-12 border-t border-gray-50 dark:border-gray-700">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Maybe try searching for a ride?</p>
             <button 
               onClick={() => navigate('/search')}
               className="text-blue-600 font-extrabold hover:underline flex items-center gap-2 mx-auto"
             >
               🔍 Search Available Rides
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

