const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: true
  },
  identificacion: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  estadoUsuario:{
   type: String,
    required: true,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
 },
  rol:{
    type: String, enum: ['SuperAdministrador', 'AdminJuridica','UsuarioJuridica','AdminAseo','UsuarioAseo','AdminInventario','UsuarioInventario'],default: 'Usuario', required: true
  },
  resetCode: { type: String },
  resetCodeExpires: { type: Date },
  resetVerified: { type: Boolean, default: false }
})

module.exports = model( 'Usuario', UsuarioSchema );