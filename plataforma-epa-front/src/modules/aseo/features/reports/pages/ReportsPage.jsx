import { GlobalButton, GlobalInput } from '@/components';
import { useReports } from '../hooks';
import { ReportsTable } from '../components';

export const ReportsPage = () => {
  const {
    // Properties
    errors,
    reports,
    tipoOperario,

    // Methods
    handleSubmit,
    onSubmit,
    register,
  } = useReports();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-epaColor1 text-center text-3xl font-extrabold sm:text-4xl">
        Reporte de Horas Extra
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row justify-between">
          <GlobalInput
            type="date"
            label="Fecha Inicio"
            data="fechaInicio"
            classNameLabel="flex flex-col sm:w-[30%] max-w-150"
            classNameComponent="bg-white p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          />
          <GlobalInput
            type="date"
            label="Fecha Fin"
            data="fechaFin"
            classNameLabel="flex flex-col sm:w-[30%] max-w-150"
            classNameComponent="bg-white p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          />
          <GlobalInput
            as="select"
            label="Tipo Operario"
            data="tipoOperario"
            classNameLabel="flex flex-col sm:w-[30%] max-w-150"
            classNameComponent="bg-white p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          >
            <option value="">Seleccione el tipo de operario</option>
            {tipoOperario.map((to) => (
              <option key={to} value={to}>
                {to}
              </option>
            ))}
          </GlobalInput>
        </div>
        <div className="flex justify-center gap-4">
          <GlobalButton
            className="w-full sm:w-[30%] max-w-150 p-1.5"
            type="submit"
            name="generar"
          >
            Generar Reporte
          </GlobalButton>
          <GlobalButton
            className="w-full sm:w-[30%] max-w-150 p-1.5"
            type="submit"
            name="excel"
          >
            Generar Reporte Excel
          </GlobalButton>
        </div>
      </form>
      <ReportsTable reports={reports} />
    </div>
  );
};
