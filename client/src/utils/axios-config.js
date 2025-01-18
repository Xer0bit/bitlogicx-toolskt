import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true  // Add this for cross-domain cookies if needed
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out');
    }
    if (error.response?.status === 404) {
      console.error('Backend service not found');
    }
    if (error.response?.status === 500) {
      console.error('Backend server error');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
