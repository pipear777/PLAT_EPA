import { Link } from 'react-router-dom';
import { Menu, UserCheck, UserStar } from 'lucide-react';
import { useAuth } from '@/context';
import { superadminRoutesList } from '@/routes';
import { ROLES } from '@/constants';

export const Navbar = ({ title, onMenuClick }) => {
  const { auth } = useAuth();

  const isSuperAdmin = auth?.user?.rol === ROLES.SUPER_ADMIN;

  return (
    <header className="bg-epaColor1 flex p-6">
      <div className="flex w-2/10">
        <button
          onClick={onMenuClick}
          className="xl:hidden text-white cursor-pointer"
        >
          <Menu size={28} />
        </button>
      </div>

      <h2 className="w-full text-white text-center font-bold text-3xl">
        {title}
      </h2>

      <div className="w-2/10 flex text-white text-sm items-center justify-end gap-2">
        {isSuperAdmin ? <UserStar /> : <UserCheck />}
        <div>
          <p className="text-center">{auth?.user?.name}</p>
          {isSuperAdmin ? (
            <Link to={superadminRoutesList.superadminDashboard}>
              <p className="bg-white px-2 text-epaColor1 font-semibold underline rounded-sm">
                {auth?.user?.rol}
              </p>
            </Link>
          ) : (
            <p>{auth?.user?.rol}</p>
          )}
        </div>
      </div>
    </header>
  );
};
