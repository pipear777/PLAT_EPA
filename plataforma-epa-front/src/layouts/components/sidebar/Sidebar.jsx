import { useAuth } from '@/context';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { GlobalButton } from '@/components';
import { SIDEBAR_ITEMS } from './sidebar.config';
import { getCurrentModule } from './sidebar.utils';
import logo from '@/assets/logoepa.png';

export const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();
  const { auth, logout } = useAuth();

  const role = auth?.user?.rol;
  const currentModule = getCurrentModule(pathname);

  const filteredItems = SIDEBAR_ITEMS.filter((item) =>
    item.roles.includes(role) &&
    item.module.includes(currentModule)
  );

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
          <h4 className="font-medium">Version 2.0</h4>
        </div>

        <nav className="space-y-4 pb-10">
          {filteredItems.map(({ label, to, icon: Icon }) => (
            <div key={label + to} className="text-epaColor1 font-medium">
              <Link
                to={to}
                className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
              >
                <Icon size={20} />
                {label}
              </Link>
            </div>
          ))}
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
