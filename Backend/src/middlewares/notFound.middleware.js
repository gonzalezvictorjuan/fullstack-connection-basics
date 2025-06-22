// Middleware para manejar rutas no encontradas
const notFound = (req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    status: 404,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
};

module.exports = notFound;
