// frontend/src/services/countryService.js
import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

// Function to get all countries
export const getAllCountries = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all countries", error);
        throw error;
    }
};


// Function to search countries by name
export const getCountryByName = async (name) => {
    try {
        const response = await axios.get(`${BASE_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching country by name: ${name}`, error);
        throw error;
    }
};

// Function to get countries by region
export const getCountriesByRegion = async (region) => {
    try {
        const response = await axios.get(`${BASE_URL}/region/${region}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by region: ${region}`, error);
        throw error;
    }
};

// Function to get countries by language
export const getCountriesByLanguage = async (language) => {
    try {
        const response = await axios.get(`${BASE_URL}/lang/${language}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by language: ${language}`, error);
        throw error;
    }
};

// Function to get country details by code
export const getCountryDetailsByCode = async (code) => {
    try {
        const response = await axios.get(`${BASE_URL}/alpha/${code}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching country details by code: ${code}`, error);
        throw error;
    }
};