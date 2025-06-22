const express = require('express');

const { verifyToken } = require('../middlewares/auth.middleware');
const { authValidation } = require('../middlewares/validation.middleware');

const authController = require('../controllers/auth.controller');

const router = express.Router();

// Rutas públicas de autenticación
router.post('/register', authValidation.register, authController.register);
router.post('/login', authValidation.login, authController.login);

// Rutas protegidas (requieren autenticación)
router.get('/profile', verifyToken, authController.getProfile);
router.get('/users', verifyToken, authController.getAllUsers);

module.exports = router;
