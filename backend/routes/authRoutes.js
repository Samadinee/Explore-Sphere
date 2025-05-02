// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

router.post('/favorites/toggle', authMiddleware, authController.toggleFavorite);
router.get('/favorites', authMiddleware, authController.getFavorites);

module.exports = router;
