// frontend/src/components/CountryCard.js
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getFavorites, toggleFavorite } from '../services/authService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CountryCard = ({ country, favorites: propFavorites, refreshFavorites }) => {
  const { authenticated } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated && propFavorites) {
      setFavorites(propFavorites);
    } else if (authenticated) {
      getFavorites().then(setFavorites).catch(console.error);
    }
  }, [authenticated, propFavorites]);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!authenticated) {
      const result = await MySwal.fire({
        title: 'Authentication Required',
        text: 'Please login to save countries to your favorites ✨',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6366f1',
        cancelButtonColor: '#d1d5db',
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Maybe Later',
        backdrop: true,
        timerProgressBar: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });

      if (result.isConfirmed) {
        navigate('/login');
      }
      return;
    }

    setIsProcessing(true);

    try {
      const updated = await toggleFavorite(country.cca3);

      if (refreshFavorites) {
        await refreshFavorites();
      } else {
        setFavorites(updated);
      }

      const isNowFavorite = updated.includes(country.cca3);

      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: isNowFavorite ? 'success' : 'info',
        title: isNowFavorite ? 'Added to Favorites!' : 'Removed from Favorites',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: isNowFavorite ? '#fef3c7' : '#e0e7ff',
        iconColor: isNowFavorite ? '#f59e0b' : '#6366f1',
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

    } catch (error) {
      console.error('Error toggling favorite:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: 'Please try again later.',
        confirmButtonColor: '#ef4444',
        backdrop: true
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const isFav = favorites.includes(country.cca3);

  const formatNumber = (num) => num?.toLocaleString() || 'N/A';

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-indigo-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-gray-600 group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden p-2">
        <img
          src={country.flags?.png || country.flags?.svg}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105 brightness-95 contrast-110 saturate-125"
          style={{ filter: 'brightness(0.95) contrast(1.1) saturate(1.25)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-t-lg" />
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h2 className="font-bold text-xl text-indigo-900 dark:text-white truncate">
            {country.name.common}
          </h2>
          <button
            onClick={handleToggleFavorite}
            disabled={isProcessing}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 min-w-[90px] justify-center ${
              isFav 
                ? 'bg-yellow-100 dark:bg-yellow-300 text-yellow-700 hover:bg-yellow-200 dark:hover:bg-yellow-400 shadow-sm'
                : 'bg-indigo-100 dark:bg-indigo-400 text-indigo-700 dark:text-white hover:bg-indigo-200 dark:hover:bg-indigo-500 shadow-sm'
            } ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? (
              <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : isFav ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>Saved</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Save</span>
              </>
            )}
          </button>
        </div>

        {/* Info section */}
        <div className="space-y-3 text-indigo-800 dark:text-gray-200 flex-grow">
          <InfoItem icon="🏛️" label="Capital" value={country.capital?.[0] || 'N/A'} />
          <InfoItem icon="🌍" label="Region" value={country.region} />
          <InfoItem icon="🗣️" label="Language" value={country.languages ? Object.values(country.languages).join(', ') : 'N/A'} />
          <InfoItem icon="👥" label="Population" value={formatNumber(country.population)} />
        </div>

        {/* Details button */}
        <div className="mt-5">
          <Link 
            to={`/country/${country.cca3}`} 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-200 group-hover:shadow-md w-full justify-center"
          >
            <span>View Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Reusable info item
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <span className="text-xl mr-2">{icon}</span>
    <div>
      <span className="font-medium block text-xs text-indigo-600 dark:text-indigo-400">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  </div>
);

export default CountryCard;
