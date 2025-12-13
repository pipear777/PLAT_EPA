import { useEffect, useState } from 'react';
import { historicalServices } from '../services';

export const useHistorical = () => {
  const [anios, setAnios] = useState([]);
  const [cleanContracts, setCleanContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [objetoExpandido, setObjetoExpandido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [modal, setModal] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [filterValueAnio, setFilterValueAnio] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const limit = 15;

  useEffect(() => {
  if (!isFiltering) {
    getCleanContracts(currentPage);
    return;
  }

  // FILTRAR POR AÑO
  if (filterValueAnio) {
    historicalServices
      .getContractsByAnio(filterValueAnio, currentPage, limit)
      .then((res) => setFilteredContracts(res.data))
      .catch(console.error);

    return;
  }

  // FILTRAR POR NOMBRE
  if (activeFilter === "name" && filterValue) {
    historicalServices
      .getContractsByContractorName(filterValue, currentPage, limit)
      .then((res) => setFilteredContracts(res.data))
      .catch(console.error);

    return;
  }

  // FILTRAR POR TIPO
  if (activeFilter === "type" && filterValue) {
    historicalServices
      .getContractsByType(filterValue, currentPage, limit)
      .then((res) => setFilteredContracts(res.data))
      .catch(console.error);

    return;
  }
}, [currentPage, isFiltering, filterValue, filterValueAnio, activeFilter]);


  useEffect(() => {
    setFilteredContracts(cleanContracts);
  }, [cleanContracts]);

  useEffect(() => {
    getAnios();
  }, []);

  const getCleanContracts = async (page) => {
    setLoading(true);
    try {
      const response = await historicalServices.getCleanContracts(page, limit);
      console.log('📦 Contratos desde backend:', response);
      setCleanContracts(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages || 1);
      setTotalRecords(response.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAnios = async () => {
    try {
      const response = await historicalServices.getAnios();
      setAnios(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchAnio = () => {
    setTimeout(async () => {
      if (!filterValueAnio.trim()) {
        setIsFiltering(false);
        getCleanContracts(1);
        return;
      }

      setIsFiltering(true);
      setLoadingFilter(true);

      try {
        const response = await historicalServices.getContractsByAnio(
          filterValueAnio,
          1,
          limit
        );
        setFilteredContracts(response.data);
        setModal(false);
        setCurrentPage(response.page);
        setTotalPages(response.totalPages || 1);
        setTotalRecords(response.total);
      } catch (e) {
        console.error(e);
        setFilteredContracts([]);
      } finally {
        setLoadingFilter(false);
      }
    }, 600);
  };

  const handleSearchName = () => {
    setTimeout(async () => {
      if (!filterValue.trim()) {
        setIsFiltering(false);
        getCleanContracts(1);
        return;
      }

      setIsFiltering(true);
      setLoadingFilter(true);

      try {
        const response = await historicalServices.getContractsByContractorName(
          filterValue,
          1,
          limit
        );
        setFilteredContracts(response.data);
        setCurrentPage(response.page);
        setTotalPages(response.totalPages || 1);
        setTotalRecords(response.total);
      } catch (e) {
        console.error(e);
        setFilteredContracts([]);
      } finally {
        setLoadingFilter(false);
      }
    }, 600);
  };

  const handleSearchType = () => {
    setTimeout(async () => {
      if (!filterValue.trim()) {
        setIsFiltering(false);
        getCleanContracts(1);
        return;
      }

      setIsFiltering(true);
      setLoadingFilter(true);

      try {
        const response = await historicalServices.getContractsByType(
          filterValue,
          1,
          limit
        );
        setFilteredContracts(response.data);
        setCurrentPage(response.page);
        setTotalPages(response.totalPages || 1);
        setTotalRecords(response.total);
      } catch (e) {
        console.error(e);
        setFilteredContracts([]);
      } finally {
        setLoadingFilter(false);
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchAnio();
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleReset = () => {
    setFilterValue('');
    setFilterValueAnio('');
    setIsFiltering(false);
    setCurrentPage(1);
    getCleanContracts(1); // ✔ SIEMPRE RESETEAR DESDE LA PÁGINA 1
  };

  return {
    //Properties
    anios,
    cleanContracts,
    filterValue,
    filterValueAnio,
    filteredContracts,
    isFiltering,
    loading,
    loadingFilter,
    modal,
    objetoExpandido,
    currentPage,
    totalPages,
    totalRecords,

    //Methods
    handleKeyDown,
    handleReset,
    handlePageChange,
    handleSearchAnio,
    handleSearchName,
    handleSearchType,
    setObjetoExpandido,
    setFilterValueAnio,
    setFilterValue,
    setActiveFilter,
  };
};
