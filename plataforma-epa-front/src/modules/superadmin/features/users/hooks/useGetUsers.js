import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usersService } from '../services';
import { estado, ROLES } from '@/constants';

const roles = Object.values(ROLES);

export const useGetUsers = () => {
  const [filterValue, setFilterValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (success) {
      getUsers();
      setSuccess(false);
    }
  }, [success]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await usersService.getAllUsers();
      setUsers(response.usuarios);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUpdateModal = (user) => {
    reset({ ...user });
    setSelectedUserId(user._id);
    setUpdateModal(true);
  };

  const onSubmit = async (data) => {
    try {
      const response = await usersService.updateUser(selectedUserId, data);
      setSuccess(true);
      setAlertModal({
        open: true,
        message: response.message,
        status: 'Actualizacion Exitosa',
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      setAlertModal({
        open: true,
        message: error.message,
        status: 'Error',
      });
    }
  };

  const handleSearch = (showLoader = true) => {
    if (showLoader) setLoadingSearch(true);
    setTimeout(async () => {
      if (!filterValue.trim()) {
        getUsers();
        if (showLoader) setLoadingSearch(false);
        return;
      }
      try {
        const response = await usersService.getUserById(filterValue);
        console.log(response.data);
        setUsers(response.data || []);
        console.log('Funciona getUsersById');        
      } catch (error) {
        console.error(error);
        setUsers([]);
      } finally {
        if (showLoader) setLoadingSearch(false);
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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

  const closeModals = () => {
    setUpdateModal(false);
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
    estado,
    filterValue,
    loading,
    loadingSearch,
    roles,
    updateModal,
    users,

    // Methods
    closeAlertModal,
    closeModals,
    handleKeyDown,
    handleOpenUpdateModal,
    handleSearch,
    handleSubmit,
    onSubmit,
    register,
    setFilterValue,
  };
};
