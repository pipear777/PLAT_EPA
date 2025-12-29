import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  GlobalButton,
  GlobalInput,
  AlertModal,
  UpdateModal,
} from '@/components';
import { FilePlus, IdCardLanyard, Pencil } from 'lucide-react';
import { useLawyer } from '../hooks';
import { useJuridica } from '@/modules/juridica/context/JuridicaContext';
import { ROLES } from '@/constants';

export const LawyersPage = () => {
  const { lawyers } = useJuridica();

  const {
    // Properties
    alertModal,
    errors,
    errorsUpdate,
    modal,
    selectedNameLawyer,
    updateModal,
    rol,

    // Methods
    closeModals,
    handleSubmit,
    handleSubmitUpdate,
    openModal,
    onSubmitUpdateLawyer,
    openUpdateModal,
    onSubmit,
    register,
    registerUpdate,
  } = useLawyer();

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl text-center font-extrabold text-epaColor1">
          Abogados
        </h2>
        {(rol === ROLES.SUPER_ADMIN || rol === ROLES.ADMIN_JURIDICA) && (
          <GlobalButton
            variant="third"
            className="flex w-50 ml-3 items-center gap-3 px-5 py-1.5"
            onClick={openModal}
          >
            <FilePlus />
            Crear Abogado
          </GlobalButton>
        )}
        <div className="w-full overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <table className="table-fixed w-full text-sm">
            <thead className="bg-epaColor1 text-white">
              <tr>
                <th className="text-center border py-4">Identificación</th>
                <th className="text-center border">Nombre</th>
                <th className="text-center border">Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {lawyers.map((l) => (
                <tr key={l._id} className="hover:bg-gray-200 transition-colors">
                  <td className="p-2">{l.identificacion}</td>
                  <td className="p-2">{l.nombreCompletoAbogado}</td>
                  <td className="p-2">
                    <p
                      className={`w-[85px] py-0.5 mx-auto text-center rounded-4xl
                        ${
                          l.EstadoAbogado?.toLowerCase() === 'activo'
                            ? 'bg-green-500 text-black'
                            : 'bg-gray-400 text-black'
                        }
                      `}
                    >
                      {l.EstadoAbogado}
                    </p>
                  </td>
                  <td className="py-2 flex justify-center">
                    <button
                      title="Editar"
                      className="bg-cyan-300/50 rounded-4xl p-2 hover:bg-cyan-400 transition-colors"
                      onClick={() => openUpdateModal(l._id)}
                    >
                      <Pencil size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center">
          <div className="flex flex-col gap-4 w-[500px] p-6 bg-white rounded-2xl">
            <h3 className="text-4xl font-extrabold text-epaColor1 text-center">
              Crear Abogado
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <GlobalInput
                as="input"
                label="Identificación*"
                data="identificacion"
                register={register}
                errors={errors}
                rules={{
                  required: 'La identificación del Abogado es obligatoria',
                }}
              />
              <GlobalInput
                as="input"
                label="Nombre Completo*"
                data="nombreCompletoAbogado"
                register={register}
                errors={errors}
                rules={{
                  required: 'El nombre completo del Abogado es obligatorio',
                }}
              />
              <div className="flex gap-2 justify-end ">
                <GlobalButton
                  variant="modalFour"
                  className="p-1.5 w-25"
                  onClick={closeModals}
                >
                  Cancelar
                </GlobalButton>
                <GlobalButton
                  type="submit"
                  variant="modalTwo"
                  className="p-1.5 w-25"
                >
                  Guardar
                </GlobalButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      <AlertModal
        openAlertModal={alertModal.open}
        closeAlertModal={closeModals}
        modalTitle={alertModal.state}
        modalDescription={alertModal.message}
      />

      <UpdateModal
        isOpen={updateModal}
        title="Editar Abogado"
        handleSubmit={handleSubmitUpdate}
        onSubmit={onSubmitUpdateLawyer}
        closeModal={closeModals}
      >
        <div className="flex text-epaColor1 font-bold">
          <IdCardLanyard className="mr-1" />
          <h4>{selectedNameLawyer}</h4>
        </div>

        <GlobalInput
          as="input"
          label="Identificación"
          data="identificacion"
          register={registerUpdate}
          errors={errorsUpdate}
          rules={{
            required: 'La identificación del Abogado es obligatoria',
          }}
        />
        <GlobalInput
          as="input"
          label="Nombre Completo"
          data="nombreCompletoAbogado"
          register={registerUpdate}
          errors={errorsUpdate}
          rules={{
            required: 'El nombre completo del Abogado es obligatorio',
          }}
        />
        <GlobalInput
          as="select"
          type="text"
          label="Estado"
          data="EstadoAbogado"
          register={registerUpdate}
          errors={errorsUpdate}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </GlobalInput>
      </UpdateModal>
    </>
  );
};
