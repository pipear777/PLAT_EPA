const Funcionario = require('../models/Funcionarios');
const Cargo = require('../models/cargo');
const Sede = require('../../auth/models/sede.model');
const Proceso = require('../../auth/models/model.procesos');

const crearFuncionario = async (req, res) => {
    try {
        const { nombre_completo, identificacion, tipoOperario, Cargo: cargoId, estado, SedeAsignada: sedeId, ProcesoAsignado: procesoId } = req.body;

        const tiposValidos = ['Planta', 'Temporal'];
        if (!tiposValidos.includes(tipoOperario)) {
            return res.status(400).json({
                success: false,
                message: `Tipo de operario inválido. Válidos: ${tiposValidos.join(', ')}`
            });
        }

        const cargo = await Cargo.findById(cargoId);
        if (!cargo) return res.status(404).json({ success: false, message: 'Cargo no encontrado' });

        const sede = await Sede.findById(sedeId);
        console.log("Sede"+sede);
        
        if (!sede) return res.status(404).json({ success: false, message: 'Sede no encontrada' });

        const proceso = await Proceso.findById(procesoId);
        if (!proceso) return res.status(404).json({ success: false, message: 'Proceso no encontrado' });

        // **Validación: no permitir identificaciones duplicadas**
        const existente = await Funcionario.findOne({ identificacion });
        if (existente) return res.status(400).json({
            success: false,
            message: 'Ya existe un funcionario con esta identificación'
        });

        const nuevoFuncionario = new Funcionario({
            nombre_completo,
            identificacion,
            tipoOperario,
            Cargo: cargo._id,
            estado: estado || 'Activo',
            SedeAsignada: sede._id,
            ProcesoAsignado: proceso._id
        });

        await nuevoFuncionario.save();

        const funcionarioCreado = await Funcionario.findById(nuevoFuncionario._id)
            .populate('Cargo', 'nombreCargo')
            .populate('SedeAsignada', 'name')
            .populate('ProcesoAsignado', 'nombreProceso');

        res.status(201).json({
            success: true,
            message: 'Funcionario creado con éxito.',
            data: funcionarioCreado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creando el funcionario' });
    }
};

const actualizarFuncionario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_completo, identificacion, tipoOperario, Cargo: cargoId, estado, SedeAsignada: sedeId, ProcesoAsignado: procesoId} = req.body;

        // Validación enums
        const tiposValidos = ['Planta', 'Temporal'];
        const estadosValidos = ['Activo', 'Inactivo'];

        if (tipoOperario && !tiposValidos.includes(tipoOperario)) {
            return res.status(400).json({ success: false, message: `Tipo de operario inválido. Valores: ${tiposValidos.join(', ')}` });
        }

        if (estado && !estadosValidos.includes(estado)) {
            return res.status(400).json({ success: false, message: `Estado inválido. Valores: ${estadosValidos.join(', ')}` });
        }

        const funcionario = await Funcionario.findById(id);
        if (!funcionario) {
            return res.status(404).json({ success: false, message: 'Funcionario no encontrado' });
        }

        // Validar identificación única (excepto el propio funcionario)
        if (identificacion && identificacion !== funcionario.identificacion) {
            const existente = await Funcionario.findOne({ identificacion });
            if (existente) {
                return res.status(400).json({ success: false, message: 'Ya existe un funcionario con esta identificación' });
            }
        }

        // Validar cargo si se envía
        if (cargoId) {
            const cargo = await Cargo.findById(cargoId);
            if (!cargo) return res.status(404).json({ success: false, message: 'Cargo no encontrado' });
            funcionario.Cargo = cargo._id;
        }

        // Actualizar campos
        if (nombre_completo) funcionario.nombre_completo = nombre_completo;
        if (identificacion) funcionario.identificacion = identificacion;
        if (tipoOperario) funcionario.tipoOperario = tipoOperario;
        if (estado) funcionario.estado = estado;
        if(sedeId) funcionario.SedeAsignada = sedeId;
        if(procesoId) funcionario.ProcesoAsignado = procesoId;

        await funcionario.save();

        res.json({ success: true, data: funcionario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error actualizando el funcionario' });
    }
};

// Listar todos los funcionarios
const listarFuncionarios = async (req, res) => {
  try {
    // Populamos los campos de referencia según tu esquema
    const funcionarios = await Funcionario.find()
      .populate('cargo', 'name')         
      .populate('sede', 'name')           
      .populate('proceso', 'nombreProceso'); 

    res.status(200).json({ success: true, data: funcionarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al listar los funcionarios' });
  }
};


const listarFuncionariosActivos = async (req, res) => {
    try {
        const funcionarios = await Funcionario.find({ estado: "Activo" })
            .populate("Cargo", "name");

        res.status(200).json({ success: true, data: funcionarios });
    } catch (error) {
        console.error("Error al listar funcionarios activos:", error);
        res.status(500).json({ success: false, message: "Error al listar los funcionarios activos" });
    }
};


const obtenerFuncionarioPorId = async (req, res) => {
    try {
        const { identificacion } = req.params;
        const funcionario = await Funcionario.findOne({ identificacion }).populate('Cargo');

        if (!funcionario) {
            return res.status(404).json({ success: false, message: 'Funcionario no encontrado' });
        }

        res.json({ success: true, data: funcionario });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el funcionario' });
    }
};



module.exports = { crearFuncionario, listarFuncionarios, actualizarFuncionario, obtenerFuncionarioPorId, listarFuncionariosActivos };
