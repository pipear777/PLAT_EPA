const mongoose = require('mongoose');
const config = require('./index');

const dbConnection = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    
    // Mensajes mejorados según el entorno
    if (process.env.NODE_ENV === 'production') {
      console.log('✅ Base de datos conectada [PRODUCTION]');
    } else if (process.env.NODE_ENV === 'test') {
      console.log('✅ Base de datos conectada [TEST]');
    } else {
      console.log('✅ Base de datos conectada [DEVELOPMENT]');
      console.log(`📍 MongoDB URI: ${config.mongoUri}`);
    }
    
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:', error.message);
    console.error('📍 URI intentada:', config.mongoUri);

    if (process.env.NODE_ENV !== 'test') {
      process.exit(1); 
    } else {
      throw error; 
    }
  }
};

module.exports = {
  dbConnection
};