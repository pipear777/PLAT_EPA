const mongoose = require('mongoose');

const AbogadoSchema = new mongoose.Schema({

  identificacion: {
    type: String,
    required: true,
  },
  nombreCompletoAbogado:{
    type: String,
    required: true,
  },
  EstadoAbogado: {
    type: String,
    required: true,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  }
});

module.exports = mongoose.model('Abogado', AbogadoSchema);
