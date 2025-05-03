const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('pedido', {
    cuenta_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cuentas',
        key: 'id'
      },
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'pendiente'
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'pedidos',
    timestamps: false
  });
  
  module.exports = Pedido;