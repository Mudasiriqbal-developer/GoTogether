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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">Find a Ride</h1>
        <p className="text-gray-500 dark:text-gray-400">Search thousands of verified rides and find your perfect travel partner.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-12 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full -mr-20 -mt-20 pointer-events-none"></div>

        <form onSubmit={onSubmit} className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">From</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">📍</span>
                <input type="text" name="origin" value={searchParams.origin} onChange={onChange} placeholder="City or landmark" className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 pl-12 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">To</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">🏁</span>
                <input type="text" name="destination" value={searchParams.destination} onChange={onChange} placeholder="Destination" className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 pl-12 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Date</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">📅</span>
                <input type="date" name="date" value={searchParams.date} onChange={onChange} className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 pl-12 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Vehicle Type</label>
              <select name="vehicleType" value={searchParams.vehicleType} onChange={onChange} className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all">
                <option value="">Any Vehicle</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Max Budget</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-xs">PKR</span>
                <input type="number" name="maxCost" value={searchParams.maxCost} onChange={onChange} placeholder="Price limit" className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 pl-12 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Gender Preference</label>
              <select name="genderPreference" value={searchParams.genderPreference} onChange={onChange} className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all">
                <option value="">No Preference</option>
                <option value="any">Mixed (Any)</option>
                <option value="male">Male Only</option>
                <option value="female">Female Only</option>
              </select>
            </div>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-105">
            Search Rides
          </button>
        </form>
      </div>

      <div className="mb-8 flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Available Rides</h3>
          <p className="text-gray-500 text-sm mt-1">We found {rides.length} {rides.length === 1 ? 'ride' : 'rides'} for you.</p>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 mb-8 font-bold">{error}</div>}

      {loading ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-gray-500 font-bold uppercase tracking-widest text-xs">Hunting for rides...</p>
        </div>
      ) : rides.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="text-6xl mb-6 block">🔍</span>
          <p className="text-gray-900 dark:text-white text-xl font-bold mb-2">No rides found matching your criteria.</p>
          <p className="text-gray-500 mb-8">Try adjusting your filters or search for another date.</p>
          <button onClick={() => { setSearchParams({origin:'',destination:'',date:'',vehicleType:'',maxCost:'',genderPreference:''}); fetchRides('?status=active'); }} className="text-blue-600 font-bold hover:underline">Clear all filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {rides.map(ride => (
            <RideCard key={ride._id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchRides;

