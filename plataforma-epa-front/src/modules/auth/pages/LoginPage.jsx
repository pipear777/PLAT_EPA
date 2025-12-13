import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { GlobalButton, GlobalInput, LoadSpinner } from '@/components';
import { AuthLayout } from '../components';
import { authRoutesList } from '@/routes';
// import { Profiler } from 'react';
// import { onRenderCallback } from '@/profiler';

export const LoginPage = () => {
  const { 
    apiError,
    errors,
    loading,
    handleSubmit,
    onSubmit,
    register,
  } = useLogin();

  if(loading) {
    return (
      <LoadSpinner styles="fixed bg-gray-200/95" />
    );
  }

  return (
    <AuthLayout title="Iniciar Sesión">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        {/* -> 8. Muestra el error de la API si existe */}
        {apiError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}

        {/* <Profiler id="MiComponente" onRender={onRenderCallback}> Se utiliza para medir el rendimiento de cada componente */}
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
        {/* </Profiler> */}

        <GlobalInput
          type='password'
          label='Contraseña'
          data='password'
          classNameSpan='text-epaColor1 font-medium'
          classNameComponent='w-full p-1 border border-epaColor1 rounded-md'
          register={register}
          errors={errors} 
          rules={{
            required: 'La contraseña es obligatoria',
            minLength: { value: 8, message: 'Minimo 8 caracteres' },
          }}
        />
        <GlobalButton type="submit" className="w-full p-1.5 mb-4">
          Iniciar Sesión
        </GlobalButton>
      </form>
      <div className="text-center">
        <p>
          ¿No recuerda su contraseña? haga click{' '}
          <Link to={ authRoutesList.initiate } className="text-blue-500 font-bold">
            Aqui
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
