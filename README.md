# Full Stack E-Commerce Platform

A production-ready e-commerce solution featuring a robust Node.js/Express backend and a modern Next.js 14 frontend.

<img src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1000" alt="E-Commerce Dashboard" width="100%" />

## 🚀 Features

### Backend (Node.js + MongoDB)
- **Authentication**: Secure JWT (Access + Refresh Tokens) with Role-Based Access Control (RBAC).
- **Order Management**: Complete order lifecycle (Pending -> Paid -> Delivered).
- **Payments**: Integrated Stripe PaymentIntents & Webhooks.
- **Performance**: MongoDB Indexing, Pagination, and Searching.

### Frontend (Next.js 14 + Tailwind CSS)
- **Modern UI**: Glassmorphism design, Framer Motion animations.
- **Admin Dashboard**: Dedicated portal for product and order management.
- **Cart System**: Persistent cart state management.
- **Responsive**: Fully optimized for mobile and desktop.

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Stripe Account (for payments)

### 1. Backend Setup
The backend is located in the root directory.

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Configure Environment**:
   Create `.env` using `.env.example` as a template:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_key
   CLIENT_URL=http://localhost:3001
   STRIPE_SECRET_KEY=sk_test_...
   ```
3. **Seed Database** (Optional but Recommended):
   Creates default Admin and Products.
   ```bash
   npm run data:import
   ```
   **Default Credentials:**
   - **Admin**: `admin@example.com` / `password123`
   - **User**: `user@example.com` / `password123`

4. **Run Server**:
   ```bash
   npm run dev
   # Server runs on http://localhost:3000
   ```

### 2. Frontend Setup
The frontend is located in the `frontend/` directory.

1. **Navigate & Install**:
   ```bash
   cd frontend
   npm install
   ```
2. **Configure Environment**:
   Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
3. **Run Client**:
   ```bash
   npm run dev
   # Client runs on http://localhost:3001
   ```

### 3. Accessing the Admin Dashboard
1. Log in with the Admin credentials (`admin@example.com`).
2. Navigate to `/admin` (e.g., `http://localhost:3001/admin`).
3. You will have full access to:
   - **Manage Products**: Add, Edit, Delete.
   - **Manage Orders**: View customer orders and update shipping status.

---

## 📦 Deployment

### Backend (Render.com)
A `render.yaml` file is included for automatic Blueprint deployment.
1. Connect repo to Render.
2. Add Environment Variables (MONGO_URI, JWT_SECRET, etc.).
3. Deploy.

### Frontend (Vercel)
A `vercel.json` is configured.
1. Push `frontend` directory to Vercel.
2. Set `NEXT_PUBLIC_API_URL` to your live Backend URL.
3. Deploy.
