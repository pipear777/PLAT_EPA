import { AuthLayout, SuccessErrorMessage } from '../components';
import { useRecoverPassword } from '../hooks/useRecoverPassword';
import { GlobalButton, GlobalInput } from '@/components';

export const ResetPasswordPage = () => {
  const {
    accessErrorMessages,
    email,
    errors,
    handleSubmit,
    onSubmitResetPassword,
    register,
  } = useRecoverPassword();

  return (
    <AuthLayout title="Recuperar Contraseña">
      {accessErrorMessages.type && <SuccessErrorMessage message={accessErrorMessages} />}
        <form 
          onSubmit={handleSubmit(onSubmitResetPassword)}
          className='flex flex-col gap-4'
        >
          <GlobalInput
            label='Correo Electrónico'
            defaultValue={email}
            data='email'
            classNameSpan='text-epaColor1 font-medium'
            classNameComponent='w-full p-1 border border-epaColor1 rounded-md'
            register={register}
            errors={errors} 
            rules={{
              required: 'El correo electronico es obligatorio',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Correo electrónico no válido",
              }
            }}
          />
          <GlobalInput
            type='password'
            label='Nueva Contraseña'
            data='nuevaPassword'
            classNameSpan='text-epaColor1 font-medium'
            classNameComponent='w-full p-1 border border-epaColor1 rounded-md'
            register={register}
            errors={errors} 
            rules={{
              required: 'La contraseña es obligatoria',
              minLength: { value: 8, message: 'Minimo 8 caracteres' },
            }}
          />
          <GlobalInput
            type='password'
            label='Confirmar Contraseña'
            data='confirmarPassword'
            classNameSpan='text-epaColor1 font-medium'
            classNameComponent='w-full p-1 border border-epaColor1 rounded-md'
            register={register}
            errors={errors} 
            rules={{
              required: 'La contraseña es obligatoria',
              minLength: { value: 8, message: 'Minimo 8 caracteres' },
            }}
          />
          <GlobalButton type='submit' className='w-full p-1.5'>
            Cambiar Contraseña
          </GlobalButton>
        </form>
    </AuthLayout>
  );
};
