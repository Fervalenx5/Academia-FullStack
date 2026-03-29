const Orientados = require("../models/orientados");
const Orientadores = require("../models/orientadores");
const { Op } = require("sequelize");

//crear orientado
exports.crearOrientado = async (req, res) => {
  try {
    const nuevoOrientado = await Orientados.create(req.body);
    res.status(201).json(nuevoOrientado);
  } catch (error) {
    res.status(500).json({ error: "Error al crear orientado" });
  }
};


//obtener orientados con orientador
exports.obtenerOrientados = async (req, res) => {
  try {
    const orientados = await Orientados.findAll({
      include: Orientadores,
      order: [['orientadorAsignado', 'ASC']]
    });
    res.json(orientados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener orientados" });
  }
};


//obtener orientados sin orientador
exports.obtenerOrientadosSinOrientador = async (req, res) => {
  try {
    const orientados = await Orientados.findAll({
      where: {
        orientadorAsignado: false
      }
    });
    res.json(orientados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener orientados sin orientador" });
  }
};


//buscar orientados por nombre
exports.buscarOrientadosPorNombre = async (req, res) => {
  try {
    const nombre = req.query.nombre;
    const orientados = await Orientados.findAll({
      where: {
        nombreApellido: {
          [Op.like]: `%${nombre}%`
        }
      }
    });
    res.json(orientados);
  } catch (error) {
    res.status(500).json({ error: "Error en la búsqueda" });
  }
};


//obtener orientado por id con orientador
exports.obtenerOrientadoPorId = async (req, res) => {
  try {
    const orientado = await Orientados.findByPk(req.params.id, {
      include: Orientadores
    });
    if (!orientado) {
      return res.status(404).json({ error: "Orientado no encontrado" });
    }
    res.json(orientado);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener orientado" });
  }
};

//actualizar orientado
exports.actualizarOrientado = async (req, res) => {
  try {
    const orientado = await Orientados.findByPk(req.params.id);
    if (!orientado) {
      return res.status(404).json({ error: "Orientado no encontrado" });
    }
    await orientado.update(req.body);
    res.json({
      mensaje: "Orientado actualizado",
      orientado
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar orientado" });
  }
};


//eliminar orientado
exports.eliminarOrientado = async (req, res) => {
  try {
    const orientado = await Orientados.findByPk(req.params.id);
    if (!orientado) {
      return res.status(404).json({ error: "Orientado no encontrado" });
    }
    await orientado.destroy();
    res.json({ mensaje: "Orientado eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar orientado" });
  }
};


//asignar orientador
exports.asignarOrientador = async (req, res) => {
  try {
    const orientado = await Orientados.findByPk(req.params.id);
    if (!orientado) {
      return res.status(404).json({ error: "Orientado no encontrado" });
    }
    await orientado.update({
      orientadorId: req.body.orientadorId,
      orientadorAsignado: true
    });
    res.json({
      mensaje: "Orientador asignado correctamente",
      orientado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al asignar orientador" });
  }
};
