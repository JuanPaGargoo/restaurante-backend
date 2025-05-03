const express = require('express');
const router = express.Router();
const PedidoPlatillo = require('../models/PedidoPlatillo');

// GET: listar todos los pedidos de platillos
router.get('/', async (req, res) => {
  const pedidoPlatillos = await PedidoPlatillo.findAll();
  res.json(pedidoPlatillos);
});

// POST: agregar un nuevo pedido de platillo
router.post('/', async (req, res) => {
  const nuevoPedidoPlatillo = await PedidoPlatillo.create(req.body);
  res.status(201).json(nuevoPedidoPlatillo);
});

module.exports = router;