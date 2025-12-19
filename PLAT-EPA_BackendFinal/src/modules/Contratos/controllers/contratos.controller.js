const {crearContratoService, obtenerContratosPorFiltrosService,updateContratoService, obtenerVigenciasService,  obtenerContratoPorIdService, anularContratoService} = require('../services/contrato.service');
const contratoModel = require('../models/model.contratos');

const crearContrato = async (req, res) => {
  try {
    const usuario = {
      uid: req.uid,
      name: req.name,
      rol: req.rol
    };
    
    const contratoGuardado = await crearContratoService(req.body, usuario);
     res.status(201).json({
      ok: true,
      message: 'Contrato creado correctamente',
      contratoGuardado
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


const obtenerContratosPorFiltros = async (req, res) => {
  try {
    const filtros = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;

    const result = await obtenerContratosPorFiltrosService(filtros, page, limit);

    if (result.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron contratos con los filtros especificados.",
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contratos encontrados.",
      data: result.data,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages
    });

  } catch (error) {
    console.error("Error al buscar contratos:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor."
    });
  }
};

const obtenerVigencias = async (req, res) => {
  try {
    const vigencias = await obtenerVigenciasService();
    res.json({ success: true, data: vigencias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener vigencias" });
  }
};


const ActualizarContratos = async (req, res) => {
  const { id } = req.params;
  const nuevosDatos = req.body;
   const usuario = {
      uid: req.uid,
      name: req.name,
      rol: req.rol
    };
      const contrato = await obtenerContratoPorIdService(id);

    if (!contrato) {
      return res.status(404).json({
        ok: false,
        message: "Contrato no encontrado.",
      });
    }

    if (contrato.EstadoContrato === "Anulado") {
      return res.status(400).json({
        ok: false,
        message: "No se puede actualizar un contrato ANULADO.",
      });
    }

  try {
    const resultado = await updateContratoService(id, nuevosDatos, usuario);
    res.json(resultado);
  } catch (error) {


    if (error.message === 'Contrato no encontrado') {
      return res.status(404).json({ 
        success: false,
        message: error.message 
      });
    }

  
    if (error.message.includes('anulado')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    if (error.message.startsWith('Error de validación')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

  
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

const ejecutarVerificacionAlertas = async (req, res) => {
  try {
    const alertas = await verificarContratosVencimiento();
    res.status(200).json({
      message: 'Verificación completada',
      alertasEnviadas: alertas
    });
  } catch (error) {
    console.error('Error en verificación de contratos:', error);
    res.status(500).json({ error: 'Error al verificar alertas de contratos' });
  }
};

const obtenerResumenContratos = async (req, res) => {
  try {

    const resumen = await contratoModel.aggregate([
      {
        $group: {
          _id: '$EstadoContrato',
          cantidad: { $sum: 1 }
        }
      }
    ]);

    const resultado = {
      Activo: 0,
      Finalizado: 0,
      ProximoVencer: 0,
      Anulado: 0
    };

    resumen.forEach(item => {
      resultado[item._id] = item.cantidad;
    });

    res.status(200).json({
      success: true,
      data: resultado
    });

  } catch (error) {
    console.error('❌ Error al obtener resumen de contratos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el resumen de contratos',
      error: error.message
    });
  }
};

const anularContrato = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await anularContratoService(id, req.user);

    return res.status(200).json({
      success: true,
      message: 'Anulación de contrato exitosa ✅',
      data: result,
    });

  } catch (error) {
    console.error("Error anulando contrato:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error interno del servidor ❌",
    });
  }
};


module.exports = {
  crearContrato,
  obtenerContratosPorFiltros,
  ActualizarContratos,
  ejecutarVerificacionAlertas,
  obtenerResumenContratos,
  obtenerVigencias, 
  anularContrato
};
