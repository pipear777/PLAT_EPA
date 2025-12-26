// /services/alertas.service.js
const Contrato = require('../models/model.contratos');
const { enviarCorreo } = require('../../auth/services/email.service');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
const ZONA_HORARIA = "America/Bogota";

const enviarAlertasDiariasService = async () => {
  console.log('--- ⏰ Iniciando Tarea Programada: Enviar Alertas Diarias ---');
  console.log(`📅 Fecha/Hora actual: ${dayjs().tz(ZONA_HORARIA).format('YYYY-MM-DD HH:mm:ss')}`);

  const DIAS_DE_ALERTA = [30, 15, 10, 5];
  const hoy = dayjs().tz(ZONA_HORARIA).startOf('day');

  try {
    // Buscar contratos activos que tengan correo configurado
    const contratosActivos = await Contrato.find({
      EstadoContrato: { $ne: 'Anulado' },
      FechaFinalizacion: { $exists: true, $ne: null },
      CorreoDependencia: { $exists: true, $ne: null, $ne: '' } // ✅ Validar correo
    })
      .populate('AbogadoAsignado', 'nombreCompletoAbogado')
      .populate('tipoContrato', 'nombre')
      .populate('proceso', 'nombreProceso');

    console.log(`📋 Contratos activos encontrados: ${contratosActivos.length}`);

    let alertasEnviadas = 0;
    let alertasOmitidas = 0;

    for (const contrato of contratosActivos) {
      try {
        // Inicializar array si no existe
        if (!Array.isArray(contrato.alertasEnviadas)) {
          contrato.alertasEnviadas = [];
        }

        // Determinar fecha de referencia (priorizar fechaVigente)
        const fechaReferencia = contrato.fechaVigente || contrato.FechaFinalizacion;
        
        // ✅ Parsear como fecha en zona horaria correcta
        const fechaFin = dayjs.tz(fechaReferencia, ZONA_HORARIA).startOf('day');
        
        // Validar que la fecha sea válida
        if (!fechaFin.isValid()) {
          console.warn(`⚠️ Fecha inválida para contrato ${contrato.consecutivo}`);
          continue;
        }

        const diasRestantes = fechaFin.diff(hoy, 'day');

        console.log(`📊 Contrato ${contrato.consecutivo}: ${diasRestantes} días restantes`);

        // ✅ Verificar si corresponde enviar alerta (una sola verificación)
        if (DIAS_DE_ALERTA.includes(diasRestantes)) {
          
          // Verificar si ya se envió
          if (contrato.alertasEnviadas.includes(diasRestantes)) {
            console.log(`⏭️ Alerta de ${diasRestantes} días ya enviada para ${contrato.consecutivo}`);
            alertasOmitidas++;
            continue;
          }

          console.log(`🔔 Enviando alerta de ${diasRestantes} días para contrato ${contrato.consecutivo}...`);

          // Enviar correo con plantilla HTML mejorada
          await enviarCorreo(
            contrato.CorreoDependencia,
            `🔔 Alerta: Contrato ${contrato.consecutivo} vence en ${diasRestantes} días`,
            `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: ${diasRestantes <= 5 ? '#E74C3C' : '#E67E22'};">
                ⏳ Recordatorio de Vencimiento
              </h2>
              <p>El contrato <strong>${contrato.NombreContratista}</strong> está próximo a vencer.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd;"><strong>Consecutivo:</strong></td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${contrato.consecutivo}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;"><strong>Vigencia:</strong></td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${contrato.Vigencia}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd;"><strong>Tipo:</strong></td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${contrato.tipoContrato?.nombre || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;"><strong>Días restantes:</strong></td>
                  <td style="padding: 10px; border: 1px solid #ddd; color: ${diasRestantes <= 5 ? '#E74C3C' : '#E67E22'}; font-weight: bold;">
                    ${diasRestantes} días
                  </td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd;"><strong>Fecha Vencimiento:</strong></td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${fechaFin.format('YYYY-MM-DD')}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;"><strong>Abogado:</strong></td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${contrato.AbogadoAsignado?.nombreCompletoAbogado || 'N/A'}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd;"><strong>Proceso:</strong></td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${contrato.proceso?.nombreProceso || 'N/A'}</td>
                </tr>
              </table>

              <p style="margin-top: 20px;">
                ${diasRestantes <= 5 
                  ? '⚠️ <strong style="color: #E74C3C;">URGENTE:</strong> Por favor tome las acciones necesarias de inmediato.' 
                  : 'Por favor, tome las acciones necesarias con anticipación.'}
              </p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #7f8c8d;">
                <strong>Sistema de Gestión de Contratos</strong><br>
                Este es un mensaje automático, por favor no responder.
              </p>
            </div>
            `
          );

          // ✅ Registrar alerta enviada
          contrato.alertasEnviadas.push(diasRestantes);
          await contrato.save();
          
          alertasEnviadas++;
          console.log(`✅ Alerta enviada exitosamente para ${contrato.consecutivo}`);

        }
      } catch (errorContrato) {
        console.error(`❌ Error procesando contrato ${contrato.consecutivo}:`, errorContrato.message);
      }
    }

    const resumen = {
      message: `Tarea finalizada: ${alertasEnviadas} alertas enviadas, ${alertasOmitidas} omitidas (ya enviadas)`,
      alertasEnviadas,
      alertasOmitidas,
      contratosRevisados: contratosActivos.length,
      timestamp: dayjs().tz(ZONA_HORARIA).format('YYYY-MM-DD HH:mm:ss')
    };

    console.log('--- ✅ Tarea Finalizada ---');
    console.log(resumen);
    
    return resumen;

  } catch (dbError) {
    console.error('❌ Error fatal en enviarAlertasDiariasService:', dbError);
    throw dbError;
  }
};

module.exports = { enviarAlertasDiariasService };