const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Orientados = sequelize.define("Orientados", {

  nombreApellido: {
    type: DataTypes.STRING(500),
    allowNull: false
  },

  email: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  telefono: {
    type: DataTypes.STRING(50),
    validate: {
      isNumeric: true
    }
  },

  programa: {
    type: DataTypes.STRING
  },

  documento: {
    type: DataTypes.STRING(50),
    validate: {
      isNumeric: true
    }
  },

  edad: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true
    }
  },

  colegio: {
    type: DataTypes.STRING(500)
  },

  domicilio: {
    type: DataTypes.STRING(500)
  },

  motivo: {
    type: DataTypes.STRING(500)
  },

  foto: {
    type: DataTypes.STRING
  },

  orientadorAsignado: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
  },

  orientadorId: {
  type: DataTypes.INTEGER,
  allowNull: true
  }

});

module.exports = Orientados;