const request = require('supertest');
const app = require('../../../app');
const mongoose = require('mongoose');
const Contrato = require('../models/model.contratos');
const Modificacion = require('../models/model.modificacion');
const Usuario = require('../../auth/models/usuario.model');
const bcrypt = require('bcryptjs');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let contratoId;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Create user and get token for protected routes
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash('password123', salt);
  await Usuario.create({
    name: 'Test User',
    email: 'test@example.com',
    password: hashedPassword,
    rol: 'AdminJuridica',
    identificacion: '123456789'
  });

  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });
  token = res.body.token;

  // Create a contract to be used in tests
  const contrato = new Contrato({
    proceso: new mongoose.Types.ObjectId(),
    tipoContrato: new mongoose.Types.ObjectId(),
    AbogadoAsignado: new mongoose.Types.ObjectId(),
    TelefonoContratista: "1234567890",
    objeto: "Test contract",
    NombreContratista: "Test contractor",
    ValorContrato: 1000,
    FechaInicio: "2025-01-01",
    FechaFinalizacion: "2025-12-31",
    Vigencia: 2025,
    plazoEjecucion: "3 meses"
  });
  const savedContrato = await contrato.save();
  contratoId = savedContrato._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Modificaciones Endpoints', () => {
  it('should create a new modification', async () => {
    const res = await request(app)
      .post(`/api/modificaciones/${contratoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        adicion: true,
        valorAdicion: 500,
        numeroSecuenciaAdicion: 1,
        usuarioModifico: 'Test User'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.data).toHaveProperty('adicion', true);
  });

  it('should list modifications for a contract', async () => {
    const res = await request(app)
      .get(`/api/modificaciones/listar/${contratoId}`)
      .set('Authorization', `Bearer ${token}`);
      
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  it('should return an empty list for a contract with no modifications', async () => {
    const newContrato = new Contrato({
        proceso: new mongoose.Types.ObjectId(),
        tipoContrato: new mongoose.Types.ObjectId(),
        AbogadoAsignado: new mongoose.Types.ObjectId(),
        TelefonoContratista: "1234567890",
        objeto: "Test contract 2",
        NombreContratista: "Test contractor 2",
        ValorContrato: 2000,
        FechaInicio: "2025-01-01",
        FechaFinalizacion: "2025-12-31",
        Vigencia: 2025,
      });
    const savedContrato = await newContrato.save();
    const newContratoId = savedContrato._id;

    const res = await request(app)
      .get(`/api/modificaciones/listar/${newContratoId}`)
      .set('Authorization', `Bearer ${token}`);
      
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data).toEqual([]);
  });
});
