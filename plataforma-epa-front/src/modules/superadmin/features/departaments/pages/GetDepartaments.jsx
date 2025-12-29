import { AlertModal, GlobalButton, GlobalInput, UpdateModal } from "@/components"
import { useBackNavigation } from "@/hooks"
import { ArrowLeft, FilePlus } from "lucide-react"
import { DepartamentsTable } from "../components";
import { useGetDepartaments } from "../hooks";

export const GetDepartaments = () => {
  const { onClickBack } = useBackNavigation();
  const {
    // Properties
    alertModal,
    createModal,
    departaments,
    errors,
    errorsUpdate,
    loading,
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
  } = useGetDepartaments();
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
        Crear Proceso
      </GlobalButton>
      <div className="flex flex-col items-center gap-4 mt-2">
        <h2 className="text-epaColor1 text-3xl font-extrabold sm:text-4xl">
          Procesos
        </h2>
        <DepartamentsTable loading={loading} departaments={departaments} handleOpenUpdateModal={handleOpenUpdateModal} />
      </div>
      <UpdateModal
        isOpen={createModal}
        title="Crear Nuevo Proceso"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        closeModal={closeModals}
        formClassName="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px]"
      >
        <GlobalInput
          label="Nombre Proceso"
          data="nombreProceso"
          register={register}
          errors={errors}
          rules={{
            required: 'Campo Obligatorio'
          }}
        />
      </UpdateModal>
      <UpdateModal
        isOpen={updateModal}
        title="Editar Proceso"
        handleSubmit={handleSubmitUpdate}
        onSubmit={onUpdateSubmit}
        closeModal={closeModals}
        formClassName="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px]"
      >
        <GlobalInput
          label="Nombre Proceso"
          data="nombreProceso"
          register={registerUpdate}
          errors={errorsUpdate}
          rules={{
            required: 'Campo Obligatorio'
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
  )
}
