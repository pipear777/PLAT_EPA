const Usuario = require('../models/usuario.model');

const listarUsuariosService = async () => {
    return await Usuario.find({}, '-password'); 
};

module.exports = {
    listarUsuariosService,
};