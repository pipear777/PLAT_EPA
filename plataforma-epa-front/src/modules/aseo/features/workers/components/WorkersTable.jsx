import { GlobalButton } from '@/components';

export const WorkersTable = ({ workers = [], handleOpenForm = () => {} }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 mx-auto">
      <table className="w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-epaColor1 text-white">
          <tr>
            <th className="py-4 text-center border border-white">
              Identificación
            </th>
            <th className="text-center border border-white">Nombre</th>
            <th className="text-center border border-white">Cargo</th>
            <th className="text-center border border-white">
              Tipo de Operario
            </th>
            <th className="text-center border border-white">Proceso</th>
            <th className="text-center border border-white">Sede</th>
            <th className="text-center border border-white">Estado</th>
            <th className="text-center border border-white">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {workers.map((worker) => (
            <tr key={worker._id} className="hover:bg-gray-50 transition-colors">
              <td className="py-2">{worker.identificacion}</td>
              <td>{worker.nombre_completo}</td>
              <td>{worker.Cargo?.name ?? 'Sin cargo asignado'}</td>
              <td>{worker.tipoOperario}</td>
              <td>{worker.ProcesoAsignado?.nombreProceso}</td>
              <td>{worker.SedeAsignada?.name}</td>
              <td>
                <p
                  className={`w-4/5 mx-auto text-center rounded-4xl ${
                    worker.estado === 'Activo' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                >
                  {worker.estado}
                </p>
              </td>
              <td>
                <GlobalButton
                  variant="modalTwo"
                  onClick={() => handleOpenForm(worker)}
                  className="block mx-auto px-3 py-0.5"
                >
                  Actualizar
                </GlobalButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {workers.length === 0 && (
        <div className="text-center text-xl text-gray-500 font-semibold py-8">
          No se encontraron funcionarios
        </div>
      )}
    </div>
  );
};
