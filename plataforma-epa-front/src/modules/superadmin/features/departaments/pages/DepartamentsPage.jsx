import { GlobalCards } from '@/components';
import { useDepartamentsPage } from '../hooks/useDepartamentsPage';

export const DepartamentsPage = () => {
  const { onClickCard } = useDepartamentsPage();
  return (
    <div className="grid grid-cols-2 gap-10 h-full items-center">
      <GlobalCards
        title="Registrar Procesos"
        onClick={() => onClickCard('getDepartaments')}
      />
      <GlobalCards
        title="Registrar Sedes"
        onClick={() => onClickCard('getLocations')}
      />
    </div>
  );
};
