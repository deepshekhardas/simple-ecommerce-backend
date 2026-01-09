const orderService = require('../services/orderService');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
    const order = await orderService.createOrder(
        req.user.id,
        req.body.shippingAddress,
        req.body.billingAddress
    );
    res.status(201).json({
        status: 'success',
        data: { order },
    });
});

exports.getOrder = catchAsync(async (req, res, next) => {
    const order = await orderService.getOrderById(req.params.id, req.user.id);
    // Basic ownership check
    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user.id) {
        return next(new AppError('Not authorized', 403));
    }
    res.status(200).json({
        status: 'success',
        data: { order },
    });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
    const orders = await orderService.getUserOrders(req.user.id);
    res.status(200).json({
        status: 'success',
        results: orders.length,
        data: { orders },
    });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
    // Admin only
    const orders = await require('../models/Order').find().sort('-createdAt'); // Simple usage here
    res.status(200).json({
        status: 'success',
        data: { orders }
    });
});

exports.updateStatus = catchAsync(async (req, res, next) => {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.status(200).json({
        status: 'success',
        data: { order }
    });
});
