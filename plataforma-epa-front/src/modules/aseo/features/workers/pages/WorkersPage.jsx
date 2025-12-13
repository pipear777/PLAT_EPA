import { GlobalCards } from '@/components';
import { useWorkersPage } from '../hooks';

export const WorkersPage = () => {
  const { onClickCard } = useWorkersPage();

  return (
    <div className="grid grid-cols-2 gap-10 p-10 h-full items-center">
        <GlobalCards
          title="Registrar Funcionarios"
          onClick={() => onClickCard('createWorkers')}
        />

        <GlobalCards
          title="Consultar Funcionarios"
          onClick={() => onClickCard('getWorkers')}
        />
    </div>
  );
};
