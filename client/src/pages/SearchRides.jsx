import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import RideCard from '../components/RideCard';

function SearchRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
    vehicleType: '',
    maxCost: '',
    genderPreference: ''
  });

  const fetchRides = async (query = '') => {
    setLoading(true);
    try {
      const res = await api.get(`/rides${query}`);
      setRides(res.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch rides');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRides('?status=active');
  }, []);

  const onChange = e => setSearchParams({ ...searchParams, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append('status', 'active');
    
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key]) {
        params.append(key, searchParams[key]);
      }
    });

    fetchRides(`?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Find a Ride</h2>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input type="text" name="origin" value={searchParams.origin} onChange={onChange} placeholder="Leaving from" className="w-full border rounded p-3 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600" />
            <input type="text" name="destination" value={searchParams.destination} onChange={onChange} placeholder="Going to" className="w-full border rounded p-3 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600" />
            <input type="date" name="date" value={searchParams.date} onChange={onChange} className="w-full border rounded p-3 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <select name="vehicleType" value={searchParams.vehicleType} onChange={onChange} className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 text-sm">
              <option value="">Any Vehicle</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
            <input type="number" name="maxCost" value={searchParams.maxCost} onChange={onChange} placeholder="Max Price (PKR)" className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 text-sm" />
            <select name="genderPreference" value={searchParams.genderPreference} onChange={onChange} className="w-full border rounded p-2 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 text-sm">
              <option value="">Any Gender Preference</option>
              <option value="any">Any (Mixed)</option>
              <option value="male">Male Only</option>
              <option value="female">Female Only</option>
            </select>
          </div>

          <button type="submit" className="w-full md:w-auto md:px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
            Search Rides
          </button>
        </form>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Available Rides</h3>
        <span className="text-gray-500 text-sm">{rides.length} {rides.length === 1 ? 'result' : 'results'}</span>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading rides...</p>
        </div>
      ) : rides.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No rides found matching your criteria.</p>
          <button onClick={() => { setSearchParams({origin:'',destination:'',date:'',vehicleType:'',maxCost:'',genderPreference:''}); fetchRides('?status=active'); }} className="mt-4 text-blue-600 hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="space-y-4">
          {rides.map(ride => (
            <RideCard key={ride._id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchRides;
