import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center py-10 md:py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600 dark:text-blue-400 leading-tight">Welcome to RideShare PK</h1>
      <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
        The most reliable and affordable ride-sharing platform in Pakistan. Share your journey, save money, and meet new people.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none">
        <Link to="/search" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300">
          Find a Ride
        </Link>
        <Link to="/post-ride" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg border border-blue-600 transition duration-300">
          Offer a Ride
        </Link>
      </div>
    </div>
  );
}

export default Home;
