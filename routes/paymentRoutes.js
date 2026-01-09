const express = require('express');
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create-intent', protect, paymentController.createPaymentIntent);
// Webhook route - needs special parsing handling in app.js or here
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.webhook);

module.exports = router;
