const TipoContrato = require('../models/model.tipoContrato');

const createTipoContrato = async (datos) => {
  const nuevoTipo = new TipoContrato(datos);
  return await nuevoTipo.save();
};

const findTipoContratoByNombre = async (nombre) => {
  const tipoContrato = await TipoContrato.findOne({
    nombre: { $regex: new RegExp(`^${nombre}$`, 'i') }
  });
  return tipoContrato;
};

const listarTipo = async () => {
  const tipoContrato = await TipoContrato.find({}, 'nombre').sort({ nombre: 1 });
  return tipoContrato;
};

const actualizarTipoContrato = async (idTipoContrato, nuevosDatos) => {
  const tipoContrato = await TipoContrato.findById(idTipoContrato);
  console.log(tipoContrato);
  
  if (!tipoContrato) throw new Error('tipo contrato no encontrado');

  for (let campo in nuevosDatos) {
    if (tipoContrato[campo] !== undefined && tipoContrato[campo] !== nuevosDatos[campo]) {
      tipoContrato[campo] = nuevosDatos[campo];
    }
  }
    const tipoContratoActualizado = await tipoContrato.save();
    return tipoContratoActualizado;
    
  }


module.exports = {
  listarTipo,
  actualizarTipoContrato,
  createTipoContrato,
  findTipoContratoByNombre
};