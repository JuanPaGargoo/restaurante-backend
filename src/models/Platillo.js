const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Platillo = sequelize.define('platillo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categorias', // Nombre de la tabla asociada
      key: 'id'
    },
    allowNull: false
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  imagen_url: {
    type: DataTypes.TEXT
  },
  descripcion: { // Nuevo campo para la descripción del platillo
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'platillos',
  timestamps: false
});

module.exports = Platillo;
