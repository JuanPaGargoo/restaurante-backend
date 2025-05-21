const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const upload = require('../middlewares/upload');

// GET: listar todos los platillos
router.get('/', async (req, res) => {
  try {
    const platillos = await prisma.platillos.findMany();
    res.json(platillos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET: listar platillos por categoría
router.get('/categoria/:categoria_id', async (req, res) => {
  const { categoria_id } = req.params;
  try {
    const platillos = await prisma.platillos.findMany({
      where: { categoria_id: parseInt(categoria_id) },
    });
    res.json(platillos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar un nuevo platillo
router.post('/', async (req, res) => {
  try {
    const { nombre, precio, categoriaId } = req.body;
    const nuevoPlatillo = await prisma.platillos.create({
      data: {
        nombre,
        precio,
        categoria: {
          connect: { id: categoriaId },
        },
      },
    });
    res.status(201).json(nuevoPlatillo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: actualizar un platillo por ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoriaId } = req.body;
    const platilloActualizado = await prisma.platillos.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        precio,
        categoria: {
          connect: { id: categoriaId },
        },
      },
    });
    res.json(platilloActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: eliminar un platillo por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.platillos.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: 'Platillo eliminado' });
  } catch {
    res.status(404).json({ error: 'Platillo no encontrado' });
  }
});

module.exports = router;
