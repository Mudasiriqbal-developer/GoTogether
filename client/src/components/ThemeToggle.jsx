import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const modes = [
    {
      id: 'light',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707.707" />
          <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      ),
      label: 'Light'
    },
    {
      id: 'dark',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      label: 'Dark'
    },
    {
      id: 'system',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'System'
    }
  ];

  const currentMode = modes.find(m => m.id === theme) || modes[2];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 shadow-sm group active:scale-95"
        title="Change theme"
      >
        <span className="group-hover:rotate-12 transition-transform duration-300">
          {resolvedTheme === 'dark' ? modes[1].icon : modes[0].icon}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl py-2 z-[110] border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-200">
          <div className="px-4 py-2 border-b border-gray-50 dark:border-gray-700 mb-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Appearance</p>
          </div>
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setTheme(mode.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold transition-all
                ${theme === mode.id 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }
              `}
            >
              <span className={theme === mode.id ? 'scale-110' : ''}>{mode.icon}</span>
              {mode.label}
              {theme === mode.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
