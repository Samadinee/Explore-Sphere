// frontend/src/tests/Filters.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';

describe('Filter Components', () => {
  beforeAll(() => {
    // Set a default theme for tests
    window.localStorage.setItem('theme', 'light');
  });

  test('renders region filter', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
    const regionFilter = screen.getByText('Filter by Region');
    expect(regionFilter).toBeInTheDocument();
  });

  test('renders language filter', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
    const languageFilter = screen.getByText('Filter by Language');
    expect(languageFilter).toBeInTheDocument();
  });

  test('renders search bar', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
    const searchBar = screen.getByPlaceholderText('Search for a country...');
    expect(searchBar).toBeInTheDocument();
  });
});