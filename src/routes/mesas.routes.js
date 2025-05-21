const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: listar todas las mesas
router.get('/', async (req, res) => {
  try {
    const mesas = await prisma.mesa.findMany();
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar una nueva mesa
router.post('/', async (req, res) => {
  try {
    const nuevaMesa = await prisma.mesa.create({
      data: req.body,
    });
    res.status(201).json(nuevaMesa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: actualizar una mesa por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mesaActualizada = await prisma.mesa.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(mesaActualizada);
  } catch (error) {
    res.status(404).json({ error: 'Mesa no encontrada' });
  }
});

// DELETE: eliminar una mesa por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.mesa.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: 'Mesa eliminada' });
  } catch {
    res.status(404).json({ error: 'Mesa no encontrada' });
  }
});

module.exports = router;