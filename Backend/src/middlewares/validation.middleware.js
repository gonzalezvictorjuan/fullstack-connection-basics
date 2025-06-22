const { body, param, validationResult } = require('express-validator');

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Error de validación',
      details: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};

// Validaciones para autenticación
const authValidation = {
  // Validaciones para registro
  register: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('El nombre debe tener entre 2 y 50 caracteres')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      .withMessage('El nombre solo puede contener letras y espacios'),

    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Debe proporcionar un email válido'),

    body('password')
      .isLength({ min: 4, max: 100 })
      .withMessage('La contraseña debe tener entre 4 y 100 caracteres')
      .matches(/^(?=.*[a-zA-Z])/)
      .withMessage('La contraseña debe contener al menos una letra'),

    handleValidationErrors,
  ],

  // Validaciones para login
  login: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Debe proporcionar un email válido'),

    body('password').notEmpty().withMessage('La contraseña es requerida'),

    handleValidationErrors,
  ],
};

// Validaciones para usuarios
const userValidation = {
  // Validaciones para crear/actualizar usuario
  createUpdate: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('El nombre debe tener entre 2 y 50 caracteres')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      .withMessage('El nombre solo puede contener letras y espacios'),

    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Debe proporcionar un email válido'),

    handleValidationErrors,
  ],

  // Validaciones para ID de usuario
  validateId: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    handleValidationErrors,
  ],
};

// Validaciones para posts
const postValidation = {
  // Validaciones para crear/actualizar post
  createUpdate: [
    body('title')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('El título debe tener entre 3 y 200 caracteres'),

    body('content')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('El contenido debe tener entre 10 y 2000 caracteres'),

    body('userId')
      .isInt({ min: 1 })
      .withMessage('El userId debe ser un número entero positivo'),

    handleValidationErrors,
  ],

  // Validaciones para ID de post
  validateId: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    handleValidationErrors,
  ],

  // Validaciones para userId en posts
  validateUserId: [
    param('userId')
      .isInt({ min: 1 })
      .withMessage('El userId debe ser un número entero positivo'),

    handleValidationErrors,
  ],
};

// Validaciones para utilidades
const utilityValidation = {
  // Validaciones para delay
  validateDelay: [
    body('delay')
      .optional()
      .isInt({ min: 100, max: 10000 })
      .withMessage('El delay debe ser un número entre 100 y 10000 ms'),

    handleValidationErrors,
  ],
};

module.exports = {
  authValidation,
  userValidation,
  postValidation,
  utilityValidation,
  handleValidationErrors,
};
