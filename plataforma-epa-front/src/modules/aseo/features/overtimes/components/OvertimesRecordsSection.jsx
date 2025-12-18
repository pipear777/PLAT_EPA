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
      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg p-4 mx-auto">
        <table className="table-fixed w-full min-w-[1200px] text-sm border-collapse">
          <thead className="bg-epaColor1 text-white">
            <tr>
              <th className="py-4 border border-white">
                Identificación
              </th>
              <th className="border border-white">Nombre</th>
              <th className="border border-white">
                Fecha creación
              </th>
              <th className="border border-white">
                Inicio trabajo
              </th>
              <th className="border border-white">Fin trabajo</th>
              <th className="border border-white">
                Hora inicio
                <br />
                trabajo
              </th>
              <th className="border border-white">
                Hora fin
                <br />
                trabajo
              </th>
              <th className="border border-white">
                Inicio descanso
              </th>
              <th className="border border-white">Fin descanso</th>
              <th className="border border-white">
                Hora inicio
                <br />
                descanso
              </th>
              <th className="border border-white">
                Hora fin
                <br />
                descanso
              </th>
              <th className="border border-white">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {overtimesFilter.map((overtime) => (
              <tr
                key={overtime._id}
                className="hover:bg-gray-200 transition-colors"
              >
                <td className="p-2">
                  {overtime.FuncionarioAsignado?.identificacion}
                </td>
                <td className="p-2">{overtime.FuncionarioAsignado?.nombre_completo}</td>
                {/* <td>{overtime._id}</td> */}
                <td className="p-2">{formatDate(overtime.createdAt)}</td>
                <td className="p-2">{formatDate(overtime.fecha_inicio_trabajo)}</td>
                <td className="p-2">{formatDate(overtime.fecha_fin_trabajo)}</td>
                <td className="p-2">{overtime.hora_inicio_trabajo}</td>
                <td className="p-2">{overtime.hora_fin_trabajo}</td>
                <td className="p-2">{formatDate(overtime.fecha_inicio_descanso)}</td>
                <td className="p-2">{formatDate(overtime.fecha_fin_descanso)}</td>
                <td className="p-2">{formatHour(overtime.hora_inicio_descanso)}</td>
                <td className="p-2">{formatHour(overtime.hora_fin_descanso)}</td>
                <td className="p-2 space-x-1 space-y-1 text-center">
                  <GlobalButton
                    variant="modalTwo"
                    onClick={() => OpenUpdateModal(overtime._id)}
                    className="w-[80px] py-0.5"
                  >
                    Actualizar
                  </GlobalButton>
                  <GlobalButton
                    variant="modalThree"
                    onClick={() => onOpenConfirmModal(overtime._id)}
                    className="w-[80px] py-0.5"
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
