const Proceso = require('../models/model.procesos');

const listarProcesos = async () => {
  const procesos = await Proceso.find({}, 'nombreProceso').sort({ nombreProceso: 1 });
  return procesos;
};

const obtenerProcesoPorIdService = async (id) => {
  return await Proceso.findById(id);
};

module.exports = {
  listarProcesos,
  obtenerProcesoPorIdService
};