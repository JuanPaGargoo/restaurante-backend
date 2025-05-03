const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cuenta = sequelize.define('cuenta', {
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  pagada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  creada_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'cuentas',
  timestamps: false
});

module.exports = Cuenta;
