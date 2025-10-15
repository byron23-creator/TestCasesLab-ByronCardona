const express = require('express');
const router = express.Router();
const Tarea = require('../models/tarea.model');

// POST /api/tareas
router.post('/', async (req, res) => {
  try {
    const { title, completed } = req.body;
    const tarea = new Tarea({ title, completed });
    await tarea.save();
    return res.status(201).json(tarea);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find().lean();
    return res.json(tareas);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/tareas/:id
router.get('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id).lean();
    if (!tarea) return res.status(404).json({ error: 'Not found' });
    return res.json(tarea);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/tareas/:id - Actualizar tarea
router.put('/:id', async (req, res) => {
  try {
    const { title, completed } = req.body;
    const tarea = await Tarea.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true, runValidators: true }
    );
    
    if (!tarea) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    return res.json(tarea);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/tareas/:id - Eliminar tarea
router.delete('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    
    if (!tarea) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    return res.status(204).send(); // 204 No Content
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;