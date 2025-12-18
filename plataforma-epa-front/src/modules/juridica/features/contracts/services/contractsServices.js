import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const contractsServices = {
  createContracts: async (contractsData) => {
    try {
      const response = await apiClient.post(
        '/contrato/crearContrato',
        contractsData
      );
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error creando contrato ❌'));
    }
  },

  getAllContracts: async (page = 1, limit = 15) => {
    try {
      const response = await apiClient.get('/contrato/filtro', {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error listando contratos ❌'));
    }
  },

  getFilteredContracts: async (filters) => {
    try {
      const response = await apiClient.get('/contrato/filtro', {
        params: {
          ...filters, // Enviar solo el filtro que toque
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error listando contratos ❌'));
    }
  },

  updateContracts: async (id, data) => {
    try {
      const response = await apiClient.put(`/contrato/update/${id}`, data);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);

      throw new Error(
        handleAxiosError(error, 'Error actualizando contrato ❌')
      );
    }
  },

  overrideContracts: async (id) => {
    try {
      const response = await apiClient.post(`/contrato/anular/${id}`);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error anulando contrato ❌'));
    }
  },

  // MODIFICACIONES
  addModifications: async (id, modificationsData) => {
    try {
      const response = await apiClient.post(`/modificaciones/${id}`, modificationsData);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error creando modificacion ❌'));
    }
  },

  getModifications: async (id) => {
    try {
      const response = await apiClient.get(`/modificaciones/listar/${id}`);   
      return response.data
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error listando modificaciones ❌'));
    }
  },

  updateModifications: async (id) => {
    try {
      const response = await apiClient.put(`/modificaciones/update/${id}`);
      return response.data
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error actualizando modificacion ❌'));
    }
  },


  //PROCESOS
  getAllProcess: async () => {
    try {
      const response = await apiClient.get('/procesos/');
      return response.data;
    } catch (error) {
      throw new Error(error, 'Error listando los procesos ❌');
    }
  },

  //CARDS DE RESUMEN
  getContractSummaries: async () => {
    try {
      const response = await apiClient.get('/contrato/resumen');
      return response.data;
    } catch (error) {
      throw new Error(error, 'Error listando el resumen ❌');
    }
  },
};
