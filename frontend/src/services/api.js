import axios from 'axios';

// Resolve the base URL dynamically based on environment variables
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) {
    return 'http://localhost:5000/api';
  }
  // Remove any trailing slash to sanitize the URL
  const sanitizedUrl = envUrl.replace(/\/$/, '');
  // If the URL does not end with /api, append it
  if (!sanitizedUrl.endsWith('/api')) {
    return `${sanitizedUrl}/api`;
  }
  return sanitizedUrl;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token from localStorage to the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
