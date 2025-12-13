import { superadminRoutesList } from '@/routes';
import { useNavigate } from 'react-router-dom';

export const useDepartamentsPage = () => {
  const navigate = useNavigate();

  const onClickCard = (card) => {
    switch (card) {
      case 'getDepartaments':
        return navigate(`${superadminRoutesList.getDepartaments}`);
      case 'getLocations':
        return navigate(`${superadminRoutesList.getLocations}`);
    }
  };

  return {
    onClickCard,
  };
};
