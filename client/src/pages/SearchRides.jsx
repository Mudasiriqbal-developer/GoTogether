import React from 'react';

function SearchRides() {
  return (
    <div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Find a Ride</h2>
        <form className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Leaving from" className="flex-1 border rounded p-2 text-gray-700" />
          <input type="text" placeholder="Going to" className="flex-1 border rounded p-2 text-gray-700" />
          <input type="date" className="border rounded p-2 text-gray-700" />
          <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold">
            Search
          </button>
        </form>
      </div>

      <h3 className="text-xl font-semibold mb-4">Available Rides</h3>
      <div className="space-y-4">
        {/* Placeholder Ride Card */}
        <div className="border border-gray-200 dark:border-gray-700 p-4 rounded flex flex-col sm:flex-row justify-between sm:items-center bg-white dark:bg-gray-800 gap-4">
          <div>
            <p className="font-bold text-lg">Lahore → Islamabad</p>
            <p className="text-gray-500 text-sm">Today at 10:00 AM • 3 seats left</p>
          </div>
          <div className="sm:text-right flex justify-between sm:block items-center">
            <p className="font-bold text-blue-600">PKR 1500</p>
            <a href="/ride/1" className="text-sm text-blue-500 hover:underline">View Details</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchRides;
