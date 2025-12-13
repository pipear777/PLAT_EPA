
const validarCorreo = (correo) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
};

const noNumeros = (texto) => {
  const regex = /^[^\d]+$/;
  return regex.test(texto);
};

const validarFecha = (fecha) => {
  // Formato YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(fecha)) return false;

  // Validar que la fecha realmente exista
  const [anio, mes, dia] = fecha.split('-').map(Number);
  const date = new Date(anio, mes - 1, dia); // mes en JS es 0-11
  return date.getFullYear() === anio && date.getMonth() === mes - 1 && date.getDate() === dia;
};

const limpiarTexto = (str = "") =>
  str
    .trim()                         // quita espacios al inicio y fin
    .replace(/\n/g, "")             // quita saltos de línea
    .normalize("NFD")               // normaliza acentos
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos


module.exports = { validarCorreo, noNumeros, validarFecha, limpiarTexto  };