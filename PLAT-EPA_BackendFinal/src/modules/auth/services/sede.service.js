const Sede = require('../models/sede.model');

const listarSede = async () => {
  const sedes = await Sede.find({}, 'name').sort({ name: 1 });
  return sedes;
};

module.exports = {
  listarSede
};