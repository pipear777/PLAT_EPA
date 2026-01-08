const { body, param, query } = require('express-validator');

const createContratoSchema = [
    body('proceso').isMongoId().withMessage('Proceso no válido'),
    body('identificacionOnit').isString().withMessage('Identificación o NIT no válido'),
    body('ValorContrato').isNumeric().withMessage('El valor del contrato debe ser un número'),
    body('tipoContrato').isMongoId().withMessage('Tipo de contrato no válido'),
    body('objeto').isString().withMessage('El objeto del contrato es requerido'),
    body('NombreContratista').isString().withMessage('El nombre del contratista es requerido'),
    body('AbogadoAsignado').isMongoId().withMessage('Abogado asignado no válido'),
    body('FechaInicio').isISO8601().toDate().withMessage('Fecha de inicio no válida'),
    body('FechaFinalizacion').isISO8601().toDate().withMessage('Fecha de finalización no válida'),
    body('TelefonoContratista').isString().optional(),
    body('EstadoContrato').isString().withMessage('El estado del contrato es requerido'),
];

const updateContratoSchema = [
    param('id').isMongoId().withMessage('ID de contrato no válido'),
    body('proceso').optional().isMongoId().withMessage('Proceso no válido'),
    body('identificacionOnit').optional().isString().withMessage('Identificación o NIT no válido'),
    body('ValorContrato').optional().isNumeric().withMessage('El valor del contrato debe ser un número'),
    body('tipoContrato').optional().isMongoId().withMessage('Tipo de contrato no válido'),
    body('objeto').optional().isString().withMessage('El objeto del contrato es requerido'),
    body('NombreContratista').optional().isString().withMessage('El nombre del contratista es requerido'),
    body('AbogadoAsignado').optional().isMongoId().withMessage('Abogado asignado no válido'),
    body('FechaInicio').optional().isISO8601().toDate().withMessage('Fecha de inicio no válida'),
    body('FechaFinalizacion').optional().isISO8601().toDate().withMessage('Fecha de finalización no válida'),
    body('TelefonoContratista').optional().isString(),
    body('EstadoContrato').optional().isString().withMessage('El estado del contrato es requerido'),
];

const getContratosSchema = [
    query('NombreContratista').optional().isString(),
    query('consecutivo').optional().isString(),
    query('identificacionOnit').optional().isString(),
    query('tipoContrato').optional().isMongoId(),
];

module.exports = {
    createContratoSchema,
    updateContratoSchema,
    getContratosSchema,
};
