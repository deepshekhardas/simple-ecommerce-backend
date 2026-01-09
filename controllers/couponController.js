const couponService = require('../services/couponService');
const catchAsync = require('../utils/catchAsync');

exports.createCoupon = catchAsync(async (req, res, next) => {
    const coupon = await couponService.createCoupon(req.body);
    res.status(201).json({
        status: 'success',
        data: { coupon },
    });
});

exports.getAllCoupons = catchAsync(async (req, res, next) => {
    const coupons = await couponService.getCoupons();
    res.status(200).json({
        status: 'success',
        results: coupons.length,
        data: { coupons },
    });
});

exports.deleteCoupon = catchAsync(async (req, res, next) => {
    await couponService.deleteCoupon(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
