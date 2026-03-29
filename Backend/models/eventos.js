const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Eventos = sequelize.define("Eventos", {

  nombreEvento: {
    type: DataTypes.STRING,
    allowNull: false
  },

  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  hora: {
    type: DataTypes.STRING,
    allowNull: false
  },

  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  detalle: {
    type: DataTypes.STRING
  }

});

module.exports = Eventos;