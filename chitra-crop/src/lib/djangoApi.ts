import axios from 'axios';

const DJANGO_API_URL = import.meta.env.VITE_DJANGO_API_URL || 'http://127.0.0.1:8000/api';

const djangoApi = axios.create({
  baseURL: DJANGO_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

djangoApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

djangoApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${DJANGO_API_URL}/token/refresh/`, {
            refresh: refreshToken
          });
          localStorage.setItem('access_token', response.data.access);
          djangoApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          return djangoApi(originalRequest);
        } catch (e) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        }
      }
    }
    return Promise.reject(error);
  }
);

export interface CustomUser {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  role: 'customer' | 'admin';
  is_approved: boolean;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  category?: number;
  category_name?: string;
  image?: string;
  description?: string;
  benefits?: string;
  usage?: string;
  target_crops?: string;
  price: string;
  stock: number;
  status: string;
}

export interface Lead {
  id?: number;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  message: string;
  date?: string;
  status?: string;
}

export interface Order {
  id?: number;
  user?: number;
  product?: number;
  product_name?: string;
  user_name?: string;
  quantity: number;
  status?: string;
  created_at?: string;
}

export interface ApiResponse<T> {
  results?: T[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}

export default djangoApi;
