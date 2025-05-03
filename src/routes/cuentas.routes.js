const express = require('express');
const router = express.Router();
const Cuenta = require('../models/Cuenta');

// GET: listar todas las cuentas
router.get('/', async (req, res) => {
  const cuentas = await Cuenta.findAll();
  res.json(cuentas);
});

// POST: agregar una nueva cuenta
router.post('/', async (req, res) => {
  const nuevaCuenta = await Cuenta.create(req.body);
  res.status(201).json(nuevaCuenta);
});

// PUT: actualizar una cuenta por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const [updated] = await Cuenta.update(req.body, { where: { id } });
  if (updated) {
    const cuentaActualizada = await Cuenta.findByPk(id);
    res.json(cuentaActualizada);
  } else {
    res.status(404).json({ error: 'Cuenta no encontrada' });
  }
});

// DELETE: eliminar una cuenta por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Cuenta.destroy({ where: { id } });
  if (deleted) {
    res.json({ mensaje: 'Cuenta eliminada' });
  } else {
    res.status(404).json({ error: 'Cuenta no encontrada' });
  }
});

module.exports = router;