const express = require('express');
const router = express.Router();
const Platillo = require('../models/Platillo');
const upload = require('../middlewares/upload');
const path = require('path');

// GET: listar todos los platillos
router.get('/', async (req, res) => {
  const platillos = await Platillo.findAll();
  res.json(platillos);
});

// POST: agregar un nuevo platillo con imagen
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, precio, categoria_id, disponible, descripcion } = req.body;
    const imagen_url = req.file ? `/uploads/${req.file.filename}` : null; // Ruta de la imagen
    const nuevo = await Platillo.create({ nombre, precio, categoria_id, disponible, descripcion, imagen_url });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: actualizar un platillo por ID (incluyendo imagen)
router.put('/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoria_id, disponible, descripcion } = req.body;
    const imagen_url = req.file ? `/uploads/${req.file.filename}` : undefined; // Ruta de la imagen
    const dataToUpdate = { nombre, precio, categoria_id, disponible, descripcion };
    if (imagen_url) dataToUpdate.imagen_url = imagen_url;

    const [updated] = await Platillo.update(dataToUpdate, { where: { id } });
    if (updated) {
      const platilloActualizado = await Platillo.findByPk(id);
      res.json(platilloActualizado);
    } else {
      res.status(404).json({ error: 'Platillo no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: eliminar un platillo por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Platillo.destroy({ where: { id } });
  if (deleted) {
    res.json({ mensaje: 'Platillo eliminado' });
  } else {
    res.status(404).json({ error: 'Platillo no encontrado' });
  }
});

// GET: listar platillos por categoría
router.get('/categoria/:categoria_id', async (req, res) => {
  const { categoria_id } = req.params; // Obtener el ID de la categoría desde los parámetros
  try {
    const platillos = await Platillo.findAll({
      where: {
        categoria_id: categoria_id // Filtrar por categoría
      }
    });
    if (platillos.length > 0) {
      res.json(platillos);
    } else {
      // Respuesta amigable si no hay platillos
      res.status(200).json({ mensaje: 'No hay platillos aún en esta categoría' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
