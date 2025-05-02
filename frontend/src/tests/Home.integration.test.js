// frontend/src/tests/Home.integration.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import Home from '../pages/Home';
import axios from 'axios';

// Mock axios
jest.mock('axios');

const mockCountries = [
  {
    name: { common: 'Test Country' },
    cca3: 'TST',
    flags: { png: 'test.png' },
    capital: ['Test Capital'],
    region: 'Test Region',
    languages: { eng: 'English' },
    population: 1000000,
  },
];

describe('Integration Test: Home Filters & Search', () => {
  beforeEach(() => {
    // Mock window.matchMedia for JSDOM
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false, // Default to light theme for consistency
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Mock API responses
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/auth/favorites')) {
        return Promise.resolve({ data: { favorites: [] } });
      }
      if (url.includes('restcountries.com')) {
        return Promise.resolve({ data: mockCountries });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  afterEach(() => {
    // Clean up mocks
    jest.clearAllMocks();
    delete window.matchMedia;
  });

  test('applies filters and displays correct country cards', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </ThemeProvider>
      </MemoryRouter>
    );

    // Wait for the loading state to resolve and countries to render
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    }, { timeout: 2000 });

    // Verify the results count
    await waitFor(() => {
      expect(screen.getByText(/1 Country Found/)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});