import {
  AlertModal,
  ConfirmModal,
  FilterInput,
  GlobalButton,
  LoadSpinner,
  UpdateModal,
} from '@/components';
import { useBackNavigation } from '@/hooks';
import {
  EyeClosed,
  Eye,
  Pencil,
  Ban,
  StickyNote,
  ArrowLeft,
  RotateCcw,
  CirclePlus,
} from 'lucide-react';
import { useGetContracts } from '../hooks';
import {
  DetailsContractModal,
  ModificationsContractModal,
  UpdateContractModal,
} from '../components';

export const GetContractsPage = () => {
  const {
    //Properties
    alertModal,
    confirmModal,
    contractType,
    currentPage,
    detailsContractModal,
    errors,
    errorsModifications,
    filteredContracts,
    filterValue,
    hoverEye,
    lawyers,
    loading,
    loadingFilter,
    loadingModifications,
    modificationsContractModal,
    objetoExpandido,
    process,
    totalPages,
    totalRecords,
    selectedConsecutive,
    selectedContract,
    selectedContractType,
    summaries,
    updateModal,

    //Methods
    closeModals,
    handleOverride,
    handlePageChange,
    handleReset,
    handleSearch,
    handleSubmit,
    handleSubmitModifications,
    onSubmitUpdateContract,
    onSubmitModificationsContract,
    openConfirmModal,
    openDetailsContractModal,
    openEye,
    openModificationsModal,
    openUpdateModal,
    register,
    registerModifications,
    setFilterValue,
    setObjetoExpandido,
    watchModifications,
  } = useGetContracts();
  const { onClickBack } = useBackNavigation();

  return (
    <>
      {loading && (
        <LoadSpinner name="Cargando Contratos" styles="fixed bg-gray-200/95" />
      )}
      {loadingFilter && (
        <LoadSpinner name="Cargando Contratos" styles="fixed bg-gray-200/95" />
      )}
      {loadingModifications && (
        <LoadSpinner name="Cargando Contratos" styles="fixed bg-gray-200/95" />
      )}
      <GlobalButton
        variant="back"
        className="flex w-30 p-1.5 mb-3"
        onClick={onClickBack}
      >
        <ArrowLeft className="ml-0.5 mr-2 -left-0.5" />
        Regresar
      </GlobalButton>
      <div className="flex flex-col h-full gap-4">
        {/* Cards */}
        <div className=" h-1/5 flex flex-row justify-around items-center gap-4">
          <div className="bg-green-400 h-25 w-70 p-3 rounded-2xl font-semibold text-center shadow-lg shadow-gray-300">
            <span> Numero de contratos vigentes </span>
            <p className="text-3xl">{summaries?.data?.Activo ?? 0}</p>
          </div>
          <div className="bg-yellow-300 h-25 w-70 p-3 rounded-2xl font-semibold text-center shadow-lg shadow-gray-300">
            <span>Contratos por vencer en 30 dias</span>
            <p className="text-3xl">{summaries?.data?.ProximoVencer ?? 0}</p>
          </div>
          <div className="bg-red-500 h-25 w-70 p-3  rounded-2xl font-semibold text-center shadow-lg shadow-gray-300">
            <span>Numero de contratos vencidos</span>
            <p className="text-3xl">{summaries?.data?.Finalizado ?? 0}</p>
          </div>
          <div className="bg-gray-400 h-25 w-70 p-3 rounded-2xl font-semibold text-center shadow-lg shadow-gray-300">
            <span>Contratos Anulados</span>
            <p className="text-3xl">{summaries?.data?.Anulado ?? 0}</p>
          </div>
        </div>

        {/*Filtros*/}
        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-2 ">
            <input
              type="text"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Escribe aquí…"
              className="bg-white w-180 p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3"
            />
            <GlobalButton className="flex p-2 gap-2" onClick={handleReset}>
              <RotateCcw />
              Resetear Filtro
            </GlobalButton>
          </div>

          <div className="flex gap-2">
            <GlobalButton
              className="p-2"
              onClick={() => handleSearch('NombreContratista')}
            >
              Buscar por Nombre
            </GlobalButton>
            <GlobalButton
              className="p-2"
              onClick={() => handleSearch('consecutivo')}
            >
              Buscar por Consecutivo
            </GlobalButton>
            <GlobalButton
              className="p-2"
              onClick={() => handleSearch('identificacionOnit')}
            >
              Buscar por Identificacion
            </GlobalButton>
            <GlobalButton
              className="p-2"
              onClick={() => handleSearch('tipoContrato')}
            >
              Buscar por Tipo de Contrato
            </GlobalButton>
            <GlobalButton
              className="p-2"
              onClick={() => handleSearch('vigencia')}
            >
              Buscar por Vigencia
            </GlobalButton>
          </div>
        </div>

        {/*Tabla de Contratos*/}
        <section className="">
          <div className="bg-white  shadow-md rounded-lg p-6 mx-auto mt-6">
            <table className="table-fixed w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-epaColor1 text-white">
                <tr>
                  <th className="py-4 text-center border border-white">
                    Proceso/ <br /> Dependencia <br /> del contrato
                  </th>
                  <th className="text-center border">
                    Tipo de <br />
                    Contrato
                  </th>
                  <th className="text-center border">Consecutivo</th>
                  <th className="text-center border">
                    Nombre del <br /> Contratista
                  </th>
                  <th className="text-center border">Objeto</th>
                  <th className="text-center border">
                    Valor <br /> Contrato
                  </th>
                  <th className="text-center border">
                    Fecha de <br /> Inicio
                  </th>
                  <th className="text-center border">
                    Abogado <br /> Asignado
                  </th>
                  <th className="text-center border">Estado</th>
                  <th className="text-center ">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredContracts?.length > 0 ? (
                  filteredContracts.map((c, index) => (
                    <tr
                      key={c._id}
                      className="hover:bg-gray-100 transition-colors my-2"
                    >
                      <td className="pl-2">{c.proceso.nombreProceso}</td>
                      <td className="pl-2">{c.tipoContrato.nombre}</td>
                      <td className="pl-2">{c.consecutivo}</td>
                      <td className="pl-2">{c.NombreContratista}</td>
                      <td className="pl-2 whitespace-normal break-words max-w-[200px]">
                        {objetoExpandido === index ? (
                          <>
                            {c.objeto}
                            <button
                              className="text-blue-600 ml-2"
                              onClick={() => setObjetoExpandido(null)}
                            >
                              Ver menos
                            </button>
                          </>
                        ) : (
                          <>
                            {c.objeto.length > 60 ? (
                              <>
                                {c.objeto.substring(0, 60)}...
                                <button
                                  className="text-blue-600 ml-2"
                                  onClick={() => setObjetoExpandido(index)}
                                >
                                  Ver más
                                </button>
                              </>
                            ) : (
                              c.objeto
                            )}
                          </>
                        )}
                      </td>
                      <td className="pl-2">{c.ValorContrato}</td>
                      <td className="pl-2">{c.FechaInicio}</td>
                      <td className="pl-2">
                        {c.AbogadoAsignado?.nombreAbogado || 'No asignado'}
                      </td>
                      <td>
                        <span
                          className={`ml-3 px-3 py-1 rounded-full text-sm font-semibold
                            ${
                              c.EstadoContrato === 'Activo'
                                ? 'bg-green-400'
                                : ''
                            }
                            ${
                              c.EstadoContrato === 'Anulado'
                                ? 'bg-gray-400'
                                : ''
                            }
                            ${
                              c.EstadoContrato === 'Finalizado'
                                ? 'bg-red-400'
                                : ''
                            }
                            ${
                              c.EstadoContrato === 'ProximoVencer'
                                ? 'bg-yellow-300'
                                : ''
                            }
                          `}
                        >
                          {c.EstadoContrato}
                        </span>
                      </td>

                      <td>
                        <div className="pl-2 grid grid-cols-2 gap-2 xl:gird xl:grid-cols-2 xl:gap-2 2xl:flex 2xl:flex-row 2xl:gap-2">
                          <button
                            onMouseEnter={() => openEye(c._id)}
                            onMouseLeave={() => openEye(null)}
                            className="flex items-center justify-center p-2 bg-sky-200 rounded-full hover:bg-sky-400 hover:scale-110 transition-transform"
                            title="Ver detalles"
                            onClick={() => openDetailsContractModal(c._id)}
                          >
                            {hoverEye === c._id ? (
                              <Eye size={18} />
                            ) : (
                              <EyeClosed size={18} />
                            )}
                          </button>

                          <button
                            className="flex items-center justify-center p-2 bg-yellow-200 rounded-full hover:bg-yellow-300 hover:scale-110 transition-transform"
                            title="Editar"
                            onClick={() => openUpdateModal(c._id)}
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            className="flex items-center justify-center p-2 bg-green-200 rounded-full hover:bg-green-300 hover:scale-110 transition-transform"
                            title="Agregar Modificaciones"
                            onClick={() => openModificationsModal(c._id)}
                          >
                            <CirclePlus size={18} />
                          </button>

                          <button
                            className="flex items-center justify-center p-2 bg-red-200 rounded-full hover:bg-red-300 hover:scale-110 transition-transform"
                            title="Eliminar"
                            onClick={() => openConfirmModal(c._id)}
                          >
                            <Ban size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No hay contratos disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* PAGINACIÓN */}
          <div className="flex justify-between items-center px-4 py-3">
            <span>
              Mostrando {filteredContracts.length} de {totalRecords} registros.
            </span>
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
          </div>
        </section>
        {/* AlertModal */}
        <AlertModal
          openAlertModal={alertModal.open}
          closeAlertModal={closeModals}
          modalTitle={alertModal.state}
          modalDescription={alertModal.message}
        />

        <DetailsContractModal
          isOpen={detailsContractModal}
          closeDetailsContractModal={closeModals}
          contractData={selectedContract}
        />

        <UpdateModal
          isOpen={updateModal}
          title="Editar Contrato"
          handleSubmit={handleSubmit}
          onSubmit={onSubmitUpdateContract}
          closeModal={closeModals}
          formClassName="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        >
          <div className="flex text-epaColor1 font-bold ">
            <StickyNote className="mr-1" />
            <h4>
              CONTRATO {selectedContractType} N° {selectedConsecutive}
            </h4>
          </div>
          <UpdateContractModal
            register={register}
            errors={errors}
            lawyers={lawyers}
            contractType={contractType}
            process={process}
          />
        </UpdateModal>

        <UpdateModal
          isOpen={modificationsContractModal}
          title="Modificaciones"
          handleSubmit={handleSubmitModifications}
          onSubmit={onSubmitModificationsContract}
          closeModal={closeModals}
        >
          <ModificationsContractModal
            register={registerModifications}
            errors={errorsModifications}
            watchModifications={watchModifications}
          />
        </UpdateModal>

        <ConfirmModal
          isOpen={confirmModal}
          title="Confirmar Anulacion"
          content="¿Estás seguro de que  deseas anular este contrato? Esta acción no se puede deshacer."
          onClickCancel={closeModals}
          onClickConfirm={() => handleOverride()}
          buttonConfirmContent="Anular"
          variant="modalThree"
        />
      </div>
    </>
  );
};
