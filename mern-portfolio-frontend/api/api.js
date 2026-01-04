// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://auroxdemo.onrender.com/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

/* --------------------------------------------------
   CSRF TOKEN SUPPORT
-------------------------------------------------- */
// Backend must expose: GET /api/auth/csrf
export const initCSRF = async () => {
  await API.get('/auth/csrf');
};

/* --------------------------------------------------
   AUTO REFRESH TOKEN ROTATION
-------------------------------------------------- */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach(promise =>
    error ? promise.reject(error) : promise.resolve()
  );
  failedQueue = [];
};

API.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => API(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await API.post('/auth/refresh');
        processQueue();
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default API;
