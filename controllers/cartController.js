const cartService = require('../services/cartService');
const catchAsync = require('../utils/catchAsync');

exports.getCart = catchAsync(async (req, res, next) => {
    const cart = await cartService.getCart(req.user.id);
    res.status(200).json({
        status: 'success',
        data: { cart },
    });
});

exports.addItem = catchAsync(async (req, res, next) => {
    const cart = await cartService.addToCart(req.user.id, req.body);
    res.status(200).json({
        status: 'success',
        data: { cart },
    });
});

exports.updateItem = catchAsync(async (req, res, next) => {
    const cart = await cartService.updateItemQuantity(req.user.id, req.params.itemId, req.body.quantity);
    res.status(200).json({
        status: 'success',
        data: { cart },
    });
});

exports.removeItem = catchAsync(async (req, res, next) => {
    const cart = await cartService.removeItem(req.user.id, req.params.itemId);
    res.status(200).json({
        status: 'success',
        data: { cart },
    });
});

exports.clearCart = catchAsync(async (req, res, next) => {
    const cart = await cartService.clearCart(req.user.id);
    res.status(200).json({
        status: 'success',
        data: { cart },
    });
});

exports.applyCoupon = catchAsync(async (req, res, next) => {
    const cart = await cartService.applyCoupon(req.user.id, req.body.code);
    res.status(200).json({
        status: 'success',
        data: { cart }
    });
});
