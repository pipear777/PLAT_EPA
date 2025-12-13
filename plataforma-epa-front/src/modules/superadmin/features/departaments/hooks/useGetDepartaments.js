import { useEffect, useState } from 'react';
import { departamentsService } from '../services';
import { useForm } from 'react-hook-form';

export const useGetDepartaments = () => {
  const [departaments, setDepartaments] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  // const [selectedDepartament, setSelectedDepartament] = useState({});
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    status: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate },
  } = useForm();

  useEffect(() => {
    getDepartaments();
  }, []);

  useEffect(() => {
    if (success) {
      getDepartaments();
      setSuccess(false);
    }
  }, [success]);

  const getDepartaments = async () => {
    setLoading(true);
    try {
      const response = await departamentsService.getAllDepartaments();
      setDepartaments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await departamentsService.createDepartaments(data);
      console.log('Respuesta del servicio: ', response);
      setSuccess(true);
      setAlertModal({
        open: true,
        message: `El proceso ${response?.data?.nombreProceso} ha sido registrado con exito`,
        status: 'Proceso Creado con Exito',
      });
      reset();
    } catch (error) {
      console.error(error);
      setAlertModal({
        open: true,
        message: error.message,
        status: 'Error',
      });
    }
  };

  const onUpdateSubmit = async (data) => {
    try {
      const response = await departamentsService.updateDepartaments(data);
      console.log('Respuesta del servicio: ', response);
      setSuccess(response.success);
      setAlertModal({
        open: response.success,
        message: `Proceso actualizado con exito`,
        status: 'Registro Exitoso',
      });
      resetUpdate();
    } catch (error) {
      console.error(error);
      setAlertModal({
        open: true,
        message: error.message,
        status: 'Error',
      });
    }
  };

  const handleOpenCreateModal = () => {
    setCreateModal(true);
  };

  const handleOpenUpdateModal = (departament) => {
    // setSelectedDepartament(departament);
    resetUpdate({
      ...departament,
      nombreProceso: departament.nombreProceso || '',
    });
    setUpdateModal(true);
  };

  const closeModals = () => {
    setCreateModal(false);
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
    createModal,
    departaments,
    errors,
    errorsUpdate,
    loading,
    updateModal,

    // Methods
    closeAlertModal,
    closeModals,
    handleOpenCreateModal,
    handleOpenUpdateModal,
    handleSubmit,
    handleSubmitUpdate,
    onSubmit,
    onUpdateSubmit,
    register,
    registerUpdate,
  };
};
