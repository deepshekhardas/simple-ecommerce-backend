# Simple E-Commerce Backend

A production-ready e-commerce backend built with Node.js, Express, MongoDB, and Stripe.

## Features
- **Authentication**: JWT-based (Access + Refresh Tokens).
- **Product Management**: CRUD, Search, Filter, Pagination, Soft Deletes.
- **Cart**: Persistent cart with stock validation and coupon application.
- **Orders**: Full order lifecycle (Pending -> Confirmed -> Delivered).
- **Payments**: Stripe PaymentIntents & Webhooks.
- **Reviews**: Verified purchase reviews.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory (copy `.env.example`).
```bash
cp .env.example .env
```
Update the values:
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`, `JWT_REFRESH_SECRET`: Secure random strings.
- `STRIPE_SECRET_KEY`: Your Stripe Test Secret Key.
- `STRIPE_WEBHOOK_SECRET`: Your Stripe Webhook Secret (from CLI or Dashboard).

### 3. Run the Server
Dev mode:
```bash
npm run dev
```
Production:
```bash
npm start
```

## Testing Guide

### 1. Authentication
- **Signup**: `POST /api/v1/auth/signup` with `{ name, email, password, phone }`.
- **Login**: `POST /api/v1/auth/login` with `{ email, password }`. Save the `token`.

### 2. Product Flow
- **Create (Admin)**: `POST /api/v1/products` (Requires Admin Token).
- **List**: `GET /api/v1/products?sort=price&limit=10`.
- **Search**: `GET /api/v1/products?search=phone`.

### 3. Cart & Order Flow
1. **Add to Cart**: `POST /api/v1/cart/add` with `{ productId, quantity }`.
2. **View Cart**: `GET /api/v1/cart`.
3. **Place Order**: `POST /api/v1/orders` with `{ shippingAddress: {...} }`. Response includes `orderId`.

### 4. Payment Flow (Stripe Testing)
1. **Create Intent**: `POST /api/v1/payment/create-intent` with `{ orderId }`. Returns `clientSecret`.
2. **Simulate Payment**: Use the `clientSecret` in a frontend or mock the webhook.
3. **Test Webhook**:
   - Install Stripe CLI.
   - Run `stripe listen --forward-to localhost:3000/api/v1/payment/webhook`.
   - Trigger event: `stripe trigger payment_intent.succeeded`.

## Architecture Decisions

- **Service Layer**: Business logic is separated from Controllers to maintain clean code and reusability.
- **Mongoose**: Used for strict schema validation to ensure data integrity.
- **Payment Intents**: We use the Intent API (Client Secret) to support SCA.
- **Cart Expiry**: MongoDB TTL index on `Cart` model cleans up old carts after 30 days.

