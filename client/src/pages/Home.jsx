import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 dark:bg-gray-900 overflow-x-hidden pb-12">
      {/* Navbar Overrides (if needed) - we'll keep the global navbar for true routing, but add page-level styling */}
      
      {/* 1. Hero Section - Premium Startup Redesign */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
            alt="Premium Carpooling" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900 dark:to-black"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
            <span className="text-sm font-medium text-blue-100 uppercase tracking-wider">Trusted by 50,000+ Commuters</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            Move Smarter. <br/>
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Share Together.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            The premium carpooling experience for modern professionals. Save fuel, reduce emissions, and enjoy the ride.
          </p>
          
          {/* Search Form - Glassmorphism Card */}
          <div className="w-full max-w-5xl bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-[2.5rem] p-4 md:p-6 shadow-2xl border border-white/20 animate-slide-up">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 w-full relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none group-focus-within:text-blue-400 transition-colors">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Where from?" 
                  className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/10 rounded-3xl text-white placeholder-gray-400 focus:bg-white/20 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all text-lg" 
                  value={searchData.from} 
                  onChange={(e) => setSearchData({...searchData, from: e.target.value})} 
                />
              </div>

              <div className="hidden lg:flex items-center text-white/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>

              <div className="flex-1 w-full relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none group-focus-within:text-emerald-400 transition-colors">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/10 rounded-3xl text-white placeholder-gray-400 focus:bg-white/20 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 outline-none transition-all text-lg" 
                  value={searchData.to} 
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})} 
                />
              </div>

              <div className="w-full lg:w-48 relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none group-focus-within:text-blue-400 transition-colors">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <input 
                  type="date" 
                  className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/10 rounded-3xl text-white focus:bg-white/20 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-lg appearance-none cursor-pointer" 
                  value={searchData.date} 
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})} 
                />
              </div>

              <button 
                type="submit" 
                className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 px-10 rounded-3xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg"
              >
                Search Rides
              </button>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-all cursor-default group">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-400/50 group-hover:bg-white/10 transition-all">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <span className="font-medium tracking-wide">Verified Drivers</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-all cursor-default group">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-400/50 group-hover:bg-white/10 transition-all">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <span className="font-medium tracking-wide">Secure Trips</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-all cursor-default group">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-400/50 group-hover:bg-white/10 transition-all">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <span className="font-medium tracking-wide">Save Costs</span>
            </div>
          </div>
        </div>

        {/* Decorative Blur Orbs */}
        <div className="absolute top-[20%] -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] -right-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      <section className="w-full bg-white dark:bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why choose GoTogether</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">The smarter way to navigate your daily commute.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/40 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Unmatched Safety</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Every member undergoes a multi-step identity verification process. Review community ratings and ride with total peace of mind.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/40 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Eco-Friendly</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Reduce carbon emissions by filling empty seats. Join the movement toward sustainable, collaborative urban mobility.
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6 lg:gap-8 justify-center">
              <div className="rounded-3xl overflow-hidden shadow-lg h-64 md:h-72">
                <img src="/images/phone_safety_check_1778212275892.png" alt="Safety Check" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg h-64 md:h-72">
                <img src="/images/tablet_calendar_desk_1778212398183.png" alt="Flexible Scheduling" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 dark:bg-green-900/40 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Cut Costs</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Split fuel and parking costs with fellow travelers. Save up to 70% on your monthly commute expenses compared to driving alone.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 dark:bg-purple-900/40 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Flexible Scheduling</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Find rides that fit your timeline. Whether it's a daily commute or a one-time long-distance trip, we've got you covered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How it works */}
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-16">Three simple steps to start sharing.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-600/30 ring-8 ring-white dark:ring-gray-900">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Find or Post</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">Search for a ride to your destination or offer seats in your own car to others going your way.</p>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-600/30 ring-8 ring-white dark:ring-gray-900">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Connect</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">Message verified members through our secure platform to discuss pickup points and split costs.</p>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-600/30 ring-8 ring-white dark:ring-gray-900">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ride & Save</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">Meet at the agreed time, enjoy a comfortable trip, and settle payments effortlessly via the app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Routes */}
      <section className="w-full bg-white dark:bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Popular routes</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Join frequent rides between these top destinations.</p>
            </div>
            <Link to="/search" className="text-blue-600 dark:text-blue-400 font-medium hover:underline mt-4 md:mt-0 flex items-center">
              View all routes <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Route 1 */}
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700">
              <div className="h-48 overflow-hidden relative">
                <img src="/images/route_sf_palo_alto_1778212481344.png" alt="San Francisco to Palo Alto" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full dark:bg-green-900/80 dark:text-green-300 backdrop-blur-sm">Daily</div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1 flex items-center">SF <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Palo Alto</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">From $8.00 per seat</p>
              </div>
            </div>

            {/* Route 2 */}
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700">
              <div className="h-48 overflow-hidden relative">
                <img src="/images/route_nyc_boston_1778212500830.png" alt="New York to Boston" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full dark:bg-blue-900/80 dark:text-blue-300 backdrop-blur-sm">Weekend</div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1 flex items-center">NYC <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Boston</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">From $35.00 per seat</p>
              </div>
            </div>

            {/* Route 3 */}
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1531218150217-5afc461871a1?auto=format&fit=crop&q=80&w=600" alt="Austin to Dallas" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full dark:bg-green-900/80 dark:text-green-300 backdrop-blur-sm">Daily</div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1 flex items-center">Austin <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Dallas</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">From $15.00 per seat</p>
              </div>
            </div>

            {/* Route 4 */}
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600" alt="London to Oxford" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full dark:bg-purple-900/80 dark:text-purple-300 backdrop-blur-sm">Commute</div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1 flex items-center">London <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Oxford</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">From $12.00 per seat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-600 rounded-3xl overflow-hidden relative shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          </div>
          
          <div className="relative px-6 py-16 md:py-24 text-center z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start saving?</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join our community of over 50,000 riders today and transform the way you travel.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none">
              <Link to="/search" className="w-full sm:w-auto bg-white text-blue-600 font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Find a Ride
              </Link>
              <Link to="/post-ride" className="w-full sm:w-auto bg-transparent text-white font-bold py-3.5 px-8 rounded-xl border-2 border-white hover:bg-white/10 transition-all duration-300">
                Offer a Ride
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;

