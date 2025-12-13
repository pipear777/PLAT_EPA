const nodemailer = require('nodemailer');
const config = require('../../../config/index');

const transporter = nodemailer.createTransport({
  host: '142.250.150.108',
  port: 465,        
  secure: true,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
   tls: {
    servername: 'smtp.gmail.com'
  }
});

async function enviarCodigoCorreo(destinatario, codigo) {
  await transporter.sendMail({
    from: `"PLAT-EPA" <${config.emailUser}>`,
    to: destinatario,
    subject: "Código de acceso",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        
        <!-- Header / Nav -->
        <div style="background-color: #002d72; color: white; padding: 15px; text-align: center;">
          <h2 style="margin: 0;">Codigo Acceso</h2>
        </div>
        
        <!-- Cuerpo -->
        <div style="background-color: #ffffff; padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hola,</p>
          <p style="font-size: 16px; color: #333;">
            Aquí está tu código de acceso. Por favor ingresa este código en la aplicación para continuar:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; padding: 15px 30px; font-size: 24px; background-color: #002d72; color: white; border-radius: 6px;">
              ${codigo}
            </span>
          </div>
          <p style="font-size: 14px; color: #666;">
            Si no solicitaste este código, puedes ignorar este correo de manera segura.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #002d72; color: white; text-align: center; padding: 10px;">
          <small>&copy; 2025 epa.gov.co. Todos los derechos reservados.</small>
        </div>
      </div>
    `,
  });
}


const enviarCorreo = async (destinatario, asunto, mensajePlano) => {
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #002d72; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">🔔 ALERTA TEMPRANA</h2>
      </div>
      <div style="background-color: #ffffff; padding: 20px;">
        <p style="font-size: 16px; color: #333;">${mensajePlano}</p>
      </div>
      <div style="background-color: #f0f0f0; color: #666; text-align: center; padding: 10px; font-size: 14px;">
        www.epa.gov.co
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"EPA DTIC" <desarrollo.tic@epa.gov.co>',
      to: destinatario,
      subject: asunto,
      text: mensajePlano,
      html: htmlTemplate
    });

    console.log(`✉️ Correo enviado a ${destinatario}: ${info.messageId}`);
  } catch (error) {
    console.error(` Error al enviar correo a ${destinatario}:`, error);
  }
};

async function ContratoCreado(destinatario, proceso, CorreoDependencia, consecutivo,vigencia, tipoContrato, nombreContratista,identificacionOnit, valorContrato) {
  if (!CorreoDependencia) {
    console.log('No se envió correo de contrato creado porque no se proporcionó CorreoDependencia');
    return;
  }
  try {
    await transporter.sendMail({
      from: 'EPA DTIC <desarrollo.tic@epa.gov.co>',
      to: destinatario,
      subject: "Contrato Creado",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        
        <!-- Header / Nav -->
        <div style="background-color: #004aad; color: white; padding: 15px; text-align: center;">
          <h2 style="margin: 0;">EPA - Contrato Creado</h2>
        </div>
        
        <!-- Cuerpo -->
        <div style="background-color: #ffffff; padding: 30px;">
          <p style="font-size: 16px; color: #333;">
            Se ha creado un nuevo contrato con los siguientes detalles:
          </p>
          <ul style="font-size: 16px; color: #333; line-height: 1.8;">
            <li><strong>Proceso :</strong> ${proceso}</li>
            <li><strong>Correo Dependencia :</strong> ${CorreoDependencia}</li>
             <li><strong>Consecutivo :</strong> ${consecutivo}</li>
             <li><strong>Vigencia :</strong> ${vigencia}</li>
            <li><strong>Tipo Contrato :</strong> ${tipoContrato}</li>
            <li><strong>Nombre Contratista:</strong> ${nombreContratista}</li>
            <li><strong>Identificación o NIT :</strong> ${identificacionOnit}</li>
            <li><strong>Valor Contrato :</strong> ${valorContrato}</li>
          </ul>
        </div>        
        <!-- Footer -->
        <div style="background-color: #004aad; color: white; text-align: center; padding: 10px;">
          <small>&copy; 2025 EPA DTIC. Todos los derechos reservados.</small>
        </div>
      </div>
      `
    });

    console.log(`Correo de confirmación enviado a ${destinatario}`);
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
}

async function ContratoAnulado(destinatario, proceso, CorreoDependencia, consecutivo, tipoContrato, nombreContratista, usuarioAnulo) {
  if (!CorreoDependencia) {
    console.log('No se envió correo de contrato anulado porque no se proporcionó CorreoDependencia');
    return;
  }
  await transporter.sendMail({
    from: 'EPA DTIC <desarrollo.tic@epa.gov.co>',
    to: CorreoDependencia,
    subject: 'Contrato Anulado',
    html: `
      <p>El contrato de <strong>${nombreContratista}</strong> ha sido anulado por ${usuarioAnulo}.</p>
      <ul>
        <li>Proceso: ${proceso}</li>
        <li>Consecutivo: ${consecutivo}</li>
        <li>Tipo: ${tipoContrato}</li>
        <li>Correo Dependencia: ${CorreoDependencia}</li>
      </ul>
    `
  });
}

async function enviarBienvenidaUsuario(destinatario, nombreUsuario) {
  try {
    await transporter.sendMail({
      from: `"EPA DTIC" <${config.emailUser}>`,
      to: destinatario,
      subject: "¡Bienvenido/a !",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #002d72; color: white; padding: 15px; text-align: center;">
          <h2 style="margin: 0;">Registro de Usuario Exitoso !!</h2>
        </div>
        <div style="background-color: #ffffff; padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hola, ${nombreUsuario},</p>
          <p style="font-size: 16px; color: #333;">
            Tu cuenta ha sido registrada exitosamente en la plataforma PLAT-EPA.
          </p>
          <p style="font-size: 14px; color: #666;">
            Ya puedes iniciar sesión con tus credenciales.
          </p>
        </div>
        <div style="background-color: #002d72; color: white; text-align: center; padding: 10px;">
          <small>&copy; 2025 epa.gov.co. Todos los derechos reservados.</small>
        </div>
      </div>
      `,
    });
    console.log(`Correo de bienvenida enviado a ${destinatario}`);
  } catch (error) {
    console.error(`Error al enviar el correo de bienvenida a ${destinatario}:`, error);
  
  }
}


module.exports = { enviarCodigoCorreo, ContratoCreado, enviarCorreo, ContratoAnulado, enviarBienvenidaUsuario };
