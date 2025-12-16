const Contrato = require('../models/model.contratos');
const Modificacion = require('../models/model.modificacion');
const { ContratoCreado, enviarCorreo, ContratoAnulado } = require('../../auth/services/email.service')
const Abogado = require('../models/model.abogado');
const Proceso = require('../../auth/models/model.procesos');
const TipoContrato = require('../models/model.tipoContrato');
const dayjs = require('dayjs');
const { validarCorreo, noNumeros, validarFecha, limpiarTexto } = require('../middlewares/validaciones')

const obtenerDiasDeAlerta = () => [30, 15, 10, 5];

const crearContratoService = async (datosContrato, usuario = {}) => {
  const { proceso, tipoContrato, TelefonoContratista, CorreoDependencia, ValorContrato, NombreContratista, identificacionOnit, FechaInicio, FechaFinalizacion, AbogadoAsignado, objeto } = datosContrato;

  if (!proceso) {
    throw new Error('El proceso es obligatorio');
  }
  const procesoEncontrado = await Proceso.findById(proceso);
  if (!procesoEncontrado) {
    throw new Error('El proceso seleccionado no existe');
  }

  if (CorreoDependencia && !validarCorreo(CorreoDependencia)) {
    throw new Error('El correo electrónico de la dependencia no es válido');
  }

  if (!objeto) {
    throw new Error('El objeto del contrato es obligatorio');
  }

  if (!AbogadoAsignado) {
    throw new Error('El abogado asignado es obligatorio');
  }

  if (!ValorContrato) {
    throw new Error('El valor del contrato es obligatorio');
  }

  if (tipoContrato) {
    const tipoEncontrado = await TipoContrato.findById(tipoContrato);
    if (!tipoEncontrado) {
      throw new Error('El tipo de contrato seleccionado no existe');
    }
  }


  if (!identificacionOnit) {
    throw new Error('La identificación o nit es obligatoria');
  }

  if (!noNumeros(NombreContratista)) {
    throw new Error('El nombre del contratista no puede contener números');
  }

  if (!validarFecha(FechaInicio)) {
    throw new Error('La fecha de inicio del contrato no tiene un formato válido (YYYY-MM-DD) o no es una fecha real');
  }

  if (!validarFecha(FechaFinalizacion)) {
    throw new Error('La fecha de fin del contrato no tiene un formato válido (YYYY-MM-DD) o no es una fecha real');
  }

  const hoy = dayjs().startOf('day');
  const fechaInicio = dayjs(FechaInicio);
  const fechaFin = dayjs(FechaFinalizacion);

  if (fechaInicio.isAfter(fechaFin)) {
    throw new Error(`La fecha de inicio (${FechaInicio}) no puede ser posterior a la fecha de finalización (${FechaFinalizacion})`);
  }

  if (fechaFin.isBefore(fechaInicio)) {
    throw new Error('La fecha de finalización no puede ser anterior a la fecha de inicio');
  }

  if (AbogadoAsignado) {
    const abogado = await Abogado.findById(AbogadoAsignado);
    if (!abogado) {
      throw new Error('El abogado asignado no existe');
    }
    if (abogado.estado === 'Inactivo') {
      throw new Error(`No se puede asignar al abogado "${abogado.nombreCompletoAbogado}"porque está FINALIZADO`);
    }
  }

  const nuevoContrato = new Contrato({
    ...datosContrato,
    usuarioModifico: usuario.name || 'Sistema',
    alertasEnviadas: [],
    creadoPor: usuario.name || 'Sistema'
  });

  await nuevoContrato.save();

  const contratoGuardado = await Contrato.findById(nuevoContrato._id)
    .populate('proceso', 'nombreProceso')
    .populate('tipoContrato', 'nombre')
    .populate('AbogadoAsignado', 'nombreCompletoAbogado')

  const diasRestantes = fechaFin.diff(hoy, 'day');
  const diasDeAlerta = obtenerDiasDeAlerta();

  console.log('🗓 FechaFinalización:', fechaFin.format('YYYY-MM-DD'));
  console.log('📅 Hoy:', hoy.format('YYYY-MM-DD'));
  console.log('⏳ Días restantes:', diasRestantes);
  console.log('📋 Días de alerta configurados:', diasDeAlerta);

  if (CorreoDependencia && diasDeAlerta.includes(diasRestantes)) {
    console.log(`📨 Enviando alerta inmediata (faltan ${diasRestantes} días)...`);

    await enviarCorreo(
      CorreoDependencia,
      `🔔 Alerta: El contrato de tipo ${contratoGuardado.tipoContrato.nombre} con consecutivo ${contratoGuardado.consecutivo} del año ${contratoGuardado.Vigencia} está próximo a su fecha de finalización.`,
      `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2E8B57;">🔔 Alerta de Vencimiento de Contrato</h2>
        <p>Estimado(a),</p>
        <p>El contrato correspondiente a <strong>${contratoGuardado.NombreContratista}</strong> está próximo a vencer.</p>
    
        <ul>
          <li><strong>Tipo de contrato:</strong> ${contratoGuardado.tipoContrato.nombre || 'Sin asignar'}</li>
          <li><strong>Consecutivo:</strong> ${contratoGuardado.consecutivo}</li>
          <li><strong>Vigencia:</strong> ${contratoGuardado.Vigencia}</li>
          <li><strong>Fecha de finalización:</strong> ${fechaFin.format('YYYY-MM-DD')}</li>
          <li><strong>Días restantes:</strong> ${diasRestantes}</li>
          <li><strong>Abogado asignado:</strong> ${contratoGuardado.AbogadoAsignado?.nombreCompletoAbogado || 'Sin asignar'}</li>
          <li><strong>Proceso:</strong> ${contratoGuardado.proceso?.nombreProceso || 'Sin asignar'}</li>
        </ul>
    
        <p>Saludos,<br>
        <strong>Sistema de Gestión de Contratos</strong></p>
      </div>
      `
    );

    contratoGuardado.alertasEnviadas.push(diasRestantes);
    await contratoGuardado.save();
  } else {
    console.log('🔕 No se envía alerta: no coincide con los días de alerta configurados.');
  }

  if (contratoGuardado.CorreoDependencia) {
    await ContratoCreado(
      contratoGuardado.CorreoDependencia,
      contratoGuardado.proceso?.nombreProceso,
      contratoGuardado.CorreoDependencia,
      contratoGuardado.consecutivo,
      contratoGuardado.Vigencia,
      contratoGuardado.tipoContrato?.nombre, // Cambiado a 'nombre'
      contratoGuardado.NombreContratista,
      contratoGuardado.identificacionOnit,
      contratoGuardado.ValorContrato
    );
  }

  return contratoGuardado;
};


