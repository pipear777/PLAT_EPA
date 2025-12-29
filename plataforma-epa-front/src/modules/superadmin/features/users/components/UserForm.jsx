import { GlobalButton, GlobalInput } from '@/components';

export const UserForm = ({ roles, handleSubmit, onSubmit, register, errors }) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-1 bg-white p-4 rounded-xl shadow-2xl sm:w-1/2 sm:gap-4"
    >
      <GlobalInput
        label="Nombre"
        data="name"
        register={register}
        errors={errors}
        rules={{
          required: 'Campo Obligatorio',
        }}
      />
      <GlobalInput
        label="Identificación"
        data="identificacion"
        register={register}
        errors={errors}
        rules={{
          required: 'Campo Obligatorio',
        }}
      />
      <GlobalInput
        label="Correo Electronico"
        data="email"
        register={register}
        errors={errors}
        rules={{
          required: 'Campo Obligatorio',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Correo electrónico no válido',
          },
        }}
      />
      <GlobalInput
        label="Contraseña"
        type='password'
        data="password"
        register={register}
        errors={errors}
        rules={{
          required: 'Campo Obligatorio',
          minLength: { value: 8, message: 'Minimo 8 caracteres' },
        }}
      />
      <GlobalInput
        as="select"
        label="Rol"
        data="rol"
        register={register}
        errors={errors}
        rules={{
          required: 'Campo Obligatorio',
        }}
      >
        <option value="">Seleccione el proceso</option>
        {roles.map((rol, index) => (
          <option key={index} value={rol}>
            {rol}
          </option>
        ))}
      </GlobalInput>
      <GlobalButton type="submit" className="p-1.5 w-1/2 block mx-auto mt-5 sm:mt-1">
        Registrar
      </GlobalButton>
    </form>
  );
};
