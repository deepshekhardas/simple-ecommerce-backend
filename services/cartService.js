const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon'); // Direct access or via service
const AppError = require('../utils/AppError');

const calculateCartTotal = (cart) => {
    let total = 0;
    cart.items.forEach(item => {
        total += item.quantity * item.price;
    });
    cart.totalAmount = total;
    // If discount exists (applied previously), re-calculate? 
    // For simplicity, we might reset discount on modification or re-validate.
    // We'll reset discount on modification to be safe.
    cart.cartDiscount = 0;
    return cart.totalAmount;
};

exports.getCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        // Create empty cart if not exists
        cart = await Cart.create({ user: userId, items: [], totalAmount: 0 });
    }
    return cart;
};

exports.addToCart = async (userId, { productId, quantity, variant }) => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [], totalAmount: 0 });
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError('Product not found', 404);
    }

    // Check stock (simplified)
    if (product.stock < quantity) {
        throw new AppError('Insufficient stock', 400);
    }

    // Check if item already exists in cart matches product + variant
    const existingItemIndex = cart.items.findIndex(item =>
        item.product.toString() === productId &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        cart.items.push({
            product: productId,
            variant,
            quantity,
            price: product.price, // Snapshot price
        });
    }

    calculateCartTotal(cart);
    await cart.save();
    return cart;
};

exports.updateItemQuantity = async (userId, itemId, quantity) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError('Cart not found', 404);

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex > -1) {
        if (quantity > 0) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            cart.items.splice(itemIndex, 1);
        }
        calculateCartTotal(cart);
        await cart.save();
        return cart;
    } else {
        throw new AppError('Item not found in cart', 404);
    }
};

exports.removeItem = async (userId, itemId) => {
    return await exports.updateItemQuantity(userId, itemId, 0);
};

exports.clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items = [];
        cart.totalAmount = 0;
        cart.cartDiscount = 0;
        await cart.save();
    }
    return cart;
};

exports.applyCoupon = async (userId, code) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) throw new AppError('Cart is empty', 400);

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) throw new AppError('Invalid coupon code', 404);

    if (!coupon.isValid()) throw new AppError('Coupon is expired or limit reached', 400);

    if (coupon.minOrderValue > cart.totalAmount) {
        throw new AppError(`Minimum order value for this coupon is ${coupon.minOrderValue}`, 400);
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === 'percentage') {
        discount = (cart.totalAmount * coupon.value) / 100;
    } else if (coupon.discountType === 'fixed') {
        discount = coupon.value;
    } else {
        // Free shipping logic handled in Order usually, but here we might just track it
        discount = 0;
    }

    // Ensure discount doesn't exceed total
    if (discount > cart.totalAmount) discount = cart.totalAmount;

    cart.cartDiscount = discount;
    await cart.save();

    return cart;
};
