
const { listarProcesos, obtenerProcesoPorIdService } = require('../services/Proceso.service');
const Proceso = require('../models/model.procesos');


const nuevoProceso = async (req, res) => {
  try {
    const { nombreProceso } = req.body;

    const existente = await Proceso.findOne({ nombreProceso: new RegExp(`^${nombreProceso}$`, "i") });

    if (existente) {
      return res.status(400).json({
        success: false,
        message: "Ya existe el proceso"
      });
    }
    if (!nombreProceso) return res.status(400).json({ success: false, message: 'El nombre del proceso es obligatorio.' });

    const nuevoProceso = new Proceso({ nombreProceso });
    await nuevoProceso.save();

    res.status(201).json({ success: true, data: nuevoProceso });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error interno del servidor' });
  }
};

const mostrarProcesos = async (req, res) => {
  try {
    const procesos = await listarProcesos();
    res.status(200).json({ success: true, data: procesos });
  } catch (error) {
    console.error('❌ Error en listarProcesosController:', error);
    res.status(500).json({ success: false, message: 'Error al listar procesos.' });
  }
};

  const unProceso = async (req, res) => {
    try {
      const proceso = await obtenerProcesoPorIdService(req.params.id);
      if (!proceso) return res.status(404).json({ mensaje: 'Proceso no encontrado' });
      res.json(proceso);
    } catch (err) {
      res.status(500).json({ mensaje: 'Error al buscar proceso ', error: err.message });
    }
  };

  const eliminarProceso = async (req, res) => {
  try {
    const { id } = req.params;
    const proceso = await Proceso.findByIdAndDelete(id);
    if (!proceso) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.status(200).json({ success: true, message: 'Registro eliminado', data: sede });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

  module.exports = {
    nuevoProceso,
    mostrarProcesos,
    unProceso,
    eliminarProceso
  };