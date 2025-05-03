const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mesa = sequelize.define('mesa', {
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'libre'
  },
  cuenta_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'cuentas',
      key: 'id'
    },
    allowNull: true
  }
}, {
  tableName: 'mesas',
  timestamps: false
});

module.exports = Mesa;