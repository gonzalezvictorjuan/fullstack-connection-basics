const express = require('express');
const utilityController = require('../controllers/utility.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Rutas de utilidad y testing
router.get('/', utilityController.getApiInfo);
router.get('/health', utilityController.getHealthStatus);
router.get('/slow', utilityController.simulateSlowResponse);
router.get('/error', utilityController.simulateError);
router.post('/reset', verifyToken, utilityController.resetMockData);

module.exports = router;
