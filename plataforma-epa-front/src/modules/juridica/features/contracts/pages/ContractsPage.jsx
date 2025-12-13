import { GlobalCards } from '@/components';
import { useContracts } from '../hooks/useContracts';

export const ContractsPage = () => {

  const { onClickCard } = useContracts();

  return (
    <div className="grid grid-cols-2 gap-10 p-10 h-full items-center">
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
