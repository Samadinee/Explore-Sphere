// frontend/src/pages/Signup.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const { setUser, setAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isPasswordValid = (pwd) => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    return pwd.length > 5 && hasLetter && hasNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isPasswordValid(password)) {
      setError('Password must be at least 6 characters and include letters and numbers');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const loginRes = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        throw new Error(loginData.message || 'Auto-login failed');
      }

      localStorage.setItem('token', loginData.token);
      localStorage.setItem('user', JSON.stringify({ username }));
      setUser({ username });
      setAuthenticated(true);

      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/home');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const isSubmitDisabled =
    !username ||
    !password ||
    !confirmPassword ||
    !isPasswordValid(password) ||
    password !== confirmPassword ||
    isLoading;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center relative overflow-hidden h-40 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80')] bg-cover bg-center"></div>
            <div className="relative z-10 space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                Join Our Community
              </h1>
              <p className="text-blue-100/90 text-sm font-medium">
                Start exploring countries today
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 font-medium text-sm">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input id="username" type="text" placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input id="password" type="password" placeholder="Create a password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {password && !isPasswordValid(password) && (
                  <p className="text-sm text-red-500 mt-1">
                    Password must be at least 6 characters and include letters and numbers
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input id="confirmPassword" type="password" placeholder="Confirm your password"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 text-sm sm:text-base ${
                      confirmPassword && password !== confirmPassword
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  {confirmPassword && password === confirmPassword && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">Passwords don't match</p>
                )}
              </div>

              <div className="pt-1">
                <button type="submit" disabled={isSubmitDisabled}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white flex items-center justify-center space-x-3 ${
                    isSubmitDisabled
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:via-blue-600 hover:to-indigo-700'
                  }`}>
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Sign Up</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="pt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="text-blue-600 hover:text-blue-800 font-semibold">
                  Log in here
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-white/80 text-xs space-x-2">
          <span>By signing up, you agree to our</span>
          <a href="/terms-of-service" className="text-white hover:underline">Terms of Service</a>
          <span>and</span>
          <a href="/privacy-policy" className="text-white hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
