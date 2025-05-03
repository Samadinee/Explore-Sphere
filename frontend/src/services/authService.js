// frontend/src/service/authService.js
const API_URL = process.env.REACT_APP_API_URL || 'https://explore-sphere-production.up.railway.app/api/auth';  // Explicit URL to avoid proxy issues

export const login = async (username, password) => {
  try {
    const payload = { username, password };
    console.log('Sending login request:', payload);

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(error.message || 'Login failed');
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
  const res = await fetch(`${API_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  return data.favorites || [];
};

export const toggleFavorite = async (countryCode) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/favorites/toggle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ countryCode })
  });
  const data = await res.json();
  return data.favorites || [];
};