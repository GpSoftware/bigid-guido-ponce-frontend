import axios from 'axios';
import { ENVS } from '../config/env';

const axiosInstance = axios.create({
  baseURL: ENVS.API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;