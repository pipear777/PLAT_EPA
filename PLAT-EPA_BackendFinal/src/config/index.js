require('dotenv').config();

module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/epadatabase',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.SECRET_JWT_SEED,
  refreshSecret: process.env.REFRESH_JWT_SEED,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  inicioJornada: process.env.INICIO_JORNADA || 6,
  finJornada: process.env.FIN_JORNADA || 18,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
  
};
