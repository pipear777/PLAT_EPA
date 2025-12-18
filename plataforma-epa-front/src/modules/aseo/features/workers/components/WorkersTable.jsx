import { GlobalButton } from '@/components';

export const WorkersTable = ({ workers = [], handleOpenForm = () => {} }) => {

  console.log(workers);
  
  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg p-4 mx-auto">
      <table className="table-fixed w-full min-w-[1200px] text-sm border-collapse">
        <thead className="bg-epaColor1 text-white">
          <tr>
            <th className="py-4 border border-white">
              Identificación
            </th>
            <th className="border border-white">Nombre</th>
            <th className="border border-white">Cargo</th>
            <th className="border border-white">
              Tipo de Operario
            </th>
            <th className="border border-white">Proceso</th>
            <th className="border border-white">Sede</th>
            <th className="border border-white">Estado</th>
            <th className="border border-white">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {workers.map((worker) => (
            <tr key={worker._id} className="hover:bg-gray-200 transition-colors">
              <td className="p-2">{worker.identificacion}</td>
              <td className="p-2">{worker.nombre_completo}</td>
              <td className="p-2">{worker.Cargo?.name ?? 'Sin cargo asignado'}</td>
              <td className="p-2">{worker.tipoOperario}</td>
              <td className="p-2">{worker.ProcesoAsignado?.nombreProceso}</td>
              <td className="p-2">{worker.SedeAsignada?.name}</td>
              <td className="p-2">
                <p
                  className={`w-[85px] py-0.5 mx-auto text-center rounded-4xl ${
                    worker.estado === 'Activo' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                >
                  {worker.estado}
                </p>
              </td>
              <td className="p-2 text-center">
                <GlobalButton
                  variant="modalTwo"
                  onClick={() => handleOpenForm(worker)}
                  className="w-[85px] py-0.5"
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
