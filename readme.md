# 🛒 Instacart — Full Stack Grocery Delivery Platform

A full-stack grocery delivery application built with the **PERN stack** (PostgreSQL, Express, React, Node.js), featuring a customer storefront, an admin panel, and a delivery partner dashboard with real-time order tracking.

🔗 **Live Demo:** [instacart-client.vercel.app](https://instacart-client.vercel.app/)
💻 **Repository:** [github.com/Kafoor-Nimas/Instacart](https://github.com/Kafoor-Nimas/Instacart)

---

## 📋 Table of Contents

- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Overview](#-api-overview)
- [Background Jobs](#-background-jobs)
- [Acknowledgements](#-acknowledgements)

---

## 📸 Screenshots

| Storefront | Product Page |
|---|---|
| ![Storefront](./screenshots/home.png) | ![Product Page](./screenshots/products.png) |

| Checkout | singleOrder |
|---|---|
| ![Checkout](./screenshots/checkout.png) | ![Order Tracking](./screenshots/singleOrder.png) |

| Admin Dashboard | Admin Orders |
|---|---|
| ![Admin Dashboard](./screenshots/adminDashboard.png) | ![Admin Orders](./screenshots/adminOrders.png) |

| Delivery Partner Dashboard |
|---|
| ![Delivery Dashboard](./screenshots/deliveryPartner.png) |


---

## ✨ Features

### 🛍️ Customer Storefront
- Browse products by category with search, filtering, and sorting
- Flash deals and popular products sections
- Shopping cart and multi-step checkout
- Saved delivery addresses with geolocation
- Order history and detailed order tracking
- Live delivery location tracking on map

### 👨‍💼 Admin Panel
- Dashboard with real-time business statistics
- Product management (create, edit, delete, stock control)
- Order management with status updates
- Assign delivery partners to orders
- View all customers and order history

### 🚴 Delivery Partner Dashboard
- View assigned active and completed deliveries
- Share live location during delivery
- Complete deliveries with OTP verification
- Cancel deliveries with a reason
- Auto-assignment system for new orders

### ⚙️ System Features
- JWT-based authentication with role-based access control
- Background job processing with Inngest (low stock alerts, auto rider assignment, monthly promotional emails)
- Image uploads via Cloudinary
- Type-safe database access with Prisma ORM

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- Tailwind CSS
- Axios
- React Hot Toast

**Backend**
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (hosted on Neon)
- JSON Web Tokens (JWT)

**Third-Party Services**
- Cloudinary — image storage
- Inngest — background jobs & event-driven workflows
- Neon — serverless PostgreSQL hosting
- Vercel — deployment

---

## 📁 Project Structure

```
Instacart/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth context & global state
│   │   ├── pages/          # Route-level pages (incl. admin/, delivery/)
│   │   ├── config/         # Axios instance config
│   │   └── types.ts        # Shared TypeScript types
│   └── package.json
│
├── server/                 # Express backend
│   ├── controllers/        # Route handler logic
│   ├── routes/              # Express route definitions
│   ├── middleware/          # Auth & admin guards
│   ├── config/               # Prisma & Cloudinary config
│   ├── inngest/              # Background job functions
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   └── server.ts              # App entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A PostgreSQL database (e.g. [Neon](https://neon.tech))
- A [Cloudinary](https://cloudinary.com) account
- An [Inngest](https://www.inngest.com) account (for background jobs)

### 1. Clone the repository
```bash
git clone https://github.com/Kafoor-Nimas/Instacart.git
cd Instacart
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create a `.env` file in `server/` (see [Environment Variables](#-environment-variables) below).

Generate the Prisma client and push the schema to your database:
```bash
npx prisma generate
npx prisma db push
```

Start the server:
```bash
npm run server
```

### 3. Set up the frontend
```bash
cd ../client
npm install
```

Create a `.env` file in `client/` with your API base URL:
```env
VITE_BASE_URL=http://localhost:5000/api
VITE_CURRENCY_SYMBOL=$
```

Start the frontend:
```bash
npm run dev
```

The app should now be running at `http://localhost:5173`, with the API at `http://localhost:5000`.

---

## 🔑 Environment Variables

### `server/.env`

```env
# Database
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://user:password@host/dbname?sslmode=require

# Auth
JWT_SECRET=your_jwt_secret

# Admin access (comma-separated emails)
ADMIN_EMAILS=admin@example.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5000
CLIENT_URL=http://localhost:5173

# Inngest (background jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# SMTP Credentials (for low stock alerts & promotional emails)
SENDER_EMAIL=your_sender_email@example.com
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Stripe (card payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```


---

## 🗄️ Database Schema

The application uses the following core models (defined in `prisma/schema.prisma`):

| Model | Description |
|---|---|
| `User` | Customer accounts with saved addresses and orders |
| `Address` | Delivery addresses with geolocation (lat/lng) |
| `Product` | Catalog items with pricing, stock, and category |
| `Order` | Orders with items, status history, and delivery info |
| `DeliveryPartner` | Riders who fulfill deliveries |

Relationships are managed through Prisma, with cascading deletes on user-owned records.

---

## 🔌 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/api/products` | List products (filter, search, sort) |
| `GET` | `/api/products/flash-deals` | Get current flash deal products |
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/orders` | Get current user's orders |
| `GET` | `/api/orders/:id/location` | Get live delivery location |
| `GET` | `/api/orders/all` | Get all orders (admin) |
| `PUT` | `/api/orders/:id/status` | Update order status (admin) |
| `GET` | `/api/addresses` | Get user's saved addresses |
| `POST` | `/api/addresses` | Add a new address |
| `GET` | `/api/delivery/my-deliveries` | Get assigned deliveries (rider) |
| `PUT` | `/api/delivery/my-deliveries/:id/complete` | Complete delivery with OTP |
| `POST` | `/api/upload` | Upload product image (admin) |
| `GET` | `/api/admin/stats` | Get dashboard statistics (admin) |

---

## ⚡ Background Jobs

Background processing is handled via **Inngest**, keeping the main request-response cycle fast by offloading non-critical work:

- **`checkLowStock`** — Triggered after stock updates; emails admins when inventory falls below threshold
- **`autoAssignRider`** — Triggered on order placement; waits 5 minutes, then auto-assigns an available delivery partner
- **`sendMonthlyOffers`** — Scheduled cron job (1st of every month); sends promotional emails to all users in batches

---

## 🙏 Acknowledgements

This project was built with guidance from the **[GreatStack](https://www.youtube.com/@GreatStackDev)** YouTube channel.

---

## 📄 License

This project is open source and available for learning purposes.