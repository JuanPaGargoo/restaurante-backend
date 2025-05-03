const express = require('express');
const router = express.Router();
const Mesa = require('../models/Mesa');

// GET: listar todas las mesas
router.get('/', async (req, res) => {
  const mesas = await Mesa.findAll();
  res.json(mesas);
});

// POST: agregar una nueva mesa
router.post('/', async (req, res) => {
  const nuevaMesa = await Mesa.create(req.body);
  res.status(201).json(nuevaMesa);
});

// PUT: actualizar una mesa por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const [updated] = await Mesa.update(req.body, { where: { id } });
  if (updated) {
    const mesaActualizada = await Mesa.findByPk(id);
    res.json(mesaActualizada);
  } else {
    res.status(404).json({ error: 'Mesa no encontrada' });
  }
});

// DELETE: eliminar una mesa por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Mesa.destroy({ where: { id } });
  if (deleted) {
    res.json({ mensaje: 'Mesa eliminada' });
  } else {
    res.status(404).json({ error: 'Mesa no encontrada' });
  }
});

module.exports = router;