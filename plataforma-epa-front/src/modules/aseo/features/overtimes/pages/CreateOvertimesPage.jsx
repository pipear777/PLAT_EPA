import {
  GlobalButton,
  GlobalInput,
  LoadSpinner,
  AlertModal,
} from '@/components';
import { useCreateOvertimes, useDeleteOvertime } from '../hooks';
import { ExcelImportForm, RegisteredOvertimeTable } from '../components';
import { useBackNavigation } from '@/hooks';
import { ArrowLeft } from 'lucide-react';

export const CreateOvertimesPage = () => {
  const { onClickBack } = useBackNavigation();
  const {
    controlExcel,
    errorsExcel,
    errorsHoras,
    fileInputRef,
    loading,
    modalMessage,
    openModal,
    overtimeRegister,
    sheetNames,
    state,
    workers,
    getExcelSheetNames,
    handleSubmitExcel,
    handleSubmitHoras,
    onCloseModal,
    onDeleteOvertimeRegister,
    onSubmit,
    onSubmitExcel,
    registerHoras,
  } = useCreateOvertimes();

  const {
    message,
    estado,
    openResultModal,
    showConfirmModal,
    abrirConfirm,
    cerrarConfirm,
    onCloseAlertModal,
    handleDelete,
  } = useDeleteOvertime(onDeleteOvertimeRegister);

  return (
    <>
      {loading && (
        <LoadSpinner styles="fixed bg-gray-200/95" name="Importando Excel" />
      )}
      <GlobalButton
        variant="back"
        className="flex w-30 p-1.5"
        onClick={onClickBack}
      >
        <ArrowLeft className="ml-0.5 mr-2 -left-0.5" />
        Regresar
      </GlobalButton>
      <div className="flex flex-col gap-4 items-center mt-2">
        <h2 className="text-epaColor1 text-3xl font-extrabold sm:text-4xl">
          Registrar Horas Extra
        </h2>
        <form
          onSubmit={handleSubmitHoras(onSubmit)}
          className="flex flex-col gap-2 w-full bg-white p-4 rounded-xl shadow-2xl sm:w-3/4 md:w-2/3 lg:w-1/2 sm:gap-4"
        >
          <GlobalInput
            as="select"
            label="Funcionario"
            data="FuncionarioAsignado"
            register={registerHoras}
            errors={errorsHoras}
            rules={{
              required: 'Debe Seleccionar un Funcionario',
            }}
          >
            <option value="">Seleccione un funcionario</option>
            {workers.map((w) => (
              <option key={w._id} value={w._id}>
                {w.nombre_completo}
              </option>
            ))}
          </GlobalInput>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="flex justify-between items-center">
              <GlobalInput
                type="date"
                label="Fecha Inicio Trabajo"
                data="fecha_inicio_trabajo"
                classNameLabel="flex flex-col w-3/4"
                register={registerHoras}
                errors={errorsHoras}
                rules={{
                  required: 'Campo Obligatorio',
                }}
              />
              <GlobalInput
                type="checkbox"
                label="Festivo"
                data="es_festivo_Inicio"
                register={registerHoras}
                errors={errorsHoras}
              />
            </div>
            <GlobalInput
              type="time"
              label="Hora Inicio Trabajo"
              data="hora_inicio_trabajo"
              register={registerHoras}
              errors={errorsHoras}
              rules={{
                required: 'Campo Obligatorio',
              }}
            />
            <div className="flex justify-between items-center">
              <GlobalInput
                type="date"
                label="Fecha Fin Trabajo"
                data="fecha_fin_trabajo"
                classNameLabel="flex flex-col w-3/4"
                register={registerHoras}
                errors={errorsHoras}
                rules={{
                  required: 'Campo Obligatorio',
                }}
              />
              <GlobalInput
                type="checkbox"
                label="Festivo"
                data="es_festivo_Fin"
                register={registerHoras}
                errors={errorsHoras}
              />
            </div>
            <GlobalInput
              type="time"
              label="Hora Fin Trabajo"
              data="hora_fin_trabajo"
              register={registerHoras}
              errors={errorsHoras}
              rules={{
                required: 'Campo Obligatorio',
              }}
            />
            <GlobalInput
              type="date"
              label="Fecha Inicio Descanso"
              data="fecha_inicio_descanso"
              register={registerHoras}
              errors={errorsHoras}
            />
            <GlobalInput
              type="time"
              label="Hora Inicio Descanso"
              data="hora_inicio_descanso"
              register={registerHoras}
              errors={errorsHoras}
            />
            <GlobalInput
              type="date"
              label="Fecha Fin Descanso"
              data="fecha_fin_descanso"
              register={registerHoras}
              errors={errorsHoras}
            />
            <GlobalInput
              type="time"
              label="Hora Fin Descanso"
              data="hora_fin_descanso"
              register={registerHoras}
              errors={errorsHoras}
            />
          </div>
          <GlobalInput
            as="textarea"
            type="text"
            label="Observaciones"
            data="observaciones"
            classNameComponent="border border-gray-500 rounded-md p-1 resize-none"
            register={registerHoras}
            errors={errorsHoras}
          />
          <GlobalButton type="submit" className="p-1.5 w-1/2 block mx-auto mt-5 sm:mt-1">
            Registrar
          </GlobalButton>
        </form>
        <h3 className="text-epaColor1 text-center text-xl font-extrabold sm:text-2xl">
          Importar Excel de Horas Extra
        </h3>
        <ExcelImportForm
          onSubmit={handleSubmitExcel(onSubmitExcel)}
          control={controlExcel}
          errors={errorsExcel}
          ref={fileInputRef}
          sheetNamesProp={sheetNames}
          getExcelSheetNamesProp={getExcelSheetNames}
        />
        <RegisteredOvertimeTable
          data={overtimeRegister}
          showConfirmModal={showConfirmModal}
          abrirConfirm={abrirConfirm}
          cerrarConfirm={cerrarConfirm}
          handleDelete={handleDelete}
        />
      </div>
      {/* AlertModal de crear registro */}
      <AlertModal
        openAlertModal={openModal}
        closeAlertModal={onCloseModal}
        modalTitle={state}
        modalDescription={modalMessage}
      />
      {/* AlertModal de eliminar el registro creado */}
      <AlertModal
        openAlertModal={openResultModal}
        closeAlertModal={onCloseAlertModal}
        modalTitle={estado}
        modalDescription={message}
      />
    </>
  );
};
