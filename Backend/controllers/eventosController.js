const Orientados = require("../models/orientados");
const Orientadores = require("../models/orientadores");
const Eventos = require("../models/eventos");

//crear evento con orientador y orientados
exports.crearEvento = async (req, res) => {
  try {
    const { nombreEvento, fecha, hora, duracion, detalle, orientadorId, orientadosIds } = req.body;

    const evento = await Eventos.create({
      nombreEvento,
      fecha,
      hora,
      duracion,
      detalle,
      orientadorId
    });

    if (orientadosIds && orientadosIds.length > 0) {
      const orientados = await Orientados.findAll({
        where: {
          id: orientadosIds
        }
      });

      await evento.addOrientados(orientados);
    }

    const eventoCompleto = await Eventos.findByPk(evento.id, {
      include: [Orientadores, Orientados]
    });

    res.status(201).json(eventoCompleto);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear evento"
    });
  }
};


//obtener eventos con orientador y orientados
exports.obtenerEventos = async (req, res) => {
  try {
    const eventos = await Eventos.findAll({
      include: [Orientadores, Orientados]
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener eventos"
    });
  }
};


//obtener evento por id con orientador y orientados
exports.obtenerEventoPorId = async (req, res) => {
  try {
    const evento = await Eventos.findByPk(req.params.id);
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener evento" });
  }
};

//eliminar evento por id
exports.eliminarEvento = async (req, res) => {
  try {
    const evento = await Eventos.findByPk(req.params.id);
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    await evento.destroy();
    res.json({ mensaje: "Evento eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar evento" });
  }
};
