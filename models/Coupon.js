const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, 'Please add a coupon code'],
            unique: true,
            uppercase: true,
        },
        discountType: {
            type: String,
            enum: ['percentage', 'fixed', 'free_shipping'],
            required: true,
        },
        value: {
            type: Number,
            required: true, // Amount or Percentage
        },
        minOrderValue: {
            type: Number,
            default: 0,
        },
        maxUses: {
            type: Number,
            default: 999999, // Total global uses
        },
        usesPerUser: {
            type: Number,
            default: 1,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        usedCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Check validity method
couponSchema.methods.isValid = function () {
    return this.isActive && this.expiryDate > Date.now() && this.usedCount < this.maxUses;
};

module.exports = mongoose.model('Coupon', couponSchema);
