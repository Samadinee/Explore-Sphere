// frontend/src/pages/Profile.js
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import Navbar from '../components/Navbar';

const Profile = () => {
  const { authenticated, handleLogout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Use ThemeContext
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No authentication token found');
        }

        const res = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch profile: ${res.statusText}`);
        }

        const data = await res.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message || 'Failed to load profile');
        if (error.message.includes('token')) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authenticated, navigate, handleLogout]);

  if (!authenticated) {
    return null;
  }

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

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-500 dark:border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-indigo-500 dark:text-purple-400 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <div
              className={`text-center mb-10 transition-all duration-700 ${
                error || !profileData ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
              }`}
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
                Your Profile <span className="inline-block animate-bounce">👤</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium">
                View and manage your account information <span className="inline-block animate-pulse">✨</span>
              </p>
            </div>

            {error && (
              <div className="bg-red-50/95 dark:bg-red-900/20 border-l-8 border-red-600 dark:border-red-500 p-6 mb-10 rounded-xl shadow-lg animate-shake max-w-md mx-auto">
                <div className="flex items-start">
                  <svg
                    className="h-8 w-8 text-red-600 dark:text-red-400 mr-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <p className="text-lg font-semibold text-red-700 dark:text-red-300">{error}</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="mt-4 inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Go to Login
                    </button>
                  </div>
                </div>
              </div>
            )}

            {profileData ? (
              <div
                className={`bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ${
                  error ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
                } hover:shadow-3xl border border-gray-100/30 dark:border-gray-600/30`}
              >
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 p-8 text-white">
                  <div className="flex items-center">
                    <div className="bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center text-4xl font-extrabold text-white mr-6 transform transition-all duration-300 hover:scale-105">
                      {profileData.username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight">{profileData.username}</h3>
                      <p className="text-indigo-100 dark:text-purple-200 mt-1">
                        {profileData.favorites?.length || 0} favorite countries{' '}
                        <span className="inline-block animate-pulse">🌟</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-8">
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-3 border-b border-gray-200 dark:border-gray-600">
                      Account Details
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">Username:</span>
                        <span className="text-gray-800 dark:text-gray-100 font-medium">{profileData.username}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">Favorites Count:</span>
                        <span className="text-gray-800 dark:text-gray-100 font-medium">
                          {profileData.favorites?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 active:scale-95"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md mx-auto border border-gray-100/40 dark:border-gray-600/40 transition-all duration-700 opacity-100 translate-y-0">
                <div className="w-28 h-28 mx-auto mb-8 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full animate-pulse">
                  <svg
                    className="h-14 w-14 text-indigo-600 dark:text-indigo-400 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  No profile data available
                </h3>
                <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Something went wrong. Please try logging in again.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;