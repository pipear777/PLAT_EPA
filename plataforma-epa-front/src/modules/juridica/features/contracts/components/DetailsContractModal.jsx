import { GlobalButton } from '@/components';
import { AnimatePresence, motion } from 'framer-motion';

export const DetailsContractModal = ({
  contractData,
  isOpen,
  closeDetailsContractModal,
}) => {
  return (
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
                <strong>Nombre Completo:</strong>{' '}
                {contractData.NombreContratista}
              </span>
              <span>
                <strong>Identificación:</strong>{' '}
                {contractData.identificacionOnit}
              </span>
              <span>
                <strong>Teléfono:</strong> {contractData.TelefonoContratista}
              </span>
            </div>

            {/* Datos del Contrato */}
            <div className="flex flex-col p-4 border border-gray-300 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300 mb-4">
              <h4 className="text-lg font-bold text-black mb-2 border-b pb-1">
                Datos del Contrato
              </h4>
              <span>
                <strong>Consecutivo:</strong> {contractData.consecutivo}
              </span>
              <span>
                <strong>Dependencia o Proceso:</strong>
                {contractData.proceso.nombreProceso}
              </span>
              <span>
                <strong>Correo Dependencia:</strong>
                {contractData.CorreoDependencia}
              </span>
              <span>
                <strong>Tipo de Contrato:</strong>
                {contractData.tipoContrato.tipoContrato}
              </span>
              <span>
                <strong>Fecha de Inicio:</strong> {contractData.FechaInicio}
              </span>
              <span>
                <strong>Fecha de Finalización:</strong>
                {contractData.FechaFinalizacion}
              </span>
              <span>
                <strong>Objeto:</strong> {contractData.objeto}
              </span>
              <span>
                <strong>Valor del Contrato:</strong>
                {contractData.ValorContrato}
              </span>
              <span
                className={`px-1 py-1 rounded-lg text-black font-semibold
                  ${contractData.EstadoContrato === 'Activo' ? 'bg-green-400' : ''}
                  ${contractData.EstadoContrato === 'Anulado' ? 'bg-gray-400' : ''}
                  ${contractData.EstadoContrato === 'Finalizado' ? 'bg-red-400' : ''}
                  ${contractData.EstadoContrato === 'ProximoVencer' ? 'bg-yellow-300' : ''}
                `}
              >
                <strong>Estado: </strong>
                {contractData.EstadoContrato}
              </span>
            </div>

            {/* Datos del Abogado */}
            {/* ✅ Bloque de Prórroga o Adición */}
            <div className="flex flex-col p-4 border border-gray-300 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300 mb-4">
              <h4 className="text-lg font-bold text-black mb-3 border-b pb-2">
                Datos de Prórroga o Adición
              </h4>

              {/* Verificación condicional */}
              {contractData.modificaciones?.TipoModificacion ||
              contractData.modificaciones?.adicion ||
              contractData.modificaciones?.prorroga ? (
                <>
                  {/* Mostrar Tipo de Modificación si existe
                  {contractData.modificaciones?.TipoModificacion && (
                    <p className="text-gray-700 mb-3">
                      <strong>Tipo de Modificación:</strong>{' '}
                      {contractData.modificaciones.TipoModificacion}
                    </p>
                  )} */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span>
                <strong>Valor del Contrato:</strong>
                {contractData.modificaciones.valo}
              </span>
                    </div>
                  </div> 
                </>
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
                  <tr className="hover:bg-gray-50 transition-colors">
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
  );
};
