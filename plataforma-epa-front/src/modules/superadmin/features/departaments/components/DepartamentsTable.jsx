import { GlobalButton, LoadSpinner } from '@/components';

export const DepartamentsTable = ({
  loading = Boolean,
  departaments = [],
  handleOpenUpdateModal = () => {},
}) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 mx-auto">
      <table className="w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-epaColor1 text-white">
          <tr>
            <th className="w-7/10 py-4 text-center border border-white">Nombre</th>
            <th className="text-center border border-white">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {departaments.map((departament) => (
            <tr
              key={departament._id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 text-center">{departament.nombreProceso}</td>
              <td>
                <GlobalButton
                  variant="modalTwo"
                  onClick={() => handleOpenUpdateModal(departament)}
                  className="block mx-auto px-3 py-0.5"
                >
                  Actualizar
                </GlobalButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <LoadSpinner styles="mt-4" />}
      {!loading && departaments.length === 0 && (
        <div className="text-center text-xl text-gray-500 font-semibold py-8">
          No se encontraron procesos
        </div>
      )}
    </div>
  );
};
