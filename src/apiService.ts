import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ap5ggexpz0.execute-api.us-east-1.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
