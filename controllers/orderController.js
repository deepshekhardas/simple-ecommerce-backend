const orderService = require('../services/orderService');
const catchAsync = require('../utils/catchAsync');
const { sendOrderEmail } = require('../services/emailService');

exports.createOrder = catchAsync(async (req, res, next) => {
    const order = await orderService.createOrder(
        req.user.id,
        req.body.shippingAddress,
        req.body.billingAddress
    );

    // Send Email Asynchronously (Don't await to keep response fast)
    try {
        await sendOrderEmail({
            email: req.user.email,
            name: req.user.name,
            order
        });
    } catch (err) {
        console.error('Failed to send order email:', err);
        // Don't fail the order just because email failed
    }

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

exports.downloadInvoice = catchAsync(async (req, res, next) => {
    const order = await orderService.getOrderById(req.params.id, req.user.id);

    // Ownership check
    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user.id) {
        return next(new AppError('Not authorized', 403));
    }

    const { generateInvoice } = require('../services/invoiceService');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${order._id}.pdf`);

    generateInvoice(order, res);
});
