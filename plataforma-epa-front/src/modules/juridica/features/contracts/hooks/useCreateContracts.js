import { useState } from 'react';
import { contractsServices, contractTypeServices } from '../services';
import { useForm } from 'react-hook-form';
import { useJuridica } from '@/modules/juridica/context';

export const useCreateContracts = () => {
  const { lawyers, process, contractType, getAllContractType } = useJuridica();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    register: registerContractType,
    handleSubmit: handleSubmitContractType,
    formState: { errors: errorsContractType },
    reset: resetContractType,
  } = useForm();

  const [contractTypeModal, setContractTypeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    state: '',
  });

  const openContractTypeModal = () => setContractTypeModal(true);

  const onSubmit = async (createData) => {
    setLoading(true);
    try {
      await contractsServices.createContracts(createData);
      setAlertModal({
        open: true,
        message: '¡Contrato creado con Exito ✅!',
        state: 'Registro Exitoso',
      });
      reset();
    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message,
        state: 'Error',
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitContractType = async (createData) => {
    try {
      await contractTypeServices.createContractType(createData);
      setAlertModal({
        open: true,
        message: '¡Tipo de Contrato creado con Exito ✅',
        state: 'Registro Exitoso',
      });
      resetContractType();
      // ES PARA ACTUALIZAR EL CONTEXTO Y DE UNA VEZ TRAIGA EL QUE SE ACABO DE AGREGAR
      getAllContractType();
      setContractTypeModal(false);
    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message || 'Error al crear el Tipo de Contrato. ❌',
        state: 'Error',
      });
    } finally {
      setContractTypeModal(true);
    }
  };

  const closeModals = () => {
    setAlertModal({
      open: false,
      message: '',
      state: '',
    });
    setContractTypeModal(false);
  };

  return {
    // Properties
    alertModal,
    contractType,
    errors,
    errorsContractType,
    handleSubmit,
    handleSubmitContractType,
    lawyers,
    loading,
    contractTypeModal,
    register,
    registerContractType,
    process,

    // Methods
    onSubmit,
    onSubmitContractType,
    closeModals,
    openContractTypeModal,
  };
};
