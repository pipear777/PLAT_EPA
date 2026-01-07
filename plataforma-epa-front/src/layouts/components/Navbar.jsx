import { Menu, UserCheck, UserStar } from 'lucide-react';
import { useAuth } from '@/context';
import { ROLES } from '@/constants';

export const Navbar = ({ title, onMenuClick }) => {
  const { auth } = useAuth();
  const isSuperAdmin = auth?.user?.rol === ROLES.SUPER_ADMIN;

  return (
    <header className="bg-epaColor1 flex items-center p-4">

      {/* Left */}
      <div className="flex flex-1">
        <button
          onClick={onMenuClick}
          className="text-white xl:hidden"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Center */}
      <h2 className="text-white text-center font-bold text-2xl md:text-4xl">
        {title}
      </h2>

      {/* Right */}
      <div className="flex-1 flex justify-end items-center gap-2 text-white text-sm">
        {isSuperAdmin ? <UserStar size={18} /> : <UserCheck size={18} />}
        <div className="hidden leading-tight text-right sm:block">
          <p>{auth?.user?.name}</p>
          <p className="text-xs opacity-80">{auth?.user?.rol}</p>
        </div>
      </div>

    </header>
  );
};
