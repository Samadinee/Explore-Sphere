// frontend/src/pages/Favorites.js
import React, { useEffect, useState, useContext } from 'react';
import { getAllCountries } from '../services/countryService';
import { getFavorites } from '../services/authService';
import CountryCard from '../components/CountryCard';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Favorites = () => {
  const { authenticated, user } = useContext(AuthContext);
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [favCodes, allCountries] = await Promise.all([
        getFavorites(),
        getAllCountries()
      ]);
      
      setFavorites(favCodes);
      const favCountries = allCountries.filter(c => favCodes.includes(c.cca3));
      setCountries(favCountries);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setError('Failed to load favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadFavorites();
    }
  }, [authenticated, user]);

  return (
    <>
      {/* Embed custom Tailwind styles */}
      <style>
        {`
          @layer utilities {
            .animate-shimmer {
              animation: shimmer 2s linear infinite;
            }
            .animate-bounce {
              animation: bounce 1s ease-in-out infinite;
            }
            .animate-pulse {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            .animate-shake {
              animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
            .shadow-3xl {
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }

            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            @keyframes shake {
              10%, 90% { transform: translate3d(-1px, 0, 0); }
              20%, 80% { transform: translate3d(2px, 0, 0); }
              30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
              40%, 60% { transform: translate3d(4px, 0, 0); }
            }
          }
        `}
      </style>

      <Navbar />
      {authenticated ? (
        loading ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-500 dark:border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500 dark:text-indigo-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 font-medium animate-pulse">Loading your favorites...</p>
          </div>
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Hero Section */}
              <div className="text-center mb-16 transition-all duration-700 opacity-100 translate-y-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight drop-shadow-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  Your Favorite Destinations <span className="inline-block animate-bounce">❤️</span>
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium">
                  {countries.length > 0 
                    ? `You have ${countries.length} favorite ${countries.length === 1 ? 'country' : 'countries'}` 
                    : 'Your personal collection of favorite countries will appear here'} <span className="inline-block animate-pulse">✨</span>
                </p>
              </div>

              {/* Error State */}
              {error && (
                <div className="max-w-3xl mx-auto bg-red-50/95 dark:bg-red-900/20 border-l-8 border-red-600 dark:border-red-400 p-6 mb-10 rounded-xl shadow-lg animate-shake">
                  <div className="flex items-start">
                    <svg className="h-8 w-8 text-red-600 dark:text-red-400 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-lg text-red-700 dark:text-red-200 font-semibold">{error}</p>
                      <button 
                        onClick={loadFavorites}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/40 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {countries.length === 0 ? (
                <div className="max-w-md mx-auto bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl text-center transform transition-all duration-500 hover:shadow-3xl border border-gray-100/30 dark:border-gray-600/30">
                  <div className="w-28 h-28 bg-indigo-100/90 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-indigo-600 dark:text-indigo-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-3">No Favorites Yet</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Start exploring and add countries to your favorites collection</p>
                  <a 
                    href="/" 
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Browse Countries
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {countries.map((country, index) => (
                    <div 
                      key={country.cca3} 
                      className={`transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${loading ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}
                      style={{ transitionDelay: `${index * 75}ms` }}
                    >
                      <CountryCard
                        country={country}
                        favorites={favorites}
                        refreshFavorites={loadFavorites}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl transform transition-all duration-500 hover:shadow-3xl border border-gray-100/30 dark:border-gray-600/30">
            <div className="text-center">
              <div className="w-24 h-24 bg-red-100/90 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-4">Access Denied</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Please log in to view your favorite countries</p>
              <a 
                href="/login" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Go to Login
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;