import { GlobalButton, GlobalInput } from '@/components';
import { useRecoverPassword } from '../hooks/useRecoverPassword';
import { AuthLayout, SuccessErrorMessage } from '../components';

export const VerifyCodePage = () => {
  const {
    accessErrorMessages,
    errors,
    handleSubmit,
    onSubmitVerifyCode,
    register,
  } = useRecoverPassword();

  return (
    <AuthLayout title="Recuperar Contraseña">
      {accessErrorMessages.type && <SuccessErrorMessage message={accessErrorMessages} />}
      <form
        onSubmit={handleSubmit(onSubmitVerifyCode)}
        className='flex flex-col gap-4'
      >
        <GlobalInput
          label='Código de verificación'
          data='codigo'
          classNameSpan='text-epaColor1 font-medium'
          classNameComponent='w-full p-1 border border-epaColor1 rounded-md'
          register={register}
          errors={errors} 
          rules={{
            required: 'El código es obligatorio',
          }}
        />
        <GlobalButton type='submit' className='w-full p-1 mt-1 sm:p-1.5'>
          Verificar código
        </GlobalButton>
      </form>
    </AuthLayout>
  );
};
