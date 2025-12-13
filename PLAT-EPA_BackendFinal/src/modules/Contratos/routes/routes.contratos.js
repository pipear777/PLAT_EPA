const express = require('express');
const router = express.Router();
const { crearContrato, obtenerContratosPorFiltros,ActualizarContratos, obtenerResumenContratos, obtenerVigencias,anularContrato } = require('../controllers/contratos.controller');
const { validarJWT } = require('../../auth/middleware/auth.validarjwt.js');
const {validarRoles} = require('../../auth/middleware/auth.validarRol');

/**
 * @swagger
 * /api/contrato/crearContrato:
 *   post:
 *     summary: Crear un nuevo contrato
 *     tags:
 *       - Contratos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - proceso
 *               - identificacionOnit
 *               - ValorContrato
 *               - tipoContrato
 *               - objeto
 *               - NombreContratista
 *               - AbogadoAsignado
 *               - FechaInicio
 *               - FechaFinalizacion
 *               - TelefonoContratista
 *               - EstadoContrato
 *             properties:
 *               proceso:
 *                 type: string
 *                 example: 6655c2f0bdb8b7c79fa8dffe
 *               tipoContrato:
 *                 type: string
 *                 example: 6655c2f0bdb8b7c79fa8d111
 *               CorreoDependencia:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico de la dependencia solicitante(opcional)
 *                 example: usuario@ejemplo.com
 *               identificacionOnit:
 *                 type: string
 *                 example: "123456789"
 *               ValorContrato:
 *                 type: number
 *                 example: 5000000
 *               objeto:
 *                 type: string
 *                 example: Contratar servicios de soporte técnico
 *               NombreContratista:
 *                 type: string
 *                 example: Ana Torres
 *               AbogadoAsignado:
 *                 type: string
 *                 example: 6655c2f0bdb8b7c79fa8aaaa
 *               FechaInicio:
 *                 type: string
 *                 format: date
 *                 example: 2024-07-01
 *               FechaFinalizacion:
 *                 type: string
 *                 format: date
 *                 example: 2024-12-31
 *               TelefonoContratista:
 *                 type: string
 *                 example: "3101234567"
 *               EstadoContrato:
 *                 type: string
 *                 example: Activo
 *     responses:
 *       201:
 *         description: Contrato creado exitosamente
 */


router.post('/crearContrato',validarJWT,validarRoles('AdminJuridica','SuperAdministrador'), crearContrato);

/**
 * @swagger
 * /api/contrato/filtro:
 *   get:
 *     summary: Obtener todos los contratos (con filtros opcionales)
 *     tags:
 *       - Contratos
 *     parameters:
 *       - in: query
 *         name: NombreContratista
 *         schema:
 *           type: string
 *         description: Nombre del contratista a buscar.
 *       - in: query
 *         name: consecutivo
 *         schema:
 *           type: string
 *         description: Consecutivo del contrato a buscar.
 *       - in: query
 *         name: identificacionOnit
 *         schema:
 *           type: string
 *         description: Identificación o NIT del contratista a buscar.
 *       - in: query
 *         name: tipoContrato
 *         schema:
 *           type: ObjectId
 *         description: tipo a buscar.
 *     responses:
 *       200:
 *         description: Lista de contratos obtenida correctamente
 */
router.get('/filtro',validarJWT,validarRoles('AdminJuridica','SuperAdministrador','UsuarioJuridica'), obtenerContratosPorFiltros);


/**
 * @swagger
 * /api/contrato/:id:
 *   put:
 *     summary: Actualizar Contrato
 *     tags:
 *       - Contratos
 *     responses:
 *       201:
 *         description: Actualizar contrato
 */
router.put("/update/:id",validarJWT,validarRoles('AdminJuridica','SuperAdministrador'), ActualizarContratos );

/**
 * @swagger
 * /api/contrato/resumen:
 *   get:
 *     summary: Cantidad contratos por estado
 *     tags:
 *       - Contratos
 *     responses:
 *       201:
 *         description: Cantidad Contratos por estado
 */
router.get('/resumen',validarJWT,validarRoles('AdminJuridica','SuperAdministrador', 'UsuarioJuridica'), obtenerResumenContratos);



router.get('/obtener',validarJWT,validarRoles('AdminJuridica','SuperAdministrador','UsuarioJuridica'), obtenerVigencias);

router.post('/anular/:id',validarJWT,validarRoles('AdminJuridica','SuperAdministrador'), anularContrato);


module.exports = router;
