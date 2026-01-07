import { GlobalCards } from '@/components';
import { useUsersPage } from '../hooks';

export const UsersPage = () => {
  const { onClickCard } = useUsersPage();
  return (
    <div className="grid content-center gap-8 h-full items-center md:grid-cols-2 px-5 sm:px-20 md:px-10 md:gap-10">
      <GlobalCards
        title="Registrar Usuarios"
        onClick={() => onClickCard('create')}
      />
      <GlobalCards
        title="Consultar Usuarios"
        onClick={() => onClickCard('get')}
      />
    </div>
  );
};
