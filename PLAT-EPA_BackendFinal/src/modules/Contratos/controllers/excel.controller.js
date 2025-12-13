const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// Leer y decodificar el archivo JSON
const buffer = fs.readFileSync(path.join(__dirname, '../utils/prueba.json'));
const utf8Text = iconv.decode(buffer, 'latin1');
const jsonCompleto = JSON.parse(utf8Text);

// Buscar tabla de contratos
const tablaContratos = jsonCompleto.find(
  item => item.type === 'table' && item.name === 'dtcontratos'
);

const datosContratosCrudos = tablaContratos?.data || [];

// Reparar texto con errores de encoding
function repararTextoRoto(texto) {
  return texto
    .replace(/Ã\u008d/g, 'Í')
    .replace(/Ã\u00d3/g, 'Ó')
    .replace(/Ã\u00a1/g, 'Á')
    .replace(/Â´/g, "'")
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã\u00cd/g, 'Í')
    .replace(/Ã\u00d1/g, 'Ñ')
    .replace(/Ã‘/g, 'Ñ')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã¡/g, 'á')
    .replace(/Ã\u00a9/g, 'é')
    .replace(/Ã“/g, 'Ó')
    .replace(/Ã\u008d/g, 'Í')
    .replace(/Ã‰/g, 'É')
    .replace(/Ã³/g, 'ó'); 
}

// Procesar cada contrato y mapear datos limpios
function limpiarContrato(raw) {
  const estadoNumerico = parseInt(raw.estado);
  const TipoContrato = parseInt(raw.idcontrato);

  let TipoContra = 'Desconocido';
  let estadoTexto = 'DESCONOCIDO';

  // Estado
  if (estadoNumerico === 1) estadoTexto = 'ACTIVO';
  else if (estadoNumerico === 2) estadoTexto = 'AMPLIADO';
  else if (estadoNumerico === 3) estadoTexto = 'FINALIZADO';
  else if (estadoNumerico === 4) estadoTexto = 'EN_PROCESO';
  else if (estadoNumerico === 5) estadoTexto = 'ANULADO';
  else if (estadoNumerico === 6) estadoTexto = 'ACTIVO-ACTUALIZADO';

  // Tipo de contrato
  if (TipoContrato === 1) TipoContra = 'CLAUSULADO_SIMPLIFICADO';
  else if (TipoContrato === 2) TipoContra = 'DE_ARRENDAMIENTO';
  else if (TipoContrato === 3) TipoContra = 'DE_COMPRAVENTA';
  else if (TipoContrato === 4) TipoContra = 'DE_CONSULTORIA';
  else if (TipoContrato === 5) TipoContra = 'DE_CONVENIO';
  else if (TipoContrato === 6) TipoContra = 'DE_OBRA';
  else if (TipoContrato === 7) TipoContra = 'DE_SUMINISTROS';
  else if (TipoContrato === 8) TipoContra = 'PRESTACION_DE_SERVICIO';

  return {
    TipoContrato: TipoContra,
    consecutivo: parseInt(raw.idconsecutivo),
    conanio: raw.conanio ? raw.conanio.trim() : null ,
    fechaIngreso: raw.fechaingreso !== '0000-00-00' ? raw.fechaingreso : null,
    objeto: repararTextoRoto(raw.objeto),
    //contratista es novedades
    novedades: repararTextoRoto(raw.novedades),
    estado: estadoTexto
  };
}

const contratosLimpios = datosContratosCrudos.map(limpiarContrato);

// Obtener todos los contratos
const contratosLimpiosLim = (req, res) => {
  const { anio } = req.query;

  let contratosFiltrados = contratosLimpios;

  // 🔍 FILTRO POR AÑO SI SE ENVÍA
  if (anio) {
    contratosFiltrados = contratosLimpios.filter(c => {
      if (!c.fechaIngreso || c.fechaIngreso === '0000-00-00') return false;
      return new Date(c.fechaIngreso).getFullYear().toString() === anio;
    });
  }

  // 🔥 ORDENAR DEL MÁS RECIENTE AL MÁS ANTIGUO
    contratosFiltrados = contratosFiltrados.sort((a, b) => {
    const fechaA = a.fechaIngreso && a.fechaIngreso !== '0000-00-00' ? new Date(a.fechaIngreso) : null;
    const fechaB = b.fechaIngreso && b.fechaIngreso !== '0000-00-00' ? new Date(b.fechaIngreso) : null;

    // Si alguna fecha es inválida, mándala al final
    if (!fechaA) return 1;
    if (!fechaB) return -1;

    return fechaB - fechaA; 
  });

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const total = contratosFiltrados.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const data = contratosFiltrados.slice(startIndex, endIndex);

  res.json({
    success: true,
    message: "Contratos históricos encontrados.",
    data,
    total,
    page,
    limit,
    totalPages,
  });
};


