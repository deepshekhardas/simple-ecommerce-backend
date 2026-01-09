const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

beforeAll(async () => {
    const testDbUri = 'mongodb://localhost:27017/ecommerce_test_db';
    await mongoose.connect(testDbUri);
});

afterEach(async () => {
    await Order.deleteMany({});
    await Cart.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Order API', () => {
    let token;
    let productId;

    beforeEach(async () => {
        // Create User
        const userSignup = await request(app).post('/api/v1/auth/signup').send({
            name: 'Order User',
            email: 'order@example.com',
            password: 'password123',
            phone: '1112223333'
        });
        token = userSignup.body.token;

        // Create Product
        const product = await Product.create({
            name: 'Order Product',
            description: 'Desc',
            price: 100,
            sku: 'ORD-001',
            category: 'Test',
            images: ['img'],
            stock: 10
        });
        productId = product._id;

        // Add to Cart
        await request(app)
            .post('/api/v1/cart/add')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: productId,
                quantity: 1
            });
    });

    describe('POST /api/v1/orders', () => {
        it('should create an order from cart', async () => {
            const res = await request(app)
                .post('/api/v1/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    shippingAddress: {
                        line1: '123 Main St',
                        city: 'New York',
                        state: 'NY',
                        postalCode: '10001',
                        country: 'USA'
                    },
                    billingAddress: {
                        line1: '123 Main St',
                        city: 'New York',
                        state: 'NY',
                        postalCode: '10001',
                        country: 'USA'
                    }
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body.data.order).toHaveProperty('subtotal', 100);
            expect(res.body.data.order).toHaveProperty('total', 168); // 100 + 18 tax + 50 shipping
            expect(res.body.data.order.items).toHaveLength(1);
        });
    });

    describe('GET /api/v1/orders/my-orders', () => {
        it('should get user orders', async () => {
            // Create Order first
            await request(app)
                .post('/api/v1/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    shippingAddress: {
                        line1: '123 Main St',
                        city: 'New York',
                        state: 'NY',
                        postalCode: '10001',
                        country: 'USA'
                    },
                    billingAddress: {
                        line1: '123 Main St',
                        city: 'New York',
                        state: 'NY',
                        postalCode: '10001',
                        country: 'USA'
                    }
                });

            const res = await request(app)
                .get('/api/v1/orders/my-orders')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.results).toEqual(1);
        });
    });
});
