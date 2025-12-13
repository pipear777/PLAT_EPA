import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const historicalServices = {
  getCleanContracts: async (page = 1, limit = 15) => {
    try {
      const response = await apiClient.get('/datos/contratosLimpios', {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error listando los contratos ❌')
      );
    }
  },

  getContractsByType: async (type, page = 1, limit = 15) => {
    try {
      const response = await apiClient.get(`/datos/filtroCon/${type}`, {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error filtrando contratos por tipo de contrato ❌'));
    }
  },

  getContractsByContractorName : async (name, page = 1, limit = 15) => {
    try {
      const response = await apiClient.get(`/datos/contratista/${name}`, {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error filtrando contratos por nombre del contratista ❌'));
    }
  },

  getContractsByAnio: async (anio, page = 1, limit = 15) => {
    try {
      const response = await apiClient.get(`/datos/fecha/${anio}`, {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error filtrando contratos por año ❌'));
    }
  },


  getAnios:async () => {
    try {
      const response = await apiClient.get(`/datos/anios`);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error listando los años ❌'));
    }
  },
};
