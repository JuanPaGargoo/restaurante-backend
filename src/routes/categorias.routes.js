const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');

// GET: listar todas las categorías
router.get('/', async (req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
});

// GET: obtener categorías por nombre
router.get('/buscar', async (req, res) => {
  const { nombre } = req.query; // Obtener el parámetro 'nombre' de la consulta
  try {
    const categorias = await Categoria.findAll({
      where: {
        nombre: nombre // Buscar categorías con el nombre exacto
      }
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
  const nuevaCategoria = await Categoria.create(req.body);
  res.status(201).json(nuevaCategoria);
});

// PUT: actualizar una categoría por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const [updated] = await Categoria.update(req.body, { where: { id } });
  if (updated) {
    const categoriaActualizada = await Categoria.findByPk(id);
    res.json(categoriaActualizada);
  } else {
    res.status(404).json({ error: 'Categoría no encontrada' });
  }
});

// DELETE: eliminar una categoría por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Categoria.destroy({ where: { id } });
  if (deleted) {
    res.json({ mensaje: 'Categoría eliminada' });
  } else {
    res.status(404).json({ error: 'Categoría no encontrada' });
  }
});

module.exports = router;