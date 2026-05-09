import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-100/50 dark:border-gray-800/50 py-3' 
        : 'bg-white dark:bg-gray-900 py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 group-hover:scale-110 transition-transform duration-300">
             <img src="/logo.svg" alt="RideToShare Logo" className="w-full h-full object-contain shadow-xl shadow-blue-600/20 rounded-xl" />
          </div>
          <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter italic">RideToShare</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/search" label="Find Ride" />
            <NavLink to="/post-ride" label="Offer Ride" />
          </div>
          
          <div className="h-6 w-px bg-gray-100 dark:bg-gray-800"></div>

          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <div className="relative group">
                <button className="flex items-center gap-3 focus:outline-none bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs border border-white/20 shadow-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200 hidden lg:block">{user?.name?.split(' ')[0]}</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-[1.5rem] shadow-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110] border border-gray-100 dark:border-gray-700">
                  <div className="px-5 py-3 border-b border-gray-50 dark:border-gray-700 mb-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Status</p>
                    <p className="text-sm font-black text-blue-600 uppercase tracking-tighter italic">Verified Member</p>
                  </div>
                  <DropdownLink to="/dashboard" label="Dashboard" icon="📊" />
                  <DropdownLink to="/profile" label="My Profile" icon="👤" />
                  <DropdownLink to="/my-rides" label="My Rides" icon="🚗" />
                  <DropdownLink to="/my-bookings" label="My Bookings" icon="🎫" />
                  <div className="h-px bg-gray-50 dark:bg-gray-700 my-2 mx-5"></div>
                  <button onClick={handleLogout} className="w-full text-left px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-3">
                    <span className="w-6 text-center">👋</span> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Log In</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                Join Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-2xl border-t border-gray-100 dark:border-gray-800 py-6 px-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white py-2">Home</Link>
          <Link to="/search" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white py-2">Find Ride</Link>
          <Link to="/post-ride" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white py-2">Offer Ride</Link>
          
          <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
          
          <div className="py-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Appearance</p>
            <ThemeToggle />
          </div>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white py-2">Dashboard</Link>
              <button onClick={handleLogout} className="text-lg font-bold text-red-500 py-2 text-left">Logout</button>
            </>
          ) : (
            <div className="flex flex-col gap-4 pt-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center text-gray-900 dark:text-white font-bold bg-gray-50 dark:bg-gray-800 rounded-2xl">Log In</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center text-white font-black bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/20">Join Now</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

// Helper Components
const NavLink = ({ to, label }) => (
  <Link to={to} className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors relative group">
    {label}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
  </Link>
);

const DropdownLink = ({ to, label, icon }) => (
  <Link to={to} className="block px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all flex items-center gap-3">
    <span className="w-6 text-center">{icon}</span> {label}
  </Link>
);

export default Navbar;
