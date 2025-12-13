import { aseoRoutesList } from '@/routes';
import { useNavigate } from 'react-router-dom';

export const useWorkersPage = () => {
  const navigate = useNavigate();

  const onClickCard = (card) => {
    switch (card) {
      case 'createWorkers':
        return navigate(`${aseoRoutesList.createWorkers}`);
      case 'getWorkers':
        return navigate(`${aseoRoutesList.getWorkers}`);
    }
  };

  return {
    onClickCard,
  };
};
