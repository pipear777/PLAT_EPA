import { ArrowLeft, FilePlus } from 'lucide-react';
import { AlertModal, GlobalButton, GlobalInput, UpdateModal } from '@/components';
import { useBackNavigation } from '@/hooks';
import { useGetLocations } from '../hooks';
import { LocationsTable } from '../components';

export const GetLocations = () => {
  const { onClickBack } = useBackNavigation();
  const {
    // Properties
    alertModal,
    createModal,
    errors,
    errorsUpdate,
    loading,
    locations,
    updateModal,

    // Methods
    closeAlertModal,
    closeModals,
    handleOpenCreateModal,
    handleOpenUpdateModal,
    handleSubmit,
    handleSubmitUpdate,
    onSubmit,
    onUpdateSubmit,
    register,
    registerUpdate,
  } = useGetLocations();
  return (
    <>
      <GlobalButton
        variant="back"
        className="flex w-30 p-1.5 mb-3"
        onClick={onClickBack}
      >
        <ArrowLeft className="ml-0.5 mr-2 -left-0.5" />
        Regresar
      </GlobalButton>
      <GlobalButton
        variant="third"
        className="flex p-1.5 w-65"
        onClick={handleOpenCreateModal}
      >
        <FilePlus className="w-1/3" />
        Crear Sede
      </GlobalButton>
      <div className="flex flex-col items-center gap-4 mt-2">
        <h2 className="text-epaColor1 text-3xl font-extrabold sm:text-4xl">Sedes</h2>
        <LocationsTable loading={loading} locations={locations} handleOpenUpdateModal={handleOpenUpdateModal} />
      </div>
      <UpdateModal
        isOpen={createModal}
        title="Crear Nueva Sede"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        closeModal={closeModals}
        formClassName="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg w-[90%] max-w-[500px] sm:p-6"
      >
        <GlobalInput
          label="Nombre Sede"
          data="name"
          register={register}
          errors={errors}
          rules={{
            required: 'Campo Obligatorio',
          }}
        />
      </UpdateModal>
      <UpdateModal
        isOpen={updateModal}
        title="Editar Sede"
        handleSubmit={handleSubmitUpdate}
        onSubmit={onUpdateSubmit}
        closeModal={closeModals}
        formClassName="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg w-[90%] max-w-[500px] sm:p-6"
      >
        <GlobalInput
          label="Nombre Sede"
          data="name"
          register={registerUpdate}
          errors={errorsUpdate}
          rules={{
            required: 'Campo Obligatorio',
          }}
        />
      </UpdateModal>
      <AlertModal
        openAlertModal={alertModal.open}
        closeAlertModal={closeAlertModal}
        modalTitle={alertModal.status}
        modalDescription={alertModal.message}
      />
    </>
  );
};
