const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: listar todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await prisma.categorias.findMany();
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET: obtener categorías por nombre
router.get('/buscar', async (req, res) => {
  const { nombre } = req.query; // Obtener el parámetro 'nombre' de la consulta
  try {
    const categorias = await prisma.categoria.findMany({
      where: { nombre: nombre } // Buscar categorías con el nombre exacto
    });
    if (categorias.length > 0) {
      res.json(categorias);
    } else {
      res.status(404).json({ error: 'No se encontraron categorías con ese nombre' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar una nueva categoría
router.post('/', async (req, res) => {
  try {
    const nuevaCategoria = await prisma.categoria.create({
      data: req.body,
    });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: actualizar una categoría por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoriaActualizada = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(404).json({ error: 'Categoría no encontrada' });
  }
});

// DELETE: eliminar una categoría por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.categoria.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: 'Categoría eliminada' });
  } catch {
    res.status(404).json({ error: 'Categoría no encontrada' });
  }
});

module.exports = router;