const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        paymentIntentId: {
            type: String,
            required: true,
            unique: true,
        },
        amount: {
            type: Number,
            required: true, // In cents (stripe)
        },
        currency: {
            type: String,
            default: 'usd',
        },
        status: {
            type: String,
            required: true,
            // succeeded, pending, failed, refunded
        },
        paymentMethod: {
            type: String,
            default: 'card',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Payment', paymentSchema);
