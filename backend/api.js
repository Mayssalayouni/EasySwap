// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.1.16:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter automatiquement le token dans les requêtes
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
