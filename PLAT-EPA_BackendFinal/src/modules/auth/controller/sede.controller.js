const sede = require('../models/sede.model');
const { listarSede } = require('../services/sede.service');

const crearsede = async (req, res) => {
  try {
    const { name } = req.body;

    const existente = await sede.findOne({ name: new RegExp(`^${name}$`, "i") });

    if (existente) {
      return res.status(400).json({
        success: false,
        message: "Ya existe la sede"
      });
    }
    if (!name) return res.status(400).json({ success: false, message: 'El nombre de la sede es obligatorio.' });

    const nuevaSede = new sede({ name });
    await nuevaSede.save();

    res.status(201).json({ success: true, data: nuevaSede });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error interno del servidor' });
  }
};

const listarSedes = async (req, res) => {
try {
      const result = await listarSede();

      if (!result) {
        return res.status(500).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('❌ Error en listarProcesosController:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor.'
      });
    }
};

const eliminarSede = async (req, res) => {
  try {
    const { id } = req.params;
    const sede = await sede.findByIdAndDelete(id);
    if (!sede) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.status(200).json({ success: true, message: 'Registro eliminado', data: sede });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  crearsede,
  listarSedes,
  eliminarSede
};