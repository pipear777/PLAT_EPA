const moment = require("moment");

const normalizarCargo = (valor) => {
    if (!valor) return "sin cargo";
    return valor.toString().trim().toLowerCase();
};



const normalizeHeader = (header) => {
    if (!header) return "";
    return header
        .toString()
        .trim()
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ");
};

const normalizeName = (str) => {
    if (!str) return "";
    return str
        .toString()
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " "); 
};

const formatearCelda = (valor, campo) => {
    if (valor === null || valor === undefined) {
        if (campo.toLowerCase().startsWith("es_festivo")) return false;
        return null;
    }

    if (campo.toLowerCase().startsWith("es_festivo")) {
        if (typeof valor === "boolean") return valor;
        if (typeof valor === "number") return valor === 1;
        const str = valor.toString().replace(/\s+/g, "").toLowerCase();
        if (["true", "1", "si", "sí"].includes(str)) return true;
        if (["false", "0", "no"].includes(str)) return false;
        return false;
    }
   
    if (valor instanceof Date) {
        if (campo.startsWith("fecha_")) return moment(valor).format("YYYY-MM-DD");
        if (campo.startsWith("hora_")) return moment(valor).format("HH:mm");
    }

    if (typeof valor === "number" && campo.startsWith("hora_")) {
        const minutos = Math.round(valor * 24 * 60);
        const horas = Math.floor(minutos / 60);
        const mins = minutos % 60;
        return `${String(horas).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    }

    if (typeof valor === "string") {
        const str = valor.trim();
        if (campo.startsWith("fecha_")) {
            const fecha = moment(str, ["DD/MM/YYYY", "YYYY-MM-DD", "MM/DD/YYYY"], true);
            return fecha.isValid() ? fecha.format("YYYY-MM-DD") : null;
        }
        if (campo.startsWith("hora_")) {
            const hora = moment(str, ["HH:mm", "H:mm", "HH:mm:ss"], true);
            return hora.isValid() ? hora.format("HH:mm") : null;
        }
    }

    return valor;
};

module.exports = { normalizarCargo, normalizeHeader, formatearCelda, normalizeName };