// src/modules/Horas_Extras/test/setupTestDB.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

module.exports.connectTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // ⚠️ Importante: Desconecta cualquier conexión previa (como la de app.js)
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  // 🔐 Conecta solo a la base temporal
  await mongoose.connect(uri);
  console.log('🧪 Conectado a base de datos temporal en memoria');
};

module.exports.closeTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
  console.log('🧹 Base de datos temporal cerrada');
};
