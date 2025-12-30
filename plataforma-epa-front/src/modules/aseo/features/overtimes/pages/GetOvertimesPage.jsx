import {
  AlertModal,
  ConfirmModal,
  FilterInput,
  GlobalButton,
  LoadSpinner,
  UpdateModal,
} from '@/components';
import { useBackNavigation } from '@/hooks';
import { OvertimesRecordsSection, TimesAndDatesRecorded } from '../components';
import { useGetOvertimes } from '../hooks';
import { ArrowLeft, IdCardLanyard } from 'lucide-react';

export const GetOvertimesPage = () => {
  const {
    // Properties
    alertModalMessage,
    currentPage,
    errors,
    filterValue,
    loading,
    loadingOvertimes,
    openAlertModal,
    openConfirmModal,
    overtimesFilter,
    selectedName,
    showPagination,
    state,
    totalPages,
    totalRecords,
    updateModal,

    // Methods
    closeAlertModal,
    closeModals,
    handleDelete,
    handleKeyDown,
    handlePageChange,
    handleSearch,
    handleSubmit,
    onOpenConfirmModal,
    onSubmitUpdate,
    OpenUpdateModal,
    register,
    setFilterValue,
  } = useGetOvertimes();

  const { onClickBack } = useBackNavigation();

  return (
    <>
      <GlobalButton
        variant="back"
        className="flex w-30 p-1.5"
        onClick={onClickBack}
      >
        <ArrowLeft className="ml-0.5 mr-2 -left-0.5" />
        Regresar
      </GlobalButton>
      <div className="flex flex-col gap-4 mt-2">
        <h2 className="text-epaColor1 text-3xl font-extrabold sm:text-4xl text-center">
          Registro Individual de Horas Extra
        </h2>
        <FilterInput
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          handleKeyDown={handleKeyDown}
          handleSearch={handleSearch}
          placeholder="Buscar por identificación"
          inputClassName="bg-white w-72 p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3 sm:w-100"
        />
        <OvertimesRecordsSection
          overtimesFilter={overtimesFilter}
          OpenUpdateModal={OpenUpdateModal}
          onOpenConfirmModal={onOpenConfirmModal}
        />
        <div className="flex justify-between items-center px-4 text-xs sm:text-base">
          <span>
            Mostrando {overtimesFilter.length} de{' '}
            {showPagination ? totalRecords : overtimesFilter.length} registros.
          </span>
          {showPagination && (
            <div className="flex items-center gap-2">
              <GlobalButton
                variant="modalTwo"
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 disabled:bg-gray-400"
                disabled={currentPage === 1}
              >
                Anterior
              </GlobalButton>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <GlobalButton
                variant="modalTwo"
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 disabled:bg-gray-400"
                disabled={currentPage === totalPages}
              >
                Siguiente
              </GlobalButton>
            </div>
          )}
        </div>
      </div>

      <UpdateModal
        isOpen={updateModal}
        title="Editar Horas Extra"
        handleSubmit={handleSubmit}
        onSubmit={onSubmitUpdate}
        closeModal={closeModals}
      >
        <div className="flex">
          <IdCardLanyard className="text-epaColor1 mr-1" />
          <h4 className="text-epaColor1 font-semibold">{selectedName}</h4>
        </div>
        <TimesAndDatesRecorded register={register} errors={errors} />
      </UpdateModal>

      <AlertModal
        openAlertModal={openAlertModal}
        closeAlertModal={closeAlertModal}
        modalTitle={state}
        modalDescription={alertModalMessage}
      />

      <ConfirmModal
        isOpen={openConfirmModal}
        title="Confirmar Eliminación"
        content="¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer."
        onClickCancel={closeModals}
        onClickConfirm={() => handleDelete()}
        buttonConfirmContent="Eliminar"
        variant="modalThree"
      />
      {(loading || loadingOvertimes) && (
        <LoadSpinner styles="fixed bg-gray-200/90" />
      )}
    </>
  );
};
