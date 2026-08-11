import axios, { InternalAxiosRequestConfig } from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authApi = {
  login: async (email: string, password: string): Promise<any> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  getMe: async (): Promise<any> => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export const placesApi = {
  getAll: async (): Promise<any> => {
    const response = await api.get('/destinations');
    return response.data;
  },
  getById: async (id: string): Promise<any> => {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  },
  create: async (formData: FormData): Promise<any> => {
    const response = await api.post('/destinations', formData);
    return response.data;
  },
  update: async (id: string, formData: FormData): Promise<any> => {
    const response = await api.put(`/destinations/${id}`, formData);
    return response.data;
  },
  delete: async (id: string): Promise<any> => {
    const response = await api.delete(`/destinations/${id}`);
    return response.data;
  }
};

export default api;
