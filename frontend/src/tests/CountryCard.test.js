// frontend/src/tests/CountryCard.test.js
import { render, screen } from '@testing-library/react';
import CountryCard from '../components/CountryCard';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock sweetalert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  mixin: jest.fn(() => ({
    fire: jest.fn(),
  })),
}));

jest.mock('sweetalert2-react-content', () => jest.fn(() => ({
  fire: jest.fn(),
})));

// ✅ Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockCountry = {
  cca3: 'USA',
  name: { common: 'United States' },
  capital: ['Washington, D.C.'],
  region: 'Americas',
  languages: { eng: 'English' },
  population: 331000000,
  flags: { png: 'https://flagcdn.com/w320/us.png' }
};

describe('CountryCard', () => {
  it('renders country name and info', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ authenticated: true }}>
          <CountryCard country={mockCountry} />
        </AuthContext.Provider>
      </Router>
    );

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Washington, D.C.')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('331,000,000')).toBeInTheDocument();
  });

  it('shows "Save" button for unauthenticated users', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ authenticated: false }}>
          <CountryCard country={mockCountry} />
        </AuthContext.Provider>
      </Router>
    );

    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });
});
