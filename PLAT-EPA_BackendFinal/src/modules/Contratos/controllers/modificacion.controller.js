const {
   crearModificacion,
   actualizarModificacionService,
  anularModificacion,
  listarModificacionesService
} = require("../services/modificacion.service");
const contratoModel = require("../models/model.contratos");
const mongoose = require('mongoose');

 const addModificacion = async (req, res) => {
  try {
    const { contratoId } = req.params;

    const usuario = {
      uid: req.uid,
      name: req.name,
      rol: req.rol
    };

    // 🔹 BUSCAR CONTRATO
    const contrato = await contratoModel.findById(contratoId);

    if (!contrato) {
      return res.status(404).json({
        ok: false,
        message: "Contrato no encontrado",
      });
    }

    if (contrato.EstadoContrato === 'Anulado') {
      return res.status(400).json({
        ok: false,
        message: "No se pueden agregar modificaciones a un contrato ANULADO.",
      });
    }

    const usuarioModifico = usuario?.name || 'UsuarioDesconocido';

    const modificationData = {
      ...req.body,
      contratoId,
      usuarioModifico
    };

    const nueva = await crearModificacion(modificationData);

    return res.status(201).json({
      ok: true,
      message: "Modificación creada correctamente",
      data: nueva,
    });

  } catch (error) {
    console.error("Error al crear modificación:", error);

    return res.status(500).json({
      ok: false,
      message: error.message || "Error interno del servidor",
    });
  }
};

 const  actualizarModificacion = async (req, res) => {
  try {
    const { id } = req.params;

     const usuario = {
      uid: req.uid,
      name: req.name,
      rol: req.rol
    };
   
    const usuarioModifico = usuario?.name || 'UsuarioDesconocido';
    const updateData = { ...req.body, usuarioModifico };

    const actualizada = await actualizarModificacionService(id, updateData);

    return res.status(200).json({
      ok: true,
      message: "Modificación actualizada correctamente",
      data: actualizada,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
      error: "Error al actualizar modificación",
    });
  }
};

 const anularModificacionController = async (req, res) => {
  try {
    const { id } = req.params;
    const anulada = await anularModificacion(id);

    return res.status(200).json({
      ok: true,
      message: "Modificación anulada correctamente",
      data: anulada,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al anular modificación",
      error: error.message,
    });
  }
};

const listarModificaciones = async (req, res) => {
  try {
    const { contratoId } = req.params;

    const { contrato, modificaciones } = await listarModificacionesService(contratoId);

    // 🔹 Si no hay modificaciones
    if (modificaciones.length === 0) {
      return res.status(200).json({
        ok: true,
        total: 0,
        contratoId: contrato._id,
        numeroContrato: contrato.NumeroContrato,
        message: "Este contrato no tiene modificaciones",
        data: [],
      });
    }

    // 🔹 Si hay modificaciones
    return res.status(200).json({
      ok: true,
      total: modificaciones.length,
      contratoId: contrato._id,
      numeroContrato: contrato.NumeroContrato,
      data: modificaciones,
    });
  } catch (error) {
    console.error("Error al listar modificaciones:", error);
    
    const statusCode = error.status || 500;
    
    return res.status(statusCode).json({
      ok: false,
      message: error.message || "Error al listar modificaciones",
    });
  }
};

module.exports = {
  addModificacion,
  listarModificaciones,
  actualizarModificacion,
  anularModificacionController,
};