// frontend/src/pages/CountryDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryDetailsByCode } from '../services/countryService';

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getCountryDetailsByCode(code);
        setCountry(response[0]);
      } catch (error) {
        console.error('Error fetching country details', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [code]);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-gray-600 dark:border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-center text-gray-700 dark:text-gray-300 font-medium animate-pulse">Loading country data...</p>
      </div>
    </div>
  );

  if (!country) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-6">
      <div className="max-w-md text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700">
        <div className="w-20 h-20 bg-rose-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-rose-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Country Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">We couldn't find details for the requested country code.</p>
        <Link 
          to="/home" 
          className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );

  const formatNumber = (num) => num?.toLocaleString() || 'N/A';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="grid md:grid-cols-2 gap-8 text-lg">
            <div className="space-y-5">
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Official Name</p>
                <p className="text-gray-800 dark:text-gray-100 font-medium">{country.name.official}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Capital</p>
                <p className="text-gray-800 dark:text-gray-100 font-medium">{country.capital?.join(', ') || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Region</p>
                <p className="text-gray-800 dark:text-gray-100 font-medium">{country.region} {country.subregion && `(${country.subregion})`}</p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Population</p>
                <p className="text-gray-800 dark:text-gray-100 font-medium">{formatNumber(country.population)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Area</p>
                <p className="text-gray-800 dark:text-gray-100 font-medium">{formatNumber(country.area)} km²</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <p className="text-gray-800 dark:text-gray-100 font-medium capitalize">{country.status.toLowerCase()}</p>
              </div>
            </div>
          </div>
        );
      case 'culture':
        return (
          <div className="grid md:grid-cols-2 gap-8 text-lg">
            <div className="space-y-5">
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Languages</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {country.languages 
                    ? Object.values(country.languages).map((lang, i) => (
                        <span key={i} className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 shadow-xs">
                          {lang}
                        </span>
                      ))
                    : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Currencies</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {country.currencies
                    ? Object.values(country.currencies).map((curr, i) => (
                        <span key={i} className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 shadow-xs">
                          {curr.name} ({curr.symbol || '—'})
                        </span>
                      ))
                    : 'N/A'}
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Timezones</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {country.timezones.map((tz, i) => (
                    <span key={i} className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 shadow-xs">
                      {tz}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Continents</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {country.continents.map((cont, i) => (
                    <span key={i} className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 shadow-xs">
                      {cont}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'maps':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href={country.maps?.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-5 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="bg-white/20 dark:bg-gray-600/20 p-3 rounded-lg mr-4 group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-lg">Google Maps</p>
                  <p className="text-gray-300 dark:text-gray-300 text-sm">View full map</p>
                </div>
              </a>
              {country.maps?.openStreetMaps && (
                <a
                  href={country.maps.openStreetMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-5 bg-gradient-to-r from-indigo-700 to-indigo-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="bg-white/20 dark:bg-gray-600/20 p-3 rounded-lg mr-4 group-hover:-rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">OpenStreetMap</p>
                    <p className="text-gray-300 dark:text-gray-300 text-sm">View full map</p>
                  </div>
                </a>
              )}
            </div>
            {country.latlng && (
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Geographical Coordinates</p>
                <div className="flex items-center space-x-4">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-xs border border-gray-200 dark:border-gray-600">
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      <span className="text-gray-600 dark:text-gray-300">Latitude:</span> {country.latlng[0].toFixed(2)}°
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      <span className="text-gray-600 dark:text-gray-300">Longitude:</span> {country.latlng[1].toFixed(2)}°
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Link 
          to="/home" 
          className="inline-flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-all duration-300 mb-8 group font-medium"
        >
          <svg 
            className="w-6 h-6 mr-2 transition-transform duration-300 group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl border border-white/30 dark:border-gray-700">
          <div className="p-8 md:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-shrink-0 lg:w-1/3">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <img
                    src={country.flags?.png}
                    alt={`Flag of ${country.name.common}`}
                    className="relative w-full h-auto rounded-xl border-4 border-white dark:border-gray-700 shadow-lg group-hover:shadow-xl transition-all duration-500 ease-in-out"
                  />
                </div>
                {country.coatOfArms?.png && (
                  <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Coat of Arms</p>
                    <div className="flex justify-center">
                      <img
                        src={country.coatOfArms.png}
                        alt={`Coat of Arms of ${country.name.common}`}
                        className="w-40 h-auto transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-grow lg:w-2/3">
                <div className="mb-8">
                  <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
                    {country.name.common}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 italic">
                    {country.name.official}
                  </p>
                  {country.cioc && (
                    <div className="mt-3 inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm font-semibold px-3 py-1 rounded-full">
                      IOC: {country.cioc}
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                    {['general', 'culture', 'maps'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 px-4 font-semibold text-sm uppercase tracking-wide focus:outline-none rounded-lg transition-all duration-300 ${
                          activeTab === tab
                            ? 'bg-white dark:bg-gray-600 shadow-md text-gray-800 dark:text-gray-100'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-600/50'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 animate-fadeIn">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;