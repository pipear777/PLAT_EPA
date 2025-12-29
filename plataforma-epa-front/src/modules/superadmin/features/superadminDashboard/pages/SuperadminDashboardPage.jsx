import { DashboardCards } from '@/components';
import { aseoRoutesList, juridicaRoutesList } from '@/routes';
import { BrushCleaning, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SuperadminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center sm:h-full sm:gap-0">
      <h2 className="text-epaColor1 mt-4 text-3xl text-center font-extrabold sm:mt-15 sm:text-4xl">
        Pagina de Inicio Administrador
      </h2>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <Link to={aseoRoutesList.aseoDashboard}>
            <DashboardCards title="Modulo Aseo">
              <div className="flex justify-center text-epaColor1">
                <BrushCleaning className="w-16 h-16 lg:w-24 lg:h-24" />
              </div>
            </DashboardCards>
          </Link>
          <Link to={juridicaRoutesList.juridicaDashboard}>
            <DashboardCards title="Modulo Juridica">
              <div className="flex justify-center text-epaColor1">
                <Scale className="w-16 h-16 lg:w-24 lg:h-24" />
              </div>
            </DashboardCards>
          </Link>
        </div>
      </div>
    </div>
  );
};
