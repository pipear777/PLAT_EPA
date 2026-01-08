import {
  ConfirmModal,
  GlobalButton,
  GlobalInput,
  UpdateModal,
} from '@/components';
import { formatCOP } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Ban, Pencil } from 'lucide-react';

export const DetailsContractModal = ({
  contractData,
  isOpen,
  closeDetailsContractModal,
  modifications,
  modificationsUpdateContractModal,
  handleSubmitModificationsUpdate,
  onSubmitModificationsUpdateContract,
  closeModals,
  registerModificationsUpdate,
  errorsModificationsUpdate,
  openModificationsUpdateModal,
  confirmModalModifications,
  handleOverride,
  openConfirmModalModifications,
  mod,
}) => { 
  const lastModification = modifications.at(-1);
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="details-contract-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center z-50 "
            role="dialog"
            aria-modal="true"
            onClick={closeDetailsContractModal}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()} // evita que el click interior cierre el modal
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-[95%] max-h-[90%] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            >
              <h3 className="text-3xl font-extrabold text-epaColor1 mb-6">
                Detalles de Contrato
              </h3>

              {/* Datos del Contratista */}
              <div className="flex flex-col p-4 border border-gray-300 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300 mb-4">
                <h4 className="text-lg font-bold text-black mb-2 border-b pb-1">
                  Datos del Contratista
                </h4>
                <span>
                  <strong>Nombre Completo: </strong>{' '}
                  {contractData.NombreContratista}
                </span>
                <span>
                  <strong>Identificación: </strong>{' '}
                  {contractData.identificacionOnit}
                </span>
                <span>
                  <strong>Teléfono: </strong> {contractData.TelefonoContratista}
                </span>
              </div>

              {/* Datos del Contrato */}
              <div className="flex flex-col p-4 border border-gray-300 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300 mb-4">
                <h4 className="text-lg font-bold text-black mb-2 border-b pb-1">
                  Datos del Contrato
                </h4>
                <span>
                  <strong>Consecutivo: </strong> {contractData.consecutivo}
                </span>
                <span>
                  <strong>Dependencia o Proceso: </strong>
                  {contractData.proceso.nombreProceso}
                </span>
                <span>
                  <strong>Correo Dependencia: </strong>
                  {contractData.CorreoDependencia || 'No tiene Correo de Dependencia'}
                </span>
                <span>
                  <strong>Tipo de Contrato: </strong>
                  {contractData.tipoContrato.nombre }
                </span>
                <span>
                  <strong>Plazo de Ejecución: </strong>
                  {contractData.plazoEjecucion}
                </span>
                <span>
                  <strong>Fecha de Inicio: </strong> {contractData.FechaInicio}
                </span>
                <span>
                  <strong>Fecha de Finalización: </strong>
                  {contractData.FechaFinalizacion}
                </span>
                <span>
                  <strong>Objeto:</strong> {contractData.objeto}
                </span>
                <span>
                  <strong>Valor Inicial del Contrato: </strong>
                  {formatCOP(contractData.ValorContrato)}
                </span>
                <span>
                  <strong>Valor Actual del Contrato: </strong>
                  {formatCOP(contractData.valorActual)}
                </span>
                <span
                  className={`px-1 py-1 rounded-full text-black font-semibold
                  ${
                    contractData.EstadoContrato === 'Activo'
                      ? 'bg-green-400'
                      : ''
                  }
                  ${
                    contractData.EstadoContrato === 'Anulado'
                      ? 'bg-gray-400'
                      : ''
                  }
                  ${
                    contractData.EstadoContrato === 'Finalizado'
                      ? 'bg-red-400'
                      : ''
                  }
                  ${
                    contractData.EstadoContrato === 'ProximoVencer'
                      ? 'bg-yellow-300'
                      : ''
                  }
                `}
                >
                  <strong>Estado: </strong>
                  {contractData.EstadoContrato}
                </span>
              </div>

              {/* Datos del Abogado */}
              <div className="flex flex-col p-4 border border-gray-300 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300 mb-4">
                <h4 className="text-lg font-bold text-black mb-2 border-b pb-1">
                  Datos del Abogado
                </h4>
                <span>
                  <strong>Identificacion: </strong>{' '}
                  {contractData?.AbogadoAsignado?.identificacion}
                </span>
                <span>
                  <strong>Nombre Completo: </strong>{' '}
                  {contractData?.AbogadoAsignado?.nombreCompletoAbogado}
                </span>
              </div>

              {/* ✅ Bloque de Prórroga o Adición */}
              <div className="flex flex-col p-4 border border-gray-300 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300 mb-4">
                <h4 className="text-lg font-bold text-black mb-3 border-b pb-2">
                  Datos de Prórroga o Adición
                </h4>
                {/* Verificación condicional */}
                {modifications.length !== 0 ? (
                  modifications.map((mod) => (
                    <div
                      key={mod._id}
                      className="flex items-center justify-between p-4 mb-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Información */}
                      <div className="flex flex-col gap-1" key={mod._id}>
                        <h4 className="text-base font-semibold text-gray-800">
                          {mod.adicion && mod.prorroga
                            ? 'Adición y Prórroga'
                            : mod.adicion
                            ? 'Adición'
                            : 'Prórroga'}
                        </h4>
                        <span className="text-sm text-gray-600">
                          <strong className="text-gray-700">Secuencia:</strong>{' '}
                          {mod.tipoSecuencia}
                        </span>
                        {/* 👉 ADICIÓN */}
                        {mod.valorAdicion === 0 ? (
                          <></>
                        ) : (
                          <span className="text-sm text-gray-600">
                            <strong className="text-gray-700">
                              Valor adición:
                            </strong>{' '}
                            {formatCOP(mod.valorAdicion)}
                          </span>
                        )}
                        {/* 👉 PRÓRROGA */}
                        {mod.fechaFinalProrroga && (
                          <>
                            <span className="text-sm text-gray-600">
                              <strong className="text-gray-700">
                                Fecha final de la prórroga:
                              </strong>{' '}
                              {mod.fechaFinalProrroga}
                            </span>
                            <span className="text-sm text-gray-600">
                              <strong className="text-gray-700">
                                Tiempo Prorroga:
                              </strong>{' '}
                              {mod.tiempoProrroga}
                            </span>
                          </>
                        )}

                        <span
                          className={`px-2 py-1 rounded-full text-sm 
                            ${mod.estado === 'Activa' ? 'bg-green-400' : ''}
                            ${mod.estado === 'Anulada' ? 'bg-gray-400' : ''}
                            
                          `}
                        >
                          <strong>Estado:</strong> {mod.estado}
                        </span>
                      </div>

                      {/* Acciónes */}
                      <div className="flex gap-2">
                        <button
                          className="flex items-center justify-center p-2 bg-yellow-200 rounded-full hover:bg-yellow-300 hover:scale-110 transition-all"
                          title="Editar"
                          onClick={() => openModificationsUpdateModal(mod._id)}
                        >
                          <Pencil size={18} />
                        </button>
                        {(mod._id === lastModification?._id && mod.estado === 'Activa' ) && (
                          <button
                            className="p-2 bg-red-200 rounded-full hover:bg-red-300 hover:scale-110 transition-transform"
                            title="Anular Modificación"
                            onClick={() =>
                              openConfirmModalModifications(mod._id)
                            }
                          >
                            <Ban size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 italic text-center py-4">
                    Este contrato no tiene prórroga ni adición.
                  </p>
                )}
              </div>

              {/* Historial de Modificaciones */}
              <div className="flex flex-col p-4 border border-gray-300 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
                <h4 className="text-lg font-bold text-black mb-3 border-b pb-2">
                  Historial de Modificaciones
                </h4>
                <table className="min-w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden text-sm">
                  <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold border-b">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left font-semibold border-b">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left font-semibold border-b">
                        Creado por
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    <tr className="hover:bg-gray-200 transition-colors">
                      <td className="px-6 py-3 border-b">
                        {
                          new Date(contractData.fechaCreacion)
                            .toISOString()
                            .split('T')[0]
                        }
                      </td>
                      <td className="px-6 py-3 border-b">
                        {contractData.usuarioModifico}
                      </td>
                      <td className="px-6 py-3 border-b">
                        {contractData.creadoPor}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <GlobalButton
                  variant="modalFour"
                  onClick={closeDetailsContractModal}
                  className="p-1.5 w-30"
                >
                  Cerrar
                </GlobalButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <UpdateModal
        isOpen={modificationsUpdateContractModal}
        title="Editar Modificación"
        handleSubmit={handleSubmitModificationsUpdate}
        onSubmit={onSubmitModificationsUpdateContract}
        closeModal={closeModals}
      >
        {/* 👉 SI ES ADICIÓN */}
        {mod?.adicion && (
          <GlobalInput
            as="input"
            label="Valor Adición"
            data="valorAdicion"
            register={registerModificationsUpdate}
            errors={errorsModificationsUpdate}
            rules={{
              required: 'El valor de la adición es obligatorio',
            }}
          />
        )}
        {/* 👉 SI ES PRÓRROGA */}
        {mod?.prorroga && (
          <>
            <GlobalInput
              as="input"
              type="date"
              label="Fecha Final Prórroga"
              data="fechaFinalProrroga"
              register={registerModificationsUpdate}
              errors={errorsModificationsUpdate}
              rules={{
                required: 'La fecha final es obligatoria',
              }}
            />

            <GlobalInput
              as="input"
              label="Tiempo Prórroga"
              data="tiempoProrroga"
              register={registerModificationsUpdate}
              errors={errorsModificationsUpdate}
              rules={{
                required: 'El tiempo de la prórroga es obligatorio',
              }}
            />
          </>
        )}
      </UpdateModal>
      <ConfirmModal
        isOpen={confirmModalModifications}
        title="Confirmar Anulacion"
        content="¿Estás seguro de que  deseas anular este contrato? Esta acción no se puede deshacer."
        onClickCancel={closeModals}
        onClickConfirm={() => handleOverride()}
        buttonConfirmContent="Anular"
        variant="modalThree"
      />
    </>
  );
};
