const User = require('../models/User');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.addToWishlist = catchAsync(async (req, res, next) => {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    const user = await User.findById(req.user.id);

    // Check if already in wishlist
    if (user.wishlist.includes(productId)) {
        return next(new AppError('Product already in wishlist', 400));
    }

    user.wishlist.push(productId);
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        data: {
            wishlist: user.wishlist
        }
    });
});

exports.removeFromWishlist = catchAsync(async (req, res, next) => {
    const { productId } = req.params;

    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        data: {
            wishlist: user.wishlist
        }
    });
});

exports.getMyWishlist = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('wishlist');

    res.status(200).json({
        status: 'success',
        results: user.wishlist.length,
        data: {
            wishlist: user.wishlist
        }
    });
});
