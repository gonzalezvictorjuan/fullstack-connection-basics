const { userService } = require('../services/data.service');

// Controlador para usuarios
const userController = {
  // Obtener todos los usuarios
  getAllUsers: (req, res) => {
    try {
      const users = userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener usuarios',
        message: error.message,
      });
    }
  },

  // Obtener usuario por ID
  getUserById: (req, res) => {
    try {
      const { id } = req.params;
      const user = userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          id: id,
        });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener usuario',
        message: error.message,
      });
    }
  },

  // Crear nuevo usuario
  createUser: (req, res) => {
    try {
      const { name, email } = req.body;
      const newUser = userService.createUser({ name, email });

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear usuario',
        message: error.message,
      });
    }
  },

  // Actualizar usuario
  updateUser: (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const updatedUser = userService.updateUser(id, { name, email });

      if (!updatedUser) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          id: id,
        });
      }

      res.json({
        message: 'Usuario actualizado exitosamente',
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar usuario',
        message: error.message,
      });
    }
  },

  // Eliminar usuario
  deleteUser: (req, res) => {
    try {
      const { id } = req.params;
      const deleted = userService.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          id: id,
        });
      }

      res.json({
        message: 'Usuario eliminado exitosamente',
        id: id,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al eliminar usuario',
        message: error.message,
      });
    }
  },
};

module.exports = userController;
