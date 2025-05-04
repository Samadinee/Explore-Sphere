// frontend/src/components/RegionFilter.js
import React from 'react';

const RegionFilter = ({ setSelectedRegion }) => {
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

    return (
        <div className="region-filter">
            <select 
                onChange={(e) => setSelectedRegion(e.target.value)} 
                className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-700 p-2 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-gray-500 transition-colors duration-200"
            >
                <option value="">Filter by Region</option>
                {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                ))}
            </select>
        </div>
    );
};

export default RegionFilter;