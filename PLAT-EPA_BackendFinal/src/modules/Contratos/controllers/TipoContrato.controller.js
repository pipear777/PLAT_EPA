const express = require('express');
const { listarTipo, actualizarTipoContrato, findTipoContratoByNombre, createTipoContrato: createTipoContratoService } = require('../services/tipoContrato.service');


const crearTipoContrato = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ success: false, message: 'El nombre es requerido' });
    }

    // 1. Validación proactiva para una mejor experiencia de usuario
    const nombreNormalizado = nombre.toLowerCase().replace(/_|\s+/g, ' ').trim();
    const existente = await findTipoContratoByNombre(nombreNormalizado);

    if (existente) {
      return res.status(409).json({ success: false, message: `El tipo de contrato '${nombre}' ya existe.` });
    }

    // Si no existe, se crea
    const nuevoTipoContrato = await createTipoContratoService({ nombre });
    res.status(201).json(nuevoTipoContrato);

  } catch (err) {
    // 2. Red de seguridad para atrapar errores de la BD (ej. race conditions)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `El tipo de contrato '${req.body.nombre}' ya existe.`
      });
    }
    
    // Manejo de otros errores inesperados
    res.status(500).json({
      success: false,
      message: 'Error al crear el tipo de contrato.',
      error: err.message
    });
  }
};

const listarTipoContrato = async (req, res) => {
  try {
    const tipoContrato = await listarTipo();
    res.status(200).json({ success: true, data: tipoContrato });
  } catch (error) {
    console.error('❌ Error en listarProcesosController:', error);
    res.status(500).json({ success: false, message: 'Error el tipo de Contrato.' });
  }
};

const actualizarTipo = async (req, res) => {
  try {
    const { idTipoContrato } = req.params;
    const tipoActualizado = await actualizarTipoContrato( idTipoContrato, req.body);
    if (!tipoActualizado) {
      return res.status(404).json({ message: 'tipo Contrato no encontrado' });
    }
    res.json({
      message: 'Tipo Contrato actualizado correctamente',
      tipoContrato: tipoActualizado
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar tipo Contrato', error: err.message });
  }
};
module.exports = {
  crearTipoContrato,
  listarTipoContrato,
  actualizarTipo
};