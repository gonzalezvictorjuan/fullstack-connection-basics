const { animalService } = require('../services/data.service');

const animalController = {
  getAll: (req, res) => {
    try {
      res.json(animalService.getAll());
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al obtener animales', message: error.message });
    }
  },
  getById: (req, res) => {
    try {
      const animal = animalService.getById(req.params.id);
      if (!animal)
        return res
          .status(404)
          .json({ error: 'Animal no encontrado', id: req.params.id });
      res.json(animal);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al obtener animal', message: error.message });
    }
  },
  create: (req, res) => {
    try {
      const { nombre, especie, edad, color } = req.body;
      if (!nombre || !especie || !edad || !color) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const animal = animalService.create({ nombre, especie, edad, color });
      res.status(201).json({ message: 'Animal creado exitosamente', animal });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al crear animal', message: error.message });
    }
  },
  update: (req, res) => {
    try {
      const { nombre, especie, edad, color } = req.body;
      const animal = animalService.update(req.params.id, {
        nombre,
        especie,
        edad,
        color,
      });
      if (!animal)
        return res
          .status(404)
          .json({ error: 'Animal no encontrado', id: req.params.id });
      res.json({ message: 'Animal actualizado exitosamente', animal });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al actualizar animal', message: error.message });
    }
  },
  delete: (req, res) => {
    try {
      const deleted = animalService.delete(req.params.id);
      if (!deleted)
        return res
          .status(404)
          .json({ error: 'Animal no encontrado', id: req.params.id });
      res.json({ message: 'Animal eliminado exitosamente', id: req.params.id });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al eliminar animal', message: error.message });
    }
  },
};

module.exports = animalController;
