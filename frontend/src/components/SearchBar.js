// frontend/src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search-bar mb-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a country..."
                className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-700 p-2 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-gray-500 transition-colors duration-200"
            />
        </div>
    );
};

export default SearchBar;