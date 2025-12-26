const express = require('express');
const router = express.Router();
const {crearAbogado,mostrarAbogado,unAbogado,actualizarAbogado} = require('../controllers/abogado.controller.js');
const { validarJWT } = require('../../auth/middleware/auth.validarjwt.js');
const {validarRoles} = require('../../auth/middleware/auth.validarRol.js');

/**
 * @swagger
 * /api/abogados/crearAbogado:
 *   post:
 *     summary: Crear un nuevo abogado
 *     tags:
 *       - Abogados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identificacion
 *               - nombreAbogado
 *             properties:
 *               identificacion:
 *                 type: string
 *                 description: ingresar identificación abogado
 *                 example: "10001"
 *               nombreAbogado:
 *                 type: string
 *                 description: ingresar el nombre del Abogado
 *                 example: "Paola Sanchez"
 *     responses:
 *       201:
 *         description: Abogado creado exitosamente
 */
router.post('/crearAbogado',validarJWT,validarRoles('AdminJuridica','SuperAdministrador'), crearAbogado);
/**
 * @swagger
 * /api/abogados/mostrar:
 *   get:
 *     summary: mostrar Abogados
 *     tags:
 *       - Abogados
 *     responses:
 *       201:
 *         description: Lista de Abogados
 */
router.get('/mostrar',mostrarAbogado);

/**
 * @swagger
 * /api/abogados/actualizar/{idAbogado}:
 *   put:
 *     summary: Actualizar Abogado
 *     tags:
 *       - Abogados
 *     parameters:
 *       - in: path
 *         name: idAbogado
 *         required: true
 *         schema:
 *           type: string
 *         description: Actualizar Abogado
 *         example: 6904ced9bde51e97df9099aa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identificacion
 *               - nombreAbogado
 *             properties:
 *               identificacion:
 *                 type: string
 *                 example: "10000"
 *               nombreAbogado:
 *                 type: string
 *                 example: "Paola Torrez"
 *               EstadoAbogado:
 *                 type: string
 *                 example: Inactivo
 *     responses:
 *       201:
 *         description: Actualizar Abogado
 */

router.put('/actualizar/:idAbogado',validarJWT,validarRoles('AdminJuridica','SuperAdministrador'),actualizarAbogado);


module.exports = router;
