import { authService } from '@/modules/auth/services/authService';
import { apiClient } from './apiClient';

export const setupInterceptors = (logout, setAuth) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (originalRequest?.url?.includes('/auth/renew')) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { token: newAccessToken, user: newUser } = await authService.renewToken();
          setAuth({
            accessToken: newAccessToken,
            user: newUser,
          });
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('user', JSON.stringify(newUser));
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;  

          return apiClient(originalRequest);
        } catch (error) {
          console.error('Error al renovar el token', error);
          logout();
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
};
