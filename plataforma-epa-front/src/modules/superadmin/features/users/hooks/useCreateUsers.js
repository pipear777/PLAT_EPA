import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usersService } from '../services';
import { ROLES } from '@/constants';

const roles = Object.values(ROLES);

export const useCreateUsers = () => {
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

  const onSubmit = async (data) => {
    try {
      await usersService.createUsers(data);
      setAlertModal({
        open: true,
        message: 'El usuario ha sido registrado exitosamente',
        status: 'Usuario Registrado',
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

  const closeModal = () => {
    setAlertModal({
      open: false,
      message: '',
      status: '',
    });
  };

  return {
    // Properties
    alertModal,
    errors,
    roles,

    // Methods
    closeModal,
    handleSubmit,
    onSubmit,
    register,
    reset,
  };
};
