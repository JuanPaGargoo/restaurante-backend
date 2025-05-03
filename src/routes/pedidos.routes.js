const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

// GET: listar todos los pedidos
router.get('/', async (req, res) => {
  const pedidos = await Pedido.findAll();
  res.json(pedidos);
});

// POST: agregar un nuevo pedido
router.post('/', async (req, res) => {
  const nuevoPedido = await Pedido.create(req.body);
  res.status(201).json(nuevoPedido);
});

// PUT: actualizar un pedido por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const [updated] = await Pedido.update(req.body, { where: { id } });
  if (updated) {
    const pedidoActualizado = await Pedido.findByPk(id);
    res.json(pedidoActualizado);
  } else {
    res.status(404).json({ error: 'Pedido no encontrado' });
  }
});

// DELETE: eliminar un pedido por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Pedido.destroy({ where: { id } });
  if (deleted) {
    res.json({ mensaje: 'Pedido eliminado' });
  } else {
    res.status(404).json({ error: 'Pedido no encontrado' });
  }
});

module.exports = router;