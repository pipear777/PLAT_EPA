const Sede = require('../models/sede.model');

const listarSede = async () => {
  const sedes = await Sede.find({}, 'name').sort({ name: 1 });
  return sedes;
};

const actualizarSedeService = async (id, data) => {
  return await Sede.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  listarSede,
  actualizarSedeService
};