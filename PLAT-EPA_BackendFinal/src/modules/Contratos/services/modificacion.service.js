const Modificacion = require("../models/model.modificacion");
const Contrato = require("../models/model.contratos");
const mongoose = require('mongoose');

// Recalcular valores del contrato
const recalcularYGuardarContrato = async (contrato) => {
  if (!contrato) return;

  const modsActivas = await Modificacion.find({
    contrato: contrato._id,
    estado: "Activa",
  }).sort({ createdAt: "asc" });

  let valorAcumulado = contrato.ValorContrato || 0;
  let fechaVigente = contrato.FechaFinalizacion || "";
  let contadorAd = 0;
  let contadorPr = 0;

  for (const mod of modsActivas) {
    let partes = [];

    if (mod.adicion) {
      contadorAd++;
      valorAcumulado += mod.valorAdicion || 0;
      partes.push(`Adición ${contadorAd}`);
      mod.numeroSecuenciaAdicion = contadorAd;
    } else {
      mod.numeroSecuenciaAdicion = 0;
    }

    if (mod.prorroga) {
      contadorPr++;
      if (mod.fechaFinalProrroga > fechaVigente) fechaVigente = mod.fechaFinalProrroga;
      partes.push(`Prórroga ${contadorPr}`);
      mod.numeroSecuenciaProrroga = contadorPr;
    } else {
      mod.numeroSecuenciaProrroga = 0;
    }

    mod.tipoSecuencia = partes.join(" + ");
    mod.valorContratoconAdicion = mod.adicion ? valorAcumulado : 0;

    await mod.save();
  }

  contrato.valorActual = valorAcumulado;
  contrato.fechaVigente = fechaVigente;
  contrato.contadorAdiciones = contadorAd;
  contrato.contadorProrrogas = contadorPr;

  await contrato.save();
};

// Calcular siguiente número de secuencia (para nueva modificación)
const getNextNumero = (modificaciones, sequenceFieldName) => {
  const active = modificaciones
    .filter(m => m[sequenceFieldName] && m.estado === "Activa")
    .map(m => m[sequenceFieldName]);

  if (active.length === 0) return 1;

  active.sort((a, b) => a - b);
  let next = 1;
  for (let i = 0; i < active.length; i++) {
    if (active[i] === next) next++;
    else if (active[i] > next) return next;
  }
  return next;
};

const crearModificacion = async (data) => {
  const {
    contratoId,
    adicion,
    prorroga,
    valorAdicion,
    fechaFinalProrroga,
    tiempoProrroga,
    usuarioModifico,
    TipoModificacion
  } = data;

  if (!adicion && !prorroga) {
    const error = new Error("Debe ser adición o prórroga o ambas.");
    error.status = 400;
    throw error;
  }

  // 🔹 BUSCAR CONTRATO PRIMERO
  const contrato = await Contrato.findById(contratoId);
  if (!contrato) {
    const error = new Error("Contrato no encontrado.");
    error.status = 404;
    throw error;
  }

 
  if (prorroga && fechaFinalProrroga) {
    if (new Date(fechaFinalProrroga) <= new Date(contrato.FechaFinalizacion)) {
      const error = new Error(
        "La fecha final de la prórroga debe ser posterior a la fecha de finalización actual del contrato."
      );
      error.status = 400;
      throw error;
    }
  }

  const modsPrevias = await Modificacion.find({ contrato: contratoId }).sort({ createdAt: "asc" });

  let numeroAdicion = adicion ? getNextNumero(modsPrevias, "numeroSecuenciaAdicion") : 0;
  let numeroProrroga = prorroga ? getNextNumero(modsPrevias, "numeroSecuenciaProrroga") : 0;

  const tipoSecuencia = [];
  if (adicion) tipoSecuencia.push(`Adición ${numeroAdicion}`);
  if (prorroga) tipoSecuencia.push(`Prórroga ${numeroProrroga}`);

  const nueva = new Modificacion({
    contrato: contratoId,
    adicion: !!adicion,
    prorroga: !!prorroga,
    numeroSecuenciaAdicion: numeroAdicion,
    numeroSecuenciaProrroga: numeroProrroga,
    tipoSecuencia: tipoSecuencia.join(" + "),
    valorAdicion: adicion ? valorAdicion : 0,
    fechaFinalProrroga: prorroga ? fechaFinalProrroga : null,
    tiempoProrroga: prorroga ? tiempoProrroga : null,
    usuarioModifico,
    estado: "Activa",
    TipoModificacion,
  });

  await nueva.save();

  contrato.modificaciones.push(nueva._id);
  await recalcularYGuardarContrato(contrato);

  return nueva;
};


