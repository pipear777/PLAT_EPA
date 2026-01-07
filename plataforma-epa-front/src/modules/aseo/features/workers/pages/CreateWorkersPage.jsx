import {
  AlertModal,
  GlobalButton,
  GlobalInput,
  UpdateModal,
} from '@/components';
import { useBackNavigation } from '@/hooks';
import { useCreateWorkers } from '../hooks';
import { ArrowLeft, FilePlus } from 'lucide-react';

export const CreateWorkersPage = () => {
  const { onClickBack } = useBackNavigation();
  const {
    // Properties
    alertModal,
    departaments,
    errors,
    jobPositionErrors,
    jobPositions,
    locations,
    tipoOperario,
    updateModal,

    // Methods
    closeAlertModal,
    closeModals,
    handleSubmit,
    handleSubmitJobPosition,
    onSubmit,
    onSubmitJobPosition,
    openUpdateModal,
    register,
    registerJobPosition,
  } = useCreateWorkers();

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
        onClick={openUpdateModal}
      >
        <FilePlus className="w-1/3" />
        Crear Cargo
      </GlobalButton>
      <div className="flex flex-col items-center gap-4 mt-2">
        <h2 className="text-epaColor1 text-3xl font-extrabold sm:text-4xl">
          Registrar Funcionario
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full bg-white p-4 rounded-xl shadow-2xl sm:w-3/4 md:w-2/3 lg:w-1/2"
        >
          <GlobalInput
            label="Nombre Completo"
            data="nombre_completo"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          />
          <GlobalInput
            label="Identificación"
            data="identificacion"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          />
          <GlobalInput
            as="select"
            label="Tipo Operario"
            data="tipoOperario"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          >
            <option value="">Seleccione el tipo de operario</option>
            {tipoOperario.map((to) => (
              <option key={to} value={to}>
                {to}
              </option>
            ))}
          </GlobalInput>
          <GlobalInput
            as="select"
            label="Cargo"
            data="Cargo"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          >
            <option value="">Seleccione el cargo</option>
            {jobPositions.map((jobPosition) => (
              <option key={jobPosition._id} value={jobPosition._id}>
                {jobPosition.name}
              </option>
            ))}
          </GlobalInput>
          <GlobalInput
            as="select"
            label="Proceso"
            data="ProcesoAsignado"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          >
            <option value="">Seleccione el proceso</option>
            {departaments.map((departament) => (
              <option key={departament._id} value={departament._id}>
                {departament.nombreProceso}
              </option>
            ))}
          </GlobalInput>
          <GlobalInput
            as="select"
            label="Sede"
            data="SedeAsignada"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          >
            <option value="">Seleccione la sede</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>
                {location.name}
              </option>
            ))}
          </GlobalInput>
          <GlobalButton type="submit" className="p-1.5 w-1/2 block mx-auto mt-5">
            Registrar
          </GlobalButton>
        </form>
      </div>
      <UpdateModal
        isOpen={updateModal}
        title="Crear Nuevo Cargo"
        handleSubmit={handleSubmitJobPosition}
        onSubmit={onSubmitJobPosition}
        closeModal={closeModals}
        formClassName="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg w-[90%] max-w-[500px] sm:p-6"
      >
        <GlobalInput
          label="Cargo"
          data="name"
          register={registerJobPosition}
          errors={jobPositionErrors}
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
