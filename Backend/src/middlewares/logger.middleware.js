const loggerMiddleware = (req, res, next) => {
  console.log(
    `🕒 ${new Date().toISOString()} - 📡 ${req.method} ${req.originalUrl}`
  );

  // Si hay query strings
  const body = req.body;
  if (body && Object.keys(body).length) {
    console.log(`📦 body:`, body);
  }

  next();
};

module.exports = loggerMiddleware;
