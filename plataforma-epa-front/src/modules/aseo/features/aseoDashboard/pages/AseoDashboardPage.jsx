import { DashboardCards, LoadSpinner } from '@/components';
import { useAseoDashboard } from '../hooks';
import { TrendingDown, TrendingUp } from 'lucide-react';

export const AseoDashboardPage = () => {
  const { loading, stats, porcentaje, totalRecords, workers } = useAseoDashboard();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-epaColor1 text-center text-4xl font-extrabold mt-15">
        Pagina de Inicio Aseo
      </h2>
      <div className="flex flex-col gap-20 justify-center items-center h-full">
        <div className="grid grid-cols-3 gap-5">
          <DashboardCards title="Funcionarios Registrados">
            {loading ? (
              <LoadSpinner />
            ) : (
              <p className="text-5xl text-epaColor1 text-center font-extrabold">
                {workers.length}
              </p>
            )}
          </DashboardCards>
          <DashboardCards title="Registro Total de Horas">
            {loading ? (
              <LoadSpinner />
            ) : (
              <p className="text-5xl text-epaColor1 text-center font-extrabold">
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
                <div
                  className={`flex gap-2 ${
                    porcentaje >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {porcentaje >= 0 ? <TrendingUp /> : <TrendingDown />}
                  {stats.tendencia}
                </div>
                <p
                  className={`text-5xl text-center font-extrabold ${
                    porcentaje >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stats?.porcentajeCambio}
                </p>
              </>
            )}
          </DashboardCards>
        </div>
      </div>
    </div>
  );
};
