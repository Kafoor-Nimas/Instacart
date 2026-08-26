<div align="center">

# 🛒 Instacart Clone

**A production-grade, full-stack grocery delivery platform** built on the PERN stack — complete with a customer storefront, an admin operations console, and a real-time delivery partner dashboard.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge&logo=vercel)](https://instacart-client.vercel.app/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](#-license)
[![Made with TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](#)

[Live Demo](https://instacart-client.vercel.app/) · [Report Bug](https://github.com/Kafoor-Nimas/Instacart/issues) · [Request Feature](https://github.com/Kafoor-Nimas/Instacart/issues)

</div>

---

## 📸 Preview

<table>
  <tr>
    <td width="50%"><img src="./screenshots/home.png" alt="Storefront" /><p align="center"><sub>Storefront</sub></p></td>
    <td width="50%"><img src="./screenshots/products.png" alt="Product Page" /><p align="center"><sub>Product Catalog</sub></p></td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/checkout.png" alt="Checkout" /><p align="center"><sub>Checkout</sub></p></td>
    <td width="50%"><img src="./screenshots/singleOrder.png" alt="Order Tracking" /><p align="center"><sub>Live Order Tracking</sub></p></td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/adminDashboard.png" alt="Admin Dashboard" /><p align="center"><sub>Admin Dashboard</sub></p></td>
    <td width="50%"><img src="./screenshots/adminOrders.png" alt="Admin Orders" /><p align="center"><sub>Order Management</sub></p></td>
  </tr>
  <tr>
    <td colspan="2"><img src="./screenshots/deliveryPartner.png" alt="Delivery Dashboard" /><p align="center"><sub>Delivery Partner Dashboard</sub></p></td>
  </tr>
</table>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Background Jobs](#-background-jobs)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🧭 Overview

Instacart Clone is a multi-role grocery delivery platform that simulates the full lifecycle of an on-demand delivery business — from browsing and checkout, to admin fulfillment, to live rider tracking. It's built to demonstrate production-quality patterns: type-safe data access, role-based auth, event-driven background processing, and a clean separation between three distinct client experiences sharing one backend.

**Three roles, one platform:**

| Role | Can do |
|---|---|
| 🧑‍🤝‍🧑 **Customer** | Browse, order, track deliveries live on a map |
| 🛠️ **Admin** | Manage catalog, fulfill orders, assign riders, view analytics |
| 🚴 **Delivery Partner** | Accept deliveries, share live location, verify drop-off via OTP |

---

## 🏗️ Architecture

```mermaid
flowchart LR
    subgraph Clients
        A[Customer Storefront]
        B[Admin Panel]
        C[Delivery Dashboard]
    end

    subgraph Backend["Express + TypeScript API"]
        D[Auth Middleware]
        E[Controllers]
        F[Prisma ORM]
    end

    subgraph Infra
        G[(PostgreSQL / Neon)]
        H[Cloudinary]
        I[Inngest Jobs]
        J[Stripe]
    end

    A -->|REST + JWT| D
    B -->|REST + JWT| D
    C -->|REST + JWT| D
    D --> E --> F --> G
    E --> H
    E --> J
    E -.event.-> I
    I -.callback.-> E
```

All three clients talk to a single Express API over authenticated REST endpoints. Long-running or scheduled work (stock alerts, rider auto-assignment, promotional emails) is offloaded to **Inngest** so the request/response cycle stays fast.

---

## ✨ Features

### 🛍️ Customer Storefront
- Category browsing with search, filtering, and sorting
- Flash deals and popular product rails
- Persistent cart and multi-step checkout with Stripe payments
- Saved addresses with geolocation autofill
- Order history with live delivery tracking on an interactive map

### 👨‍💼 Admin Panel
- Real-time business statistics dashboard
- Full product CRUD with stock control and image uploads
- Order lifecycle management with status transitions
- Manual and automatic delivery partner assignment
- Customer directory with order history

### 🚴 Delivery Partner Dashboard
- Active and completed delivery views
- Live location broadcasting during a delivery
- OTP-verified delivery completion
- Cancellation flow with reason capture
- Automatic assignment to new orders via background job

### ⚙️ Platform & Engineering
- JWT authentication with role-based access control (RBAC)
- Event-driven background jobs via Inngest
- Type-safe database access with Prisma ORM
- Image storage via Cloudinary
- Stripe integration for card payments
- Environment-based configuration for local/staging/prod

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

**Frontend**
- React (Vite)
- React Router
- Tailwind CSS
- Axios
- React Hot Toast

</td>
<td valign="top" width="33%">

**Backend**
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JSON Web Tokens

</td>
<td valign="top" width="33%">

**Infrastructure**
- Neon (serverless Postgres)
- Cloudinary (media)
- Inngest (jobs/events)
- Stripe (payments)
- Vercel (deployment)

</td>
</tr>
</table>

---

## 📁 Project Structure

```
Instacart/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # Auth context & global state
│   │   ├── pages/             # Route-level pages (incl. admin/, delivery/)
│   │   ├── config/            # Axios instance config
│   │   └── types.ts           # Shared TypeScript types
│   └── package.json
│
├── server/                    # Express backend
│   ├── controllers/           # Route handler logic
│   ├── routes/                # Express route definitions
│   ├── middleware/            # Auth & admin guards
│   ├── config/                # Prisma & Cloudinary config
│   ├── inngest/                # Background job functions
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   └── server.ts                # App entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- A PostgreSQL database (e.g. [Neon](https://neon.tech))
- A [Cloudinary](https://cloudinary.com) account
- An [Inngest](https://www.inngest.com) account
- A [Stripe](https://stripe.com) account (for payments)

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

Create a `.env` file in `server/` (see [Environment Variables](#-environment-variables)), then push the schema:

```bash
npx prisma generate
npx prisma db push
npm run server
```

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_BASE_URL=http://localhost:5000/api
VITE_CURRENCY_SYMBOL=$
```

```bash
npm run dev
```

The app runs at `http://localhost:5173`, with the API at `http://localhost:5000`.

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

# SMTP credentials (low stock alerts & promotional emails)
SENDER_EMAIL=your_sender_email@example.com
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Stripe (card payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

> ⚠️ **Never commit `.env` files.** Add them to `.gitignore` and rotate any secrets that have been exposed in commit history.

---

## 🗄️ Database Schema

Core models, defined in `prisma/schema.prisma`:

| Model | Description |
|---|---|
| `User` | Customer accounts with saved addresses and orders |
| `Address` | Delivery addresses with geolocation (lat/lng) |
| `Product` | Catalog items with pricing, stock, and category |
| `Order` | Orders with items, status history, and delivery info |
| `DeliveryPartner` | Riders who fulfill deliveries |

Relationships are managed through Prisma, with cascading deletes on user-owned records.

---

## 🔌 API Reference

<details>
<summary><strong>Auth</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive a JWT |

</details>

<details>
<summary><strong>Products</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | List products (filter, search, sort) |
| `GET` | `/api/products/flash-deals` | Get current flash deal products |
| `POST` | `/api/upload` | Upload product image *(admin)* |

</details>

<details>
<summary><strong>Orders</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/orders` | Get current user's orders |
| `GET` | `/api/orders/:id/location` | Get live delivery location |
| `GET` | `/api/orders/all` | Get all orders *(admin)* |
| `PUT` | `/api/orders/:id/status` | Update order status *(admin)* |

</details>

<details>
<summary><strong>Addresses</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/addresses` | Get user's saved addresses |
| `POST` | `/api/addresses` | Add a new address |

</details>

<details>
<summary><strong>Delivery</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/delivery/my-deliveries` | Get assigned deliveries *(rider)* |
| `PUT` | `/api/delivery/my-deliveries/:id/complete` | Complete delivery with OTP |

</details>

<details>
<summary><strong>Admin</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/stats` | Get dashboard statistics |

</details>

All protected routes require `Authorization: Bearer <token>`. Admin-only and rider-only routes are additionally gated by role-based middleware.

---

## ⚡ Background Jobs

Background processing runs on **Inngest**, keeping the request/response cycle fast by offloading non-critical work:

| Job | Trigger | Purpose |
|---|---|---|
| `checkLowStock` | After stock updates | Emails admins when inventory falls below threshold |
| `autoAssignRider` | On order placement | Waits 5 minutes, then auto-assigns an available delivery partner |
| `sendMonthlyOffers` | Cron — 1st of each month | Sends promotional emails to all users in batches |

---

## 🧪 Testing

> Test coverage is on the [roadmap](#-roadmap). To add tests locally:

```bash
# Backend (example with Jest/Vitest)
cd server && npm run test

# Frontend
cd client && npm run test
```

---

## 🌐 Deployment

The reference deployment uses:

- **Frontend** → Vercel (`client/`)
- **Backend** → Vercel Serverless Functions or a Node host of your choice (`server/`)
- **Database** → Neon (serverless PostgreSQL, autoscaling connection pooling)

Set the same environment variables from [above](#-environment-variables) in your hosting provider's dashboard, and point `VITE_BASE_URL` at your deployed API URL.

---

## 🗺️ Roadmap

- [ ] Automated test suite (unit + integration)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Rate limiting & request validation middleware
- [ ] Multi-currency / multi-region support
- [ ] Push notifications for order status changes
- [ ] Admin analytics export (CSV/PDF)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please open an issue first for major changes to discuss what you'd like to modify.

---

## 📄 License

Distributed under the **MIT License**. This project is open source and available for learning purposes.

---

## 🙏 Acknowledgements

Built with guidance from the **[GreatStack](https://www.youtube.com/@GreatStackDev)** YouTube channel.

<div align="center">

🔗 **Live Demo:** [instacart-client.vercel.app](https://instacart-client.vercel.app/) · 💻 **Repo:** https://github.com/anilbodaballa/SwadKart/edit/main/readme.md

</div>
