require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { dbConnection } = require('./config/config');
const config = require('./config/index');
const cors = require('cors'); 
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
const cookieParser = require('cookie-parser');
const os = require('os');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔍 VARIABLES DE ENTORNO CARGADAS:');
console.log('   MONGO_URI:', process.env.MONGO_URI ? '✅' : '❌');
console.log('   PORT:', process.env.PORT ? '✅' : '❌');
console.log('   SECRET_JWT_SEED:', process.env.SECRET_JWT_SEED ? '✅' : '❌');
console.log('   REFRESH_JWT_SEED:', process.env.REFRESH_JWT_SEED ? '✅' : '❌');
console.log('   EMAIL_USER:', process.env.EMAIL_USER ? '✅' : '❌');
console.log('   EMAIL_PASS:', process.env.EMAIL_PASS ? '✅' : '❌');
console.log('   INICIO_JORNADA:', process.env.INICIO_JORNADA ? '✅' : '❌');
console.log('   FIN_JORNADA:', process.env.FIN_JORNADA ? '✅' : '❌');
console.log('   CORS_ORIGIN:', process.env.CORS_ORIGIN ? '✅' : '❌');
console.log('   NODE_ENV:', process.env.NODE_ENV ? '✅' : '❌');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const app = express();
const PORT =  process.env.PORT || 5000;


app.use(cors({
  origin: true,
  exposedHeaders: ["Content-Disposition"],
  credentials: true,              
}));

app.use( express.static('public') );

app.use(express.json());


app.use(cookieParser());


if (process.env.NODE_ENV !== 'test') {
  dbConnection();
}
//contratos
app.use('/api/sede', require('./modules/auth/routes/routes.sede'));
app.use('/api/abogados', require('./modules/Contratos/routes/routes.Abogado'));
app.use('/api/procesos', require('./modules/auth/routes/routes.procesos'));
app.use('/api/tipoContrato', require('./modules/Contratos/routes/routes.TipoContrato'));
app.use('/api/contrato', require('./modules/Contratos/routes/routes.contratos'));
app.use('/api/datos', require('./modules/Contratos/routes/routes.leerArchivo'));
app.use('/api/modificaciones', require('./modules/Contratos/routes/modificacion.routes'));


//extras
app.use('/api/auth', require('./modules/auth/routes/routes.auth'));
app.use('/api/extras', require('./modules/Horas_Extras/routes/extras'));
app.use('/api/funcionario', require('./modules/Horas_Extras/routes/funcionario'));
app.use('/api/cargos', require('./modules/Horas_Extras/routes/cargo'));
app.use('/api/reporte', require('./modules/Horas_Extras/routes/reporte'))
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = app;
