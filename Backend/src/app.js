require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const utilityRoutes = require('./routes/utility.routes');

// Importar middlewares
const notFound = require('./middlewares/notFound.middleware');
const loggerMiddleware = require('./middlewares/logger.middleware');

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(loggerMiddleware);

// Rutas principales
app.use('/api', utilityRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// ⛔ Middleware para rutas no encontradas
app.use(notFound);

module.exports = app;
