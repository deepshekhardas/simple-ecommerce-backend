const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Review = require('../models/Review');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

// Helper to get user from context
const getUser = (context) => {
    if (!context.user) {
        throw new Error('Authentication required');
    }
    return context.user;
};

const resolvers = {
    Query: {
        // Products
        products: async (_, { limit = 10, page = 1, category }) => {
            const query = category ? { category } : {};
            return await Product.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort('-createdAt');
        },

        product: async (_, { id }) => {
            return await Product.findById(id);
        },

        // Users
        users: async (_, __, context) => {
            const user = getUser(context);
            if (user.role !== 'admin') throw new Error('Admin access required');
            return await User.find().select('-password');
        },

        user: async (_, { id }, context) => {
            const user = getUser(context);
            if (user.role !== 'admin' && user._id.toString() !== id) {
                throw new Error('Not authorized');
            }
            return await User.findById(id).select('-password');
        },

        me: async (_, __, context) => {
            const user = getUser(context);
            return await User.findById(user._id).select('-password');
        },

        // Cart
        cart: async (_, __, context) => {
            const user = getUser(context);
            let cart = await Cart.findOne({ user: user._id }).populate('items.product');
            if (!cart) {
                cart = await Cart.create({ user: user._id, items: [] });
            }
            return cart;
        },

        // Orders
        orders: async (_, __, context) => {
            const user = getUser(context);
            if (user.role !== 'admin') throw new Error('Admin access required');
            return await Order.find().populate('user items.product').sort('-createdAt');
        },

        order: async (_, { id }, context) => {
            const user = getUser(context);
            const order = await Order.findById(id).populate('user items.product');
            if (!order) throw new Error('Order not found');
            if (user.role !== 'admin' && order.user._id.toString() !== user._id.toString()) {
                throw new Error('Not authorized');
            }
            return order;
        },

        myOrders: async (_, __, context) => {
            const user = getUser(context);
            return await Order.find({ user: user._id }).populate('items.product').sort('-createdAt');
        },

        // Reviews
        reviews: async (_, { productId }) => {
            return await Review.find({ product: productId }).populate('user');
        },

        // Stats
        stats: async (_, __, context) => {
            const user = getUser(context);
            if (user.role !== 'admin') throw new Error('Admin access required');

            const totalRevenue = await Order.aggregate([
                { $match: { status: 'delivered' } },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ]);

            return {
                totalRevenue: totalRevenue[0]?.total || 0,
                totalOrders: await Order.countDocuments(),
                totalUsers: await User.countDocuments(),
                totalProducts: await Product.countDocuments()
            };
        }
    },

    Mutation: {
        // Auth
        register: async (_, { name, email, password, phone }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error('Email already exists');

            const user = await User.create({ name, email, password, phone });
            const token = jwt.sign({ id: user._id }, config.jwt.secret, {
                expiresIn: config.jwt.expiresIn
            });

            return { token, user };
        },

        login: async (_, { email, password }) => {
            const user = await User.findOne({ email }).select('+password');
            if (!user || !(await user.comparePassword(password))) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign({ id: user._id }, config.jwt.secret, {
                expiresIn: config.jwt.expiresIn
            });

            return { token, user };
        },

        // Cart
        addToCart: async (_, { productId, quantity, variantIndex }, context) => {
            const user = getUser(context);
            const product = await Product.findById(productId);
            if (!product) throw new Error('Product not found');

            let cart = await Cart.findOne({ user: user._id });
            if (!cart) {
                cart = await Cart.create({ user: user._id, items: [] });
            }

            const existingItemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (existingItemIndex > -1) {
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                cart.items.push({
                    product: productId,
                    quantity,
                    price: product.price,
                    variant: variantIndex !== undefined ? product.variants[variantIndex] : null
                });
            }

            await cart.save();
            return await Cart.findById(cart._id).populate('items.product');
        },

        removeFromCart: async (_, { productId }, context) => {
            const user = getUser(context);
            const cart = await Cart.findOne({ user: user._id });
            if (!cart) throw new Error('Cart not found');

            cart.items = cart.items.filter(item => item.product.toString() !== productId);
            await cart.save();
            return await Cart.findById(cart._id).populate('items.product');
        },

        clearCart: async (_, __, context) => {
            const user = getUser(context);
            const cart = await Cart.findOne({ user: user._id });
            if (cart) {
                cart.items = [];
                await cart.save();
            }
            return cart;
        },

        // Orders
        createOrder: async (_, { shippingAddress, billingAddress }, context) => {
            const user = getUser(context);
            const cart = await Cart.findOne({ user: user._id }).populate('items.product');
            if (!cart || cart.items.length === 0) {
                throw new Error('Cart is empty');
            }

            const totalAmount = cart.items.reduce(
                (sum, item) => sum + item.price * item.quantity, 0
            );

            const order = await Order.create({
                user: user._id,
                items: cart.items,
                totalAmount,
                shippingAddress,
                billingAddress: billingAddress || shippingAddress,
                status: 'pending'
            });

            // Clear cart after order
            cart.items = [];
            await cart.save();

            return await Order.findById(order._id).populate('user items.product');
        },

        updateOrderStatus: async (_, { id, status }, context) => {
            const user = getUser(context);
            if (user.role !== 'admin') throw new Error('Admin access required');

            const order = await Order.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            ).populate('user items.product');

            return order;
        },

        // Reviews
        createReview: async (_, { productId, rating, comment }, context) => {
            const user = getUser(context);

            const review = await Review.create({
                user: user._id,
                product: productId,
                rating,
                comment
            });

            return await Review.findById(review._id).populate('user');
        },

        // Products (Admin)
        createProduct: async (_, args, context) => {
            const user = getUser(context);
            if (user.role !== 'admin') throw new Error('Admin access required');
            return await Product.create(args);
        },

        updateProduct: async (_, { id, ...updates }, context) => {
            const user = getUser(context);
            if (user.role !== 'admin') throw new Error('Admin access required');
            return await Product.findByIdAndUpdate(id, updates, { new: true });
        },

        deleteProduct: async (_, { id }, context) => {
            const user = getUser(context);
            if (user.role !== 'admin') throw new Error('Admin access required');
            await Product.findByIdAndDelete(id);
            return true;
        }
    }
};

module.exports = resolvers;
