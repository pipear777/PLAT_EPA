const moment = require('moment');
const Funcionario = require('../models/Funcionarios');
const config = require('../../../config/config');

async function calcularHorasExtras(data) {
  try {
    console.log('🔍 Datos recibidos en calcularHorasExtras:', data);

    const {
      fecha_inicio_trabajo, hora_inicio_trabajo,
      fecha_fin_trabajo, hora_fin_trabajo,
      fecha_inicio_descanso, hora_inicio_descanso,
      fecha_fin_descanso, hora_fin_descanso,
      es_festivo_Inicio, es_festivo_Fin,
      FuncionarioAsignado
    } = data;

    if (!fecha_inicio_trabajo || !hora_inicio_trabajo || !fecha_fin_trabajo || !hora_fin_trabajo) {
      const error = `Faltan datos obligatorios: fecha_inicio=${fecha_inicio_trabajo}, hora_inicio=${hora_inicio_trabajo}, fecha_fin=${fecha_fin_trabajo}, hora_fin=${hora_fin_trabajo}`;
      console.error('❌', error);
      return { success: false, message: error };
    }

    if (!FuncionarioAsignado) {
      const error = "FuncionarioAsignado no proporcionado";
      console.error('❌', error);
      return { success: false, message: error };
    }

    const funcionario = await Funcionario.findById(FuncionarioAsignado);
    if (!funcionario) {
      const error = `Funcionario no encontrado en la BD con ID: ${FuncionarioAsignado}`;
      console.error('❌', error);
      return { success: false, message: error };
    }
    
    const tipo = (funcionario.tipoOperario || 'planta').toLowerCase();
    console.log(`👤 Funcionario encontrado: ${funcionario.nombre_completo}, tipo: ${tipo}`);

    const inicioTotal = moment(`${fecha_inicio_trabajo} ${hora_inicio_trabajo}`, 'YYYY-MM-DD HH:mm');
    let finTotal = moment(`${fecha_fin_trabajo} ${hora_fin_trabajo}`, 'YYYY-MM-DD HH:mm');
    if (finTotal.isBefore(inicioTotal)) finTotal.add(1, 'day'); // Cruce medianoche

    const descansoInicio = fecha_inicio_descanso && hora_inicio_descanso 
      ? moment(`${fecha_inicio_descanso} ${hora_inicio_descanso}`, 'YYYY-MM-DD HH:mm')
      : null;
    const descansoFin = fecha_fin_descanso && hora_fin_descanso 
      ? moment(`${fecha_fin_descanso} ${hora_fin_descanso}`, 'YYYY-MM-DD HH:mm')
      : null;

    // Inicializar acumuladores
    let HDO = 0, HNO = 0, HEDO = 0, HENO = 0;
    let HDF = 0, HNF = 0, HEDF = 0, HENF = 0;
    let RNO = 0;
    let totalMinutosTrabajados = 0, totalMinutosDescanso = 0;
    let es_fin_de_semana = false;
    let minutosOrdinariosGlobales = 0;

    let cursor = inicioTotal.clone();

    while (cursor.isBefore(finTotal)) {
      const siguiente = cursor.clone().add(1, 'minute');

      // Saltar descanso
      if (descansoInicio && descansoFin && cursor.isBetween(descansoInicio, descansoFin, null, '[)')) {
        totalMinutosDescanso++;
        cursor = siguiente;
        continue;
      }

      totalMinutosTrabajados++;

      const hora = cursor.hour();
      const diaSemana = cursor.isoWeekday();
      let esFestivo = false;
      if (cursor.isSame(moment(fecha_inicio_trabajo, 'YYYY-MM-DD'), 'day')) esFestivo = es_festivo_Inicio;
      if (cursor.isSame(moment(fecha_fin_trabajo, 'YYYY-MM-DD'), 'day')) esFestivo = es_festivo_Fin;

      if (diaSemana === 7) es_fin_de_semana = true;

      const esNocturno = hora >= (config.fin_jornada || 18) || hora < (config.inicio_Jornada || 6);
      const esOrdinario = minutosOrdinariosGlobales < ((tipo === 'temporal') ? 440 : 480);

      if (esOrdinario) minutosOrdinariosGlobales++;

      // Clasificación según día y horario
      if (esFestivo || diaSemana === 7) {
        if (esNocturno) esOrdinario ? HNF++ : HENF++;
        else esOrdinario ? HDF++ : HEDF++;
      } else {
        if (esNocturno) esOrdinario ? HNO++ : HENO++;
        else esOrdinario ? HDO++ : HEDO++;
      }

      // Recargo nocturno ordinario
      if (esNocturno && esOrdinario && !esFestivo && diaSemana !== 7) {
        RNO++;
      }

      cursor = siguiente;
    }

    // Ajuste para completar jornada ordinaria
    const limiteParaCompletar = (tipo === 'planta') ? 480 : 440;
    const ultimoMinuto = finTotal.clone().subtract(1, 'minute');
    const diaSemanaFin = ultimoMinuto.isoWeekday();
    const esFestivoODominical = diaSemanaFin === 7 || es_festivo_Fin === true || es_festivo_Inicio === true;

    if (totalMinutosTrabajados < limiteParaCompletar && !esFestivoODominical) {
      const minutosFaltantes = limiteParaCompletar - totalMinutosTrabajados;
      const esNocturno = ultimoMinuto.hour() >= (config.fin_jornada || 18) || ultimoMinuto.hour() < (config.inicio_Jornada || 6);

      if (esNocturno) {
        HNO += minutosFaltantes;
        RNO += minutosFaltantes;
      } else {
        HDO += minutosFaltantes;
      }

      totalMinutosTrabajados = limiteParaCompletar;
    }

    const aHHMM = (min) => {
      if (!min || min < 0) min = 0;
      const h = Math.floor(min / 60);
      const m = min % 60;
      return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
    };

    const resultado = {
      success: true,
      horas_trabajadas: aHHMM(totalMinutosTrabajados),
      horas_descanso: aHHMM(totalMinutosDescanso),
      HDO: aHHMM(HDO), HNO: aHHMM(HNO),
      HDF: aHHMM(HDF), HNF: aHHMM(HNF),
      HEDO: aHHMM(HEDO), HENO: aHHMM(HENO),
      HEDF: aHHMM(HEDF), HENF: aHHMM(HENF),
      RNO: aHHMM(RNO),
      horas_extras: aHHMM(HEDO + HENO + HEDF + HENF),
      es_fin_de_semana
    };

    console.log('✅ Cálculo completado exitosamente');
    return resultado;

  } catch (error) {
    console.error("❌ Error en calcularHorasExtras:", error.message);
    return { success: false, message: error.message };
  }
}

module.exports = { calcularHorasExtras };

