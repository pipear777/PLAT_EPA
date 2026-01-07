import {
  AlertModal,
  GlobalButton,
  GlobalInput,
  LoadSpinner,
  UpdateModal,
} from '@/components';
import { useBackNavigation } from '@/hooks';
import { useCreateContracts } from '../hooks';
import { ArrowLeft, FilePlus } from 'lucide-react';

export const CreateContractsPage = () => {


  const {
    // Properties
    alertModal,
    contractType,
    errors,
    errorsContractType,
    handleSubmit,
    handleSubmitContractType,
    loading,
    lawyers,
    contractTypeModal,
    register,
    registerContractType,
    process,

    // Methods
    onSubmit,
    onSubmitContractType,
    closeModals,
    openContractTypeModal,
  } = useCreateContracts();

  const { onClickBack } = useBackNavigation();

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
        className="flex items-center gap-3 px-5 py-1.5"
        onClick={openContractTypeModal}
      >
        <FilePlus />
        Crear Tipo de Contrato
      </GlobalButton>
      <div className="flex flex-col gap-4 items-center mt-2">
        <h2 className="text-epaColor1 text-3xl font-extrabold sm:text-4xl">
          Crear Contrato
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full bg-white p-4 rounded-xl shadow-2xl sm:w-3/4 md:w-2/3 lg:w-1/2"
        >
          <GlobalInput
            type="text"
            label="Identificacion del contratista O Nit de la Empresa*"
            data="identificacionOnit"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <GlobalInput
            type="text"
            label="Nombre del Contratista o Empresa*"
            data="NombreContratista"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <GlobalInput
            type="text"
            label="Telefono del Contratista o Empresa*"
            data="TelefonoContratista"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <GlobalInput
            as="select"
            type="text"
            label="Proceso*"
            data="proceso"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          >
            <option value="">Seleccione un proceso</option>
            {process.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombreProceso}
              </option>
            ))}
          </GlobalInput>

          <GlobalInput
            type="email"
            label="Correo de Dependencia"
            data="CorreoDependencia"
            register={register}
            errors={errors}
          />

          <div className="flex justify-between gap-2 sm:gap-4">
            <GlobalInput
              as="select"
              type="text"
              label="Tipo de Contrato*"
              data="tipoContrato"
              classNameLabel='flex flex-col w-[49%] sm:w-full'
              register={register}
              errors={errors}
              rules={{
                required: 'Este campo es obligatorio',
              }}
            >
              <option value="">Seleccione una opcion</option>
              {contractType.map((ct) => (
                <option key={ct._id} value={ct._id}>
                  {ct.nombre}
                </option>
              ))}
            </GlobalInput>

            <GlobalInput
              as="select"
              type="text"
              label="Abogado*"
              data="AbogadoAsignado"
              classNameLabel='flex flex-col w-[49%] sm:w-full'
              register={register}
              errors={errors}
              rules={{
                required: 'Este campo es obligatorio',
              }}
            >
              <option value="">Selecciona una opcion</option>
              {lawyers.map((l) => (
                <option key={l._id} value={l._id}>
                  {l.nombreCompletoAbogado}
                </option>
              ))}
            </GlobalInput>
          </div>

          <GlobalInput
            as="textarea"
            type="text"
            label="Objeto*"
            data="objeto"
            classNameComponent="border border-gray-500 rounded-md p-1 resize-none h-25"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <GlobalInput
            type="text"
            label="Valor del Contrato*"
            data="ValorContrato"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <div className="flex justify-between gap-2 sm:gap-4">
            <GlobalInput
              type="date"
              label="Fecha de Inicio*"
              data="FechaInicio"
              classNameLabel='flex flex-col w-full'
              register={register}
              errors={errors}
              rules={{
                required: 'Este campo es obligatorio',
              }}
            />

            <GlobalInput
              type="date"
              label="Fecha de Finalizacion*"
              data="FechaFinalizacion"
              classNameLabel='flex flex-col w-full'
              register={register}
              errors={errors}
              rules={{
                required: 'Este campo es obligatorio',
              }}
            />
          </div>

          <GlobalButton type="submit" className="p-1.5 w-1/2 block mx-auto mt-2">
            Registrar
          </GlobalButton>
        </form>
      </div>
      {/* Modal */}
      <UpdateModal
        title="Crear Tipo de Contrato"
        isOpen={contractTypeModal}
        closeModal={closeModals}
        handleSubmit={handleSubmitContractType}
        onSubmit={onSubmitContractType}
        formClassName="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg w-[90%] max-w-[500px] sm:p-6"
      >
        <GlobalInput
          label="Nombre del Tipo de Contrato"
          data="nombre"
          register={registerContractType}
          errors={errorsContractType}
          rules={{
            required: 'El nombre del tipo de contrato es obligatorio',
          }}
        />
      </UpdateModal>

      {/* AlertModal */}
      <AlertModal
        openAlertModal={alertModal.open}
        closeAlertModal={closeModals}
        modalTitle={alertModal.state}
        modalDescription={alertModal.message}
      />
      {loading && (
        <LoadSpinner name="Creando Contrato" styles="fixed bg-gray-200/95" />
      )}
    </>
  );
};
