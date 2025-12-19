import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authService } from '../services/authService';
import { useAuth } from '@/context/AuthContext';
import { authRoutesList } from '@/routes';

export const useRecoverPassword = () => {
  const navigate = useNavigate();

  const { accessErrorMessages, setAccessErrorMessages, email, setEmail } =
    useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitRecoverPassword = async (data) => {
    try {
      const response = await authService.solicitarResetPassword(data);
      setAccessErrorMessages({ type: 'success', text: response.msg });
      setEmail(data.email);
      navigate(authRoutesList.code);
    } catch (error) {
      console.error(error);
      setAccessErrorMessages({ type: 'error', text: error.message });
      reset();
    }
  };

  const onSubmitVerifyCode = async (data) => {
    try {
      const response = await authService.verificarCodigo({
        email,
        codigo: data.codigo,
      });
      setAccessErrorMessages({ type: 'success', text: response.msg });
      navigate(authRoutesList.reset);
    } catch (error) {
      setAccessErrorMessages({ type: 'error', text: error.message });
      reset();
    }
  };

  const onSubmitResetPassword = async (data) => {
    try {
      const response = await authService.resetPassword(data);
      setAccessErrorMessages({ type: 'success', text: response.msg });
      navigate(authRoutesList.login);
      reset();
    } catch (error) {
      setAccessErrorMessages({ type: 'error', text: error.message });
    }
  };

  const onClickBack = () => {
    navigate(-1);
    setAccessErrorMessages({ type: '', text: '' });
  };

  return {
    // Properties
    accessErrorMessages,
    email,
    errors,

    // Methods
    register,
    handleSubmit,
    onSubmitRecoverPassword,
    onSubmitVerifyCode,
    onSubmitResetPassword,
    onClickBack,
  };
};
