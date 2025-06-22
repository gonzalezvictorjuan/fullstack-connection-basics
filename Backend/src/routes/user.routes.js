const express = require('express');
const userController = require('../controllers/user.controller');
const { userValidation } = require('../middlewares/validation.middleware');

const router = express.Router();

// Rutas para usuarios
router.get('/', userController.getAllUsers);
router.get('/:id', userValidation.validateId, userController.getUserById);
router.post('/', userValidation.createUpdate, userController.createUser);
router.put(
  '/:id',
  userValidation.validateId,
  userValidation.createUpdate,
  userController.updateUser
);
router.delete('/:id', userValidation.validateId, userController.deleteUser);

module.exports = router;
