import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const reportsService = {
  createReport: async (reportData) => {
    try {
      const response = await apiClient.post('/reporte/crear', reportData);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error creando reporte de horas extra ❌')
      );
    }
  },

  exportExcelReport: async (reportData) => {
    try {
      const response = await apiClient.post('/reporte/exportar', reportData, {
        responseType: 'blob',
      });
      return response
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error exportando reporte de horas extra ❌'));      
    }
  },

  getReport: async () => {
    try {
      const response = await apiClient.get('/reporte/listar');
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error obteniendo reporte de horas extra ❌'));      
    }
  },
};
