import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  contractsServices,
  contractTypeServices,
} from '../features/contracts/services';
import { lawyersServices } from '../features/lawyers/services';
import { historicalServices } from '../features/historical/services';

const JuridicaContext = createContext({
  contracts: [],
  lawyers: [],
  process: [],
  contractType: [],
  loading: Boolean,
  currentPage: null,
  totalPages: null,
  totalRecords: null,
  totalRecords: null,
  totalHistoricalRecords: null,

  getAllContracts: () => {},
  getAllLawyers: () => {},
  getAllProcess: () => {},
  getAllContractType: () => {},
  updateLawyers: () => {},
  handlePageChange: () => {},
});

export const JuridicaProvider = ({ children }) => {
  const [lawyers, setLawyers] = useState([]);
  const [process, setProcess] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [contractType, setContractType] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalHistoricalRecords, setTotalHistoricalRecords] = useState(0);

  const limit = 15;

  const getAllLawyers = async () => {
    try {
      const response = await lawyersServices.getAllLawyers();
      setLawyers(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProcess = async () => {
    try {
      const response = await contractsServices.getAllProcess();
      setProcess(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllContractType = async () => {
    try {
      const response = await contractTypeServices.getAllContractType();
      setContractType(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllContracts = async (page, filters) => {
    setLoading(true);
    try {
      const response = await contractsServices.getAllContracts(
        page,
        limit,
        filters
      );
      setContracts(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages || 1);
      setTotalRecords(response.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalHistoricalRecords = async () => {
    try {
      const response = await historicalServices.getCleanContracts();
      setTotalHistoricalRecords(response.total);
    } catch (error) {
      console.error(error);
    }
  };

  const updateContracts = (updateData) => {
    setContracts(updateData);
  };

  const updateLawyers = (updateData) => {
    setLawyers(updateData);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        await Promise.allSettled([
          getAllContracts(),
          getAllLawyers(),
          getAllProcess(),
          getAllContractType(),
          getTotalHistoricalRecords(),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({
      lawyers,
      process,
      contracts,
      contractType,
      loading,
      currentPage,
      totalPages,
      totalRecords,
      totalHistoricalRecords,

      getAllLawyers,
      getAllProcess,
      getAllContractType,
      getAllContracts,
      handlePageChange,
      updateLawyers,
      updateContracts,
      setCurrentPage,
    }),
    [
      lawyers,
      process,
      contracts,
      contractType,
      loading,
      currentPage,
      totalPages,
      totalRecords,
      totalHistoricalRecords,
    ]
  );

  return (
    <JuridicaContext.Provider value={contextValue}>
      {children}
    </JuridicaContext.Provider>
  );
};

export const useJuridica = () => useContext(JuridicaContext);
