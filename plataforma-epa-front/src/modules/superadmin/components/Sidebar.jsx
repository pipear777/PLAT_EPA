import logo from '@/assets/logoepa.png';
import {
  aseoRoutesList,
  juridicaRoutesList,
  superadminRoutesList,
} from '@/routes';
import { Link } from 'react-router-dom';
import {
  House,
  Users,
  LogOut,
  BrushCleaning,
  Scale,
  Blocks,
} from 'lucide-react';
import { GlobalButton } from '@/components';
import { useAuth } from '@/context';

export const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Overlay solo en mobile */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/40 z-40 xl:hidden
          transition-opacity
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

      <aside
        className={`
          fixed xl:static z-50
          h-full bg-gray-50 border-r border-gray-300
          w-64 xl:w-1/6
          flex flex-col p-4
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          xl:translate-x-0
        `}
      >
        <div className="space-y-4 pb-10 text-center">
          <img src={logo} alt="Logo EPA" />
          <h3 className="text-epaColor1 text-lg font-bold">Menu Principal</h3>
          <h4 className="font-medium">Version 1.0</h4>
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
      </aside>
    </>
  );
};

{
  /* <div className="hidden xl:flex bg-gray-50 xl:w-1/6 flex-col p-4 border-r border-gray-300">
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
</div>; */
}
