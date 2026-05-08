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
      
      {/* 1. Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-20 md:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            Save Fuel. Share Rides. <br className="hidden md:block"/>
            <span className="text-blue-600">Travel Smarter.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl">
            Join thousands of verified commuters reducing their carbon footprint and travel costs. RideToShare makes carpooling safe, easy, and efficient for everyone.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-xl flex flex-col md:flex-row gap-3 items-center border border-gray-100 dark:border-gray-700">
            <div className="flex-1 w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <input type="text" placeholder="City or Site" className="w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" value={searchData.from} onChange={(e) => setSearchData({...searchData, from: e.target.value})} />
            </div>
            <div className="hidden md:flex items-center text-gray-300 dark:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <input type="text" placeholder="Destination" className="w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" value={searchData.to} onChange={(e) => setSearchData({...searchData, to: e.target.value})} />
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <input type="date" className="w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-400 focus:text-gray-900 dark:focus:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" value={searchData.date} onChange={(e) => setSearchData({...searchData, date: e.target.value})} />
            </div>
            <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              Search
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-10 lg:mt-0">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <img src="/images/hero_car_illustration_1778212257445.png" alt="Travel Smarter" className="w-full h-full object-cover" />
            
            {/* Floating Safety Badge */}
            <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Verified Drivers</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Safety is our priority</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why choose RideToShare */}
      <section className="w-full bg-white dark:bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why choose RideToShare</h2>
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

      {/* 6. Footer (Page Specific Footer integration to match design exactly) */}
      {/* We add it inside Home.jsx to keep App.jsx untouched as requested */}
      <section className="w-full bg-gray-100 dark:bg-gray-800 pt-16 pb-8 mt-12 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 inline-block">
                RideToShare
              </Link>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                Connecting people for a more sustainable and affordable way to travel.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm transition-colors">About Us</Link></li>
                <li><Link to="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm transition-colors">Safety</Link></li>
                <li><Link to="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm transition-colors">Help Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Newsletter</h4>
              <div className="flex bg-white dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 p-1">
                <input type="email" placeholder="Email" className="flex-1 px-3 py-2 bg-transparent text-sm outline-none text-gray-900 dark:text-white" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} RideToShare Inc. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons Placeholders */}
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