const actualizarModificacionService = async (id, data) => {
  const mod = await Modificacion.findById(id);
  if (!mod) throw new Error("Modificación no encontrada.");
  if (mod.estado === "Anulada") throw new Error("No se puede actualizar una modificación anulada.");

  const camposPermitidos = [
    "adicion",
    "prorroga",
    "valorAdicion",
    "fechaFinalProrroga",
    "tiempoProrroga",
    "usuarioModifico",
  ];

  Object.keys(data).forEach((key) => {
    if (!camposPermitidos.includes(key)) {
      throw new Error(
        `Campo inválido enviado: "${key}". Campos permitidos: ${camposPermitidos.join(", ")}`
      );
    }
  });

  if (data.adicion !== undefined && typeof data.adicion !== "boolean") {
    throw new Error(`Campo "adicion" debe ser booleano`);
  }
  if (data.prorroga !== undefined && typeof data.prorroga !== "boolean") {
    throw new Error(`Campo "prorroga" debe ser booleano`);
  }

  const todas = await Modificacion.find({ contrato: mod.contrato }).sort({ createdAt: "asc" });
  const ultima = todas[todas.length - 1];
  const esUltima = ultima._id.equals(mod._id);

  const updateData = { usuarioModifico: data.usuarioModifico ?? mod.usuarioModifico };

  if (esUltima) {
    const finalAdicion = data.adicion ?? mod.adicion;
    const finalProrroga = data.prorroga ?? mod.prorroga;

    updateData.adicion = finalAdicion;
    updateData.prorroga = finalProrroga;

    if (finalAdicion) {
      if (!data.valorAdicion && data.valorAdicion !== 0) {
        throw new Error("Para adición, 'valorAdicion' es obligatorio y debe ser mayor que cero.");
      }
      if (data.valorAdicion <= 0) {
        throw new Error("Para adición, 'valorAdicion' debe ser mayor que cero.");
      }
      updateData.valorAdicion = data.valorAdicion;
    } else {
      updateData.valorAdicion = 0;
    }

    if (finalProrroga) {
      if (!data.fechaFinalProrroga || !data.tiempoProrroga) {
        throw new Error("Para prórroga, 'fechaFinalProrroga' y 'tiempoProrroga' son obligatorios.");
      }
      updateData.fechaFinalProrroga = data.fechaFinalProrroga;
      updateData.tiempoProrroga = data.tiempoProrroga;
    } else {
      updateData.fechaFinalProrroga = null;
      updateData.tiempoProrroga = null;
    }

    // Secuencias automáticas
    if (finalAdicion) {
      updateData.numeroSecuenciaAdicion = getNextNumero(todas, "numeroSecuenciaAdicion");
    } else {
      updateData.numeroSecuenciaAdicion = null;
    }

    if (finalProrroga) {
      updateData.numeroSecuenciaProrroga = getNextNumero(todas, "numeroSecuenciaProrroga");
    } else {
      updateData.numeroSecuenciaProrroga = null;
    }
  } else {
    // --- NO ÚLTIMA MODIFICACIÓN ---
    // No se permite cambiar el tipo
    if (
      (data.adicion !== undefined && data.adicion !== mod.adicion) ||
      (data.prorroga !== undefined && data.prorroga !== mod.prorroga)
    ) {
      throw new Error(
        "No se puede cambiar el tipo de modificación porque no es la última. Solo se pueden actualizar los valores permitidos."
      );
    }

    updateData.adicion = mod.adicion;
    updateData.prorroga = mod.prorroga;
    updateData.numeroSecuenciaAdicion = mod.numeroSecuenciaAdicion;
    updateData.numeroSecuenciaProrroga = mod.numeroSecuenciaProrroga;

    if (mod.adicion && data.valorAdicion !== undefined) {
      if (data.valorAdicion <= 0) {
        throw new Error("Para adición, 'valorAdicion' debe ser mayor que cero.");
      }
      updateData.valorAdicion = data.valorAdicion;
    }

    if (mod.prorroga) {
      if (data.fechaFinalProrroga) updateData.fechaFinalProrroga = data.fechaFinalProrroga;
      if (data.tiempoProrroga) updateData.tiempoProrroga = data.tiempoProrroga;
    }
  }

  // Reconstruir tipoSecuencia
  const tipoSecuencia = [];
  if (updateData.adicion) tipoSecuencia.push(`Adición ${updateData.numeroSecuenciaAdicion}`);
  if (updateData.prorroga) tipoSecuencia.push(`Prórroga ${updateData.numeroSecuenciaProrroga}`);
  updateData.tipoSecuencia = tipoSecuencia.join(" + ");

  // Guardar
  Object.assign(mod, updateData);
  await mod.save();

  // Actualizar contrato
  const contrato = await Contrato.findById(mod.contrato);
  await recalcularYGuardarContrato(contrato);

  return mod;
};

