const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const sedeSchema = Schema({
  name: {
    type: String,
    required: true
  },
 
});

module.exports = model( 'Sede', sedeSchema );