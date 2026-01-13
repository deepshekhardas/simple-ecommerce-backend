const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({ origin: config.clientUrl })); // CORS

if (config.env === 'development') {
    app.use(morgan('dev')); // Logging
}

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again in 15 minutes'
});
app.use('/api', limiter);

// Stripe webhook handling (bypass JSON parser)
app.use((req, res, next) => {
    if (req.originalUrl === '/api/v1/payment/webhook') {
        next();
    } else {
        express.json({ limit: '10kb' })(req, res, next);
    }
});
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(hpp());

// Routes Mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/coupons', couponRoutes);
app.use('/api/v1/stats', require('./routes/statsRoutes'));
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/reviews', reviewRoutes); // Standalone reviews
// We also want reviews under products: /products/:productId/reviews
// We can mount reviewRoutes with mergeParams on productRoutes too.
// In productRoutes.js: router.use('/:productId/reviews', reviewRouter); (Requires update to productRoutes)
// For now, simpler to just use standalone or update productRoutes later. User requirements "Get single product with reviews" usually implies populate or separate call.

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the E-Commerce API!',
        documentation: '/README.md'
    });
});

app.use('/api/v1/wishlist', require('./routes/wishlistRoutes'));

// 404 Handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