// Anular modificación (solo última)
const anularModificacion = async (id) => {
  const mod = await Modificacion.findById(id);
  if (!mod) throw new Error("Modificación no encontrada.");
  if (mod.estado === "Anulada") throw new Error("Ya está anulada.");

  const historial = await Modificacion.find({ contrato: mod.contrato }).sort({ createdAt: "asc" });
  const ultima = historial[historial.length - 1];
  if (ultima._id.toString() !== mod._id.toString()) throw new Error("Solo se puede anular la última modificación.");

  mod.estado = "Anulada";
  await mod.save();

  const contrato = await Contrato.findById(mod.contrato);
  await recalcularYGuardarContrato(contrato);

  return mod;
};

const listarModificacionesService = async (contratoId) => {
  // 🔹 LIMPIAR el contratoId
  const cleanId = contratoId?.toString().trim();
  
  // Validar que existe
  if (!cleanId) {
    const error = new Error("El contratoId es requerido");
    error.status = 400;
    throw error;
  }

  if (cleanId.length !== 24) {
    const error = new Error(`El contratoId debe tener 24 caracteres. Recibido: ${cleanId.length} caracteres`);
    error.status = 400;
    throw error;
  }

  // Validar formato de ObjectId
  if (!mongoose.Types.ObjectId.isValid(cleanId)) {
    const error = new Error("El contratoId no tiene un formato válido de ObjectId");
    error.status = 400;
    throw error;
  }

  // Verificar que el contrato existe
  const contrato = await Contrato.findById(cleanId);
  if (!contrato) {
    const error = new Error("Contrato no encontrado");
    error.status = 404;
    throw error;
  }

  // Buscar modificaciones del contrato
  const modificaciones = await Modificacion.find({ 
    contrato: cleanId 
  }).sort({ createdAt: 1 });

  // Retornar info del contrato y modificaciones
  return {
    contrato: {
      _id: contrato._id,
      NumeroContrato: contrato.NumeroContrato,
    },
    modificaciones
  };
};


module.exports = {
  crearModificacion,
  actualizarModificacionService,
  anularModificacion,
  listarModificacionesService
};
