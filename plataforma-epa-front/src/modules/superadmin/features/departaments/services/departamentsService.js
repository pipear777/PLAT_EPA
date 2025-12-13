import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const departamentsService = {
  createDepartaments: async (data) => {
    try {
      const response = await apiClient.post('/procesos/crearProceso', data);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error creando proceso ❌')
      );
    }
  },
  getAllDepartaments: async () => {
    try {
      const response = await apiClient.get('/procesos');
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error obteniendo todos los procesos ❌')
      );
    }
  },

  updateDepartaments: async (data) => {    
    const { _id } = data
    try {
      const response = await apiClient.put(`/procesos/actualizarProceso/${ _id }`, data);
      return response.data
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error actualizando proceso ❌')
      );      
    }
  },

  createLocations: async (data) => {
    try {
      const response = await apiClient.post('/sede/crearsede', data);
      console.log('Respuesta del servicio', response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error creando sede ❌')
      );
    }
  },
  getAllLocations: async () => {
    try {
      const response = await apiClient.get('/sede/listar');
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(
        handleAxiosError(error, 'Error obteniendo todas las sedes ❌')
      );
    }
  },

  updateLocations: async (data) => {

    try {
      const response = await apiClient.put(`/sede/actualizarSede/${data._id}`, data);
      return response.data
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error actualizando sede ❌')
      );      
    }
  },
};
