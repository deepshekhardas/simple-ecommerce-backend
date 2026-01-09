const Stripe = require('stripe');
const config = require('../config/env');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const AppError = require('../utils/AppError');
const sendEmail = require('./emailService');

const stripe = Stripe(config.stripe.secretKey);

exports.createPaymentIntent = async (orderId, userId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new AppError('Order not found', 404);

    if (order.user.toString() !== userId) throw new AppError('Not authorized', 403);
    if (order.status !== 'PENDING_PAYMENT') throw new AppError('Order cannot be paid for', 400);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.total * 100), // Convert to cents
        currency: 'usd',
        metadata: {
            orderId: order._id.toString(),
            userId: userId.toString()
        }
    });

    return { clientSecret: paymentIntent.client_secret, id: paymentIntent.id };
};

exports.handleWebhook = async (signature, body) => {
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            config.stripe.webhookSecret
        );
    } catch (err) {
        throw new AppError(`Webhook signature verification failed: ${err.message}`, 400);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const { orderId, userId } = paymentIntent.metadata;

        // Update Order
        const order = await Order.findById(orderId);
        if (order) {
            order.status = 'CONFIRMED'; // or 'PROCESSING'
            order.paymentInfo = {
                id: paymentIntent.id,
                status: paymentIntent.status
            };
            await order.save();

            // Log Payment
            await Payment.create({
                order: orderId,
                user: userId,
                paymentIntentId: paymentIntent.id,
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                status: paymentIntent.status,
                paymentMethod: paymentIntent.payment_method_types[0] // simplified
            });

            // Send Email
            await sendEmail({
                email: order.user ? (await require('../models/User').findById(userId)).email : 'customer@example.com', // Populate user if possible or fetch
                subject: 'Order Confirmation',
                message: `Your order ${order._id} has been confirmed! Total: $${order.total}`
            });
        }
    }

    return { received: true };
};
