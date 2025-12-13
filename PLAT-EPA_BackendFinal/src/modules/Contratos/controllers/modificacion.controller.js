const {
   crearModificacion,
   actualizarModificacionService,
  anularModificacion,
  listarModificacionesService
} = require("../services/modificacion.service");

 const addModificacion = async (req, res) => {
  try {
    const { contratoId } = req.params;
     const usuario = {
      uid: req.uid,
      name: req.name,
      rol: req.rol
    };
   
    const usuarioModifico = usuario?.name || 'UsuarioDesconocido';
    console.log(usuario);
    

    const modificationData = { ...req.body, contratoId, usuarioModifico };

    const nueva = await crearModificacion(modificationData);

    return res.status(201).json({
      ok: true,
      message: "Modificación creada correctamente",
      data: nueva,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al crear modificación",
      error: error.message,
    });
  }
};

 const  actualizarModificacion = async (req, res) => {
  try {
    const { id } = req.params;
    // Assuming req.user is populated by authentication middleware
    // and contains user information like 'id' or 'nombre'.
     const usuario = {
      uid: req.uid,
      name: req.name,
      rol: req.rol
    };
   
    const usuarioModifico = usuario?.name || 'UsuarioDesconocido';
    const updateData = { ...req.body, usuarioModifico };

    const actualizada = await actualizarModificacionService(id, updateData);

    return res.status(200).json({
      ok: true,
      message: "Modificación actualizada correctamente",
      data: actualizada,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar modificación",
      error: error.message,
    });
  }
};

 const anularModificacionController = async (req, res) => {
  try {
    const { id } = req.params;
    const anulada = await anularModificacion(id);

    return res.status(200).json({
      ok: true,
      message: "Modificación anulada correctamente",
      data: anulada,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al anular modificación",
      error: error.message,
    });
  }
};

 const listarModificaciones = async (req, res) => {
  try {
    const { contratoId } = req.params;

    const modificaciones = await listarModificacionesService(contratoId);

    return res.status(200).json({
      ok: true,
      data: modificaciones,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al obtener las modificaciones",
      error: error.message,
    });
  }
};



module.exports = {
  addModificacion,
  listarModificaciones,
  actualizarModificacion,
  anularModificacionController,
};