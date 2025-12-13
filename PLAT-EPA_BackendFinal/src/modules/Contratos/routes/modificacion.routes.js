const express = require("express");
const router = express.Router();

const {
  addModificacion,
  listarModificaciones,
  actualizarModificacion,
  anularModificacionController,
} = require("../controllers/modificacion.controller");

const { validarJWT } = require("../../auth/middleware/auth.validarjwt");
const { validarRoles } = require("../../auth/middleware/auth.validarRol");

/**
 * @swagger
 * /api/modificaciones/{contratoId}:
 *   post:
 *     summary: Crear una modificación (Adición o Prórroga)
 *     tags: [Modificaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contratoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del contrato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoSecuencia:
 *                 type: string
 *                 enum: [Adicion, Prorroga]
 *                 example: Adicion
 *               valor:
 *                 type: number
 *                 example: 500000
 *               descripcion:
 *                 type: string
 *                 example: "Ajuste por mayor alcance"
 *     responses:
 *       201:
 *         description: Modificación creada exitosamente
 */
router.post(
  "/:contratoId",
  validarJWT,
  validarRoles("AdminJuridica", "SuperAdministrador"),
  addModificacion
);


/**
 * @swagger
 * /api/modificaciones/listar/{contratoId}:
 *   get:
 *     summary: Listar modificaciones de un contrato
 *     tags: [Modificaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contratoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de modificaciones
 */
router.get(
  "/listar/:contratoId",
  validarJWT,
  validarRoles("AdminJuridica", "SuperAdministrador"),
  listarModificaciones
);

/**
 * @swagger
 * /api/modificaciones/update/{id}:
 *   put:
 *     summary: Actualizar modificación
 *     tags: [Modificaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Modificación actualizada correctamente
 */
router.put(
  "/update/:id",
  validarJWT,
  validarRoles("AdminJuridica", "SuperAdministrador"),
  actualizarModificacion
);

/**
 * @swagger
 * /api/modificaciones/anular/{id}:
 *   post:
 *     summary: Anular una modificación
 *     tags: [Modificaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Modificación anulada exitosamente
 */
router.post(
  "/anular/:id",
  validarJWT,
  validarRoles("AdminJuridica", "SuperAdministrador"),
  anularModificacionController
);

module.exports = router;
