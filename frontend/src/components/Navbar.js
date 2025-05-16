// frontend/src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { authenticated, user, handleLogout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-900 dark:to-gray-800 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo and App Name */}
      <Link 
        to="/" 
        className="text-2xl font-bold hover:text-blue-100 dark:hover:text-gray-200 transition-colors duration-200 flex items-center gap-2"
      >
        <span className="text-2xl">🌍</span>
        <span className="inline">Explore Sphere</span>
      </Link>

      {/* Desktop Links & Buttons */}
      <div className="flex items-center gap-4">
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/home" 
            className="hover:text-blue-100 dark:hover:text-gray-200 transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          {authenticated && (
            <Link 
              to="/favorites" 
              className="hover:text-blue-100 dark:hover:text-gray-200 transition-colors duration-200 font-medium"
            >
              Favorites
            </Link>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-gray-700 text-yellow-500 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm0 15a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm8-5a1 1 0 011 1h1a1 1 0 01-2 0zm-15 0a1 1 0 011-1h1a1 1 0 01-2 0zm14.364-5.364a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zm-12.728 0a1 1 0 011.414-1.414l.707.707a1 1 0 01-1.414 1.414l-.707-.707zM18 12a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="md:hidden p-2 rounded focus:outline-none"
          aria-label="Toggle mobile navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* User Avatar and Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 hover:text-blue-100 dark:hover:text-gray-200 transition-colors duration-200 focus:outline-none"
            aria-label="User menu"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${user?.username || 'U'}&background=random`}
              alt="profile"
              className="w-9 h-9 rounded-full border-2 border-blue-200 hover:border-blue-100 transition-all duration-200"
            />
            <span className="hidden sm:inline font-medium">
              {user?.username || 'User'}
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-200">
              {authenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150 border-b border-gray-100 dark:border-gray-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150 text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150 border-b border-gray-100 dark:border-gray-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150 font-medium text-blue-600 dark:text-indigo-400"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileNavOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white md:hidden shadow-md z-40">
          <Link
            to="/home"
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMobileNavOpen(false)}
          >
            Home
          </Link>
          {authenticated && (
            <Link
              to="/favorites"
              className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileNavOpen(false)}
            >
              Favorites
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;