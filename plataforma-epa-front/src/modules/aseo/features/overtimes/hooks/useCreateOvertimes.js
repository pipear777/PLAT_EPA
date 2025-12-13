import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAseo } from '@/modules/aseo/context';
import { overtimesService } from '../services';


export const useCreateOvertimes = () => {
  const [state, setState] = useState()
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [overtimeRegister, setOvertimeRegister] = useState({});
  const [sheetNames, setSheetNames] = useState([]);
  const { workers } = useAseo();
  
  const fileInputRef = useRef(null);
  
  const {
    register: registerHoras,
    handleSubmit: handleSubmitHoras,
    reset: resetHoras,
    formState: { errors: errorsHoras },
  } = useForm();

  const {
    control: controlExcel,
    handleSubmit: handleSubmitExcel,
    reset: resetExcel,
    formState: { errors: errorsExcel },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await overtimesService.createOvertimes(data);
      setOvertimeRegister(response.data);
      resetHoras();
      setState('Registro Exitoso');
      setModalMessage(response.message);
    } catch (error) {
      setState('Error');
      setModalMessage(error.message);      
    } finally {
      setOpenModal(true);
    }
  };

  const onSubmitExcel = async (data) => {
    setLoading(true);
    const file = data.file;
    const sheetName = data.sheetName;

    if(!file) {
      setState('Error');
      setModalMessage('Seleccione un archivo de Excel');
      setOpenModal(true);
      return;
    }

    if(!sheetName) {
      setState('Error');
      setModalMessage('Seleccione una hoja del archivo Excel');
      setOpenModal(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('nombreHoja', sheetName)

    try {
      const response = await overtimesService.importOvertimesFromExcel(formData)
      setState('Registro Exitoso');
      setModalMessage(response.message || 'Archivo importado con exito');
    } catch (error) {
      setState('Error');
      setModalMessage(error.message || 'Error al importar el archivo');      
    } finally {
      resetExcel({ sheetName: '' });
      if (fileInputRef.current) fileInputRef.current.value= '';
      setLoading(false);
      setSheetNames([]);
      setOpenModal(true);
    }
  };

  const getExcelSheetNames = async (file) => {
    if(!file) {
      console.log('Seleccion un archivo de Excel');
      return;      
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await overtimesService.getExcelSheetNames(formData);
      setSheetNames(response.sheetNames);
    } catch (error) {
      setState('Error');
      setModalMessage(error.message);
      setOpenModal(true);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  }

  const onDeleteOvertimeRegister = () =>{
    setOvertimeRegister({});
  }
  
  return {
    
    controlExcel,
    errorsExcel,
    errorsHoras,
    fileInputRef,
    loading,
    modalMessage,
    openModal,
    overtimeRegister,
    sheetNames,
    state,
    workers,

    // Methods
    getExcelSheetNames,
    handleSubmitExcel,
    handleSubmitHoras,
    onCloseModal,
    onDeleteOvertimeRegister,
    onSubmit,
    onSubmitExcel,
    registerHoras,
  };
};
