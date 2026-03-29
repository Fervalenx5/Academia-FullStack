const Orientadores = require("../models/orientadores");

//crear orientador
exports.crearOrientador = async (req, res) => {
  try {
    const orientador = await Orientadores.create(req.body);
    res.json(orientador);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear orientador"
    });
  }
};

//obtener orientadores
exports.obtenerOrientadores = async (req, res) => {
  try {
    const orientadores = await Orientadores.findAll();
    res.json(orientadores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener orientadores" });
  }
};
