const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { MongoMemoryServer } = require('mongodb-memory-server');
const nodemailer = require('nodemailer');

// Mock Nodemailer
jest.mock('nodemailer');
const sendMailMock = jest.fn();
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Enterprise Features Integration', () => {
    let token, productId, userId, orderId;

    beforeEach(async () => {
        sendMailMock.mockClear();

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

        // Setup Product
        const product = await Product.create({
            name: 'Test Product',
            price: 100,
            description: 'Test Desc',
            category: 'Tech',
            stock: 10,
            images: ['img.jpg'],
            sku: 'TEST-SKU',
            user: userId
        });
        productId = product._id;
    });

    afterEach(async () => {
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});
    });

    describe('Email Notifications', () => {
        it('should send email on order creation', async () => {
            // Create Cart
            await Cart.create({
                user: userId,
                items: [{ product: productId, quantity: 1, price: 100 }],
                totalPrice: 100
            });

            const res = await request(app)
                .post('/api/v1/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    shippingAddress: {
                        line1: '123 St',
                        city: 'City',
                        state: 'State',
                        postalCode: '12345',
                        country: 'Country'
                    },
                    billingAddress: {
                        line1: '123 St',
                        city: 'City',
                        state: 'State',
                        postalCode: '12345',
                        country: 'Country'
                    }
                });

            expect(res.statusCode).toBe(201);
            orderId = res.body.data.order._id;

            // Wait briefly for async email
            await new Promise(resolve => setTimeout(resolve, 100));

            expect(nodemailer.createTransport).toHaveBeenCalled();
            expect(sendMailMock).toHaveBeenCalled();
            const mailArgs = sendMailMock.mock.calls[0][0];
            expect(mailArgs.to).toBe('test@example.com');
            expect(mailArgs.subject).toContain('Order Confirmation');
        });
    });

    describe('PDF Invoicing', () => {
        it('should download invoice PDF', async () => {
            // Create order if not exists
            const order = await Order.create({
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
                billingAddress: {
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
                .get(`/api/v1/orders/${order._id}/invoice`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toBe('application/pdf');
            expect(res.headers['content-disposition']).toContain(`invoice-${order._id}.pdf`);
        });
    });
});
