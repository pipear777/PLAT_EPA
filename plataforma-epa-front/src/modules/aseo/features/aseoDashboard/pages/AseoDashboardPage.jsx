import { DashboardCards, LoadSpinner } from '@/components';
import { useAseoDashboard } from '../hooks';
import { TrendingDown, TrendingUp } from 'lucide-react';

export const AseoDashboardPage = () => {
  const { loading, stats, porcentaje, totalRecords, workers } =
    useAseoDashboard();

  return (
    <div className="flex flex-col gap-6 items-center lg:h-full lg:gap-0">
      <h2 className="text-epaColor1 mt-4 text-3xl text-center font-extrabold lg:mt-15 sm:text-4xl">
        Pagina de Inicio Aseo
      </h2>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <DashboardCards title="Funcionarios Registrados">
            {loading ? (
              <LoadSpinner />
            ) : (
              <p className="text-3xl text-epaColor1 text-center font-extrabold lg:text-5xl">
                {workers.length}
              </p>
            )}
          </DashboardCards>
          <DashboardCards title="Registro Total de Horas">
            {loading ? (
              <LoadSpinner />
            ) : (
              <p className="text-3xl text-epaColor1 text-center font-extrabold lg:text-5xl">
                {totalRecords}
              </p>
            )}
          </DashboardCards>
          <DashboardCards title="Comparativa De Horas Extra En Los Ultimos Dos Meses">
            {loading ? (
              <LoadSpinner />
            ) : (
              <>
                <p className="text-epaColor1 font-semibold">Tendencia: </p>
                <div className='flex gap-2 lg:flex-col'>
                  <div
                    className={`flex gap-2 ${
                      porcentaje >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {porcentaje >= 0 ? <TrendingUp /> : <TrendingDown />}
                    {stats.tendencia}
                  </div>
                  <p
                    className={`text-3xl text-center font-extrabold lg:text-5xl ${
                      porcentaje >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stats?.porcentajeCambio}
                  </p>
                </div>
              </>
            )}
          </DashboardCards>
        </div>
      </div>
    </div>
  );
};