const FiltrarPorTipoContrato = (req, res) => {
  const { tipo } = req.params;
  const tipoBuscado = tipo.toUpperCase();

  let contratosFiltrados = contratosLimpios.filter(
    c => c.TipoContrato === tipoBuscado
  );

  if (contratosFiltrados.length === 0) {
    return res.status(404).json({ message: `No se encontraron contratos con tipo: ${tipoBuscado}` });
  }


  contratosFiltrados = contratosFiltrados.sort((a, b) => {
    const fechaA = a.fechaIngreso && a.fechaIngreso !== '0000-00-00' ? new Date(a.fechaIngreso) : null;
    const fechaB = b.fechaIngreso && b.fechaIngreso !== '0000-00-00' ? new Date(b.fechaIngreso) : null;

    if (!fechaA) return 1;
    if (!fechaB) return -1;

    return fechaB - fechaA;
  });

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;

  const total = contratosFiltrados.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const data = contratosFiltrados.slice(startIndex, endIndex);

  return res.json({
    success: true,
    message: `Contratos encontrados para tipo: ${tipoBuscado}`,
    data,
    total,
    page,
    limit,
    totalPages
  });
};


const FiltrarPorContratista = (req, res) => {
  const contratista = req.params.nombre || req.query.nombre;

  console.log('Buscando contratista:', contratista);

  if (!contratista) {
    return res.status(400).json({ error: 'No se proporcionó el nombre o palabra para buscar en novedades.' });
  }

  const buscado = contratista.toLowerCase();

  // 🔍 Filtrar por coincidencia en novedades
  let contratosFiltrados = contratosLimpios.filter(
    c => c.novedades && c.novedades.toLowerCase().includes(buscado)
  );

  if (contratosFiltrados.length === 0) {
    return res.status(404).json({ message: `No se encontraron contratos con coincidencias: ${contratista}` });
  }

  // 🔥 ORDENAR POR FECHA DESC (más reciente primero)
  contratosFiltrados = contratosFiltrados.sort((a, b) => {
    const fechaA = a.fechaIngreso && a.fechaIngreso !== '0000-00-00' ? new Date(a.fechaIngreso) : null;
    const fechaB = b.fechaIngreso && b.fechaIngreso !== '0000-00-00' ? new Date(b.fechaIngreso) : null;

    if (!fechaA) return 1;
    if (!fechaB) return -1;

    return fechaB - fechaA;
  });

  // 📄 PAGINACIÓN
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;

  const total = contratosFiltrados.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const data = contratosFiltrados.slice(startIndex, endIndex);

  return res.json({
    success: true,
    message: `Contratos encontrados con coincidencia: ${contratista}`,
    total,
    page,
    limit,
    totalPages,
    data
  });
};


const FiltrarPorAnio = (req, res) => {
  const { anio } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;

  console.log('🔍 Año recibido:', anio);

  if (!anio) {
    return res.status(400).json({ error: 'No se proporcionó el año para buscar.' });
  }

  const añosUnicos = [...new Set(contratosLimpios.map(c => c.conanio && c.conanio.trim()))];
  console.log('📅 Años disponibles:', añosUnicos);

  let contratosFiltrados = contratosLimpios.filter(
    c => c.conanio && c.conanio.trim() === anio.trim()
  );

  console.log('✅ Contratos encontrados:', contratosFiltrados.length);

  if (contratosFiltrados.length === 0) {
    return res.status(404).json({ mensaje: `No se encontraron contratos para el año: ${anio}` });
  }

  contratosFiltrados = contratosFiltrados.sort((a, b) => {
    const fechaA = a.fechaIngreso && a.fechaIngreso !== '0000-00-00' ? new Date(a.fechaIngreso) : null;
    const fechaB = b.fechaIngreso && b.fechaIngreso !== '0000-00-00' ? new Date(b.fechaIngreso) : null;

    if (!fechaA) return 1;
    if (!fechaB) return -1;

    return fechaB - fechaA;
  });

  const total = contratosFiltrados.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const data = contratosFiltrados.slice(startIndex, endIndex);

  return res.json({
    success: true,
    message: `Contratos del año ${anio} encontrados`,
    total,
    page,
    limit,
    totalPages,
    data
  });
};

const obtenerAniosUnicos = (req, res) => {
  const anios = [...new Set(
    contratosLimpios.map(c => {
      if (!c.fechaIngreso || c.fechaIngreso === '0000-00-00') return null;
      return new Date(c.fechaIngreso).getFullYear().toString();
    }).filter(Boolean)
  )];
  
  res.json(anios.sort((a, b) => b - a));
};


module.exports = {
  contratosLimpiosLim,
  FiltrarPorTipoContrato,
  FiltrarPorContratista,
  FiltrarPorAnio,
  obtenerAniosUnicos
};
