const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true, // One cart per user
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                variant: {
                    size: String,
                    color: String,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true, // Price at time of adding to cart
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        cartDiscount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// TTL Index: Expires after 30 days of inactivity (updatedAt)
cartSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

module.exports = mongoose.model('Cart', cartSchema);
