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

export const API_BASE_URL = getBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token and strip leading redundant /api from request path
api.interceptors.request.use(
  (config) => {
    if (config.url && config.url.startsWith('/api/')) {
      config.url = config.url.replace(/^\/api/, '');
    }
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
