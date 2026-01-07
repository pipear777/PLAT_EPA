const mongoose = require('mongoose');
const Counter = require('./model.counter');

const contratoSchema = new mongoose.Schema({
  proceso: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Proceso', },
  identificacionOnit: { type: String, required: false, trim: true },
  CorreoDependencia: { type: String, trim: true },
  consecutivo: { type: String },
  tipoContrato: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoContrato', required: true },
 /* utilizadoDespuesDeAnulado: { type: Boolean, default: false },*/
  AbogadoAsignado: { type: mongoose.Schema.Types.ObjectId, ref: 'Abogado', required: true },
  TelefonoContratista: { type: String, required: true, trim: true },
  objeto: { type: String, required: true, trim: true },
  NombreContratista: { type: String, required: true, trim: true },
  ValorContrato: { type: Number, required: true },
  plazoEjecucion : { type: String, required: true, trim: true },
  FechaInicio: { type: String },     
  FechaFinalizacion: { type: String }, 
   contadorAdiciones:{
    type: Number,
    default: 0,
  },
   contadorProrrogas:{
    type: Number,
    default: 0,
  },

  EstadoContrato: { type: String, required: false, enum: ['Activo', 'Finalizado', 'ProximoVencer', 'Anulado'], default: 'Activo' },
  valorActual: { type: Number },
  fechaVigente: { type: String },
  modificaciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modificacion'
  }],

  Vigencia: { type: Number, required: true, default: () => new Date().getFullYear() },
  alertasEnviadas: { type: [Number], default: [] },
  historial: [{
    campo: String,
    anterior: mongoose.Schema.Types.Mixed,
    nuevo: mongoose.Schema.Types.Mixed,
    usuario: String,
    fecha: { type: Date, default: Date.now }
  }],
  usuarioModifico: { type: String, default: 'sistema' },
  creadoPor: { type: String, default: 'sistema' },
  fechaCreacion: { type: Date, default: Date.now },
});

contratoSchema.pre('save', async function (next) {
  try {
    // --- INICIALIZACIÓN DE VALORES CALCULADOS ---
    if (this.isNew) {
      this.valorActual = this.ValorContrato;
      this.fechaVigente = this.FechaFinalizacion;
    }

    // --- LÓGICA PARA GENERAR CONSECUTIVO (sin cambios) ---
    if (!this.Vigencia) this.Vigencia = new Date().getFullYear();
    if (this.isNew && !this.consecutivo) {
   /*   const contratoAnulado = await mongoose.model('Contrato').findOneAndUpdate(
        { tipoContrato: this.tipoContrato, Vigencia: this.Vigencia, EstadoContrato: 'Anulado', utilizadoDespuesDeAnulado: false },
        { utilizadoDespuesDeAnulado: true },
        { sort: { fechaCreacion: 1 } }
      );*/
     
        const counter = await Counter.findOneAndUpdate(
          { tipoContrato: this.tipoContrato, Vigencia: this.Vigencia },
          { $inc: { seq: 1 } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        this.consecutivo = String(counter.seq).padStart(2, '0');
      }
    

    // --- LÓGICA PARA ACTUALIZAR ESTADO DEL CONTRATO (adaptada a String) ---
    const hoy = new Date();
    // Usamos fechaVigente y la convertimos a Date para comparar
    const fechaFin = this.fechaVigente ? new Date(this.fechaVigente) : null;
    let nuevoEstado = this.EstadoContrato;

    if (this.EstadoContrato !== 'Anulado' && fechaFin) {
      hoy.setHours(0, 0, 0, 0);

      if (!isNaN(fechaFin.getTime())) {
        const diasRestantes = Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24));
        if (diasRestantes <= 0) { nuevoEstado = 'Finalizado'; }
        else if (diasRestantes <= 30) { nuevoEstado = 'ProximoVencer'; }
        else { nuevoEstado = 'Activo'; }
      }
    }
    if (this.EstadoContrato !== nuevoEstado && this.EstadoContrato !== 'Anulado') {
      this.historial = this.historial || [];
      this.historial.push({
        campo: 'EstadoContrato',
        anterior: this.get('EstadoContrato'),
        nuevo: nuevoEstado,
        usuario: this.usuarioModifico || 'Sistema (Auto)',
        fecha: new Date()
      });
      this.EstadoContrato = nuevoEstado;
    }

    next();
  } catch (err) {
    console.error('❌ Error en pre-save del contrato:', err);
    next(err);
  }
});

module.exports = mongoose.model('Contrato', contratoSchema);
