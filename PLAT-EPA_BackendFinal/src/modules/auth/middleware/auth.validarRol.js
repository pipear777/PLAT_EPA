const Usuario = require('../models/usuario.model')



const SuperAdmin = (req, res, next) => {
  if (req.rol !== 'SuperAdministrador') {
    return res.status(403).json({
      ok: false,
      msg: 'No tiene permisos para esta acción'
    });
  }
  next();
}




const validarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.rol) {
      return res.status(500).json({
        ok: false,
        msg: 'Error: Se intenta validar rol sin validar token primero'
      });
    }

    if (!rolesPermitidos.includes(req.rol)) {
      return res.status(403).json({
        ok: false,
        msg: `El servicio requiere uno de estos roles: ${rolesPermitidos}`
      });
    }

    next();
  };
};


module.exports = {
  SuperAdmin,
  validarRoles
}