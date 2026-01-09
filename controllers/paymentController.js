const paymentService = require('../services/paymentService');
const catchAsync = require('../utils/catchAsync');

exports.createPaymentIntent = catchAsync(async (req, res, next) => {
    const { clientSecret } = await paymentService.createPaymentIntent(req.body.orderId, req.user.id);
    res.status(200).json({
        status: 'success',
        clientSecret,
    });
});

exports.webhook = catchAsync(async (req, res, next) => {
    // Stripe requires raw body for verification. 
    // Ensure express.raw or similar middleware is used for this route in app.js
    const signature = req.headers['stripe-signature'];
    await paymentService.handleWebhook(signature, req.body); // req.body should be buffer
    res.status(200).json({ received: true });
});
