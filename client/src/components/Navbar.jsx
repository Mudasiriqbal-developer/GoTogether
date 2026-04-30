import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm py-4 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" onClick={closeMenu} className="text-xl font-bold text-blue-600 dark:text-blue-400">
          RideShare PK
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Find a Ride</Link>
          <Link to="/post-ride" className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Post a Ride</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Dashboard</Link>
              <div className="relative group">
                <button className="flex items-center space-x-1 focus:outline-none dark:text-gray-200">
                  <span>{user?.name || 'Profile'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 hidden group-hover:block z-50 border border-gray-100 dark:border-gray-600">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">My Profile</Link>
                  <Link to="/my-rides" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">My Rides</Link>
                  <Link to="/my-bookings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">My Bookings</Link>
                  <Link to="/ride-requests" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Ride Requests</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md border-t border-gray-200 dark:border-gray-700 py-2 flex flex-col">
          <Link to="/search" onClick={closeMenu} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">Find a Ride</Link>
          <Link to="/post-ride" onClick={closeMenu} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">Post a Ride</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">Dashboard</Link>
              <Link to="/profile" onClick={closeMenu} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">My Profile</Link>
              <Link to="/my-rides" onClick={closeMenu} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">My Rides</Link>
              <Link to="/my-bookings" onClick={closeMenu} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">My Bookings</Link>
              <Link to="/ride-requests" onClick={closeMenu} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">Ride Requests</Link>
              <button onClick={handleLogout} className="px-4 py-3 text-left text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">Login</Link>
              <Link to="/register" onClick={closeMenu} className="px-4 py-3 text-blue-600 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
