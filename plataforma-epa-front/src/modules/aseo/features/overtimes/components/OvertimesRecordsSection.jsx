import { useOvertimesRecordsSection } from '../hooks';
import { GlobalButton } from '@/components';

export const OvertimesRecordsSection = ({
  overtimesFilter = [],
  OpenUpdateModal = () => {},
  onOpenConfirmModal = () => {},
}) => {
  const { formatDate, formatHour } = useOvertimesRecordsSection();

  return (
    <>
      <div className="w-full bg-white shadow-md rounded-lg p-4 mx-auto">
        <table className="w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-epaColor1 text-white">
            <tr>
              <th className="py-4 text-center border border-white">
                Identificación
              </th>
              <th className="text-center border border-white">Nombre</th>
              <th className="text-center border border-white">
                Fecha creación
              </th>
              <th className="text-center border border-white">
                Inicio trabajo
              </th>
              <th className="text-center border border-white">Fin trabajo</th>
              <th className="text-center border border-white">
                Hora inicio
                <br />
                trabajo
              </th>
              <th className="text-center border border-white">
                Hora fin
                <br />
                trabajo
              </th>
              <th className="text-center border border-white">
                Inicio descanso
              </th>
              <th className="text-center border border-white">Fin descanso</th>
              <th className="text-center border border-white">
                Hora inicio
                <br />
                descanso
              </th>
              <th className="text-center border border-white">
                Hora fin
                <br />
                descanso
              </th>
              <th className="text-center border border-white">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {overtimesFilter.map((overtime) => (
              <tr
                key={overtime._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-2">
                  {overtime.FuncionarioAsignado?.identificacion}
                </td>
                <td>{overtime.FuncionarioAsignado?.nombre_completo}</td>
                {/* <td>{overtime._id}</td> */}
                <td>{formatDate(overtime.createdAt)}</td>
                <td>{formatDate(overtime.fecha_inicio_trabajo)}</td>
                <td>{formatDate(overtime.fecha_fin_trabajo)}</td>
                <td>{overtime.hora_inicio_trabajo}</td>
                <td>{overtime.hora_fin_trabajo}</td>
                <td>{formatDate(overtime.fecha_inicio_descanso)}</td>
                <td>{formatDate(overtime.fecha_fin_descanso)}</td>
                <td>{formatHour(overtime.hora_inicio_descanso)}</td>
                <td>{formatHour(overtime.hora_fin_descanso)}</td>
                <td className="p-1 space-x-1 space-y-1">
                  <GlobalButton
                    variant="modalTwo"
                    onClick={() => OpenUpdateModal(overtime._id)}
                    className="px-3 py-0.5"
                  >
                    Actualizar
                  </GlobalButton>
                  <GlobalButton
                    variant="modalThree"
                    onClick={() => onOpenConfirmModal(overtime._id)}
                    className="px-3 py-0.5"
                  >
                    Eliminar
                  </GlobalButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {overtimesFilter.length === 0 && (
          <div className="text-center text-xl text-gray-500 font-semibold py-8">
            No se encontraron registros de horas extra
          </div>
        )}
      </div>
    </>
  );
};
