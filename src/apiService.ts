import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ap5ggexpz0.execute-api.us-east-1.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false 
});

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
