import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { authService } from '../services/authService';
import { aseoRoutesList } from '@/routes';

export const useLogin = () => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      login(response.token, response.user);
      navigate(aseoRoutesList.aseoDashboard);
    } catch (error) {
      console.error(error);
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    // Properties
    apiError,
    errors,
    loading,

    // Methods
    handleSubmit,
    onSubmit,
    register,
  };
};
