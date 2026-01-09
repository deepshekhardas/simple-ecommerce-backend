const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: String,
                price: Number,
                quantity: Number,
                variant: {
                    size: String,
                    color: String,
                },
            },
        ],
        shippingAddress: {
            line1: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        billingAddress: {
            line1: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
        },
        subtotal: {
            type: Number,
            required: true,
        },
        tax: {
            type: Number,
            required: true, // 18% GST
        },
        shippingCharges: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: [
                'PENDING_PAYMENT',
                'CONFIRMED',
                'PROCESSING',
                'SHIPPED',
                'DELIVERED',
                'CANCELLED',
                'RETURNED',
                'REFUNDED',
            ],
            default: 'PENDING_PAYMENT',
        },
        paymentInfo: {
            id: String, // Stripe Payment Intent ID
            status: String,
        },
        trackingId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', orderSchema);
