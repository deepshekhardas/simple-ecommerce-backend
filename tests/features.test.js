const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Review = require('../models/Review');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('New Features Integration', () => {
    let token, adminToken, productId, userId;

    beforeEach(async () => {
        // Setup User
        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            phone: '1234567890'
        });
        userId = user._id;
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'test@example.com',
            password: 'password123'
        });
        token = res.body.token;

        // Setup Admin
        await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            phone: '0987654321',
            role: 'admin'
        });
        const adminRes = await request(app).post('/api/v1/auth/login').send({
            email: 'admin@example.com',
            password: 'password123'
        });
        adminToken = adminRes.body.token;

        // Setup Product
        const product = await Product.create({
            name: 'Test Product',
            price: 100,
            description: 'Test Desc',
            category: 'Tech',
            stock: 10,
            images: ['img.jpg'],
            sku: 'TEST-SKU',
            user: userId // Assuming product has user ref if needed, or ignored
        });
        productId = product._id;
    });

    afterEach(async () => {
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});
        await Review.deleteMany({});
    });

    describe('Wishlist', () => {
        it('should add product to wishlist', async () => {
            const res = await request(app)
                .post('/api/v1/wishlist')
                .set('Authorization', `Bearer ${token}`)
                .send({ productId });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.wishlist).toHaveLength(1);
            expect(res.body.data.wishlist[0]).toBe(productId.toString());
        });

        it('should remove product from wishlist', async () => {
            // Add first
            await request(app)
                .post('/api/v1/wishlist')
                .set('Authorization', `Bearer ${token}`)
                .send({ productId });

            const res = await request(app)
                .delete(`/api/v1/wishlist/${productId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data.wishlist).toHaveLength(0);
        });
    });

    describe('Analytics', () => {
        it('should get dashboard stats as admin', async () => {
            // Create dummy order
            await Order.create({
                user: userId,
                items: [{ product: productId, quantity: 1, price: 100 }],
                totalPrice: 100,
                subtotal: 90,
                tax: 5,
                shippingCharges: 5,
                total: 100,
                shippingAddress: {
                    line1: 'Test St',
                    city: 'Test City',
                    state: 'Test State',
                    postalCode: '12345',
                    country: 'Test Country'
                },
                paymentInfo: { id: 'pi_123', status: 'succeeded' },
                paidAt: Date.now()
            });

            const res = await request(app)
                .get('/api/v1/stats/dashboard')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data.totalOrders).toBe(1);
            expect(res.body.data.totalSales).toBe(100);
            expect(res.body.data.totalUsers).toBe(2);
        });

        it('should forbid non-admin from stats', async () => {
            const res = await request(app)
                .get('/api/v1/stats/dashboard')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });
    });

    describe('Reviews', () => {
        it('should allow review only for verified purchase', async () => {
            // No order yet
            const res = await request(app)
                .post(`/api/v1/products/${productId}/reviews`)
                .set('Authorization', `Bearer ${token}`)
                .send({ rating: 5, comment: 'Great!' });

            expect(res.statusCode).toBe(403);
        });

        it('should allow review after purchase (DELIVERED)', async () => {
            // Create delivered order
            await Order.create({
                user: userId,
                items: [{ product: productId, quantity: 1, price: 100 }],
                totalPrice: 100,
                subtotal: 90,
                tax: 5,
                shippingCharges: 5,
                total: 100,
                status: 'DELIVERED', // As per controller logic
                shippingAddress: {
                    line1: 'Test St',
                    city: 'Test City',
                    state: 'Test State',
                    postalCode: '12345',
                    country: 'Test Country'
                },
                paymentInfo: { id: 'pi_123', status: 'succeeded' },
                paidAt: Date.now()
            });

            const res = await request(app)
                .post(`/api/v1/products/${productId}/reviews`)
                .set('Authorization', `Bearer ${token}`)
                .send({ rating: 5, comment: 'Great!' });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.review.comment).toBe('Great!');
        });
    });
});
