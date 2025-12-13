const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const FuncionarioSchema = Schema({
    nombre_completo: { type: String, required: true },
    identificacion: { type: String, required: true },
    tipoOperario: { type: String, enum: ['Planta', 'Temporal'], required: true },
    Cargo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cargo', required: true },
    estado:{ type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
      ProcesoAsignado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proceso',
        required: true
      },
      SedeAsignada: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sede',
        required: true
      },
});

module.exports = model( 'Funcionario', FuncionarioSchema );