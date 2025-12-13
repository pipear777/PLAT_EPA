import { GlobalCards } from '@/components';
import { useUsersPage } from '../hooks';

export const UsersPage = () => {
  const { onClickCard } = useUsersPage();
  return (
    <div className="grid grid-cols-2 gap-10 h-full items-center">
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
