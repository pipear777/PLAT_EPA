// src/modules/Horas_Extras/test/cargo.test.js
const request = require('supertest');
const { connectTestDB, closeTestDB } = require('./setupTestDB'); 
const express = require('express');
const Cargo = require('../models/cargo');
const authRouter = require('../../auth/routes/routes.auth');
const cargoRouter = require('../routes/cargo');

const Usuario = require('../../auth/models/usuario.model');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/cargos', cargoRouter);

let token = '';

beforeAll(async () => {
  await connectTestDB(); // Conectamos a la DB temporal

  // Crear usuario y loguearlo
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash('Contraseña123', salt);
  await Usuario.create({
    name: 'TestAdmin',
    email: 'admin@test.com',
    password: hashedPassword,
    rol: 'SuperAdministrador',
    identificacion: '999999998'
  });

  const loginRes = await request(app).post('/api/auth/login').send({
    email: 'admin@test.com',
    password: 'Contraseña123'
  });

  if(!loginRes.body.token) {
    throw new Error('No se pudo encontrar el Token')
  }

  token = loginRes.body.token; // Guardamos el token
});

afterAll(async () => {
  await closeTestDB(); // Cerramos la base de datos temporal
});

afterEach(async () => {
  await Cargo.deleteMany({}); // Limpiamos colección después de cada test
});

describe('🧪 API de Cargos', () => {
  test(' Crear un cargo correctamente', async () => {
    const res = await request(app)
      .post('/api/cargos/crearCargo')
      .set('Authorization', `Bearer ${token}`) // importante si la ruta requiere auth
      .send({ name: 'SuperAdministrador' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('SuperAdministrador');
  });

  test('✅ Listar cargos existentes', async () => {
    await Cargo.create({ name: 'Contador' });

    const res = await request(app)
      .get('/api/cargos/listar')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name).toBe('Contador');
  });

  test('✅ Eliminar un cargo existente', async () => {
    const cargo = await Cargo.create({ name: 'Secretario' });

    const res = await request(app)
      .delete(`/api/cargos/delete/${cargo._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Secretario');
  });

  test('🚫 Intentar eliminar un cargo inexistente', async () => {
    const res = await request(app)
      .delete('/api/cargos/delete/64f5c0f0f0f0f0f0f0f0f0f0')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
