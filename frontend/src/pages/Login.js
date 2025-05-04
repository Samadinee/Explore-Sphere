// frontend/src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Login = () => {
  const { setUser, setAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showSuccessAlert = () => {
    MySwal.fire({
      title: <p className="text-2xl font-bold text-blue-600">Login Successful!</p>,
      html: <p className="text-gray-700">Redirecting to your dashboard...</p>,
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      background: '#ffffff',
      backdrop: `
        rgba(59, 130, 246, 0.25)
        url("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW1tZ3J2a2t5eGZ5N3J4Z3V4bHl0M2F6b2V6eGx5bWZ2eGx1eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H7CKd1GO6oiZQo7L5d/giphy.gif")
        center top
        no-repeat
      `,
      willClose: () => {
        navigate('/home');
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await login(username, password);
      setUser(data.user);
      setAuthenticated(true);
      showSuccessAlert();
    } catch (error) {
      console.error('Login failed:', error);
      let message = 'An unexpected error occurred';
      if (error.message.includes('Failed to connect')) {
        message = 'Unable to reach the server. Please check your internet connection.';
      } else if (error.message.includes('Invalid')) {
        message = 'Invalid username or password';
      } else {
        message = error.message || 'Login failed';
      }
      setErrorMessage(message);

      MySwal.fire({
        title: <p className="text-xl font-bold text-red-600">Login Failed</p>,
        html: <p className="text-gray-700">{message}</p>,
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#3b82f6',
        background: '#fef2f2',
        iconColor: '#ef4444',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 bg-[url('https://img.goodfon.com/original/1920x1080/5/a6/karta-mira-chernyi-fon-neon-materiki-zemlia-world-map-black.jpg')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]">
          <div className="p-8 text-center relative overflow-hidden h-40 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
            <div className="absolute inset-0 opacity-20 bg-blue-500"></div>
            <div className="relative z-10 space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                Welcome Back
              </h1>
              <p className="text-blue-100/90 text-sm font-medium">
                🌍Explore Sphere<br/>
                Continue your country exploration
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {errorMessage && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-5 w-5 text-red-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-700 font-medium text-sm">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-noneilibre text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-400 placeholder-gray-400 text-gray-700 text-sm sm:text-base"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-400 placeholder-gray-400 text-gray-700 text-sm sm:text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-3 ${
                    isLoading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                  } focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="tracking-wide">Logging In...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="tracking-wide">Log In</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="pt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-1"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-white/80 text-xs space-x-2">
          <span>By logging in, you agree to our</span>
          <a
            href="/terms-of-service"
            className="text-white hover:underline hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-0.5"
          >
            Terms of Service
          </a>
          <span>and</span>
          <a
            href="/privacy-policy"
            className="text-white hover:underline hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-0.5"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;