import { authClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const authService = {
  login: async (userData) => {
    try {
      const response = await authClient.post('/auth/login', userData);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error iniciando sesión ❌'));
    }
  },

  logout: async() => {
    try {
      const response = await authClient.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error cerrando sesión ❌'));
    }
  },

  renewToken: async() => {
    try {
      const response = await authClient.post('/auth/renew');
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error renovando el accessToken ❌'));
    }
  },

  solicitarResetPassword: async(email) => {
    try {
      const response = await authClient.post('/auth/solicitarReset', email);
      console.log(response.data.msg);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error solicitando restablecer la contraseña ❌'));
    }
  },

  verificarCodigo: async(data) => {    
    try {
      const response = await authClient.post('/auth/verificarCodigo', data);
      console.log(response.data.msg);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error verificando el codigo ❌'));
    }
  },

  resetPassword: async(data) => {    
    try {
      const response = await authClient.post('/auth/resetPassword', data);
      console.log(response.data.msg);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error restableciendo la contraseña ❌'));
    }
  },  
};
