import { useAseo } from '@/modules/aseo/context';
import { overtimesService } from '../../overtimes';
import { useEffect, useState } from 'react';

export const useAseoDashboard = () => {
  const { totalRecords, workers } = useAseo();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOvertimesStats();
    setTimeout(() => {
      setLoading(false);      
    }, 600);
  }, [])

  const getOvertimesStats = async () => {
    try {
      const response = await overtimesService.getOvertimesStats();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const porcentaje = stats?.porcentajeCambio ? parseFloat(stats.porcentajeCambio) : 0;  
  
  return {
    // Properties
    loading,
    porcentaje,
    stats,
    totalRecords,
    workers,
  };
};
