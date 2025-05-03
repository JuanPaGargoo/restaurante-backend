const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pago = sequelize.define('pago', {
    cuenta_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cuentas',
        key: 'id'
      },
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    metodo: {
      type: DataTypes.STRING
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'pagos',
    timestamps: false
  });
  
  module.exports = Pago;
  