const obtenerContratosPorFiltrosService = async (filtros = {}, page = 1, limit = 15) => {

  const matchNormal = {};

  
  if (filtros.NombreContratista) {
    const nombreLimpio = filtros.NombreContratista.trim();
    if (nombreLimpio) {
      let regexPattern = "";
      for (const char of nombreLimpio.toLowerCase()) {
        if ("aá".includes(char)) regexPattern += "[aáAÁ]";
        else if ("eé".includes(char)) regexPattern += "[eéEÉ]";
        else if ("ií".includes(char)) regexPattern += "[iíIÍ]";
        else if ("oó".includes(char)) regexPattern += "[oóOÓ]";
        else if ("uúü".includes(char)) regexPattern += "[uúüUÚÜ]";
        else regexPattern += char;
      }
      matchNormal.NombreContratista = { $regex: regexPattern, $options: "i" };
    }
  }

  if (filtros.EstadoContrato) {
    matchNormal.EstadoContrato = filtros.EstadoContrato;
  }
  if (filtros.consecutivo)
    matchNormal.consecutivo = { $regex: `^${filtros.consecutivo.trim()}`, $options: "i" };

  if (filtros.identificacionOnit)
    matchNormal.identificacionOnit = { $regex: `^${filtros.identificacionOnit.trim()}`, $options: "i" };

  if (filtros.tipoContrato)
    matchNormal.tipoContrato = { $regex: `^${filtros.tipoContrato.trim()}`, $options: "i" };

  const pipeline = [
    {
      $addFields: {
        FechaInicioDate: {
          $cond: {
            if: { $ne: ["$FechaInicio", null] },
            then: { $toDate: "$FechaInicio" },
            else: null
          }
        }
      }
    },
    { $match: matchNormal }
  ];

  
  if (filtros.vigencia) {
    pipeline.push({
      $match: {
        $expr: {
          $eq: [{ $year: "$FechaInicioDate" }, parseInt(filtros.vigencia)]
        }
      }
    });
  }

  pipeline.push(
    {
      $lookup: {
        from: "tipocontratos",
        localField: "tipoContrato",
        foreignField: "_id",
        as: "tipoContrato"
      }
    },
    { $unwind: { path: "$tipoContrato", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "procesos",
        localField: "proceso",
        foreignField: "_id",
        as: "proceso"
      }
    },
    { $unwind: { path: "$proceso", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "abogados",
        localField: "AbogadoAsignado",
        foreignField: "_id",
        as: "AbogadoAsignado"
      }
    },
    { $unwind: { path: "$AbogadoAsignado", preserveNullAndEmptyArrays: true } }
  );

  if(filtros.nombreCompletoAbogado){
    pipeline.push({
      $match: {
        "AbogadoAsignado.nombreCompletoAbogado": { $regex: filtros.nombreCompletoAbogado.trim(), $options: "i"}
      }
      });
  }
  
  pipeline.push({
    $sort: { FechaInicioDate: -1, _id: -1 }
  });

  const skip = (page - 1) * limit;

  pipeline.push({
    $facet: {
      total: [{ $count: "count" }],
      data: [
        { $skip: skip },
        { $limit: limit }
      ]
    }
  });

  const resultado = await Contrato.aggregate(pipeline);

  const total = resultado[0].total[0]?.count || 0;
  const data = resultado[0].data;

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data
  };
};


