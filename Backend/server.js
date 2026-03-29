const cors = require("cors");
const express = require("express");
const sequelize = require("./models/database");
const Orientados = require("./models/orientados");
const orientadosRoutes = require("./routes/orientadosRoutes");
const Orientadores = require("./models/orientadores");
const OrientadoresRoutes = require("./routes/orientadoresRoutes");
const Eventos = require("./models/eventos");
const eventosRoutes = require("./routes/eventosRoutes");
const novedadesRoutes = require("./routes/novedadesRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", orientadosRoutes);
app.use("/", OrientadoresRoutes);
app.use("/", eventosRoutes);
app.use("/", novedadesRoutes);

// Relaciones entre modelos
Orientados.belongsTo(Orientadores, {
  foreignKey: "orientadorId"
});

Orientadores.hasMany(Orientados, {
  foreignKey: "orientadorId"
});

Eventos.belongsTo(Orientadores, {
  foreignKey: "orientadorId"
});

Orientadores.hasMany(Eventos, {
  foreignKey: "orientadorId"
});

Eventos.belongsToMany(Orientados, {
  through: "EventoOrientados",
  foreignKey: "eventoId"
});

Orientados.belongsToMany(Eventos, {
  through: "EventoOrientados",
  foreignKey: "orientadoId"
});

// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

sequelize.authenticate()
  .then(() => {
    console.log("Base de datos conectada");
  });

sequelize.sync()
  .then(() => {
    console.log("Tablas sincronizadas");
  });

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

