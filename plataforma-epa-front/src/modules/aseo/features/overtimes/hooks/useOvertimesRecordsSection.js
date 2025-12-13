export const useOvertimesRecordsSection = () => {
  
  const formatDate = (value) => {
    return value ? new Date(value).toISOString().split('T')[0] : '—';
  };

  const formatHour = (value) => {
    return value && value.trim() !== '' ? value : '—';
  };

  return {
    formatDate,
    formatHour,
  };
};