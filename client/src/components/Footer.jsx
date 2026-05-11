import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-50 dark:border-gray-800 pt-20 pb-10 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                 <img src="/logo.svg" alt="GoTogether Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter italic">GoTogether</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Empowering the world to share journeys. Reduce costs, meet new people, and travel sustainably with the leading carpooling platform.
            </p>
            <div className="flex gap-3">
               <SocialLink icon="fb" />
               <SocialLink icon="tw" />
               <SocialLink icon="ig" />
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest mb-8">Platform</h4>
            <ul className="space-y-4">
              <FooterLink to="/search" label="Find a Ride" />
              <FooterLink to="/post-ride" label="Offer a Ride" />
              <FooterLink to="/dashboard" label="User Dashboard" />
              <FooterLink to="/safety" label="Safety Center" />
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest mb-8">About</h4>
            <ul className="space-y-4">
              <FooterLink to="/about" label="Our Story" />
              <FooterLink to="/how-it-works" label="How it Works" />
              <FooterLink to="/careers" label="Careers" />
              <FooterLink to="/contact" label="Contact Us" />
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest mb-8">Newsletter</h4>
            <p className="text-xs text-gray-500 mb-4 font-medium">Get the latest travel tips and ride updates.</p>
            <div className="relative group">
               <input 
                 type="email" 
                 placeholder="Email address" 
                 className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 pl-5 pr-12 text-xs font-bold focus:ring-2 focus:ring-blue-500/20 transition-all"
               />
               <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-3 rounded-xl hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
               </button>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-gray-50 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} GoTogether Platform
          </p>
          <div className="flex gap-8">
            <Link to="/terms" className="text-[10px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Terms</Link>
            <Link to="/privacy" className="text-[10px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-[10px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
const FooterLink = ({ to, label }) => (
  <li>
    <Link to={to} className="text-sm font-bold text-gray-500 hover:text-blue-600 dark:text-gray-400 transition-all hover:translate-x-1 inline-block">
      {label}
    </Link>
  </li>
);

const SocialLink = ({ icon }) => (
  <button className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
     {icon === 'fb' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>}
     {icon === 'tw' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>}
     {icon === 'ig' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>}
  </button>
);

export default Footer;

