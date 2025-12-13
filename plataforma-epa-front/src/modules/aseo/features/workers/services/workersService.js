import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const workersService = {
  createWorker: async (workerData) => {
    try {
      const response = await apiClient.post(
        '/funcionario/crearfuncionario',
        workerData
      );
      console.log('Registro de funcionario exitoso');
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error creando funcionario ❌'));
    }
  },

  updateWorker: async (id, workerData) => {
    try {
      const response = await apiClient.put(
        `/funcionario/actualizar/${id}`,
        workerData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error actualizando el funcionario ❌')
      );
    }
  },

  getAllWorkers: async () => {
    try {
      const response = await apiClient.get('/funcionario');
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error listando los funcionarios ❌')
      );
    }
  },

  getWorkerById: async (id) => {
    try {
      const response = await apiClient.get(`/funcionario/obtener/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(
          error,
          `Error obteniendo el funcionario con id: ${id} ❌`
        )
      );
    }
  },

  getAllActiveWorkers: async () => {
    try {
      const response = await apiClient.get('funcionario/activos');
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(
          error,
          'Error obteniendo todos los funcionarios activos ❌'
        )
      );
    }
  },

  createJobPosition: async (data) => {
    try {
      const response = await apiClient.post('/cargos/crearCargo', data);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, `Error creando el cargo ${data} ❌`)
      );
    }
  },

  getAllJobPositions: async () => {
    try {
      const response = await apiClient.get('/cargos/listar');
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error obteniendo todos los cargos ❌')
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
};
