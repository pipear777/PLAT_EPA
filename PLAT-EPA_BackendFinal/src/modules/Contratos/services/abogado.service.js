const Abogado = require('../models/model.abogado');
const Contrato = require('../models/model.contratos');


const crearAbogadoService = async (datosAbogado) => {
  const nuevoAbogado = new Abogado(datosAbogado);
  return await nuevoAbogado.save();
};

const obtenerAbogadosService = async () => {
  return await Abogado.find();
};

const obtenerAbogadoPorIdService = async (id) => {
  return await Abogado.findById(id);
};

const actualizarAbogadoService = async (idAbogado, nuevosDatos, usuario = 'Sistema') => {
  const abogado = await Abogado.findById(idAbogado);
  if (!abogado) throw new Error('Abogado no encontrado');

  // Guardar cambios en abogado
  for (let campo in nuevosDatos) {
    if (abogado[campo] !== undefined && abogado[campo] !== nuevosDatos[campo]) {
      abogado[campo] = nuevosDatos[campo];
    }
  }
  await abogado.save();

  if (nuevosDatos.estado === 'Inactivo') {
    const contratos = await Contrato.find({ AbogadoAsignado: idAbogado }).populate('AbogadoAsignado', 'nombreCompletoAbogado');

    for (let contrato of contratos) {
      contrato.historial.push({
        campo: 'AbogadoAsignado',
        anterior: contrato.AbogadoAsignado ? contrato.AbogadoAsignado.nombreCompletoAbogado : 'Sin abogado',
        nuevo: 'Abogado removido por estado Inactivo',
        usuario,
        fecha: new Date()
      });

      contrato.AbogadoAsignado = null; 
      await contrato.save();
    }
  }

  return {
    message: 'Abogado actualizado correctamente',
    abogado
  };
};

module.exports = {
  crearAbogadoService,
  obtenerAbogadosService,
  obtenerAbogadoPorIdService,
  actualizarAbogadoService
};
