const { Schema, model } = require('mongoose');

const tipoContratoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
});

module.exports = model('TipoContrato', tipoContratoSchema);