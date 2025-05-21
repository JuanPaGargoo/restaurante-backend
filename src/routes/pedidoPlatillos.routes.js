const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: listar todos los pedidos de platillos
router.get('/', async (req, res) => {
  try {
    const pedidoPlatillos = await prisma.pedidoPlatillo.findMany();
    res.json(pedidoPlatillos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar un nuevo pedido de platillo
router.post('/', async (req, res) => {
  try {
    const nuevoPedidoPlatillo = await prisma.pedidoPlatillo.create({
      data: req.body,
    });
    res.status(201).json(nuevoPedidoPlatillo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;