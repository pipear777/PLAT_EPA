import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const overtimesService = {
  createOvertimes: async (extrasData) => {
    try {
      const response = await apiClient.post('/extras/crear', extrasData);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error creando horas extra ❌'));
    }
  },

  getAllOvertimes: async (page = 1, limit = 15) => {
    try {
      const params = new URLSearchParams({
        page: page,
        limit: limit,
      });
      const response = await apiClient.get(`/extras/listar?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error listando horas extra ❌'));
    }
  },

  getOvertimesByWorker: async (identificacion) => {
    try {      
      const response = await apiClient.get(`/extras/funcionario/${identificacion}`);
      console.log(response.data.success);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, `Error listando horas extra del funcionario con identificacion ${identificacion}`));      
    }
  },

  getOvertimesByDate: async (fechaInicio, fechaFin) => {
    try {
      const response = await apiClient.get(`/extras/fechas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      console.log(response.data.success);
      return response.data;      
    } catch (error) {
      throw new Error(handleAxiosError(error, `Error listando horas extra de ${fechaInicio} hasta ${fechaFin}`));      
    }
  },

  updateOvertimes: async (id, data) => {
    try {
      const response = await apiClient.put(`/extras/update/${id}`, data);
      console.log(response.data.message);
      return response.data
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error actualizando horas extra ❌'));
    }
  },

  deleteOvertimes: async (id) => {
    try {
      const response = await apiClient.delete(`/extras/delete/${id}`);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error eliminando horas extra ❌')
      );
    }
  },

  importOvertimesFromExcel: async (formData) => {
    try {
      const response = await apiClient.post('/extras/importar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data.message);
      return response.data      
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error importando horas extra ❌'));
    }
  },

  getExcelSheetNames: async (formData) => {
    try {
      const response = await apiClient.post('/extras/sheets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data.success);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error obteniendo hojas de excel ❌'));
    }
  },

  getOvertimesStats: async () => {
    try {
      const response = await apiClient.get('extras/reporteDosMeses');     
      return response.data
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error obteniendo estadisticas de horas extra'));      
    }
  }
};
