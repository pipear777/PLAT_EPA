// En tu modelo Counter
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  tipoContrato: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TipoContrato', 
    required: true 
  },
  Vigencia: { 
    type: Number, 
    required: true 
  },
  seq: { 
    type: Number, 
    default: 0 
  }
});

// Índice único compuesto por tipoContrato + Vigencia
counterSchema.index({ tipoContrato: 1, Vigencia: 1 }, { unique: true });

module.exports = mongoose.model('Counter', counterSchema);

