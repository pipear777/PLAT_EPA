const Proceso = require('../models/model.procesos');

const listarProcesos = async () => {
  const procesos = await Proceso.find({}, 'nombreProceso').sort({ nombreProceso: 1 });
  return procesos;
};

const obtenerProcesoPorIdService = async (id) => {
  return await Proceso.findById(id);
};

const actualizarProcesoService = async (id, data) => {
  return await Proceso.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
  listarProcesos,
  obtenerProcesoPorIdService, 
  actualizarProcesoService
};