const Coupon = require('../models/Coupon');
const AppError = require('../utils/AppError');

exports.createCoupon = async (couponData) => {
    return await Coupon.create(couponData);
};

exports.getCoupons = async () => {
    return await Coupon.find();
};

exports.deleteCoupon = async (id) => {
    return await Coupon.findByIdAndDelete(id);
};

// Validation logic (reused in Cart, but exposed here too)
exports.validateCoupon = async (code, orderAmount) => {
    // Already implemented basic check inside Cart Service. 
    // This service method can be used for explicit check endpoint if needed.
    // For now, simple return of the coupon object if valid.
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) throw new AppError('Invalid coupon code', 404);
    if (!coupon.isValid()) throw new AppError('Coupon expired', 400);
    if (orderAmount && coupon.minOrderValue > orderAmount) {
        throw new AppError(`Order amount too low for this coupon`, 400);
    }
    return coupon;
};
