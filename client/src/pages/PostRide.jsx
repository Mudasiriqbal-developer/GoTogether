import React from 'react';

function PostRide() {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Offer a Ride</h1>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Origin</label>
            <input type="text" className="w-full border rounded p-2 text-gray-700" placeholder="E.g., Lahore" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Destination</label>
            <input type="text" className="w-full border rounded p-2 text-gray-700" placeholder="E.g., Islamabad" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" className="w-full border rounded p-2 text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input type="time" className="w-full border rounded p-2 text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Available Seats</label>
            <input type="number" min="1" max="6" className="w-full border rounded p-2 text-gray-700" placeholder="3" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Price per Seat (PKR)</label>
          <input type="number" className="w-full border rounded p-2 text-gray-700" placeholder="1500" />
        </div>
        <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded">
          Post Ride
        </button>
      </form>
    </div>
  );
}

export default PostRide;
