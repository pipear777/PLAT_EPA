const mongoose = require('mongoose');
const config = require('./index');


const dbConnection = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('DB Online');
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:', error);

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
