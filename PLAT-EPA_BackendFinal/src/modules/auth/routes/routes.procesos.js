
const express = require('express');
const router = express.Router();
const {nuevoProceso,mostrarProcesos,unProceso, eliminarProceso, actualizarProceso} = require('../controller/procesos.controller.js');
const { validarJWT } = require('../middleware/auth.validarjwt.js');
const { validarRoles } = require('../middleware/auth.validarRol.js');


/**
 * @swagger
 * /api/procesos/crearProceso:
 *   post:
 *     summary: Crear Proceso
*     tags: [Procesos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreProceso
 *             properties:
 *               nombreProceso:
 *                 type: string
 *                 description: Crear Proceso
 *                 example: "Mantenimiento"
 *     responses:
 *       201:
 *         description: crear nuevo proceso
 */
router.post('/crearProceso',validarJWT,validarRoles('SuperAdministrador'),nuevoProceso );

/**
 * @swagger
 * /api/procesos/:
 *   get:
 *     summary: Lista Procesos
 *     tags:
 *       - Procesos
 *     responses:
 *       201:
 *         description: Lista proceso
 */
router.get('/', validarJWT, validarRoles('SuperAdministrador', 'AdminAseo', 'AdminJuridica', 'UsuarioAseo', 'UsuarioJuridica'), mostrarProcesos);

/**
 * @swagger
 * /api/procesos/:id:
 *   get:
 *     summary: mostrar Proceso
 *     tags:
 *       - Procesos
 *     responses:
 *       201:
 *         description: mostrar  proceso
 */
router.get('/:id', unProceso );

/**
 * @swagger
 * /api/procesos/delete/{id}:
 *   delete:
 *     summary: Eliminar un proceso
 *     tags:
 *       - Procesos
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
router.delete('/eliminarProceso/:id',validarJWT,validarRoles('SuperAdministrador'), eliminarProceso);

/**
 * @swagger
 * /api/procesos/actualizarProceso/{id}:
 *   put:
 *     summary: Actualizar un proceso
 *     tags:
 *       - Procesos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreProceso
 *             properties:
 *               nombreProceso:
 *                 type: string
 *                 description: Nuevo nombre del proceso
 *                 example: "Limpieza"
 *     responses:
 *       200:
 *         description: Actualizado correctamente
 *       404:
 *         description: Registro no encontrado
 */
router.put('/actualizarProceso/:id',validarJWT,validarRoles('SuperAdministrador'), actualizarProceso);


module.exports = router;