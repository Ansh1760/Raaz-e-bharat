import axios from 'axios';

// __BACKEND_URL__ is injected at build time by vite.config.js define block.
// In production (Vercel build): resolves to 'https://raaz-e-bharat-1.onrender.com'
// In development (vite dev server): falls back to '' so proxy routes /api → localhost:5000
const BASE_URL = (typeof __BACKEND_URL__ !== 'undefined' && __BACKEND_URL__)
  ? `${__BACKEND_URL__}/api`
  : (import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api');

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('raaz_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('raaz_admin_token');
      localStorage.removeItem('raaz_admin_user');
      if (window.location.pathname.startsWith('/admin/dashboard')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
