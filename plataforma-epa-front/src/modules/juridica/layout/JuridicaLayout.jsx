import { Link, Outlet } from 'react-router-dom';
import {
  UserCheck,
  House,
  Folders,
  Users,
  NotebookPen,
  Building2,
  LogOut,
  UserStar,
} from 'lucide-react';
import { GlobalButton } from '@/components';
import { useAuth } from '@/context/AuthContext';
import logo from '@/assets/logoepa.png';
import { juridicaRoutesList, superadminRoutesList } from '@/routes';
import { JuridicaProvider } from '../context/JuridicaContext';
import { ROLES } from '@/constants';

const currentYear = new Date().getFullYear();

export const JuridicaLayout = () => {
  const { auth, logout } = useAuth();

  const isSuperAdmin = auth?.user?.rol === ROLES.SUPER_ADMIN;
  const isNormalUser = auth?.user?.rol === ROLES.USER_JURIDICA;

  return (
    <JuridicaProvider>
      <div className="flex h-screen">
        <div className="bg-gray-50 w-1/6 flex flex-col p-4 border-r border-gray-300">
          <div className="space-y-4 pb-10 text-center">
            <img src={logo} alt="Logo EPA" />
            <h3 className="text-epaColor1 text-lg font-bold">Menu Principal</h3>
            <h4 className="font-medium">Version 1.0</h4>
          </div>
          <nav className="space-y-4 pb-10">
            {/* Inicio */}
            <div className="text-epaColor1 font-medium">
              <Link
                className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-2"
                to={juridicaRoutesList.juridicaDashboard}
              >
                <House size={20} />
                Inicio
              </Link>
            </div>

            <div className="text-epaColor1 font-medium">
              <Link
                className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-2"
                to={
                  isNormalUser
                    ? juridicaRoutesList.listContracts
                    : juridicaRoutesList.contracts
                }
              >
                <NotebookPen size={20} />
                Contratos
              </Link>
            </div>

            <div className="text-epaColor1 font-medium">
              <Link
                to={juridicaRoutesList.lawyers}
                className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-1"
              >
                <Users size={18} />
                Abogados
              </Link>
            </div>

            <div className="text-epaColor1 font-medium">
              <Link
                to={juridicaRoutesList.historical}
                className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-1"
              >
                <Folders size={18} />
                Histórico
              </Link>
            </div>
          </nav>
          <GlobalButton
            variant="danger"
            onClick={logout}
            className="flex justify-center p-1.5 w-38 mx-auto"
          >
            <LogOut className="mr-2" />
            Cerrar Sesión
          </GlobalButton>
        </div>

        <div className="flex flex-col w-full">
          <header className="bg-epaColor1 flex p-6">
            <div className="w-2/10"></div>
            <h2 className="w-full text-white text-center font-bold text-3xl">
              Plataforma EPA - Modulo Juridica
            </h2>
            <div className="w-2/10 flex text-white text-sm items-center justify-end gap-2">
              {isSuperAdmin ? <UserStar /> : <UserCheck />}
              <div>
                <p className="text-center">{auth.user.name}</p>
                {isSuperAdmin ? (
                  <Link to={superadminRoutesList.superadminDashboard}>
                    <p className="bg-white px-2 text-epaColor1 font-semibold underline rounded-sm">
                      {auth.user.rol}
                    </p>
                  </Link>
                ) : (
                  <p>{auth.user.rol}</p>
                )}
              </div>
            </div>
          </header>

          <main className="relative bg-gray-200 flex-1 overflow-auto p-4">
            <Outlet />
          </main>

          <footer className="bg-epaColor1 text-white flex justify-between items-center p-4">
            <div>© {currentYear} Empresas Publicas de Armenia E.S.P.</div>
            <div>Plataforma de Contratos - EPA</div>
            <div>
              Contacto de Soporte:{' '}
              <a href="mailto:redes.tic@epa.gov.co">redes.tic&#64;epa.gov.co</a>
              <p>Tel: (606) 741 17 80 Ext. 1512 - 1513</p>
            </div>
          </footer>
        </div>
      </div>
    </JuridicaProvider>
  );
};
