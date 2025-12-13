import { useJuridica } from '@/modules/juridica/context';
import { juridicaRoutesList } from '@/routes';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const useContracts = () => {
  const navigate = useNavigate();
  const { setCurrentPage } = useJuridica();

  const onClickCard = (card) => {
    switch (card) {
      case 'create':
        return navigate(`${juridicaRoutesList.createContracts}`);
      case 'get':
        setCurrentPage(1);
        return navigate(`${juridicaRoutesList.listContracts}`);
    }
  };
  
  return {
    onClickCard,
  };
};
