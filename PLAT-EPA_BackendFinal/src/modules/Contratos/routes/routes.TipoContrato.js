const express = require('express');
const router = express.Router();
const {crearTipoContrato,listarTipoContrato,actualizarTipo} = require('../controllers/TipoContrato.controller');
const { validarJWT } = require('../../auth/middleware/auth.validarjwt.js');
const {validarRoles} = require('../../auth/middleware/auth.validarRol');


/**
 * @swagger
 * /api/tipoContrato/CreartipoContrato:
 *   post:
 *     summary: Crear Tipo Contrato
 *     tags:
 *       - Contratos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipoContrato
 *             properties:
 *              tipoContrato:
 *                 type: string
 *                 description: Crear Proceso
 *                 example: "Arrendamiento"
 *     responses:
 *       201:
 *         description: crear nuevo tipoContrato
 */
router.post('/CreartipoContrato',validarJWT,validarRoles('AdminJuridica','SuperAdministrador'),crearTipoContrato);

/**
 * @swagger
 * /api/tipoContrato/:
 *   get:
 *     summary: Lista Tipo Contrato
 *     tags:
 *       - Contratos
 *     responses:
 *       201:
 *         description: Lista Tipo COntratos
 */
router.get('/', validarJWT,validarRoles('AdminJuridica','SuperAdministrador','AdminAseo','UsuarioAseo','UsuarioJuridica'),listarTipoContrato);



/**
 * @swagger
 * /api/tipoContrato/actualizar/{idTipoContrato}:
 *   put:
 *     summary: Actualizar Tipo Contrato
 *     tags:
 *       - Contratos
 *     parameters:
 *       - in: path
 *         name: idTipoContrato
 *         required: true
 *         schema:
 *           type: string
 *         description: Actualizar Tipo Contrato
 *         example: 6904ced9bde51e97df9099aa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipoContrato
 *             properties:
 *                tipoContrato:
 *                 type: string
 *                 example: "Arrendamiento"
 *     responses:
 *       201:
 *         description: Actualizar Tipo Contrato
 */

router.put('/actualizar/:idTipoContrato',validarJWT,validarRoles('SuperAdministrador'),actualizarTipo);



module.exports = router;