const obtenerVigenciasService = async () => {
  const vigencias = await Contrato.aggregate([
    {
      $addFields: {
        FechaInicioDate: {
          $cond: {
            if: { $ne: ["$FechaInicio", null] },
            then: { $toDate: "$FechaInicio" },
            else: null
          }
        }
      }
    },
    {
      $match: { FechaInicioDate: { $ne: null } } // Ignorar los nulos
    },
    {
      $project: {
        vigencia: { $year: "$FechaInicioDate" }
      }
    },
    {
      $group: { _id: "$vigencia" }
    },
    {
      $sort: { _id: -1 }
    }
  ]);

  return vigencias.map(v => v._id);
};


const obtenerContratoPorIdService = async (id) => {
  return await Contrato.findById(id);
};

const updateContratoService = async (id, nuevosDatos, usuario = {}) => {
  try {
    const contrato = await Contrato.findById(id)
      .populate('AbogadoAsignado', 'nombreCompletoAbogado')
      .populate('proceso', 'nombreProceso')
      .populate('tipoContrato', 'tipoContrato')
      .populate('modificaciones');

    if (!contrato) {
      throw new Error('Contrato no encontrado');
    }

    if (contrato.EstadoContrato === 'Anulado') {
      throw new Error('❌ Este contrato está anulado y no se puede modificar.');
    }

    const historialNuevasEntradas = [];
    let estadoCambiadoAAnulado = false;
    const usuarioNombre = usuario.name || usuario.toString() || 'Sistema';

    for (let campo in nuevosDatos) {

      if (campo === 'valorActual' || campo === 'fechaVigente') continue;
      if (
        contrato[campo] !== undefined &&
        contrato[campo] !== nuevosDatos[campo]
      ) {

        let anterior = contrato[campo];
        let nuevo = nuevosDatos[campo];
        let esDiferente = String(anterior) !== String(nuevo);

        if (esDiferente) {
          historialNuevasEntradas.push({
            campo,
            anterior: anterior,
            nuevo: nuevo,
            usuario: usuarioNombre,
            fecha: new Date()
          });

          if (campo === 'EstadoContrato' && nuevo === 'Anulado') {
            estadoCambiadoAAnulado = true;
          }

          contrato[campo] = nuevo;
        }
      }
    }

    contrato.usuarioModifico = usuarioNombre;

    if (historialNuevasEntradas.length > 0) {
      if (!Array.isArray(contrato.historial)) contrato.historial = [];
      contrato.historial.push(...historialNuevasEntradas);

      await contrato.populate('modificaciones');

      const valorInicial = contrato.ValorContrato || 0;
      const totalAdiciones = contrato.modificaciones.reduce((acc, mod) => {
        return mod.adicion ? acc + (mod.valorAdicion || 0) : acc;
      }, 0);
      contrato.valorActual = valorInicial + totalAdiciones;

      const prorrogas = contrato.modificaciones.filter(mod => mod.prorroga && mod.fechaFinalProrroga);
      if (prorrogas.length > 0) {
        const ultimaProrroga = prorrogas.reduce((ultima, prorroga) => {
          const fechaActual = new Date(prorroga.fechaFinalProrroga);
          const fechaUltima = new Date(ultima.fechaFinalProrroga);
          return fechaActual > fechaUltima ? prorroga : ultima;
        });
        contrato.fechaVigente = ultimaProrroga.fechaFinalProrroga;
      } else {
        contrato.fechaVigente = contrato.FechaFinalizacion;
      }

      await contrato.save();

      if (estadoCambiadoAAnulado && contrato.CorreoDependencia) {
        try {
          await ContratoAnulado(
            contrato.CorreoDependencia,
            contrato.proceso?.nombreProceso,
            contrato.CorreoDependencia,
            contrato.consecutivo,
            contrato.tipoContrato?.tipoContrato,
            contrato.NombreContratista,
            usuarioNombre
          );
          console.log(`📧 Correo de anulación enviado para contrato ${contrato.consecutivo}`);
        } catch (errCorreo) {
          console.warn('⚠️ Error al enviar correo de anulación:', errCorreo.message);
        }
      }

      return {
        message: estadoCambiadoAAnulado
          ? 'Contrato anulado correctamente y notificación enviada'
          : 'Contrato actualizado. El estado se recalculará automáticamente.',
        contrato
      };
    }

    return { message: 'No hubo cambios en los campos', contrato };

  } catch (error) {
    console.error('❌ Error en updateContratoService:', error);
    if (error.name === 'ValidationError') {
      throw new Error(`Error de validación: ${error.message}`);
    }
    throw error;
  }
};

const anularContratoService = async (id, usuario = {}) => {
  const contrato = await Contrato.findById(id);

  if (!contrato) {
   const error = new Error("Contrato no encontrado");
    error.status = 404;
    throw error;
  }

  if (contrato.EstadoContrato === 'Anulado') {
   const error = new Error("El contrato ya está anulado");
    error.status = 400;
    throw error;
  }

  const usuarioNombre = usuario.name || usuario.toString() || 'Sistema';
  const estadoAnterior = contrato.EstadoContrato;

  contrato.EstadoContrato = "Anulado";
  contrato.usuarioModifico = usuarioNombre;

  if (!Array.isArray(contrato.historial)) {
    contrato.historial = [];
  }
  contrato.historial.push({
    campo: 'EstadoContrato',
    anterior: estadoAnterior,
    nuevo: 'Anulado',
    usuario: usuarioNombre,
    fecha: new Date()
  });

  await contrato.save();

  return contrato;
};

module.exports = {
  crearContratoService,
  obtenerContratosPorFiltrosService,
  obtenerContratoPorIdService,
  updateContratoService,
  obtenerVigenciasService,
  anularContratoService
};