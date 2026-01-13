const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Product = require('../models/Product');

const db = require('./test_db');

beforeAll(async () => {
    await db.connect();
});

afterEach(async () => {
    await db.clear();
});

afterAll(async () => {
    await db.close();
});

describe('Product API', () => {
    let adminToken;
    let userToken;

    beforeEach(async () => {
        // Create Admin
        await request(app).post('/api/v1/auth/signup').send({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            phone: '1234567890'
        });

        // Manually update role to admin since signup defaults to user
        await User.findOneAndUpdate({ email: 'admin@example.com' }, { role: 'admin' });

        const adminLogin = await request(app).post('/api/v1/auth/login').send({
            email: 'admin@example.com',
            password: 'password123'
        });
        adminToken = adminLogin.body.token;

        // Create Regular User
        const userSignup = await request(app).post('/api/v1/auth/signup').send({
            name: 'Regular User',
            email: 'user@example.com',
            password: 'password123',
            phone: '0987654321'
        });
        userToken = userSignup.body.token;
    });

    describe('POST /api/v1/products', () => {
        const newProduct = {
            name: 'Test Product',
            description: 'A great product',
            price: 99.99,
            sku: 'TEST-SKU-001',
            category: 'Electronics',
            images: ['http://example.com/image.jpg'],
            stock: 10,
            variants: [{ size: 'M', color: 'Black', stock: 5 }]
        };

        it('should create a product if admin', async () => {
            const res = await request(app)
                .post('/api/v1/products')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newProduct);

            expect(res.statusCode).toEqual(201);
            expect(res.body.data.product).toHaveProperty('name', 'Test Product');
        });

        it('should not create a product if not admin', async () => {
            const res = await request(app)
                .post('/api/v1/products')
                .set('Authorization', `Bearer ${userToken}`)
                .send(newProduct);

            expect(res.statusCode).toEqual(403);
        });
    });

    describe('GET /api/v1/products', () => {
        beforeEach(async () => {
            await Product.create([
                {
                    name: 'Product 1',
                    description: 'Desc 1',
                    price: 10,
                    sku: 'P1',
                    category: 'Cat1',
                    images: ['img1'],
                    stock: 5
                },
                {
                    name: 'Product 2',
                    description: 'Desc 2',
                    price: 20,
                    sku: 'P2',
                    category: 'Cat2',
                    images: ['img2'],
                    stock: 5
                }
            ]);
        });

        it('should get all products', async () => {
            const res = await request(app).get('/api/v1/products');
            expect(res.statusCode).toEqual(200);
            expect(res.body.results).toEqual(2);
        });
    });

    describe('GET /api/v1/products/:id', () => {
        it('should get a single product', async () => {
            const product = await Product.create({
                name: 'Single Product',
                description: 'Desc',
                price: 50,
                sku: 'SP1',
                category: 'Cat',
                images: ['img'],
                stock: 1
            });

            const res = await request(app).get(`/api/v1/products/${product._id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.product).toHaveProperty('_id', product._id.toString());
        });
    });
});
