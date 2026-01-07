import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { authService } from '../services/authService';
import { aseoRoutesList } from '@/routes';

export const useLogin = () => {
  const navigate = useNavigate();
  const {
    login,
    accessErrorMessages,
    setAccessErrorMessages,
    email,
    setEmail,
  } = useAuth();
  
  const [loading, setLoading] = useState(false);

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
      setAccessErrorMessages({ type: '', text: '' });
      setEmail('');
      navigate(aseoRoutesList.aseoDashboard);
    } catch (error) {
      console.error(error);
      setAccessErrorMessages({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    // Properties
    loading,
    errors,
    accessErrorMessages,
    email,

    // Methods
    register,
    handleSubmit,
    onSubmit,
  };
};
