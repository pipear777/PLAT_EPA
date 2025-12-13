import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { overtimesService, workersService } from '../features';

const AseoContext = createContext({
  workers: [],
  jobPositions: [],
  overtimes: [],
  departaments: [],
  locations: [],
  currentPage: null,
  totalPages: null,
  totalRecords: null,
  initialLoading: false,
  loadingWorkers: false,
  loadingJobPositions: false,
  loadingOvertimes: false,
  getAllOvertimes: () => {},
  getAllWorkers: () => {},
  getAllJobPositions: () => {},
  getAllDepartaments: () => {},
  getAllLocations: () => {},
  handlePageChange: () => {},
});

export const AseoProvider = ({ children }) => {
  const [workers, setWorkers] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [overtimes, setOvertimes] = useState([]);
  const [departaments, setDepartaments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingWorkers, setLoadingWorkers] = useState(false);
  const [loadingJobPositions, setLoadingJobPositions] = useState(false);
  const [loadingOvertimes, setLoadingOvertimes] = useState(false);
  const [loadingDepartaments, setLoadingDepartaments] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);

  const limit = 15;

  const getAllWorkers = async (showLoader = true) => {
    if (showLoader) setLoadingWorkers(true);
    try {
      const response = await workersService.getAllWorkers();
      setWorkers(response.data);      
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      if (showLoader) setLoadingWorkers(false);
    }
  };

  const getAllJobPositions = async (showLoader = true) => {
    if (showLoader) setLoadingJobPositions(true);
    try {
      const response = await workersService.getAllJobPositions();
      setJobPositions(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      if (showLoader) setLoadingJobPositions(false);
    }
  };

  const getAllOvertimes = async (page, showLoader = true) => {
    if (showLoader) setLoadingOvertimes(true);
    try {
      const response = await overtimesService.getAllOvertimes(page, limit);
      setOvertimes(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages || 1);
      setTotalRecords(response.total);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      if (showLoader) setLoadingOvertimes(false);
    }
  };

  const getAllDepartaments = async (showLoader = true) => {
    if (showLoader) setLoadingDepartaments(true);
    try {
      const response = await workersService.getAllDepartaments();
      setDepartaments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      if (showLoader) setLoadingDepartaments(false);
    }
  };

  const getAllLocations = async (showLoader = true) => {
    if (showLoader) setLoadingLocations(true);
    try {
      const response = await workersService.getAllLocations();
      setLocations(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      if (showLoader) setLoadingLocations(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.allSettled([
          getAllWorkers(false),
          getAllJobPositions(false),
          getAllOvertimes(1, false),
          getAllDepartaments(false),
          getAllLocations(false),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const contextValue = useMemo(
    () => ({
      workers,
      jobPositions,
      overtimes,
      departaments,
      locations,
      currentPage,
      totalPages,
      totalRecords,
      initialLoading,
      loadingWorkers,
      loadingJobPositions,
      loadingOvertimes,
      loadingDepartaments,
      loadingLocations,
      getAllWorkers,
      getAllJobPositions,
      getAllOvertimes,
      getAllDepartaments,
      getAllLocations,
      handlePageChange,
      setCurrentPage,
      setOvertimes,
      setTotalRecords,
    }),
    [
      workers,
      jobPositions,
      overtimes,
      departaments,
      locations,
      currentPage,
      totalPages,
      totalRecords,
      initialLoading,
      loadingWorkers,
      loadingJobPositions,
      loadingOvertimes,
      loadingDepartaments,
      loadingLocations,
    ]
  );

  return (
    <AseoContext.Provider value={contextValue}>{children}</AseoContext.Provider>
  );
};

export const useAseo = () => useContext(AseoContext);
