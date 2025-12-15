const {crearAbogadoService,obtenerAbogadosService,obtenerAbogadoPorIdService,actualizarAbogadoService} = require('../services/abogado.service');
const abogadoModel = require('../models/model.abogado');

const crearAbogado = async (req, res) => {
  try {
    const { 
     nombreCompletoAbogado,
      identificacion,
      EstadoAbogado
    } = req.body;

    if (!nombreCompletoAbogado || !identificacion) {
      return res.status(400).json({ 
        message: 'Debe proporcionar el  nombre Completo y la identificación del abogado'
      });
    }

    if (EstadoAbogado && !['Activo', 'Inactivo'].includes(EstadoAbogado)) {
      return res.status(400).json({
        message: 'El estado del abogado debe ser "Activo" o "Inactivo".'
      });
    }

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!soloLetras.test(nombreCompletoAbogado)) {
      return res.status(400).json({
        message: 'Los nombres y los apellidos solo deben contener letras'
      });
    }

    const existente = await abogadoModel.findOne({
      identificacion: new RegExp(`^${identificacion}$`, 'i')
    });

    if (existente) {
      return res.status(409).json({
        message: 'Ya existe la identificación del abogado',
      });
    }

    const abogadoGuardado = await crearAbogadoService(req.body);
    res.status(201).json(abogadoGuardado);

  } catch (err) {
    res.status(500).json({ 
      message: 'Error al crear abogado', 
      error: err.message 
    });
  }
};


const actualizarAbogado = async (req, res) => {
  try {
    const { idAbogado } = req.params;
    const abogadoActualizado = await actualizarAbogadoService( idAbogado, req.body);
    if (!abogadoActualizado) {
      return res.status(404).json({ mensaje: 'Abogado no encontrado' });
    }
    res.json({
      message: 'Abogado actualizado correctamente',
      abogado: abogadoActualizado
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar abogado', error: err.message });
  }
};

const mostrarAbogado = async (req, res) => {
  try {
    const abogados = await obtenerAbogadosService();
    res.json(abogados);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener abogados', error: err.message });
  }
};

const unAbogado = async (req, res) => {
  try {
    const abogado = await obtenerAbogadoPorIdService(req.params.id);
    if (!abogado) return res.status(404).json({ message: 'Abogado no encontrado' });
    res.json(abogado);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar abogado', error: err.message });
  }
};

module.exports = {
  crearAbogado,
  mostrarAbogado,
  unAbogado,
  actualizarAbogado
};
