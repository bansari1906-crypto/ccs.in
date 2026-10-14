import axios from 'axios';

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE) || 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('admin_refresh_token');
      if (refreshToken) {
        try {
          const refreshUrl = (import.meta.env && import.meta.env.VITE_API_BASE)
            ? `${import.meta.env.VITE_API_BASE}token/refresh/`
            : 'http://127.0.0.1:8000/api/token/refresh/';
          const response = await axios.post(refreshUrl, {
            refresh: refreshToken
          });
          localStorage.setItem('admin_access_token', response.data.access);
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          return api(originalRequest);
        } catch (e) {
          localStorage.removeItem('admin_access_token');
          localStorage.removeItem('admin_refresh_token');
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
