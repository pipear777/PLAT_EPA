import { GlobalInput } from "@/components";

export const TimesAndDatesRecorded = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex justify-between items-center">
        <GlobalInput
          type="date"
          label="Fecha Inicio Trabajo"
          data="fecha_inicio_trabajo"
          classNameLabel="flex flex-col w-3/4"
          register={register}
          errors={errors}
          rules={{
            required: 'Campo Obligatorio',
          }}
        />
        <GlobalInput
          type="checkbox"
          label="Festivo"
          data="es_festivo_Inicio"
          register={register}
          errors={errors}
        />
      </div>
      <GlobalInput
        type="time"
        label="Hora Inicio Trabajo"
        data="hora_inicio_trabajo"
        register={register}
        errors={errors}
        rules={{
          required: 'Campo Obligatorio',
        }}
      />
      <div className="flex justify-between items-center">
        <GlobalInput
          type="date"
          label="Fecha Fin Trabajo"
          data="fecha_fin_trabajo"
          classNameLabel="flex flex-col w-3/4"
          register={register}
          errors={errors}
          rules={{
            required: 'Campo Obligatorio',
          }}
        />
        <GlobalInput
          type="checkbox"
          label="Festivo"
          data="es_festivo_Fin"
          register={register}
          errors={errors}
        />
      </div>
      <GlobalInput
        type="time"
        label="Hora Fin Trabajo"
        data="hora_fin_trabajo"
        register={register}
        errors={errors}
        rules={{
          required: 'Campo Obligatorio',
        }}
      />
      <GlobalInput
        type="date"
        label="Fecha Inicio Descanso"
        data="fecha_inicio_descanso"
        register={register}
        errors={errors}
      />
      <GlobalInput
        type="time"
        label="Hora Inicio Descanso"
        data="hora_inicio_descanso"
        register={register}
        errors={errors}
      />
      <GlobalInput
        type="date"
        label="Fecha Fin Descanso"
        data="fecha_fin_descanso"
        register={register}
        errors={errors}
      />
      <GlobalInput
        type="time"
        label="Hora Fin Descanso"
        data="hora_fin_descanso"
        register={register}
        errors={errors}
      />
    </div>
  );
};
