const request = require('supertest');
const mongoose = require('mongoose');

// Mock email service
jest.mock('../services/emailService', () => jest.fn().mockResolvedValue(true));

const app = require('../app');
const User = require('../models/User');

// Connect to a separate test database
const db = require('./test_db');

// Connect to a separate test database
beforeAll(async () => {
    await db.connect();
});

// Clean up database after each test
afterEach(async () => {
    await db.clear();
});

// Close connection after all tests
afterAll(async () => {
    await db.close();
});

describe('Auth API', () => {
    describe('POST /api/v1/auth/signup', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/v1/auth/signup')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                    phone: '1234567890'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.data.user).toHaveProperty('email', 'test@example.com');
        });

        it('should not register user with existing email', async () => {
            // Create user first
            await User.create({
                name: 'Existing User',
                email: 'test@example.com',
                password: 'password123',
                phone: '0987654321'
            });

            // Try to register same email
            const res = await request(app)
                .post('/api/v1/auth/signup')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                    phone: '1234567890'
                });

            expect(res.statusCode).toEqual(400);
        });
    });

    describe('POST /api/v1/auth/login', () => {
        beforeEach(async () => {
            // Note: We register via API to ensure password hashing works correctly in setup
            // Or use User.create but need to Ensure hashing?
            // User model has pre-save hook, so User.create triggers it.
            await User.create({
                name: 'Login User',
                email: 'login@example.com',
                password: 'password123',
                phone: '5555555555'
            });
        });

        it('should login with correct credentials', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should not login with incorrect password', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toEqual(401);
        });
    });

    describe('POST /api/v1/auth/forgot-password', () => {
        beforeEach(async () => {
            await User.create({
                name: 'Forgot User',
                email: 'forgot@example.com',
                password: 'password123',
                phone: '1111111111'
            });
        });

        it('should generate reset token for valid email', async () => {
            const res = await request(app)
                .post('/api/v1/auth/forgot-password')
                .send({ email: 'forgot@example.com' });

            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual('success');
            expect(res.body.message).toEqual('Token sent to email!');
        });

        it('should return error for non-existent email', async () => {
            const res = await request(app)
                .post('/api/v1/auth/forgot-password')
                .send({ email: 'nonexistent@example.com' });

            expect(res.statusCode).toEqual(404);
        });
    });

    describe('PUT /api/v1/auth/reset-password/:token', () => {
        it('should return error for invalid token', async () => {
            const res = await request(app)
                .put('/api/v1/auth/reset-password/invalidtoken123')
                .send({ password: 'newpassword123' });

            expect(res.statusCode).toEqual(400);
        });
    });
});
