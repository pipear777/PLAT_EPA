import { GlobalCards } from '@/components';
import { useWorkersPage } from '../hooks';

export const WorkersPage = () => {
  const { onClickCard } = useWorkersPage();

  return (
    <div className="grid content-center gap-8 h-full items-center md:grid-cols-2 px-5 sm:px-20 md:px-0 md:gap-10">
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
