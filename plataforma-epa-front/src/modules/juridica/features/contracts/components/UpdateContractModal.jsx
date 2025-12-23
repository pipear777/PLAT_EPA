import { GlobalInput } from '@/components';

export const UpdateContractModal = ({
  register,
  errors,
  lawyers,
  contractType,
  process,
}) => {
  return (
    <div>
      <GlobalInput
        type="text"
        label="Identidad O Nit"
        data="identificacionOnit"
        register={register}
        errors={errors}
        rules={{
          required: 'Este campo es obligatorio',
        }}
      />

      <GlobalInput
        type="text"
        label="Nombre del Contratista"
        data="NombreContratista"
        register={register}
        errors={errors}
        rules={{
          required: 'Este campo es obligatorio',
        }}
      />

      <GlobalInput
        type="text"
        label="Telefono del Contratista"
        data="TelefonoContratista"
        register={register}
        errors={errors}
        rules={{
          required: 'Este campo es obligatorio',
        }}
      />

      <GlobalInput
        as="select"
        type="text"
        label="Proceso"
        data="proceso"
        register={register}
        errors={errors}
        rules={{
          required: 'Este campo es obligatorio',
        }}
      >
        <option value="">Seleccione un proceso</option>
        {process.map((p) => (
          <option key={p._id} value={p._id}>
            {p.nombreProceso}
          </option>
        ))}
      </GlobalInput>

      <GlobalInput
        type="email"
        label="Correo de Dependencia"
        data="CorreoDependencia"
        register={register}
        errors={errors}
      />

      <div className="flex justify-between gap-4">
        <GlobalInput
          as="select"
          type="text"
          label="Tipo de Contrato"
          data="tipoContrato"
          classNameLabel="flex flex-col w-full"
          register={register}
          errors={errors}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        >
          <option value="">Seleccione una opcion</option>
          {contractType.map((ct) => (
            <option key={ct._id} value={ct._id}>
              {ct.nombre}
            </option>
          ))}
        </GlobalInput>

        <GlobalInput
          as="select"
          type="text"
          label="Abogado"
          data="AbogadoAsignado"
          classNameLabel="flex flex-col w-full"
          register={register}
          errors={errors}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        >
          <option value="">Selecciona una opcion</option>
          {lawyers.map((l) => (
            <option key={l._id} value={l._id}>
              {l.nombreCompletoAbogado}
            </option>
          ))}
        </GlobalInput>
      </div>

      <GlobalInput
        as="textarea"
        type="text"
        label="Objeto"
        data="objeto"
        classNameComponent="border border-gray-500 rounded-md p-1 resize-none h-25"
        register={register}
        errors={errors}
        rules={{
          required: 'Este campo es obligatorio',
        }}
      />

      <GlobalInput
        type="text"
        label="Valor del Contrato"
        data="ValorContrato"
        register={register}
        errors={errors}
        rules={{
          required: 'Este campo es obligatorio',
        }}
      />

      <div className="flex justify-between gap-4">
        <GlobalInput
          type="date"
          label="Fecha de Inicio"
          data="FechaInicio"
          classNameLabel="flex flex-col w-full"
          register={register}
          errors={errors}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />

        <GlobalInput
          type="date"
          label="Fecha de Finalizacion"
          data="FechaFinalizacion"
          classNameLabel="flex flex-col w-full"
          register={register}
          errors={errors}
          rules={{
            required: 'Este campo es obligatorio',
          }}
        />
      </div>
    </div>
  );
};
