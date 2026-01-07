import { GlobalCards } from '@/components';
import { useOvertimes } from '../hooks';

export const OvertimesPage = () => {
  const { onClickCard } = useOvertimes();

  return (
    <div className="grid content-center gap-8 h-full items-center md:grid-cols-2 px-5 sm:px-20 md:px-10 md:gap-10">
      <GlobalCards
        title="Registrar Horas Extra"
        onClick={() => onClickCard('create')}
      />
      <GlobalCards
        title="Consultar Horas Extra"
        onClick={() => onClickCard('get')}
      />
    </div>
  );
};
