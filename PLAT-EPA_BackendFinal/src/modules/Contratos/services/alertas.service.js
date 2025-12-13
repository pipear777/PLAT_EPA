// /services/alertas.service.js
const Contrato = require('../models/model.contratos');
const { enviarCorreo } = require('../../auth/services/email.service');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

// Configurar Dayjs para usar la zona horaria correcta
dayjs.extend(utc);
dayjs.extend(timezone);
const ZONA_HORARIA = "America/Bogota"; 

// Función principal que se ejecutará una vez al día
const enviarAlertasDiariasService = async () => {
  console.log('--- ⏰ Iniciando Tarea Programada: Enviar Alertas Diarias ---');

  // 1. Definir los días de alerta y la fecha de hoy
  const DIAS_DE_ALERTA = [30, 15, 10, 5];
  const hoy = dayjs().tz(ZONA_HORARIA).startOf('day');

  try {

    const contratosActivos = await Contrato.find({
      EstadoContrato: { $in: ['Activo', 'ProximoVencer'] }, 
      FechaFinalización: { $exists: true }
    })
    .populate('AbogadoAsignado', 'nombreCompletoAbogado')
    .populate('tipoContrato', 'tipoContrato');

    let alertasEnviadas = 0;

    // 3. Iterar sobre cada contrato
    for (const contrato of contratosActivos) {
      const fechaFin = dayjs(contrato.FechaFinalizacion).startOf('day');
      const diasRestantes = fechaFin.diff(hoy, 'day');

      // 4. Comprobar si hoy es un día de alerta
      if (DIAS_DE_ALERTA.includes(diasRestantes)) {
        
        // 5. CRÍTICO: Comprobar que no la hayamos enviado ya
        if (!contrato.alertasEnviadas.includes(diasRestantes)) {
          console.log(`🔔 Enviando alerta de ${diasRestantes} días para contrato ${contrato.consecutivo}...`);
          
          try {
            // 6. Enviar el correo
            await enviarCorreo(
              contrato.CorreoDependencia,
              `🔔 Alerta: Contrato ${contrato.consecutivo} vence en ${diasRestantes} días`,
              `El contrato: ${contrato.NombreContratista} (${contrato.tipoContrato?.tipoContrato}) 
               vence el ${fechaFin.format('YYYY-MM-DD')}.
               Abogado: ${contrato.AbogadoAsignado?.nombreCompletoAbogado || 'N/A'}.`
            );

            // 7. Marcar la alerta como enviada en la BD
            contrato.alertasEnviadas.push(diasRestantes);
            await contrato.save(); // Guarda el cambio en .alertasEnviadas
            alertasEnviadas++;

          } catch (error) {
            console.error(`❌ Error enviando alerta para contrato ${contrato.consecutivo}:`, error.message);
          }
        }
      }
    }

    console.log(`--- ✅ Tarea Finalizada: ${alertasEnviadas} alertas enviadas ---`);
    return { message: `Tarea finalizada, ${alertasEnviadas} alertas enviadas.` };

  } catch (dbError) {
      console.error('❌ Error fatal buscando contratos para alertas:', dbError);
  }
};

module.exports = { enviarAlertasDiariasService };