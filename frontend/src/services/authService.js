// frontend/src/services/authService.js
const API_URL =
  process.env.REACT_APP_API_URL || 'https://explore-sphere-production.up {{{content truncated}}} .railway.app/api/auth';

export const login = async (username, password) => {
  try {
    const payload = { username, password };
    console.log('Sending login request:', payload);

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include', // Include credentials for CORS
    });

    const data = await response.json();
    console.log('Login response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    const { token } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ username }));

    return { user: { username }, token };
  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(error.message || 'Failed to connect to the server');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getToken = () => localStorage.getItem('token');

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!getToken();

export const getFavorites = async () => {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch favorites');
    }
    return data.favorites || [];
  } catch (error) {
    console.error('Get favorites error:', error);
    throw error;
  }
};

export const toggleFavorite = async (countryCode) => {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}/favorites/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ countryCode }),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to toggle favorite');
    }
    return data.favorites || [];
  } catch (error) {
    console.error('Toggle favorite error:', error);
    throw error;
  }
};