import { useAseo } from '@/modules/aseo/context';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { workersService } from '../services';
import { estado, tipoOperario } from '@/constants';

export const useGetWorkers = () => {
  const { workers, jobPositions, departaments, locations, getAllWorkers } =
    useAseo();
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    status: '',
  });  

  useEffect(() => {
    setFilteredWorkers(workers);
  }, [workers]);

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm();

  const handleOpenForm = (worker) => {
    setSelectedWorker(worker);
    reset({
      ...worker,
      Cargo: worker.Cargo?._id || '',
      ProcesoAsignado: worker.ProcesoAsignado?._id || '',
      SedeAsignada: worker.SedeAsignada?._id || '',
    });
    setUpdateModal(true);
  };

  const onSubmit = async (data) => {
    try {
      const response = await workersService.updateWorker(
        selectedWorker._id,
        data
      );
      console.log(response);
      
      setAlertModal({
        open: true,
        message: `La actualización del funcionario ${response?.data?.nombre_completo} ha sido exitosa`,
        status: 'Actualización Exitosa',
      });
      getAllWorkers();
    } catch (error) {
      console.log('Error Actualizando Funcionario', error);
      setAlertModal({
        open: true,
        message: error.message,
        status: 'Error',
      });
    }
  };

  const handleSearch = (showLoader = true) => {
    if (showLoader) setLoading(true);
    setTimeout(async () => {
      if (!filterValue.trim()) {
        setFilteredWorkers(workers);
        if (showLoader) setLoading(false);
        return;
      }
      try {
        const response = await workersService.getWorkerById(filterValue);
        setFilteredWorkers([response.data]);
      } catch (error) {
        console.error(error);
        setFilteredWorkers([]);
      } finally {
        if (showLoader) setLoading(false);
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getActiveWorkers = async () => {
    try {
      const response = await workersService.getAllActiveWorkers();
      setFilteredWorkers(response.data);
    } catch (error) {
      console.error('Error filtrando funcionarios activos', error);
    }
  };

  const closeModals = () => {
    setUpdateModal(false);
    setAlertModal({
      open: false,
      message: '',
      status: '',
    });
  };

  const closeAlertModal = () => {
    if (alertModal.status === 'Error') {
      setAlertModal({
        open: false,
        message: '',
        status: '',
      });

      return;
    }

    closeModals();
  };

  return {
    // Properties
    alertModal,
    control,
    departaments,
    errors,
    estado,
    filteredWorkers,
    filterValue,
    jobPositions,
    loading,
    locations,
    selectedWorker,
    tipoOperario,
    updateModal,
    workers,

    // Methods
    closeAlertModal,
    closeModals,
    getActiveWorkers,
    handleKeyDown,
    handleOpenForm,
    handleSearch,
    handleSubmit,
    onSubmit,
    register,
    setFilterValue,
  };
};
