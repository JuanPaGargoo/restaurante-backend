const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: listar todos los pagos
router.get('/', async (req, res) => {
  try {
    const pagos = await prisma.pago.findMany();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar un nuevo pago
router.post('/', async (req, res) => {
  try {
    const nuevoPago = await prisma.pago.create({
      data: req.body,
    });
    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;