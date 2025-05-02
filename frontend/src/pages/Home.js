// frontend/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { getAllCountries } from '../services/countryService';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import LanguageFilter from '../components/LanguageFilter';
import Navbar from '../components/Navbar';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                const allCountries = await getAllCountries();
                setCountries(allCountries);
                setFilteredCountries(allCountries);
            } catch (error) {
                console.error("Error fetching countries", error);
                setError("Failed to load countries. Please try again later.");
            } finally {
                setLoading(false);
                setIsFirstLoad(false);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        let filtered = countries;

        if (searchTerm) {
            filtered = filtered.filter(country =>
                country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedRegion) {
            filtered = filtered.filter(country =>
                country.region === selectedRegion
            );
        }

        if (selectedLanguage) {
            filtered = filtered.filter(country =>
                country.languages &&
                Object.values(country.languages).some(lang =>
                    lang.toLowerCase().includes(selectedLanguage.toLowerCase())
                )
            );
        }

        setFilteredCountries(filtered);
    }, [searchTerm, selectedRegion, selectedLanguage, countries]);

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

            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-black dark:via-slate-900 dark:to-black">
                <Navbar />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero Section */}
                    <div className={`text-center mb-16 ${isFirstLoad ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'} transition-all duration-1000 ease-out`}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight drop-shadow-sm">
                            Explore the World <span className="inline-block animate-bounce">🌍</span>
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium">
                            <span className="inline-block animate-pulse">✨</span> Discover countries, cultures, and fascinating facts from around the globe <span className="inline-block animate-pulse delay-100">✨</span>
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className={`bg-white/70 dark:bg-blue-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-10 transition-all duration-700 ${isFirstLoad ? 'translate-y-12 opacity-0' : 'translate-y-0 opacity-100'} hover:shadow-3xl border border-white/30 dark:border-blue-800/30`}>
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <div className="flex flex-col md:flex-row justify-between gap-6 mt-6">
                            <div className="w-full md:w-1/2">
                                <RegionFilter selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
                            </div>
                            <div className="w-full md:w-1/2">
                                <LanguageFilter selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className={`mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-opacity duration-500 ${filteredCountries.length === 0 && !loading ? 'opacity-60' : 'opacity-100'}`}>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-blue-100 tracking-tight">
                            {filteredCountries.length} {filteredCountries.length === 1 ? 'Country' : 'Countries'} Found <span className="text-indigo-500 dark:text-blue-400 animate-pulse">🌟</span>
                        </h2>
                        {(selectedRegion || selectedLanguage) && (
                            <div className="flex flex-wrap gap-3">
                                {selectedRegion && (
                                    <span className="bg-indigo-100/90 dark:bg-blue-600/90 text-indigo-800 dark:text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full flex items-center hover:bg-indigo-200/90 dark:hover:bg-blue-500/90 transition-all duration-300">
                                        {selectedRegion}
                                        <button 
                                            onClick={() => setSelectedRegion('')}
                                            className="ml-2 text-indigo-600 dark:text-blue-300 hover:text-indigo-800 dark:hover:text-blue-400 focus:outline-none transition-colors duration-200"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {selectedLanguage && (
                                    <span className="bg-purple-100/90 dark:bg-purple-600/90 text-purple-800 dark:text-purple-100 text-sm font-medium px-4 py-1.5 rounded-full flex items-center hover:bg-purple-200/90 dark:hover:bg-purple-500/90 transition-all duration-300">
                                        {selectedLanguage}
                                        <button 
                                            onClick={() => setSelectedLanguage('')}
                                            className="ml-2 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-400 focus:outline-none transition-colors duration-200"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white/90 dark:bg-gray-700/90 rounded-2xl shadow-lg overflow-hidden h-80 animate-pulse"
                                >
                                    <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 h-48 w-full animate-shimmer bg-[length:300%_100%]"></div>
                                    <div className="p-6 space-y-4">
                                        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-3/4 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full w-1/2 animate-pulse delay-75"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full w-5/6 animate-pulse delay-100"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="bg-red-50/95 dark:bg-red-700/95 border-l-8 border-red-600 dark:border-red-500 p-6 mb-10 rounded-xl animate-shake max-w-3xl mx-auto shadow-lg">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-8 w-8 text-red-600 dark:text-red-300" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-100">Error loading data</h3>
                                    <p className="text-base text-red-700 dark:text-red-200 mt-2">{error}</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-300"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Countries Grid */}
                    {!loading && !error && filteredCountries.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredCountries.map((country, index) => (
                                <div 
                                    key={country.cca3} 
                                    className={`transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${isFirstLoad ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}
                                    style={{ transitionDelay: `${index * 75}ms` }}
                                >
                                    <CountryCard 
                                        country={country} 
                                        className="transition-all duration-500 hover:shadow-xl"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && filteredCountries.length === 0 && !isFirstLoad && (
                        <div className="text-center py-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-3xl shadow-2xl max-w-3xl mx-auto border border-gray-100/40 dark:border-slate-800/40">
                            <div className="w-28 h-28 mx-auto mb-8 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-blue-700 dark:to-slate-900 rounded-full animate-pulse">
                                <svg 
                                    className="h-14 w-14 text-indigo-600 dark:text-slate-300 animate-bounce" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">No countries match your search</h3>
                            <p className="mt-3 text-lg text-gray-500 dark:text-slate-300 max-w-md mx-auto">
                                Try different keywords, or explore different regions and languages
                            </p>
                            <div className="mt-8 space-x-4">
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-blue-600 dark:to-slate-900 hover:from-indigo-600 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-blue-400 transition-all duration-300 hover:shadow-xl"
                                >
                                    Clear search
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedRegion('');
                                        setSelectedLanguage('');
                                    }}
                                    className="inline-flex items-center px-6 py-3 border border-gray-200 dark:border-slate-700 text-base font-medium rounded-full shadow-lg text-gray-700 dark:text-slate-100 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-blue-400 transition-all duration-300 hover:shadow-xl"
                                >
                                    Reset filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Footer */}
                <footer className="bg-white/90 dark:bg-gray-600/90 backdrop-blur-lg py-8 mt-16 border-t border-gray-100/50 dark:border-gray-500/50">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-gray-500 dark:text-gray-200 text-sm font-medium">
                                © {new Date().getFullYear()} Explore Sphere. All country data from REST Countries API.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;