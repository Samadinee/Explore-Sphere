// frontend/src/components/LanguageFilter.js
import React from 'react';

const LanguageFilter = ({ setSelectedLanguage }) => {
    const languages = ["English", "Spanish", "French", "Arabic", "German", "Chinese"];

    return (
        <div className="language-filter">
            <select 
                onChange={(e) => setSelectedLanguage(e.target.value)} 
                className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-700 p-2 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-gray-500 transition-colors duration-200"
            >
                <option value="">Filter by Language</option>
                {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                ))}
            </select>
        </div>
    );
};

export default LanguageFilter;