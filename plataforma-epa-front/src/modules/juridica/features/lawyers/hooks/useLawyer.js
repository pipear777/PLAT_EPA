import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { lawyersServices } from '../services';
import { useJuridica } from '@/modules/juridica/context';
import { useAuth } from '@/context';

export const useLawyer = () => {
  const { auth } = useAuth();
  const { lawyers, updateLawyers } = useJuridica();
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    state: '',
  });
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedLawyerId, setSelectedLawyerId] = useState('');
  const [selectedNameLawyer, setSelectedNameLawyer] = useState('');

  const rol = auth?.user?.rol;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { errors: errorsUpdate },
    reset: resetUpdate,
  } = useForm();

  //Cuando uno hace una funcion de una sola linea, puede obviar las llaves y el return
  const openModal = () => setModal(true);

  const onSubmit = async (createData) => {
    try {
      const response = await lawyersServices.createLawyers(createData);
      setAlertModal({
        open: true,
        message: '¡Abogado creado con Éxito! ✅',
        state: 'Registro Exitoso',
      });
      updateLawyers((prev) =>
          [response, ...prev]
      );
      reset();
      setModal(false);
    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message,
        state: 'Error',
      });
    }
  };

  const onSubmitUpdateLawyer = async (updateData) => {
    try {
      await lawyersServices.updateLawyers(selectedLawyerId, updateData);
      setAlertModal({
        open: true,
        message: 'El abogado ha sido actualizado con Exito✅',
        state: 'Abogado Actualizado',
      });
      updateLawyers((prev) =>
        prev.map((item) =>
          item._id === selectedLawyerId ? {...item, ...updateData} : item
        )
      );
    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message || 'Error al actualizar el abogado. ❌',
        state: 'Error',
      });
    }
  };

  const closeModals = () => {
    setModal(false);
    setAlertModal({
      open: false,
      message: '',
      state: '',
    });
    setUpdateModal(false);
  };

  const openUpdateModal = (id) => {
    setSelectedLawyerId(id);
    const selectedLawyer = lawyers.find((l) => l._id === id);

    if (selectedLawyer) {
      setSelectedNameLawyer(selectedLawyer.nombreAbogado);
      resetUpdate({
        identificacion: selectedLawyer.identificacion || '',
        nombreAbogado: selectedLawyer.nombreAbogado || '',
        EstadoAbogado: selectedLawyer.EstadoAbogado || '',
      });
    }
    setUpdateModal(true);
  };

  return {
    // Properties
    alertModal,
    errors,
    errorsUpdate,
    modal,
    selectedNameLawyer,
    updateModal,
    rol,

    // Methods
    closeModals,
    handleSubmit,
    handleSubmitUpdate,
    openModal,
    onSubmitUpdateLawyer,
    openUpdateModal,
    onSubmit,
    register,
    registerUpdate,
  };
};
