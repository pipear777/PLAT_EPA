const mongoose = require("mongoose");

const modificacionSchema = new mongoose.Schema(
  {
    contrato: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contrato",
      required: true,
    },
    numeroSecuenciaAdicion: {
      type: Number,
      default: null,
    },
    numeroSecuenciaProrroga: {
      type: Number,
      default: null,
    },
    tipoSecuencia:
     { type: String },
    adicion: {
      type: Boolean,
      default: false,
    },
    prorroga: {
      type: Boolean,
      default: false,
    },
    
    valorAdicion: {
      type: Number,
      default: 0,
    },
    fechaFinalProrroga: { 
      type: String,
      default: "",
    },
    tiempoProrroga: {
      type: String,
      default: "",
    },
    // Estado para la lógica de anulación
    estado: {
      type: String,
      required: true,
      enum: ["Activa", "Anulada"],
      default: "Activa",
    },
    usuarioModifico: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

modificacionSchema.pre('save', function (next) {


  // Si ambos son falsos, no es una modificación válida
  if (!this.adicion && !this.prorroga) {
    return next(new Error("Una modificación debe ser de tipo 'adición' o 'prórroga'."));
  }

  // Si es solo adición
  if (this.adicion && !this.prorroga) {
    if (this.valorAdicion <= 0) {
      return next(new Error("Para una 'adición', el 'valorAdicion' debe ser mayor que cero."));
    }
    if (!this.numeroSecuenciaAdicion || this.numeroSecuenciaAdicion <= 0) {
      return next(new Error("Para una 'adición', 'numeroSecuenciaAdicion' es obligatorio y debe ser mayor que cero."));
    }
    this.fechaFinalProrroga = undefined;
    this.tiempoProrroga = undefined;
  }

  // Si es solo prórroga
  if (!this.adicion && this.prorroga) {
    if (!this.fechaFinalProrroga || !this.tiempoProrroga) {
      return next(new Error("Para una 'prórroga', 'fechaFinalProrroga' y 'tiempoProrroga' son obligatorios."));
    }
    if (!this.numeroSecuenciaProrroga || this.numeroSecuenciaProrroga <= 0) {
      return next(new Error("Para una 'prórroga', 'numeroSecuenciaProrroga' es obligatorio y debe ser mayor que cero."));
    }
    this.valorAdicion = 0;
  }

  // Si es adición y prórroga
  if (this.adicion && this.prorroga) {
    if (this.valorAdicion <= 0) {
      return next(new Error("Para 'adición y prórroga', el 'valorAdicion' debe ser mayor que cero."));
    }
    if (!this.fechaFinalProrroga || !this.tiempoProrroga) {
      return next(new Error("Para 'adición y prórroga', 'fechaFinalProrroga' y 'tiempoProrroga' son obligatorios."));
    }
    if (!this.numeroSecuenciaAdicion || this.numeroSecuenciaAdicion <= 0) {
      return next(new Error("Para 'adición y prórroga', 'numeroSecuenciaAdicion' es obligatorio y debe ser mayor que cero."));
    }
    if (!this.numeroSecuenciaProrroga || this.numeroSecuenciaProrroga <= 0) {
      return next(new Error("Para 'adición y prórroga', 'numeroSecuenciaProrroga' es obligatorio y debe ser mayor que cero."));
    }
  }

  next();
});

module.exports = mongoose.model("Modificacion", modificacionSchema);