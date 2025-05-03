const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // restaurante
  process.env.DB_USER,     // postgres
  process.env.DB_PASS,     // contraseña
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // para ocultar logs de SQL
  }
);

module.exports = sequelize;
