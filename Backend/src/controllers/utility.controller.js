const { utilityService } = require('../services/data.service');

// Controlador para utilidades y testing
const utilityController = {
  // Información general del API
  getApiInfo: (req, res) => {
    res.json({
      message: '¡Bienvenido al Backend API!',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      documentation: 'Consulta el README.md para más información',
    });
  },

  // Health check
  getHealthStatus: (req, res) => {
    try {
      const healthStatus = utilityService.getHealthStatus();
      res.json(healthStatus);
    } catch (error) {
      res.status(500).json({
        error: 'Error en health check',
        message: error.message,
      });
    }
  },

  // Simular respuesta lenta
  simulateSlowResponse: async (req, res) => {
    try {
      const delay = parseInt(req.query.delay) || 2000;
      const result = await utilityService.simulateDelay(delay);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: 'Error al simular respuesta lenta',
        message: error.message,
      });
    }
  },

  // Simular error
  simulateError: (req, res) => {
    try {
      utilityService.simulateError();
    } catch (error) {
      res.status(500).json({
        error: 'Error simulado del servidor',
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  },
};

module.exports = utilityController;
