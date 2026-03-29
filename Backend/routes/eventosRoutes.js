const express = require("express");
const router = express.Router();
const eventosController = require("../controllers/eventosController");

// Endpoint para crear un nuevo evento
router.post("/eventos", eventosController.crearEvento);

// Endpoint para obtener todos los eventos
router.get("/eventos", eventosController.obtenerEventos);

// Endpoint para obtener un evento por su ID
router.get("/eventos/:id", eventosController.obtenerEventoPorId);

// Endpoint para eliminar un evento por su ID
router.delete("/eventos/:id", eventosController.eliminarEvento);

module.exports = router;