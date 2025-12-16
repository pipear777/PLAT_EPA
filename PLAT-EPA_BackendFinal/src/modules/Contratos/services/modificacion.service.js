const Modificacion = require("../models/model.modificacion");
const Contrato = require("../models/model.contratos");

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

  // 🔹 VALIDACIÓN DE PRÓRROGA
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


// Actualizar modificación
const actualizarModificacionService = async (id, data) => {
  const mod = await Modificacion.findById(id);
  if (!mod) throw new Error("Modificación no encontrada.");
  if (mod.estado === "Anulada") throw new Error("No se puede actualizar una modificación anulada.");

  const todas = await Modificacion.find({ contrato: mod.contrato }).sort({ createdAt: "asc" });

  // Recalcular números de secuencia si aplica
  let numeroAdicion = mod.numeroSecuenciaAdicion;
  let numeroProrroga = mod.numeroSecuenciaProrroga;

  if (data.adicion && !numeroAdicion) numeroAdicion = getNextNumero(todas, 'numeroSecuenciaAdicion');
  if (data.prorroga && !numeroProrroga) numeroProrroga = getNextNumero(todas, 'numeroSecuenciaProrroga');

  // Actualizar campos
  mod.adicion = data.adicion || false;
  mod.prorroga = data.prorroga || false;
  mod.numeroSecuenciaAdicion = numeroAdicion || null;
  mod.numeroSecuenciaProrroga = numeroProrroga || null;
  mod.valorAdicion = data.adicion ? data.valorAdicion : 0;
  mod.fechaFinalProrroga = data.prorroga ? data.fechaFinalProrroga : null;
  mod.tiempoProrroga = data.prorroga ? data.tiempoProrroga : null;
  mod.usuarioModifico = data.usuarioModifico;
  mod.TipoModificacion = true;

  // Concatenar tipoSecuencia
  const tipoSecuencia = [];
  if (mod.adicion) tipoSecuencia.push(`Adición ${numeroAdicion}`);
  if (mod.prorroga) tipoSecuencia.push(`Prórroga ${numeroProrroga}`);
  mod.tipoSecuencia = tipoSecuencia.join(" + ");

  await mod.save();

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
  const contrato = await Contrato.findById(contratoId).populate({
    path: 'modificaciones',
    options: { sort: { 'createdAt': 'asc' } }
  });

  if (!contrato) {
    return [];
  }

  // Populate returns null for refs that don't exist. Filter them out.
  return contrato.modificaciones.filter(m => m !== null);
};

module.exports = {
  crearModificacion,
  actualizarModificacionService,
  anularModificacion,
  listarModificacionesService
};
