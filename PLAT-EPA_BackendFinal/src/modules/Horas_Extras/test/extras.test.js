const request = require('supertest');
const express = require('express');
const { connectTestDB, closeTestDB } = require('./setupTestDB');

// Routers permitidos
const extrasRouter = require('../routes/extras');

// Modelos para crear dependencias
const Cargo = require('../models/cargo');
const Sede = require('../../auth/models/sede.model');
const Proceso = require('../../auth/models/model.procesos');
const Extras = require('../models/HorasExtras');
const Funcionario = require('../models/Funcionarios');

const Usuario = require('../../auth/models/usuario.model');
const bcrypt = require('bcryptjs');

const authRouter = require('../../auth/routes/routes.auth'); // Para crear usuario y login

const app = express();
app.use(express.json());

// Montar routers
app.use('/api/auth', authRouter);
app.use('/api/extras', extrasRouter);

let token = '';
let funcionarioId = '';

beforeAll(async () => {
    await connectTestDB();

    // Crear usuario administrador
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('Admin12345', salt);
    await Usuario.create({
        name: 'AdminTest',
        email: 'admin@test.com',
        password: hashedPassword,
        rol: 'SuperAdministrador',
        identificacion: '999999999'
    });

    // Login y token
    const loginRes = await request(app).post('/api/auth/login').send({
        email: 'admin@test.com',
        password: 'Admin12345',
    });

    token = loginRes.body.token;

    // Crear dependencias directamente en la DB
    const cargo = await Cargo.create({ name: 'Operario' });
    const sede = await Sede.create({ name: 'Sede Central' });
    const proceso = await Proceso.create({ nombreProceso: 'Limpieza' });

    // Crear funcionario directamente en la DB
    const funcionario = await Funcionario.create({
        nombre_completo: 'Paola Torres',
        identificacion: '987654321',
        tipoOperario: 'Planta',
        Cargo: cargo._id,
        ProcesoAsignado: proceso._id,
        SedeAsignada: sede._id,
    });

    funcionarioId = funcionario._id;
});

afterEach(async () => {
    // Limpiar solo extras para mantener dependencias
    await Extras.deleteMany({});
});

afterAll(async () => {
    // Limpiar todo lo creado
    await Funcionario.deleteMany({});
    await Cargo.deleteMany({});
    await Sede.deleteMany({});
    await Proceso.deleteMany({});
    await closeTestDB();
});

describe('🧪 API de Extras', () => {

    test('✅ Crear Horas Extras correctamente', async () => {
        const resExtras = await request(app)
            .post('/api/extras/crear')
            .set('Authorization', `Bearer ${token}`)
            .send({
                FuncionarioAsignado: funcionarioId,
                fecha_inicio_trabajo: '2025-08-05',
                fecha_fin_trabajo: '2025-08-15',
                hora_inicio_trabajo: '08:00',
                hora_fin_trabajo: '16:00',
                fecha_inicio_descanso: '2025-08-05',
                fecha_fin_descanso: '2025-08-05',
                hora_inicio_descanso: '12:00',
                hora_fin_descanso: '13:00',
                es_festivo_Inicio: true,
                es_festivo_Fin: true,
            });

        console.log('🧾 Respuesta crear extras:', resExtras.body);

        expect(resExtras.statusCode).toBe(201);
        expect(resExtras.body.success).toBe(true);
        expect(resExtras.body.data.FuncionarioAsignado._id.toString()).toBe(funcionarioId.toString());
    });

});
