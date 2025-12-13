import { apiClient } from "@/api"
import { handleAxiosError } from "@/utils";

export const contractTypeServices =  {
  createContractType : async (contractTypeData) => {
    try {
        const response = await apiClient.post('/tipoContrato/CreartipoContrato',contractTypeData)
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Error creando tipo de contrato ❌'));
    }
  },

  getAllContractType : async () => {
    try {
      const response = await apiClient.get('/tipoContrato/');
      return response.data
    } catch (error) {
      throw new Error(error, "Error listando los tipos de contratos ❌");
    }
  }
}