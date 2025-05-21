const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: listar todas las cuentas
router.get('/', async (req, res) => {
  try {
    const cuentas = await prisma.cuenta.findMany();
    res.json(cuentas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar una nueva cuenta
router.post('/', async (req, res) => {
  try {
    const nuevaCuenta = await prisma.cuenta.create({
      data: req.body,
    });
    res.status(201).json(nuevaCuenta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: actualizar una cuenta por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cuentaActualizada = await prisma.cuenta.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(cuentaActualizada);
  } catch (error) {
    res.status(404).json({ error: 'Cuenta no encontrada' });
  }
});

// DELETE: eliminar una cuenta por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cuenta.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: 'Cuenta eliminada' });
  } catch {
    res.status(404).json({ error: 'Cuenta no encontrada' });
  }
});

module.exports = router;