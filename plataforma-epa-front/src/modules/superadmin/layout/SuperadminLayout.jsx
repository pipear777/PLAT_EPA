import { Link, Outlet } from 'react-router-dom';
import {
  House,
  UserCheck,
  Users,
  LogOut,
  BrushCleaning,
  Scale,
  UserStar,
  Blocks,
} from 'lucide-react';
import { useAuth } from '@/context';
import { GlobalButton } from '@/components';
import {
  aseoRoutesList,
  juridicaRoutesList,
  superadminRoutesList,
} from '@/routes';
import logo from '@/assets/logoepa.png';

const currentYear = new Date().getFullYear();

export const SuperadminLayout = () => {
  const { auth, logout } = useAuth();

  return (
    <div className="flex h-screen">
      <div className="bg-gray-50 w-1/6 flex flex-col p-4 border-r border-gray-300">
        <div className="space-y-4 pb-10 text-center">
          <img src={logo} alt="Logo EPA" />
          <h3 className="text-epaColor1 text-lg font-bold">Menu Principal</h3>
          <h4 className="font-medium">Version 2.0</h4>
        </div>
        <nav className="space-y-4 pb-10">
          <div className="text-epaColor1 font-medium">
            <Link
              className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
              to={superadminRoutesList.superadminDashboard}
            >
              <House size={20} />
              Inicio Admin
            </Link>
          </div>
          <div className="text-epaColor1 font-medium">
            <Link
              className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
              to={superadminRoutesList.users}
            >
              <Users size={20} />
              Usuarios
            </Link>
          </div>
          <div className="text-epaColor1 font-medium">
            <Link
              className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
              to={superadminRoutesList.departaments}
            >
              <Blocks size={20} />
              Procesos
            </Link>
          </div>
          <div className="text-epaColor1 font-medium">
            <Link
              className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
              to={aseoRoutesList.aseoDashboard}
            >
              <BrushCleaning size={20} />
              Modulo Aseo
            </Link>
          </div>
          <div className="text-epaColor1 font-medium">
            <Link
              className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
              to={juridicaRoutesList.juridicaDashboard}
            >
              <Scale size={20} />
              Modulo Juridica
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
          <div className='w-2/10'></div>
          <h2 className="w-full text-white text-center font-bold text-3xl">
            Plataforma EPA - Modulo Administrador
          </h2>
          <div className="w-2/10 flex text-white text-sm items-center justify-end gap-2">
            <UserStar />
            <div className="text-right">
              <p className="px-2">{auth.user.name}</p>
              <Link to={superadminRoutesList.superadminDashboard}>
                <p className="bg-white px-2 text-epaColor1 font-semibold underline rounded-sm">
                  {auth.user.rol}
                </p>
              </Link>
            </div>
          </div>
        </header>

        <main className="relative bg-gray-200 flex-1 overflow-auto p-4">
          <Outlet />
        </main>

        <footer className="bg-epaColor1 text-white flex justify-between items-center p-4">
          <div>© {currentYear} Empresas Publicas de Armenia E.S.P.</div>
          <div>Plataforma de Horas Extra Aseo - EPA</div>
          <div>
            Contacto de Soporte:{' '}
            <a href="mailto:redes.tic@epa.gov.co">redes.tic&#64;epa.gov.co</a>
            <p>Tel: (606) 741 17 80 Ext. 1512 - 1513</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
