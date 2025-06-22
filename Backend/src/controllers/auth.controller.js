const authService = require('../services/auth.service');
const { userService } = require('../services/data.service');

const authController = {
  // Registrar nuevo usuario
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const newUser = await authService.register({ name, email, password });

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: newUser,
      });
    } catch (error) {
      if (error.message === 'El email ya está registrado') {
        return res.status(409).json({
          error: error.message,
        });
      }

      res.status(500).json({
        error: 'Error al registrar usuario',
        message: error.message,
      });
    }
  },

  // Login de usuario
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.json({
        message: 'Login exitoso',
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      if (error.message === 'Credenciales inválidas') {
        return res.status(401).json({
          error: error.message,
        });
      }

      res.status(500).json({
        error: 'Error en el login',
        message: error.message,
      });
    }
  },

  // Obtener perfil del usuario autenticado
  getProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
        });
      }

      res.json({
        message: 'Perfil obtenido exitosamente',
        user,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener perfil',
        message: error.message,
      });
    }
  },

  // Obtener todos los usuarios (solo para usuarios autenticados)
  getAllUsers: async (req, res) => {
    try {
      const users = userService.getAllUsers();

      res.json({
        message: 'Usuarios obtenidos exitosamente',
        users,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener usuarios',
        message: error.message,
      });
    }
  },
};

module.exports = authController;
