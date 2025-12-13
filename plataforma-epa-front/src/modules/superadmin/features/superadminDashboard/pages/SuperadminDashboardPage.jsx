import { DashboardCards } from '@/components';
import { aseoRoutesList, juridicaRoutesList } from '@/routes';
import { BrushCleaning, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SuperadminDashboardPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-epaColor1 text-center text-4xl font-extrabold mt-15">
        Pagina de Inicio Administrador
      </h2>
      <div className="flex flex-col gap-20 justify-center items-center h-full">
        <div className="grid grid-cols-2 gap-12">
          <Link to={aseoRoutesList.aseoDashboard}>
            <DashboardCards title="Modulo Aseo">
              <div className="flex justify-center text-epaColor1">
                <BrushCleaning size={100} />
              </div>
            </DashboardCards>
          </Link>
          <Link to={juridicaRoutesList.juridicaDashboard}>
            <DashboardCards title="Modulo Juridica">
              <div className="flex justify-center text-epaColor1">
                <Scale size={100} />
              </div>
            </DashboardCards>
          </Link>
        </div>
      </div>
    </div>
  );
};
