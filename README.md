# Enterprise E-Commerce Platform

A production-ready, full-stack e-commerce solution built with Node.js, Express, MongoDB, and Next.js. This project includes enterprise-grade features like verified reviews, business analytics, PDF invoicing, and automated email notifications.

## 🚀 Key Features

*   **Core E-Commerce**: Product browsing, cart management, checkout with Stripe.
*   **Authentication**: Secure JWT-based auth with role-based access control (Admin/User).
*   **Verified Reviews**: Users can only review products they have purchased and received.
*   **Wishlist System**: Save favorite products for later.
*   **Admin Analytics Dashboard**: Real-time charts for revenue, daily orders, and user metrics using Recharts.
*   **Automated Emails**: Order confirmation emails sent via Nodemailer.
*   **PDF Invoicing**: Automatic professional PDF invoice generation for every order.
*   **Security**: Rate limiting, XSS protection, HPP prevention, and sanitized inputs.

## 🛠 Tech Stack

*   **Backend**: Node.js, Express, MongoDB (Mongoose)
*   **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
*   **Payment**: Stripe API
*   **Testing**: Jest, Supertest
*   **DevOps**: Docker ready (optional)

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/deepshekhardas/simple-ecommerce-backend.git
    cd simple-ecommerce-backend
    ```

2.  **Install Dependencies**
    *   **Backend**:
        ```bash
        npm install
        ```
    *   **Frontend**:
        ```bash
        cd frontend
        npm install
        ```

3.  **Environment Setup**
    *   Create a `.env` file in the root directory (see `.env.example`).
    *   Create a `.env.local` file in `frontend/` directory:
        ```env
        NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
        ```

4.  **Run Locally**
    *   **Backend**: `npm run dev` (Runs on port 3000)
    *   **Frontend**: `cd frontend && npm run dev` (Runs on port 3001)

## 🧪 Testing

Run the comprehensive test suite including unit and integration tests:

```bash
npm test
```

## 📂 Project Structure

```
├── controllers/      # Route controllers (Auth, Order, Product, Stats)
├── models/          # Mongoose models (User, Product, Order, Review)
├── routes/          # API routes
├── services/        # Business logic (Email, Invoice, Auth)
├── frontend/        # Next.js Application
│   ├── src/components  # Reusable UI components
│   ├── src/app         # App Router pages
└── tests/           # Integration tests
```

## 📜 License

MIT License.
