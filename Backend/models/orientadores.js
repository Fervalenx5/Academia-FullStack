const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Orientadores = sequelize.define("Orientadores", {

  nombreApellido: {
    type: DataTypes.STRING(500),
    allowNull: false
  },

  especialidad: {
    type: DataTypes.STRING(255)
  },

  email: {
    type: DataTypes.STRING(255),
    validate: {
      isEmail: true
    }
  }

});

module.exports = Orientadores;