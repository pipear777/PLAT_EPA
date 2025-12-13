const { crearCargoService, listarCargosService, eliminarCargoService } = require('../services/cargo.service');

const crearCargo = async (req, res) => {
  try {
    const { name } = req.body;

    const nuevoCargo = await crearCargoService(name);

    res.status(201).json({ success: true, data: nuevoCargo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const listarCargos = async (req, res) => {
  try {
    const cargos = await listarCargosService();
    res.status(200).json({ success: true, data: cargos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al listar cargos' });
  }
};

const eliminarCargo = async (req, res) => {
  try {
    const { id } = req.params;
    const cargo = await eliminarCargoService(id);

    if (!cargo) {
      return res.status(404).json({ success: false, message: 'Cargo no encontrado' });
    }

    res.status(200).json({ success: true, message: 'Registro eliminado', data: cargo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || 'Error interno del servidor' });
  }
};

module.exports = { crearCargo, listarCargos, eliminarCargo };
