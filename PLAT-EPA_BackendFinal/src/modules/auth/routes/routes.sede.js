const express = require('express');
const router = express.Router();
const { crearsede,listarSedes, eliminarSede} = require('../controller/sede.controller');
const { validarJWT } = require('../middleware/auth.validarjwt.js');
const {validarRoles} = require('../middleware/auth.validarRol.js');

/**
 * @swagger
 * /api/sede/crearsede:
 *   post:
 *     summary: Crear Sede 
*     tags: [Sedes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreProceso
 *             properties:
 *               name:
 *                 type: string
 *                 description: Crear Sede
 *                 example: "Cam"
 *     responses:
 *       201:
 *         description: crear nueva Sede
 */

router.post('/crearsede', validarJWT,validarRoles('SuperAdministrador'), crearsede);

/**
 * @swagger
 * /api/sede/delete/{id}:
 *   delete:
 *     summary: Eliminar una Sede
 *     tags:
 *       - Sedes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro a eliminar
 *     responses:
 *       200:
 *         description: Eliminado correctamente
 *       404:
 *         description: Registro no encontrado
 */
router.delete('/delete/:id', validarJWT,validarRoles('SuperAdministrador'), eliminarSede);


/**
 * @swagger
 * /api/sede/listar:
 *   get:
 *     summary: Lista Sedes
 *     tags:
 *       - Sedes
 *     responses:
 *       201:
 *         description: Lista Sedes
 */
router.get('/listar', validarJWT,validarRoles('AdminJuridica','SuperAdministrador','AdminAseo','UsuarioAseo','UsuarioJuridica'), listarSedes);

module.exports = router;