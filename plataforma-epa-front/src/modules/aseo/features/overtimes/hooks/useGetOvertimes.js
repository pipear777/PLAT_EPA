import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAseo } from '@/modules/aseo/context';
import { overtimesService } from '../services';

export const useGetOvertimes = () => {
  const {
    overtimes,
    currentPage,
    totalPages,
    totalRecords,
    loadingOvertimes,
    getAllOvertimes,
    handlePageChange,
    setOvertimes,
    setTotalRecords,
  } = useAseo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [filterValue, setFilterValue] = useState('');
  const [overtimesFilter, setOvertimesFilter] = useState(overtimes || []);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [showPagination, setShowPagination] = useState(true);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState('');
  const [state, setState] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllOvertimes(currentPage, false);
  }, [currentPage]);

  useEffect(() => {
    setOvertimesFilter(overtimes);
  }, [overtimes]);

  const onSubmitUpdate = async (updateData) => {
    try {
      const response = await overtimesService.updateOvertimes(
        selectedId,
        updateData
      );
      setOvertimes((prev) =>
        prev.map((item) =>
          item._id === selectedId ? { ...item, ...updateData } : item
        )
      );
      setState(response.success ? 'Registro Actualizado' : 'Error');
      setAlertModalMessage(response.message);
      setSuccess(response.success);
    } catch (error) {
      setState('Error');
      setAlertModalMessage(error.message);
    } finally {
      setOpenAlertModal(true);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await overtimesService.deleteOvertimes(selectedId);
      setOvertimes(prev => prev.filter(item => item._id !== selectedId));
      setTotalRecords(prev => prev - 1);
      setState(response.success ? 'Registro Eliminado' : 'Error');
      setAlertModalMessage(response.message);
      setSuccess(response.success);
    } catch (error) {
      console.error('Error eliminando:', error);
      setState('Error');
      setAlertModalMessage(error.message);
    } finally {
      setOpenAlertModal(true);
    }
  };

  const handleSearch = (showLoader = true) => {
    if (showLoader) setLoading(true);
    setTimeout(async () => {
      if (!filterValue.trim()) {
        getAllOvertimes(currentPage);
        setOvertimesFilter(overtimes);
        setShowPagination(true);
        if (showLoader) setLoading(false);
        return;
      }

      try {
        const response = await overtimesService.getOvertimesByWorker(
          filterValue
        );
        setOvertimesFilter(response.data);
        setShowPagination(false);
        console.log('Si funcionó handleSearch');
      } catch (error) {
        console.error(error);
        setOvertimesFilter([]);
        setShowPagination(false);
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

  const OpenUpdateModal = (idOvertime) => {
    setSelectedId(idOvertime);

    const selectedRegister = overtimesFilter.find(
      (reg) => reg._id === idOvertime
    );
    const formatDate = (dateString) => dateString?.split('T')[0] || '';

    if (selectedRegister) {
      setSelectedName(selectedRegister.FuncionarioAsignado.nombre_completo);
      reset({
        fecha_inicio_trabajo: formatDate(selectedRegister.fecha_inicio_trabajo),
        hora_inicio_trabajo: selectedRegister.hora_inicio_trabajo || '',
        fecha_fin_trabajo: formatDate(selectedRegister.fecha_fin_trabajo),
        hora_fin_trabajo: selectedRegister.hora_fin_trabajo || '',
        fecha_inicio_descanso: formatDate(
          selectedRegister.fecha_inicio_descanso
        ),
        hora_inicio_descanso: selectedRegister.hora_inicio_descanso || '',
        fecha_fin_descanso: formatDate(selectedRegister.fecha_fin_descanso),
        hora_fin_descanso: selectedRegister.hora_fin_descanso || '',
        es_festivo_Inicio: selectedRegister.es_festivo_Inicio || false,
        es_festivo_Fin: selectedRegister.es_festivo_Fin || false,
      });
    }

    setUpdateModal(true);
  };

  const onOpenConfirmModal = (idOvertime) => {
    setSelectedId(idOvertime);
    setOpenConfirmModal(true);
  };

  const closeModals = () => {
    setSelectedId('');
    setSelectedName('');
    setAlertModalMessage('');
    setSuccess(false);
    setUpdateModal(false);
    setOpenConfirmModal(false);
  };

  const closeAlertModal = () => {
    if (success) {
      closeModals();
    }

    setOpenAlertModal(false);
  };
  
  return {
    // Properties
    alertModalMessage,
    currentPage,
    errors,
    filterValue,
    loading,
    loadingOvertimes,
    openAlertModal,
    openConfirmModal,
    overtimesFilter,
    selectedName,
    showPagination,
    state,
    totalPages,
    totalRecords,
    updateModal,

    // Methods
    closeAlertModal,
    closeModals,
    handleDelete,
    handleKeyDown,
    handlePageChange,
    handleSearch,
    handleSubmit,
    onOpenConfirmModal,
    onSubmitUpdate,
    OpenUpdateModal,
    register,
    setFilterValue,
  };
};
