import { GlobalCards } from '@/components';
import { useDepartamentsPage } from '../hooks/useDepartamentsPage';

export const DepartamentsPage = () => {
  const { onClickCard } = useDepartamentsPage();
  return (
    <div className="grid content-center gap-8 h-full items-center md:grid-cols-2 px-5 sm:px-20 md:px-10 md:gap-10">
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
