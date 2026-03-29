const express = require("express");
const router = express.Router();
const orientadoresController = require("../controllers/orientadoresController");

// crear orientador
router.post("/orientadores", orientadoresController.crearOrientador);

// listar orientadores
router.get("/orientadores", orientadoresController.obtenerOrientadores);

module.exports = router;