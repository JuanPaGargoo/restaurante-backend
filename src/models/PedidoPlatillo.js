const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PedidoPlatillo = sequelize.define('pedido_platillo', {
    pedido_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pedidos',
        key: 'id'
      },
      allowNull: false
    },
    platillo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'platillos',
        key: 'id'
      },
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    tableName: 'pedido_platillo',
    timestamps: false
  });
  
  module.exports = PedidoPlatillo;
  