import { useEffect, useState } from 'react';
import { historicalServices } from '../services';

export const useHistorical = () => {
  const [anios, setAnios] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [objetoExpandido, setObjetoExpandido] = useState(null);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(true);

  const [filterType, setFilterType] = useState(null); 
  // 'anio' | 'name' | 'type' | null

  const [filterValue, setFilterValue] = useState('');
  const [filterValueAnio, setFilterValueAnio] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const limit = 15;

  // 🔹 ACTIVAR FILTRO DE AÑO AUTOMÁTICAMENTE
  useEffect(() => {
    if (filterValueAnio) {
      setFilterType('anio');
      setCurrentPage(1);
    }
  }, [filterValueAnio]);

  // 🔹 ACTIVAR FILTROS DE TEXTO MIENTRAS ESCRIBE
  useEffect(() => {
    if (filterValue.trim()) {
      setCurrentPage(1);
    }
  }, [filterValue]);

  // 🔹 CARGA PRINCIPAL
  useEffect(() => {
    fetchContracts();
  }, [currentPage, filterType, filterValue, filterValueAnio]);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      let response;

      if (filterType === 'anio' && filterValueAnio) {
        response = await historicalServices.getContractsByAnio(
          filterValueAnio,
          currentPage,
          limit
        );
      } 
      else if (filterType === 'name' && filterValue) {
        response = await historicalServices.getContractsByContractorName(
          filterValue.trim(),
          currentPage,
          limit
        );
      } 
      else if (filterType === 'type' && filterValue) {
        response = await historicalServices.getContractsByType(
          filterValue.trim().toUpperCase(),
          currentPage,
          limit
        );
      } 
      else {
        response = await historicalServices.getCleanContracts(
          currentPage,
          limit
        );
      }

      setFilteredContracts(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages || 1);
      setTotalRecords(response.total);
    } catch (error) {
      console.error(error);
      setFilteredContracts([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 AÑOS
  useEffect(() => {
    getAnios();
  }, []);

  const getAnios = async () => {
    try {
      const response = await historicalServices.getAnios();
      setAnios(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 FILTROS MANUALES
  const handleSearchName = () => {
    if (!filterValue.trim()) return;
    setFilterType('name');
  };

  const handleSearchType = () => {
    if (!filterValue.trim()) return;
    setFilterType('type');
  };

  const handleSearchAnio = () => {
    if (!filterValueAnio) return;
    setModal(false);
  };

  // 🔹 PAGINACIÓN
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 🔹 RESET TOTAL
  const handleReset = () => {
    setFilterValue('');
    setFilterValueAnio('');
    setFilterType(null);
    setCurrentPage(1);
  };

  return {
    // Properties
    anios,
    filteredContracts,
    filterValue,
    filterValueAnio,
    loading,
    modal,
    objetoExpandido,
    currentPage,
    totalPages,
    totalRecords,

    // Methods
    handleReset,
    handlePageChange,
    handleSearchAnio,
    handleSearchName,
    handleSearchType,
    setObjetoExpandido,
    setFilterValue,
    setFilterValueAnio,
  };
};
