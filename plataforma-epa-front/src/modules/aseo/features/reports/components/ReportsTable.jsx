export const ReportsTable = ({ reports = [] }) => {
  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg p-4 mx-auto">
          <table className="table-fixed w-full min-w-[800px] text-sm text-center">
            <thead className="bg-epaColor1 text-white">
              <tr>
                <th className="py-4 text-center border border-white">Nombre Funcionario</th>
                <th className="text-center border border-white">HEDO</th>
                <th className="text-center border border-white">HENO</th>
                <th className="text-center border border-white">HEDF</th>
                <th className="text-center border border-white">HENF</th>
                <th className="text-center border border-white">HDF</th>
                <th className="text-center border border-white">HNF</th>
                <th className="text-center border border-white">RNO</th>
                <th className="text-center border border-white">Total Horas Extra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {reports.map((report, index) => (
                <tr key={index} className="hover:bg-gray-200 transition-colors">
                  <td className="py-2">{report.nombre_Funcionario}</td>
                  <td>{report.HEDO_HORA}</td>
                  <td>{report.HENO_HORA}</td>
                  <td>{report.HEDF_HORA}</td>
                  <td>{report.HENF_HORA}</td>
                  <td>{report.HDF_HORA}</td>
                  <td>{report.HNF_HORA}</td>
                  <td>{report.RNO_HORA}</td>
                  <td>{report.totalExtras_DEC}</td>
                </tr>
              ))}
            </tbody>
          </table>    
          {reports.length === 0 && (
            <div className="text-center text-xl text-gray-500 font-semibold py-8">
              No se ha generado un reporte
            </div>
          )}
        </div>
  )
}