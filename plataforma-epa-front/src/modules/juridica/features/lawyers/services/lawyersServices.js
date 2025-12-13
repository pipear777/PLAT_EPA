import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const lawyersServices = {
  createLawyers: async (lawyersData) => {
    try {
      const response = await apiClient.post(
        '/abogados/crearAbogado',
        lawyersData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(handleAxiosError(error, 'Error creando abogado ❌'));
    }
  },

  getAllLawyers: async () => {
    try {
      const response = await apiClient.get('/abogados/mostrar');
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error listando abogados ❌'));
    }
  },

  getByIdLawyers: async (id) => {
    try {
      const response = await apiClient.get(`/abogados/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error obteniendo abogado ❌'));
    }
  },

  updateLawyers: async (id, data) => {
    try {
      const response = await apiClient.put(`/abogados/actualizar/${id}`, data);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error actualizando abogado ❌'));
    }
  },
};
