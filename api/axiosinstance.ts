// api/index.ts
import axios from 'axios';

// ✅ Use your local IP — physical devices can't access 'localhost'
const BASE_URL = 'http://192.168.29.254:8080/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Optional: Interceptors for auth/logging
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Attach token if needed
    // const token = await AsyncStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
