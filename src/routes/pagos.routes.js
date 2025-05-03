const express = require('express');
const router = express.Router();
const Pago = require('../models/Pago');

// GET: listar todos los pagos
router.get('/', async (req, res) => {
  const pagos = await Pago.findAll();
  res.json(pagos);
});

// POST: agregar un nuevo pago
router.post('/', async (req, res) => {
  const nuevoPago = await Pago.create(req.body);
  res.status(201).json(nuevoPago);
});

module.exports = router;