const Mesa = require('./Mesa');
const Cuenta = require('./Cuenta');
const Pedido = require('./Pedido');
const PedidoPlatillo = require('./PedidoPlatillo');
const Pago = require('./Pago');
const Categoria = require('./Categoria');
const Platillo = require('./Platillo');

// Definir asociaciones
Mesa.belongsTo(Cuenta, { foreignKey: 'cuenta_id' });
Cuenta.hasMany(Mesa, { foreignKey: 'cuenta_id' });

Pedido.belongsTo(Cuenta, { foreignKey: 'cuenta_id' });
Cuenta.hasMany(Pedido, { foreignKey: 'cuenta_id' });

PedidoPlatillo.belongsTo(Pedido, { foreignKey: 'pedido_id' });
Pedido.hasMany(PedidoPlatillo, { foreignKey: 'pedido_id' });

PedidoPlatillo.belongsTo(Platillo, { foreignKey: 'platillo_id' });
Platillo.hasMany(PedidoPlatillo, { foreignKey: 'platillo_id' });

Pago.belongsTo(Cuenta, { foreignKey: 'cuenta_id' });
Cuenta.hasMany(Pago, { foreignKey: 'cuenta_id' });

// Relación entre Categoria y Platillo
Categoria.hasMany(Platillo, { foreignKey: 'categoria_id', onDelete: 'CASCADE' });
Platillo.belongsTo(Categoria, { foreignKey: 'categoria_id' });

module.exports = {
  Mesa,
  Cuenta,
  Pedido,
  PedidoPlatillo,
  Platillo,
  Pago,
  Categoria,
};