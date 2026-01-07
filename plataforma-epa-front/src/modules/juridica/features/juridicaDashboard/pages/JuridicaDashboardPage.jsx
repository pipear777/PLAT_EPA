import { DashboardCards } from '@/components';
import { useJuridica } from '@/modules/juridica/context';

export const JuridicaDashboardPage = () => {
  const { totalRecords, totalHistoricalRecords } = useJuridica();

  return (
    <div className="flex flex-col gap-6 items-center lg:h-full">
      <h2 className="text-epaColor1 mt-4 text-center text-3xl font-extrabold lg:mt-15 lg:text-4xl">
        Pagina de Inicio Juridica
      </h2>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <DashboardCards title="Contratos Historico Registrados">
            <p className="text-5xl text-epaColor1 text-center font-extrabold">
              {totalHistoricalRecords}
            </p>
          </DashboardCards>
          <DashboardCards title="Contratos Registrados">
            <p className="text-5xl text-epaColor1 text-center font-extrabold">
              {totalRecords}
            </p>
          </DashboardCards>
        </div>
      </div>
    </div>
  );
};
