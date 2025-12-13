import { useState } from 'react';
import { overtimesService } from '../services';

export const useDeleteOvertime = (onDeleteSuccess) => {
  const [estado, setEstado] = useState('');
  const [message, setMessage] = useState('');
  const [openResultModal, setOpenResultModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const abrirConfirm = () => setShowConfirmModal(true);
  const cerrarConfirm = () => setShowConfirmModal(false);
  const onCloseAlertModal = () => setOpenResultModal(false);
  const onOpenAlertModal = () => setOpenResultModal(true);

  const handleDelete = async (idOvertime) => {
    console.log('La función llamo a ->', idOvertime);
    try {
      const response = await overtimesService.deleteOvertimes(idOvertime);
      const success = !!response?.success;
      setMessage(
        response?.message ||
          (success ? 'El registro se eliminó' : 'Ocurrió un error')
      );
      setEstado(success ? 'Registro Eliminado' : 'Error');
      cerrarConfirm();
      if (success) {
        setTimeout(() => {
          onDeleteSuccess();
        }, 1500);
      }
    } catch (error) {
      console.error('Error eliminando:', error);
      setMessage(error?.message || String(error));
      setEstado('Error');
    } finally {
      setOpenResultModal(true);
    }
  };

  return {
    // Properties
    estado,
    message,
    openResultModal,
    showConfirmModal,

    // Methods
    abrirConfirm,
    cerrarConfirm,
    handleDelete,
    onCloseAlertModal,
    onOpenAlertModal,
  };
};
