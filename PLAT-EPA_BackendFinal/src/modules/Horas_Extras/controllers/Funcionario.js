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
        const { nombre_completo, identificacion, tipoOperario, Cargo: cargoId, estado, SedeAsignada: sedeId, ProcesoAsignado: procesoId } = req.body;

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

        // Validar identificación única
        if (identificacion && identificacion !== funcionario.identificacion) {
            const existente = await Funcionario.findOne({ identificacion, _id: { $ne: id } });
            if (existente) {
                return res.status(400).json({ success: false, message: 'Ya existe un funcionario con esta identificación' });
            }
        }

        const updateData = {};

        if (nombre_completo) updateData.nombre_completo = nombre_completo;
        if (identificacion) updateData.identificacion = identificacion;
        if (tipoOperario) updateData.tipoOperario = tipoOperario;
        if (estado) updateData.estado = estado;

        // Validar y asignar referencias
        if (cargoId) {
            const cargo = await Cargo.findById(cargoId);
            if (!cargo) return res.status(404).json({ success: false, message: 'Cargo no encontrado' });
            updateData.Cargo = cargo._id;
        }

        if (sedeId) {
            const sede = await Sede.findById(sedeId);
            if (!sede) return res.status(404).json({ success: false, message: 'Sede no encontrada' });
            updateData.SedeAsignada = sede._id;
        }

        if (procesoId) {
            const proceso = await Proceso.findById(procesoId);
            if (!proceso) return res.status(404).json({ success: false, message: 'Proceso no encontrado' });
            updateData.ProcesoAsignado = proceso._id;
        }

        const funcionarioActualizado = await Funcionario.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true })
            .populate('Cargo', 'nombreCargo')
            .populate('SedeAsignada', 'name')
            .populate('ProcesoAsignado', 'nombreProceso');

        res.json({ success: true, data: funcionarioActualizado });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error actualizando el funcionario' });
    }
};


// Listar todos los funcionarios
const listarFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.find()
            .populate('Cargo', 'name')
            .populate('SedeAsignada', 'name')
            .populate('ProcesoAsignado', 'nombreProceso');
        
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
