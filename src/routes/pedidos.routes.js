const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: listar todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: listar todos los pedidos con sus platillos y detalles del platillo
router.get('/con-platillos', async (req, res) => {
  try {
    const pedidos = await prisma.pedidos.findMany({
      include: {
        pedido_platillo: {
          include: {
            platillos: true, 
          },
        },
      },
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar un nuevo pedido
router.post('/', async (req, res) => {
  try {
    const nuevoPedido = await prisma.pedido.create({
      data: req.body,
    });
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: actualizar un pedido por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pedidoActualizado = await prisma.pedido.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(404).json({ error: 'Pedido no encontrado' });
  }
});

// PUT :id/estado
router.put('/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const pedido = await prisma.pedidos.update({
      where: { id: Number(id) },
      data: { estado },
    });
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: eliminar un pedido por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pedido.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: 'Pedido eliminado' });
  } catch {
    res.status(404).json({ error: 'Pedido no encontrado' });
  }
});

module.exports = router;