import { ArrowLeft } from 'lucide-react';
import {
  AlertModal,
  FilterInput,
  GlobalButton,
  GlobalInput,
  LoadSpinner,
  UpdateModal,
} from '@/components';
import { useBackNavigation } from '@/hooks';
import { useGetWorkers } from '../hooks';
import { WorkersTable } from '../components';
import { Controller } from 'react-hook-form';

export const GetWorkersPage = () => {
  const {
    // Properties
    alertModal,
    control,
    departaments,
    errors,
    estado,
    filteredWorkers,
    filterValue,
    jobPositions,
    loading,
    locations,
    tipoOperario,
    updateModal,

    // Methods
    closeAlertModal,
    closeModals,
    getActiveWorkers,
    handleKeyDown,
    handleOpenForm,
    handleSearch,
    handleSubmit,
    onSubmit,
    register,
    setFilterValue,
  } = useGetWorkers();
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
        <h2 className="text-epaColor1 text-center text-3xl font-extrabold sm:text-4xl">
          Funcionarios
        </h2>
        <div className="flex gap-1 md:gap-4">
          <FilterInput
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            handleKeyDown={handleKeyDown}
            handleSearch={handleSearch}
            placeholder="Buscar por identificación"
            inputClassName="bg-white p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3 sm:w-94 md:w-100"
          />
          <button
            className="bg-green-300 w-24 text-epaColor1 font-semibold rounded-xl cursor-pointer border-2 border-transparent hover:bg-transparent hover:border-green-400 sm:w-30"
            onClick={getActiveWorkers}
          >
            Activos
          </button>
        </div>
        <WorkersTable
          workers={filteredWorkers}
          handleOpenForm={handleOpenForm}
        />
        <UpdateModal
          isOpen={updateModal}
          title="Editar Funcionario"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          closeModal={closeModals}
          formClassName="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg w-[90%] max-w-[500px] sm:p-6"
        >
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
            label="Nombre Completo"
            data="nombre_completo"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          />
          <label className="flex flex-col">
            <span className="text-epaColor1 font-semibold">Cargo</span>
            <Controller
              name="Cargo"
              control={control}
              rules={{ required: 'Debe seleccionar el cargo' }}
              render={({ field }) => (
                <select
                  {...field}
                  className="border border-gray-500 rounded-md p-1"
                >
                  <option value="">Seleccione el cargo</option>
                  {jobPositions.map((jobPosition) => (
                    <option key={jobPosition._id} value={jobPosition._id}>
                      {jobPosition.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </label>
          {errors.Cargo && (
            <p className="text-red-500 text-sm mt-1">{errors.Cargo.message}</p>
          )}
          <label className="flex flex-col">
            <span className="text-epaColor1 font-semibold">
              Tipo de Operario
            </span>
            <Controller
              name="tipoOperario"
              control={control}
              rules={{ required: 'Debe seleccionar el tipo de operario' }}
              render={({ field }) => (
                <select
                  {...field}
                  className="border border-gray-500 rounded-md p-1"
                >
                  <option value="">Seleccione el tipo de operario</option>
                  {tipoOperario.map((to) => (
                    <option key={to} value={to}>
                      {to}
                    </option>
                  ))}
                </select>
              )}
            />
          </label>
          {errors.tipoOperario && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tipoOperario.message}
            </p>
          )}
          <label className="flex flex-col">
            <span className="text-epaColor1 font-semibold">Proceso</span>
            <Controller
              name="ProcesoAsignado"
              control={control}
              rules={{ required: 'Debe seleccionar el proceso' }}
              render={({ field }) => (
                <select
                  {...field}
                  className="border border-gray-500 rounded-md p-1"
                >
                  <option value="">Seleccione el proceso</option>
                  {departaments.map((departament) => (
                    <option key={departament._id} value={departament._id}>
                      {departament.nombreProceso}
                    </option>
                  ))}
                </select>
              )}
            />
          </label>
          {errors.ProcesoAsignado && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ProcesoAsignado.message}
            </p>
          )}
          <label className="flex flex-col">
            <span className="text-epaColor1 font-semibold">Sede</span>
            <Controller
              name="SedeAsignada"
              control={control}
              rules={{ required: 'Debe seleccionar la sede' }}
              render={({ field }) => (
                <select
                  {...field}
                  className="border border-gray-500 rounded-md p-1"
                >
                  <option value="">Seleccione la sede</option>
                  {locations.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </label>
          {errors.SedeAsignada && (
            <p className="text-red-500 text-sm mt-1">
              {errors.SedeAsignada.message}
            </p>
          )}
          <label className="flex flex-col">
            <span className="text-epaColor1 font-semibold">Estado</span>
            <Controller
              name="estado"
              control={control}
              rules={{ required: 'Debe seleccionar el estado' }}
              render={({ field }) => (
                <select
                  {...field}
                  className="border border-gray-500 rounded-md p-1"
                >
                  <option value="">Seleccione el estado</option>
                  {estado.map((est) => (
                    <option key={est} value={est}>
                      {est}
                    </option>
                  ))}
                </select>
              )}
            />
          </label>
          {errors.estado && (
            <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>
          )}
        </UpdateModal>
        <AlertModal
          openAlertModal={alertModal.open}
          closeAlertModal={closeAlertModal}
          modalTitle={alertModal.status}
          modalDescription={alertModal.message}
        />
      </div>
      {loading && <LoadSpinner styles="fixed bg-gray-200/90" />}
    </>
  );
};
