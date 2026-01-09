const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const config = require('../config/env');

// Helper to sign JWT
const signToken = (id, secret, expiresIn) => {
    return jwt.sign({ id }, secret, {
        expiresIn,
    });
};

const createTokens = (user) => {
    const accessToken = signToken(user._id, config.jwt.secret, config.jwt.expiresIn);
    const refreshToken = signToken(user._id, config.jwt.refreshSecret, config.jwt.refreshExpiresIn);
    return { accessToken, refreshToken };
};

exports.register = async (userData) => {
    // Check if user exists
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
        throw new AppError('User already exists', 400);
    }

    // Create user
    const user = await User.create(userData);

    // Create tokens
    const tokens = createTokens(user);

    return { user, ...tokens };
};

exports.login = async (email, password) => {
    // Check for user and password
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
        throw new AppError('Incorrect email or password', 401);
    }

    const tokens = createTokens(user);
    return { user, ...tokens };
};

exports.refreshToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new AppError('No refresh token provided', 400);
    }

    // Verify refresh token
    let decoded;
    try {
        decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);
    } catch (err) {
        throw new AppError('Invalid refresh token', 401);
    }

    // Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Issue new access token
    const accessToken = signToken(user._id, config.jwt.secret, config.jwt.expiresIn);

    return { accessToken };
};
