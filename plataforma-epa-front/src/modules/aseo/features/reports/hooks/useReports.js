import { useState } from "react";
import { useForm } from "react-hook-form"
import { reportsService } from "../services/reportsService";
import { tipoOperario } from "@/constants";

export const useReports = () => {

  const [reports, setReports] = useState([]);
  
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    try {
      const action = e.nativeEvent.submitter.name;

      if (action === 'generar') {
        const response = await reportsService.createReport(data);
        console.log('Log de la data ', response.data);

        setReports(response.data);
        console.log('Log del reporte ', reports);

        // setMostrarTabla(true);
      }

      if (action === 'excel') {
        const res = await reportsService.exportExcelReport(data);
        const contentDisposition = res.headers['content-disposition'];
        let filename = 'reporte_horas_extra.xlsx';

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/);
          if (match && match[1]) filename = match[1];
        }

        const blob = new Blob([res.data], {
          type: res.headers['content-type'],
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); 
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }

    } catch (error) {
      const message = error || 'Ocurrio un error generando el reporte';
      console.error(message);
    }    
  }

  return {
    // Properties
    errors,
    reports,
    tipoOperario,

    // Methods
    handleSubmit,
    onSubmit,
    register,
  }
}