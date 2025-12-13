import { GlobalInput, UpdateModal } from '@/components';

export const UserUpdateModal = ({
  updateModal,
  handleSubmit,
  onSubmit,
  register,
  errors,
  closeModal,
  roles,
  estado,
}) => {
  return (
    <UpdateModal
      isOpen={updateModal}
      title="Editar Usuario"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      closeModal={closeModal}
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
      <GlobalInput
        as="select"
        label="Estado"
        data="estadoUsuario"
        register={register}
        errors={errors}
        rules={{
          required: 'Campo Obligatorio',
        }}
      >
        <option value="">Seleccione el estado</option>
        {estado.map((est) => (
          <option key={est} value={est}>
            {est}
          </option>
        ))}
      </GlobalInput>
    </UpdateModal>
  );
};
