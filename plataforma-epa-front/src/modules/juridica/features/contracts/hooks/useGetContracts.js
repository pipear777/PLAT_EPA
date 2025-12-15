import { useEffect, useState } from 'react';
import { contractsServices } from '../services';
import { useForm } from 'react-hook-form';
import { useJuridica } from '@/modules/juridica/context';

export const useGetContracts = () => {
  const {
    lawyers,
    process,
    contractType,
    contracts,
    loading,
    currentPage,
    totalPages,
    totalRecords,

    getAllContracts,
    handlePageChange,
    updateContracts,
  } = useJuridica();

  const [filteredContracts, setFilteredContracts] = useState([]);

  const [hoverEye, setHoverEye] = useState(false);
  const [detailsContractModal, setDetailsContractModal] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [modificationsContractModal, setModificationsContractModal] = useState(false);
  const [loadingModifications, setLoadingModifications] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const [objetoExpandido, setObjetoExpandido] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);

  const [selectedContractId, setSelectedContractId] = useState('');
  const [selectedModificationsId, setSelectedModificationsId] = useState([]);
  const [selectedConsecutive, setSelectedConsecutive] = useState('');
  const [selectedContractType, setSelectedContractType] = useState('');
  const [summaries, setSummaries] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    state: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerModifications,
    handleSubmit: handleSubmitModifications,
    reset: resetModifications,
    watch: watchModifications,
    formState: { errors: errorsModifications },
  } = useForm();

  useEffect(() => {
    getAllContracts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getContractSummaries();
  }, []);

  useEffect(() => {
    setFilteredContracts(contracts);
  }, [contracts]);

  const closeModals = () => {
    setDetailsContractModal(false);
    setUpdateModal(false);
    setConfirmModal(false);
    setModificationsContractModal(false);
    setAlertModal({
      open: false,
      message: '',
      status: '',
    });
  };

  // Detalles del Contrato
  const openEye = (id) => {
    setHoverEye(id);
  };

  const openDetailsContractModal = (id) => {
    const selectedContract = contracts.find((c) => c._id === id);

    setSelectedModificationsId(
      selectedContract.modificaciones.map((modificationsId) => (modificationsId))
    );

    console.log(selectedModificationsId);
    

    setSelectedContract(selectedContract);
    setDetailsContractModal(true);
  };

  // Actualizar
  const openUpdateModal = (id) => {
    setSelectedContractId(id);
    const selectedContract = contracts.find((c) => c._id === id);

    const formatDate = (dateString) => dateString?.split('T')[0] || '';

    if (selectedContract) {
      setSelectedConsecutive(selectedContract.consecutivo);
      setSelectedContractType(selectedContract.tipoContrato.nombre);
      reset({
        identificacionOnit: selectedContract.identificacionOnit || '',
        NombreContratista: selectedContract.NombreContratista || '',
        TelefonoContratista: selectedContract.TelefonoContratista || '',
        proceso: selectedContract.proceso._id,
        CorreoDependencia: selectedContract.CorreoDependencia || '',
        tipoContrato: selectedContract.tipoContrato._id || '',
        AbogadoAsignado: selectedContract.AbogadoAsignado._id || '',
        objeto: selectedContract.objeto || '',
        ValorContrato: selectedContract.ValorContrato || '',
        FechaInicio: formatDate(selectedContract.FechaInicio),
        FechaFinalizacion: formatDate(selectedContract.FechaFinalizacion),
      });
    }
    setUpdateModal(true);
  };

  const onSubmitUpdateContract = async (updateData) => {
    try {
      await contractsServices.updateContracts(selectedContractId, updateData);
      setAlertModal({
        open: true,
        message: 'El contrato ha sido actualizado con Exito✅',
        state: 'Contrato Actualizado',
      });
      getAllContracts();
    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message || 'Error al actualizar el contrato. ❌',
        state: 'Error',
      });
    }
  };

  // Modificaciones
  const openModificationsModal = (id) => {
    setSelectedContractId(id);
    setModificationsContractModal(true);
  };

  const onSubmitModificationsContract = async (modificationsData) => {
    setLoadingModifications(true);

    console.log(modificationsData);    
    
    try {
      await contractsServices.addModifications(selectedContractId, modificationsData);

      setAlertModal({
        open: true,
        message: 'La modificación ha sido creada con éxito ✅',
        state: 'Modificación agregada',
      });

      resetModifications();
    } catch (error) {
      setAlertModal({
        open: true,
        message: error.message || 'Error al crear la modificación ❌',
        state: 'Error',
      });
    } finally {
      setLoadingModifications(false);
    }
  };

  // const getModifications = async () => {
  // }

  // Confirm Modal
  const openConfirmModal = (id) => {
    setSelectedContractId(id);
    setConfirmModal(true);
  };

  // Anular
  const handleOverride = async () => {
    try {
      await contractsServices.overrideContracts(selectedContractId);
      setAlertModal({
        open: true,
        message: 'El contrato ha sido anulado con Exito✅',
        state: 'Contrato Anulado',
      });
      updateContracts((prev) =>
        prev.map((item) =>
          item._id === selectedContractId
            ? { ...item, EstadoContrato: 'Anulado' }
            : item
        )
      );
    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message || 'Error al anular el contrato. ❌',
        state: 'Error',
      });
    }
  };

  // Cards
  const getContractSummaries = async () => {
    try {
      const response = await contractsServices.getContractSummaries();
      setSummaries(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Filter
  const handleSearch = (param) => {
    setTimeout(async () => {
      // Si el input está vacío → recargar normal
      if (!filterValue.trim()) {
        getAllContracts({ page: currentPage, limit: 15 });
        setFilteredContracts(contracts);
        return;
      }

      setLoadingFilter(true);
      try {
        const filtros = {
          [param]: filterValue.trim(),
          page: currentPage,
          limit: 15,
        };

        const response = await contractsServices.getFilteredContracts(filtros);

        setFilteredContracts(response.data);
      } catch (error) {
        console.error(error);
        setFilteredContracts([]);
      } finally {
        setLoadingFilter(false);
      }
    }, 600);
  };

  const handleReset = () => {
    getAllContracts();
    setFilterValue('');
  };  

  return {
    //Properties
    alertModal,
    confirmModal,
    contractType,
    currentPage,
    detailsContractModal,
    errors,
    errorsModifications,
    filteredContracts,
    filterValue,
    hoverEye,
    lawyers,
    loading,
    loadingFilter,
    loadingModifications,
    modificationsContractModal,
    objetoExpandido,
    process,
    totalPages,
    totalRecords,
    selectedConsecutive,
    selectedContract,
    selectedContractType,
    summaries,
    updateModal,

    //Methods
    closeModals,
    handleOverride,
    handlePageChange,
    handleReset,
    handleSearch,
    handleSubmit,
    handleSubmitModifications,
    onSubmitUpdateContract,
    onSubmitModificationsContract,
    openConfirmModal,
    openDetailsContractModal,
    openEye,
    openModificationsModal,
    openUpdateModal,
    register,
    registerModifications,
    setFilterValue,
    setObjetoExpandido,
    watchModifications,
  };
};
