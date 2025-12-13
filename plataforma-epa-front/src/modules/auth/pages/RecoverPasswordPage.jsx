import { GlobalButton, GlobalInput } from '@/components';
import { AuthLayout, SuccessErrorMessage } from '../components';
import { useRecoverPassword } from '../hooks/useRecoverPassword';

export const RecoverPasswordPage = () => {
  const {
    accessErrorMessages,
    errors,
    handleSubmit,
    onClickBack,
    onSubmitRecoverPassword,
    register,
  } = useRecoverPassword();

  return (
    <AuthLayout title="Recuperar Contraseña">
      <SuccessErrorMessage message={accessErrorMessages} />
      <form
        onSubmit={handleSubmit(onSubmitRecoverPassword)}
        className='flex flex-col gap-4'
      >
        <GlobalInput
          label='Correo Electrónico'
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
        <GlobalButton
          type="submit"
          className="w-full p-1.5"
        >
          Enviar Código
        </GlobalButton>
        <GlobalButton
          variant="secondary"
          onClick={onClickBack} className="w-full p-1.5"
        >
          Regresar
        </GlobalButton>
      </form>
    </AuthLayout>
  );
};
