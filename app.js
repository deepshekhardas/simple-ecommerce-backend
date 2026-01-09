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

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({ origin: config.clientUrl })); // CORS
if (config.env === 'development') {
    app.use(morgan('dev')); // Logging
}

// Stripe webhook requires raw body, handled in paymentRoutes or here.
// Since we used express.raw in the specific route in paymentRoutes, 
// we must ensure standard express.json() doesn't consume it globally first IF the path matches.
// However, mounting routes works sequentially.
// If we mount paymentRoutes BEFORE express.json(), the specific webhook route (if it uses express.raw) will work.
// But paymentRoutes also has JSON endpoints. 
// Best practice: Mount webhook specifically/separately or use a conditional parser.
// We will mount paymentRoutes specific webhook route separately or ensure order.
// In our paymentRoutes.js, we defined `router.post('/webhook', express.raw...)`.
// Express routers are isolated. So if we mount `app.use('/api/v1/payment', paymentRoutes)`,
// and `paymentRoutes` has the webhook, `app.use(express.json())` at top level will parse it first if it matches.
// To fix: Put webhook route setup BEFORE global json parser OR use a parser that ignores that path.
// The easiest for this setup is to use a middleware that checks path.

app.use((req, res, next) => {
    if (req.originalUrl === '/api/v1/payment/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.use(express.urlencoded({ extended: true }));

// Routes Mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/coupons', couponRoutes);
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

// 404 Handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
