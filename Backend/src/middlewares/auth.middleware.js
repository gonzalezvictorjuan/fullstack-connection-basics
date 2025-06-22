const authService = require('../services/auth.service');

const authMiddleware = {
  // Verificar token JWT
  verifyToken: (req, res, next) => {
    try {
      // Obtener token del header Authorization
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          error: 'Token de acceso requerido',
          message: 'Debe incluir el header Authorization: Bearer <token>',
        });
      }

      // Verificar formato Bearer token
      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
          error: 'Formato de token inválido',
          message: 'El formato debe ser: Bearer <token>',
        });
      }

      const token = parts[1];

      // Verificar token
      const decoded = authService.verifyToken(token);

      // Agregar información del usuario al request
      console.log(`🔓 Token válido. Payload:`, decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(`❌ Token inválido:`, error.message);
      return res.status(401).json({
        error: 'Token inválido',
        message: error.message,
      });
    }
  },
};

module.exports = authMiddleware;
