const mongoose = require('mongoose');

const procesoSchema = new mongoose.Schema({
     nombreProceso: {
      type: String,
      required: true
    }
})
module.exports = mongoose.model('Proceso', procesoSchema );