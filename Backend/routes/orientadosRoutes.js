const express = require("express");
const router = express.Router();
const orientadosController = require("../controllers/orientadosController");

// crear orientado
router.post("/orientados", orientadosController.crearOrientado);

// obtener todos los orientados
router.get("/orientados", orientadosController.obtenerOrientados);

// obtener todos los orientados sin orientador asignado
router.get("/orientados/sin-orientador", orientadosController.obtenerOrientadosSinOrientador);

// buscar orientados por nombre
router.get("/orientados/buscar", orientadosController.buscarOrientadosPorNombre);

// obtener orientado por ID
router.get("/orientados/:id", orientadosController.obtenerOrientadoPorId);

// actualizar orientado
router.put("/orientados/:id", orientadosController.actualizarOrientado);

// eliminar orientado
router.delete("/orientados/:id", orientadosController.eliminarOrientado);

// asignar orientador a orientado
router.put("/orientados/:id/asignar-orientador", orientadosController.asignarOrientador);

module.exports = router;