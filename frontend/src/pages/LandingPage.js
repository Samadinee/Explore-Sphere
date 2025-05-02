// frontend/src/pages/LandingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Check for saved dark mode preference
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex flex-col bg-[url('https://d2cvjmix0699s1.cloudfront.net/resources/elephango/resourceFull/12993-girl-holding-globe.jpg')] dark:bg-[url('https://d2cvjmix0699s1.cloudfront.net/resources/elephango/resourceFull/12993-girl-holding-globe.jpg')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen relative">
      {/* Overlay - different opacity for dark mode */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/50 backdrop-blur-sm h-full"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Hero Section */}
          <section className="text-center mb-16 md:mb-24 relative">
            <div className="animate-fade-in-up backdrop-blur-xs bg-white/10 dark:bg-gray-900/30 p-8 md:p-12 rounded-3xl border border-white/20 dark:border-gray-700 shadow-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-100 tracking-tight leading-tight drop-shadow-lg">
                Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-900 dark:from-indigo-400 dark:to-purple-600">Explore Sphere</span> <span className="inline-block animate-float">🌍</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-gray-200 dark:text-gray-300 max-w-3xl mx-auto font-medium drop-shadow-md">
                <span className="inline-block animate-pulse">✨</span> Discover countries, cultures, and stories from around the globe <span className="inline-block animate-pulse delay-150">✨</span>
              </p>
              <div className="mt-10">
                <button
                  onClick={() => navigate('/home')}
                  className="relative inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-900 dark:from-indigo-500 dark:to-purple-700 text-gray-100 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group overflow-hidden border-2 border-white/30 dark:border-gray-600/50"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-900 dark:from-indigo-600 dark:to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <svg
                    className="h-6 w-6 mr-3 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="relative">Explore Countries</span>
                </button>
              </div>
            </div>
            
            {/* Floating elements - adjusted colors for dark mode */}
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-purple-400/20 dark:bg-purple-600/20 blur-xl animate-float-slow"></div>
            <div className="absolute -bottom-5 -right-5 w-40 h-40 rounded-full bg-indigo-400/20 dark:bg-indigo-600/20 blur-xl animate-float-slow delay-1000"></div>
          </section>

          {/* Features Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Discover Countries',
                description: 'Explore detailed information about countries worldwide including population, languages, and more.',
                icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                color: 'from-indigo-400/10 to-indigo-600/20 dark:from-indigo-600/20 dark:to-indigo-800/30',
                border: 'border-indigo-400/30 dark:border-indigo-600/40',
                hoverText: 'text-indigo-200 dark:text-indigo-300'
              },
              {
                title: 'Save Favorites',
                description: 'Bookmark your favorite countries and create custom lists for easy access anytime.',
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                color: 'from-pink-400/10 to-pink-600/20 dark:from-pink-600/20 dark:to-pink-800/30',
                border: 'border-pink-400/30 dark:border-pink-600/40',
                hoverText: 'text-pink-200 dark:text-pink-300'
              },
              {
                title: 'Personalize Profile',
                description: 'Manage your account, track visited countries, and organize your travel bucket list.',
                icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
                color: 'from-blue-400/10 to-blue-600/20 dark:from-blue-600/20 dark:to-blue-800/30',
                border: 'border-blue-400/30 dark:border-blue-600/40',
                hoverText: 'text-blue-200 dark:text-blue-300'
              },
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className={`relative bg-white/5 dark:bg-gray-900/20 backdrop-blur-md ${feature.border} border rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group overflow-hidden hover:bg-white/10 dark:hover:bg-gray-800/30`}
              >
                {/* Subtle gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-30 rounded-2xl`}></div>
                
                <div className={`relative z-10 w-16 h-16 bg-gradient-to-br ${feature.color.replace('/10', '/20').replace('/20', '/40').replace('dark:from-indigo-600/20', 'dark:from-indigo-700/40').replace('dark:to-indigo-800/30', 'dark:to-indigo-900/50')} rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 border ${feature.border}`}>
                  <svg className="h-8 w-8 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className={`relative z-10 text-xl lg:text-2xl font-bold text-gray-100 dark:text-gray-200 mb-3 group-hover:${feature.hoverText} transition-colors duration-300`}>{feature.title}</h3>
                <p className="relative z-10 text-gray-300 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white/5 dark:bg-gray-900/30 backdrop-blur-lg py-8 mt-16 border-t border-white/10 dark:border-gray-700/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-300 dark:text-gray-400 text-sm font-medium">
                © {new Date().getFullYear()} Explore Sphere. All country data from REST Countries API.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;