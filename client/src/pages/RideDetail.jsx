import React from 'react';
import { useParams } from 'react-router-dom';

function RideDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">Ride Details (ID: {id})</h1>
      <p className="text-gray-500 mb-6">Posted 2 hours ago</p>

      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Lahore to Islamabad</h2>
            <p className="text-gray-600">Friday, Oct 25 at 10:00 AM</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">PKR 1500</p>
            <p className="text-sm text-gray-500">per seat</p>
          </div>
        </div>
        <p className="font-medium text-green-600">3 seats available</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Driver Information</h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div>
            <p className="font-bold">Ali Khan</p>
            <p className="text-sm text-gray-500">4.8 ★ (12 rides)</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded text-lg">
        Book a Seat
      </button>
    </div>
  );
}

export default RideDetail;
