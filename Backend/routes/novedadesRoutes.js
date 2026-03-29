const express = require("express");
const router = express.Router();
const novedadesController = require("../controllers/novedadesController");

router.get("/novedades", novedadesController.obtenerNovedades);

module.exports = router;