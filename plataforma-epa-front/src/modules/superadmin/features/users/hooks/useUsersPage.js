import { superadminRoutesList } from '@/routes';
import { useNavigate } from 'react-router-dom';

export const useUsersPage = () => {
  const navigate = useNavigate();

  const onClickCard = (card) => {
    switch (card) {
      case 'create':
        return navigate(`${superadminRoutesList.createUsers}`);
      case 'get':
        return navigate(`${superadminRoutesList.getUsers}`);
    }
  };

  return {
    onClickCard,
  }
};
