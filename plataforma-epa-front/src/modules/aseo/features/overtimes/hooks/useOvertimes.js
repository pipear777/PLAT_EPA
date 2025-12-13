import { useAseo } from '@/modules/aseo/context';
import { aseoRoutesList } from '@/routes';
import { useNavigate } from 'react-router-dom';

export const useOvertimes = () => {
  const navigate = useNavigate();
  const { setCurrentPage } = useAseo();

  const onClickCard = (card) => {
    switch (card) {
      case 'create':
        return navigate(`${aseoRoutesList.createOvertimes}`);
      case 'get':
        setCurrentPage(1);
        return navigate(`${aseoRoutesList.getOvertimes}`);
    }
  };

  return {
    onClickCard,
  };
};
