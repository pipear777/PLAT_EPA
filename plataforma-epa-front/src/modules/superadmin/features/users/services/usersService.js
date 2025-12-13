import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const usersService = {
  createUsers: async (data) => {
    try {
      const response = await apiClient.post('/auth/newUser', data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error creando usuario ❌'));
    }
  },

  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/auth/users');
      console.log(response.data.ok);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error listando todos los usuarios ❌')
      );
    }
  },

  getUserById: async (id) => {
    try {
      const response = await apiClient.get(`/auth/users/${id}`);
      console.log(response.data);
      return response.data;      
    } catch (error) {
      throw new Error(
        handleAxiosError(error, `Error obteniendo el ususario con id: ${id} ❌`)
      );
    }
  },

  updateUser: async (id, data) => {
    try {
      const response = await apiClient.put(`/auth/update/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error actualizando el usuario ❌')
      );
    }
  },
};
