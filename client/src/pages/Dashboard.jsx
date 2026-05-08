import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [driverStats, setDriverStats] = useState(null);
  const [passengerStats, setPassengerStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user?.role === 'Driver' || user?.role === 'Both') {
          const driverRes = await api.get('/dashboard/driver');
          setDriverStats(driverRes.data.data);
        }

        if (user?.role === 'Passenger' || user?.role === 'Both') {
          const passengerRes = await api.get('/dashboard/passenger');
          setPassengerStats(passengerRes.data.data);
        }
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0E14] pb-20">
      
      {/* 1. Minimal Header */}
      <div className="bg-white dark:bg-[#111827] border-b border-gray-100 dark:border-gray-800 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-black text-xl shadow-xl">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                   <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Hi, {user?.name?.split(' ')[0]}</h1>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{user?.role} Account</p>
                </div>
              </div>
              <p className="text-gray-500 font-medium max-w-lg">Manage your rides, track your earnings, and explore new journeys in Peshawar.</p>
            </div>
            <div className="flex gap-4">
               <button 
                 onClick={() => navigate('/post-ride')}
                 className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-black text-sm rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
               >
                 Offer a Ride
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8">
        
        {/* 2. Driver Insights */}
        {(user?.role === 'Driver' || user?.role === 'Both') && driverStats && (
          <div className="mb-12">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              Driver Insights <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Posted" value={driverStats.totalRidesPosted} unit="Rides" />
              <StatCard label="Passengers" value={driverStats.totalPassengersCarried} unit="Total" />
              <StatCard label="Earnings" value={driverStats.totalEarnings} unit="PKR" isCurrency />
              <StatCard label="Rating" value={driverStats.avgRating?.toFixed(1)} unit="★" />
            </div>
            <div className="mt-6 flex gap-3">
               <ActionTile onClick={() => navigate('/my-rides')} label="My Rides" icon="🚗" />
               <ActionTile onClick={() => navigate('/ride-requests')} label="Requests" icon="📨" />
            </div>
          </div>
        )}

        {/* 3. Passenger Activity */}
        {(user?.role === 'Passenger' || user?.role === 'Both') && passengerStats && (
          <div className="mb-12">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              Passenger Activity <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard label="Trips" value={passengerStats.totalRidesTaken} unit="Completed" />
              <StatCard label="Spent" value={passengerStats.totalSpent} unit="PKR" isCurrency />
              <StatCard label="Favorite" value={passengerStats.favouriteRoute || 'N/A'} unit="Route" />
            </div>
            <div className="mt-6 flex gap-3">
               <ActionTile onClick={() => navigate('/search')} label="Find Ride" icon="🔍" />
               <ActionTile onClick={() => navigate('/my-bookings')} label="Bookings" icon="🎫" />
            </div>
          </div>
        )}

        {/* 4. Service Shortcuts */}
        <div>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Shortcuts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard 
              title="Identity" 
              desc="Verify your account to build trust in the community." 
              icon="🛡️" 
              onClick={() => navigate('/profile')} 
            />
            <ServiceCard 
              title="Wallet" 
              desc="Withdraw your earnings or top up your balance." 
              icon="💳" 
              onClick={() => {}} 
            />
            <ServiceCard 
              title="Support" 
              desc="Need help? Our team is available 24/7." 
              icon="🎧" 
              onClick={() => {}} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal Components
const StatCard = ({ label, value, unit, isCurrency }) => (
  <div className="bg-white dark:bg-[#151921] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all">
    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
        {isCurrency ? value?.toLocaleString() : value}
      </span>
      <span className="text-sm font-bold text-gray-400">{unit}</span>
    </div>
  </div>
);

const ActionTile = ({ onClick, label, icon }) => (
  <button
    onClick={onClick}
    className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-white dark:bg-[#151921] text-gray-900 dark:text-white rounded-2xl border border-gray-100 dark:border-gray-800 font-black text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
  >
    <span className="text-lg">{icon}</span>
    {label}
  </button>
);

const ServiceCard = ({ title, desc, icon, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white dark:bg-[#151921] p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
  >
    <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-500 font-medium text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Dashboard;


