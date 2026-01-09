const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const colors = require('colors'); 
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './.env' });

// Load models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');
const Cart = require('./models/Cart');
const Coupon = require('./models/Coupon');

// Connect to DB
connectDB();

// Sample Data
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        phone: '1234567890',
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password123',
        phone: '0987654321',
        role: 'user'
    }
];

const products = [
    {
        name: 'Wireless Bluetooth Headphones',
        description: 'High quality wireless headphones with noise cancellation.',
        price: 99.99,
        sku: 'HEAD-001',
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'],
        stock: 50,
        variants: [
            { size: 'Standard', color: 'Black', stock: 25 },
            { size: 'Standard', color: 'White', stock: 25 }
        ]
    },
    {
        name: 'Minimalist Wrist Watch',
        description: 'Elegant watch for men and women.',
        price: 149.99,
        sku: 'WATCH-002',
        category: 'Fashion',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'],
        stock: 30
    },
    {
        name: 'Smart Running Shoes',
        description: 'Comfortable running shoes with smart tracking support.',
        price: 79.99,
        sku: 'SHOE-003',
        category: 'Sports',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'],
        stock: 100,
        variants: [
            { size: '42', color: 'Red', stock: 50 },
            { size: '44', color: 'Blue', stock: 50 }
        ]
    },
    {
        name: 'Gaming Laptop',
        description: 'High performance laptop for gaming and work.',
        price: 1299.99,
        sku: 'LAP-004',
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80'],
        stock: 10
    }
];

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await Review.deleteMany();
        await Cart.deleteMany();
        await Coupon.deleteMany();

        console.log('Data Destroyed...');

        const createdUsers = await User.create(users);
        console.log('Users Imported...');

        await Product.create(products);
        console.log('Products Imported...');

        console.log('Data Imported successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await Review.deleteMany();
        await Cart.deleteMany();
        await Coupon.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
