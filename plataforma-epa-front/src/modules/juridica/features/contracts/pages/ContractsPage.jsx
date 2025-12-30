import { GlobalCards } from '@/components';
import { useContracts } from '../hooks/useContracts';

export const ContractsPage = () => {

  const { onClickCard } = useContracts();

  return (
    <div className="grid content-center gap-8 h-full items-center md:grid-cols-2 px-5 sm:px-20 md:px-10 md:gap-10">
      <GlobalCards 
        title="Crear Contrato" 
        onClick={() => onClickCard('create')} 
      />
      <GlobalCards 
        title="Listar Contratos" 
        onClick={() => onClickCard('get')} 
      />
    </div>
  );
};
