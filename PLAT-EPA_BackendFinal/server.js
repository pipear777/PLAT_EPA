
require('dotenv').config();
const os = require('os');
const config = require('./src/config/index');
const app = require('./src/app');
const cron = require('node-cron');
const { enviarAlertasDiariasService } = require('./src/modules/Contratos/services/alertas.service');

const PORT = config.port || process.env.PORT || 5000;


function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

cron.schedule('0 8 * * *', () => {
  console.log('▶️ Ejecutando cron job diario de alertas (08:00 am)...');
  enviarAlertasDiariasService();
}, {
  scheduled: true,
  timezone: "America/Bogota"
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor Express escuchando en http://localhost:${PORT}`);
  const ip = getLocalIP();
  console.log(`📚 Swagger disponible en: http://${ip}:${PORT}/api-docs`);
});
