import { useAuth } from '@/context';
import { superadminRoutesList } from '@/routes';
import { Menu, UserStar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = ({ onMenuClick }) => {
  const { auth } = useAuth();

  return (
    <header className="bg-epaColor1 flex p-6">
      <div className="flex w-2/10">
        <button
          onClick={onMenuClick}
          className="xl:hidden text-white cursor-pointer"
          aria-label="Abrir Menú"
        >
          <Menu size={28} />
        </button>
      </div>
      <h2 className="w-full text-white text-center font-bold text-3xl">
        Plataforma EPA - Modulo Administrador
      </h2>
      <div className="w-2/10 flex text-white text-sm items-center justify-end gap-2">
        <UserStar />
        <div>
          <p className="text-center">{auth.user.name}</p>
          <Link to={superadminRoutesList.superadminDashboard}>
            <p className="bg-white px-2 text-epaColor1 font-semibold underline rounded-sm">
              {auth.user.rol}
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};
