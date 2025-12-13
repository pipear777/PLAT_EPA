const Cargo = require('../models/cargo');


const crearCargoService = async (name) => {
    if (!name) throw new Error('El nombre del cargo es obligatorio.');


    const existente = await Cargo.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existente) throw new Error('Ya existe el cargo');

    const nuevoCargo = new Cargo({ name });
    await nuevoCargo.save();

    return nuevoCargo;
};

const listarCargosService = async () => {
  return await Cargo.find({}, 'name');
};

const eliminarCargoService = async (id) => {
  const cargo = await Cargo.findByIdAndDelete(id);
  return cargo; 
};
module.exports = {
    crearCargoService,
    listarCargosService,
    eliminarCargoService
};
