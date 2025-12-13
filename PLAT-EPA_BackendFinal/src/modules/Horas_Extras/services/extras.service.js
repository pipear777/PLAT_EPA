const Extras = require('../models/HorasExtras');
const Funcionario = require('../models/Funcionarios');
const { calcularHorasExtras } = require('../middleware/CalculoHoras');
const moment = require('moment');
const mongoose = require('mongoose');

async function validarTurnoYHoras(data, idParaExcluir = null) {
    const camposObligatorios = [
        'FuncionarioAsignado', 'fecha_inicio_trabajo', 'hora_inicio_trabajo',
        'fecha_fin_trabajo', 'hora_fin_trabajo', 'sede', 'proceso'
    ];

    for (const campo of camposObligatorios) {
        if (!data[campo]) return { success: false, status: 400, message: `El campo obligatorio '${campo}' es requerido.` };
        if ((campo === 'FuncionarioAsignado' || campo === 'sede' || campo === 'proceso') && !mongoose.Types.ObjectId.isValid(data[campo])) {
            return { success: false, status: 400, message: `El ID del campo '${campo}' no es válido.` };
        }
    }

    // Validar funcionario
    const funcionario = await Funcionario.findById(data.FuncionarioAsignado).select("estado");
    if (!funcionario) return { success: false, status: 404, message: 'El funcionario asignado no existe.' };
    if (funcionario.estado === "Inactivo") return { success: false, status: 400, message: 'No se pueden registrar horas extras para un funcionario inactivo.' };

    // Validar sede y proceso
    const sedeDoc = await Sede.findById(data.sede);
    if (!sedeDoc) return { success: false, status: 404, message: 'Sede no encontrada.' };
    const procesoDoc = await Proceso.findById(data.proceso);
    if (!procesoDoc) return { success: false, status: 404, message: 'Proceso no encontrado.' };

    // Validación de horas y descansos
     const horaRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      const camposDeHora = ['hora_inicio_trabajo', 'hora_fin_trabajo', 'hora_inicio_descanso', 'hora_fin_descanso'];
      for (const campo of camposDeHora) {
        if (data[campo] && !horaRegex.test(data[campo])) {
          return { success: false, status: 400, message: `El formato de hora para '${campo}' debe ser HH:MM (ejemplo: 08:30).` };
        }
      }
    }
  
    let inicioNuevo = moment(`${data.fecha_inicio_trabajo}T${data.hora_inicio_trabajo}`);
    let finNuevo = moment(`${data.fecha_fin_trabajo}T${data.hora_fin_trabajo}`);
  
    let avisoCambio = null;
  
    // --- Ajustar automáticamente si cruza medianoche ---
    if (finNuevo.isBefore(inicioNuevo)) {
      finNuevo.add(1, 'day');
      data.fecha_fin_trabajo = finNuevo.format('YYYY-MM-DD');
      data.hora_fin_trabajo = finNuevo.format('HH:mm');
      avisoCambio = `El turno cruzaba medianoche y se ajustó automáticamente: ahora termina el ${data.fecha_fin_trabajo} a las ${data.hora_fin_trabajo}.`;
    }
  
    let ahora = moment();
  
    if (inicioNuevo.isAfter(ahora) || finNuevo.isAfter(ahora)) {
      return { success: false, status: 400, message: 'No se pueden registrar horas extras en fechas futuras.' };
    }
  
    if (!finNuevo.isAfter(inicioNuevo)) {
      return { success: false, status: 400, message: 'La hora de fin debe ser posterior a la hora de inicio.' };
    }
  
    // Validaciones del descanso
    if (data.hora_inicio_descanso && data.hora_fin_descanso) {
      let inicioDesc = moment(`${data.fecha_inicio_descanso}T${data.hora_inicio_descanso}`);
      let finDesc = moment(`${data.fecha_fin_descanso}T${data.hora_fin_descanso}`);
      if (finDesc.isBefore(inicioDesc)) finDesc.add(1, 'day');
  
      if (!inicioDesc.isBetween(inicioNuevo, finNuevo, undefined, '[]') || !finDesc.isBetween(inicioNuevo, finNuevo, undefined, '[]')) {
        return { success: false, status: 400, message: 'El período de descanso debe estar completamente dentro del turno de trabajo.' };
      }
      if (finDesc.diff(inicioDesc, 'minutes') >= finNuevo.diff(inicioNuevo, 'minutes')) {
        return { success: false, status: 400, message: 'El descanso no puede durar más que el turno de trabajo.' };
      }
    }
  
    // Solapamiento con otros registros
    const filtro = {
      FuncionarioAsignado: data.FuncionarioAsignado,
      fecha_inicio_trabajo: { $lte: finNuevo.format('YYYY-MM-DD') },
      fecha_fin_trabajo: { $gte: inicioNuevo.format('YYYY-MM-DD') }
    };
    if (idParaExcluir) filtro._id = { $ne: idParaExcluir };
  
    const registrosExistentes = await Extras.find(filtro).lean();
    for (const existente of registrosExistentes) {
      let inicioExistente = moment(`${existente.fecha_inicio_trabajo.toISOString().split('T')[0]}T${existente.hora_inicio_trabajo}`);
      let finExistente = moment(`${existente.fecha_fin_trabajo.toISOString().split('T')[0]}T${existente.hora_fin_trabajo}`);
      if (finExistente.isBefore(inicioExistente)) finExistente.add(1, 'day');
  
      if (inicioNuevo.isBefore(finExistente) && finNuevo.isAfter(inicioExistente)) {
        return {
          success: false,
          status: 409,
          message: `Ya existe un registro de horas que se cruza con este turno. 
                    Turno existente: del ${inicioExistente.format('DD/MM/YYYY HH:mm')} al ${finExistente.format('DD/MM/YYYY HH:mm')}. 
                    Verifique y ajuste los horarios antes de guardar.`
        };
      }
      return { success: true, dataAjustada: data };
    }


async function crearHorasExtras(data) {
  // Validar turno y horas
  const validacion = await validarTurnoYHoras(data);
  if (!validacion.success) return validacion;

  if (validacion.dataAjustada) data = validacion.dataAjustada;


  const calculos = await calcularHorasExtras(data);
  if (!calculos.success) return calculos;

  const nuevaExtra = new Extras({
    ...data,
    ...calculos,
    observaciones: data.observaciones || ""
  });
  await nuevaExtra.save();
  await nuevaExtra.populate("FuncionarioAsignado", "nombre_completo tipoOperario estado");
  return { success: true, data: nuevaExtra };
}

module.exports = {
    validarTurnoYHoras,
    crearHorasExtras,
    actualizarHorasExtras
};
