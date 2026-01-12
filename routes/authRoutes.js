const express = require('express');
const authController = require('../controllers/authController');
const { validate, schemas } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', validate(schemas.signup), authController.register);
router.post('/login', validate(schemas.login), authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);

// Forgot & Reset Password
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword);

module.exports = router;
