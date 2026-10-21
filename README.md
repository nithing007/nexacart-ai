# NexaCart AI — Intelligent Full-Stack eCommerce Platform

[![Live Application](https://img.shields.io/badge/Live%20Demo-nexacart--ai.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nexacart-ai.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite%208-61DAFB?style=flat-square&logo=react&logoColor=black)](frontend/README.md)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%205-339933?style=flat-square&logo=node.js&logoColor=white)](backend/README.md)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](backend/README.md#database-management--auto-seeding)
[![AI Engine](https://img.shields.io/badge/AI-Google%20Gemini%20Flash-4285F4?style=flat-square&logo=google&logoColor=white)](ARCHITECTURE.md#ai-request-pipeline--reasoning-architecture)
[![Payments](https://img.shields.io/badge/Payments-Razorpay-02042B?style=flat-square&logo=razorpay&logoColor=white)](backend/README.md#payment-integration-razorpay)

**NexaCart AI** is a production-grade, AI-augmented eCommerce platform built with a decoupled architecture. It combines a customer storefront, a real-time conversational shopping copilot powered by Google Gemini, automated budget optimization, Razorpay payment processing, full logistics tracking, and a Shopify-inspired administrative operations center.

- **Live Application**: [https://nexacart-ai.vercel.app/](https://nexacart-ai.vercel.app/)
- **Source Repository**: [https://github.com/nithing007/nexacart-ai](https://github.com/nithing007/nexacart-ai)

---

## Table of Contents

- [Core Purpose](#core-purpose)
- [Feature Highlights](#feature-highlights)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Repository Directory Tree](#repository-directory-tree)
- [Prerequisites & Runtime Requirements](#prerequisites--runtime-requirements)
- [Local Development Setup](#local-development-setup)
- [Environment Configuration](#environment-configuration)
- [Available Package Scripts](#available-package-scripts)
- [Deployment Overview](#deployment-overview)
- [Security & Credential Guidelines](#security--credential-guidelines)
- [Troubleshooting Matrix](#troubleshooting-matrix)
- [Contribution & License](#contribution--license)
- [Documentation Index](#documentation-index)

---

## Core Purpose

Traditional eCommerce search often requires exact keyword matching and rigid filtering, resulting in frustrating customer experiences when requirements are subjective or constrained by budget. NexaCart AI addresses this challenge by embedding artificial intelligence directly into the purchasing journey:

1. **Natural Language Discovery**: Shoppers express complex multi-criteria requests (e.g., *"Show me 5G phones under ₹25,000 with AMOLED and at least 8GB RAM"*), and the system extracts structured constraints and matches them strictly against real catalog inventory.
2. **Financial Shopping Copilot**: The Smart Budget Assistant constructs optimal product bundles under a designated spending threshold, calculating discount savings and free shipping qualifications.
3. **End-to-End Fulfillment**: The platform covers the entire transaction lifecycle—from Razorpay payment capture and automatic inventory decrementing to courier tracking number assignment (Delhivery, Blue Dart, DTDC) and returns processing.
4. **Administrative Telemetry**: An operations center equips merchants with real-time revenue analytics, inventory health gauges, customer search demand monitoring, and CSV report exports.

---

## Feature Highlights

### 🛒 Customer Storefront & Shopping Experience
- **Categorized Product Catalog**: Curated inventory across Mobiles, Laptops, Electronics, Gaming, Groceries, Fashion, Furniture, Home & Office, Kitchen, and Books.
- **Dynamic Faceted Filtering**: Real-time filtering by category taxonomy, textual keyword search, and price boundary sliders.
- **Rich Product Details**: High-resolution image galleries, multi-angle views, stock availability badges, and customer reviews.
- **Cart & Wishlist Synchronization**: Real-time MongoDB persistence with optimistic client state updates and guest-to-user cart restoration.
- **Dual Payment Options**: Official Razorpay standard checkout modal (supporting UPI, Credit/Debit cards, Netbanking) alongside Cash on Delivery (COD).
- **Order Lifecycle & Tracking**: Visual order timeline tracking transitions (`Confirmed` → `Packed` → `Shipped` → `Delivered`), assigned couriers, tracking IDs, and return/cancellation controls.
- **Tax Invoices**: On-demand printable invoice generation featuring transaction QR codes and price breakdowns.

### 🤖 Generative & Conversational AI
- **Smart Search Copilot**: Powered by `@google/generative-ai` (`gemini-1.5-flash` with automatic fallback to `gemini-2.5-flash`). Translates conversational queries into structured database queries while enforcing strict catalog validation to prevent hallucinations.
- **Personalized Recommendations**: Evaluates user cart items and wishlist preferences to recommend relevant complementary catalog items.
- **Smart Budget Assistant**: Algorithmic and generative budget planner that builds product bundles within a user-defined price cap, identifies instant discount savings, and suggests cost-saving swap alternatives.
- **Persistent Floating Assistant (`AIChatBox`)**: Client-side chat copilot featuring dynamic quick-reply chips, entity extraction memory, and direct product card recommendations.

### 📊 Operational Admin Control Center
- **Executive Dashboard**: Key performance indicators including total revenue, order counts, average order values, and visual charts via Recharts.
- **Order Processing**: Merchant order manager allowing status transitions, logistics partner assignment, and custom tracking number dispatch.
- **Payment Audit Ledger**: Real-time payment verification ledger tracking Razorpay payment IDs, order IDs, and transaction statuses.
- **Inventory & Catalog Management**: Live stock monitor with reorder alerts and catalog price/image controls.
- **Demand Intelligence ("Missing Requests")**: Logs customer search queries that returned 0 results, surfacing unmet inventory demand.
- **Report Export Center**: Downloadable CSV data exports for accounting, sales orders, and customer analytics.

### 🔐 Authentication & Role Security
- **Dual Authentication**: Standard email/password registration with 10-round bcrypt salting, plus Google Identity Services (GIS) OAuth 2.0 integration.
- **Stateless Authorization**: Signed JSON Web Tokens (JWT) passed via `Authorization: Bearer <token>` headers with role-based middleware (`protect` and `adminOnly`).
- **Cryptographic Payment Integrity**: HMAC-SHA256 signature verification matching Razorpay order and payment IDs before confirming orders.

---

## Technology Stack

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        NexaCart AI Tech Stack                          │
├───────────────────┬────────────────────────────────────────────────────┤
│ Frontend SPA      │ React 19, Vite 8, Tailwind CSS 3, Redux Toolkit,   │
│                   │ React Router DOM 7, Framer Motion, Recharts        │
├───────────────────┼────────────────────────────────────────────────────┤
│ Backend API       │ Node.js, Express 5.2, Mongoose 9.6, Cookie-Parser  │
├───────────────────┼────────────────────────────────────────────────────┤
│ Database          │ MongoDB Atlas (Document Store via Mongoose ODM)   │
├───────────────────┼────────────────────────────────────────────────────┤
│ Artificial Intel. │ Google Generative AI (Gemini 1.5 & 2.5 Flash),     │
│                   │ Custom Rule-Based NLP & Strict Catalog Grounding   │
├───────────────────┼────────────────────────────────────────────────────┤
│ Identity & Auth   │ Google Identity Services (GIS), JWT, Bcryptjs      │
├───────────────────┼────────────────────────────────────────────────────┤
│ Payments          │ Razorpay Node.js SDK & Razorpay Checkout JS SDK    │
├───────────────────┼────────────────────────────────────────────────────┤
│ Hosting & Deploy  │ Vercel (Frontend Edge) & Render (Backend Service)  │
└───────────────────┴────────────────────────────────────────────────────┘
```

---

## Architecture Overview

The frontend and backend operate as decoupled services. The React SPA communicates with the Express REST API via HTTPS, authenticating requests using JWTs and handling payments through Razorpay's checkout modal:

```mermaid
flowchart LR
    User([User Browser]) <-->|React 19 SPA| Vercel["Vercel Frontend<br/>nexacart-ai.vercel.app"]
    User <==>|REST API (HTTPS + JWT)| Render["Render Backend<br/>nexacart-backend-124q.onrender.com"]

    subgraph BackendServices["Backend Service Boundary"]
        Render <--> Mongo[("MongoDB Atlas")]
        Render <--> Gemini["Google Gemini API<br/>(1.5 / 2.5 Flash)"]
        Render <--> GoogleAuth["Google OAuth2 API"]
        Render <--> Razorpay["Razorpay API"]
    end
```

*For complete system sequence flows, data lifecycle diagrams, and schema specifications, refer to [ARCHITECTURE.md](ARCHITECTURE.md).*

---

## Repository Directory Tree

```text
nexacart/
├── frontend/                  # Presentation Tier: React + Vite Single Page Application
│   ├── public/                # Static assets served directly
│   ├── src/
│   │   ├── admin/             # Admin internal utilities
│   │   ├── ai/                # Client-side AI conversation state & intent classifier
│   │   ├── components/        # Storefront, AIChatBox, SmartShoppingHub, & UI primitives
│   │   ├── layouts/           # MainLayout & AdminLayout shells
│   │   ├── pages/             # Storefront routes & 20 specialized Admin views
│   │   ├── redux/             # Redux store and slices (auth, cart, products, etc.)
│   │   ├── services/          # Axios instance (api.js) with dynamic base URL resolution
│   │   └── utils/             # Google GIS loader, invoice generator, class helpers
│   ├── vite.config.js         # Vite configuration with dev server proxy
│   └── package.json           # Frontend dependencies and scripts
│
├── backend/                   # Business Logic Tier: Express REST API
│   ├── config/                # MongoDB connection (db.js) & Catalog auto-seeder (autoSeed.js)
│   ├── controllers/           # Route controllers (auth, products, cart, orders, payment, AI)
│   ├── middleware/            # Token verification (protect) & Role guard (adminOnly)
│   ├── models/                # Mongoose schemas (User, Product, Cart, Wishlist, Order, Payment)
│   ├── routes/                # Express router declarations mapped to route prefixes
│   ├── services/              # Third-party SDK wrappers (Gemini AI, Razorpay)
│   ├── utils/                 # Cryptographic helpers (HMAC-SHA256 signature verification)
│   ├── seeder.js              # Standalone database seeding script
│   ├── server.js              # Express entry point, CORS whitelist, & middleware wiring
│   └── package.json           # Backend dependencies and scripts
│
├── ARCHITECTURE.md            # Comprehensive system architecture & data flow documentation
└── README.md                  # Root entry point & developer onboarding guide
```

---

## Prerequisites & Runtime Requirements

Ensure your local development environment meets the following baseline requirements:

- **Node.js**: `v18.x` or `v20.x` LTS
- **npm**: `v9.x` or `v10.x`
- **MongoDB**: Active MongoDB Atlas cluster or local MongoDB instance (v5.0+)
- **Google Cloud Console**: OAuth 2.0 Web Client ID & Client Secret (for Google Sign-In)
- **Google AI Studio**: Gemini API key (for AI features)
- **Razorpay Account**: Test Mode Key ID & Key Secret (optional fallback supported)

---

## Local Development Setup

To run the complete platform locally, open two separate terminal sessions:

### Terminal 1: Backend API

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `backend/` directory:
   ```ini
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nexacart?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_change_in_production
   GEMINI_API_KEY=your_gemini_api_key
   GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the backend development server**:
   ```bash
   npm run dev
   ```
   *Note: Upon first connection, if fewer than 500 items are detected, the backend will automatically seed 595+ sample products into MongoDB.*

### Terminal 2: Frontend SPA

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `frontend/` directory:
   ```ini
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   ```

4. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173`.

---

## Environment Configuration

A consolidated reference of all environment variables across both services:

### Backend Variables (`backend/.env`)

| Variable | Required | Description |
| :--- | :---: | :--- |
| `PORT` | No | Server listener port (defaults to `5000`). Automatically populated on platforms like Render. |
| `NODE_ENV` | No | Execution environment (`development` or `production`). In production, error stack traces are omitted. |
| `MONGO_URI` | **Yes** | MongoDB connection string (e.g. MongoDB Atlas cluster URI). |
| `JWT_SECRET` | **Yes** | Secret string used to sign and verify JSON Web Tokens. |
| `GEMINI_API_KEY` | **Yes** | Google Generative AI API key for smart search, recommendations, and budget copilot. |
| `GOOGLE_CLIENT_ID` | **Yes** | Google Cloud OAuth 2.0 Web Client ID used to verify ID tokens from Google Identity Services. |
| `GOOGLE_CLIENT_SECRET` | **Yes** | Google Cloud OAuth 2.0 Client Secret (also recognized as `GOOGLE_SECRET_ID`). |
| `RAZORPAY_KEY_ID` | **Yes** | Razorpay Key ID used for order generation. |
| `RAZORPAY_KEY_SECRET` | **Yes** | Razorpay Key Secret used in HMAC-SHA256 signature verification. |
| `CLIENT_URL` | No | Allowed frontend origin for CORS (e.g. `https://nexacart-ai.vercel.app`). |
| `UPI_ID` | No | Merchant UPI identifier (defaults to `nexacart@upi`). |
| `UPI_MERCHANT_NAME` | No | Merchant display name for UPI transactions. |

### Frontend Variables (`frontend/.env`)

| Variable | Required | Description |
| :--- | :---: | :--- |
| `VITE_API_URL` | **Yes** | Base URL for the Express API (e.g., `http://localhost:5000/api` or `https://nexacart-backend-124q.onrender.com/api`). |
| `VITE_GOOGLE_CLIENT_ID` | **Yes** | Google OAuth 2.0 Client ID used by the Google Identity Services browser SDK. |
| `VITE_RAZORPAY_KEY_ID` | No | Optional fallback Razorpay Key ID if not returned dynamically by the backend order initialization endpoint. |

> [!CAUTION]
> Never commit `.env` files containing real production credentials, API keys, or database connection strings to source control. Use the provided examples as structural templates.

---

## Available Package Scripts

### Frontend Scripts (`frontend/package.json`)

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts the local Vite development server with HMR at `http://localhost:5173`. |
| `npm run build` | `vite build` | Compiles optimized, tree-shaken static assets into `frontend/dist/`. |
| `npm run lint` | `eslint .` | Runs ESLint 9 checks across all JSX and JavaScript files. |
| `npm run preview` | `vite preview` | Serves the local `frontend/dist/` build for pre-deployment inspection. |

### Backend Scripts (`backend/package.json`)

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm start` | `node server.js` | Starts the Express server in production mode. |
| `npm run dev` | `nodemon server.js` | Starts the Express server with nodemon for hot-reloading on code modifications. |
| `npm run data:seed` | `node seeder.js` | Manually clears existing products and imports the 595+ item sample catalog. |
| `npm test` | `echo "Error: no test specified" && exit 1` | **Placeholder script**. An automated test suite is not currently implemented in this repository. Executing this command deliberately exits with error code 1. |

---

## Deployment Overview

NexaCart AI is deployed across two cloud platforms:

```text
┌─────────────────────────┐          HTTPS REST          ┌─────────────────────────┐
│     Vercel (Frontend)   │ ───────────────────────────> │     Render (Backend)    │
│ nexacart-ai.vercel.app  │ <─────────────────────────── │ nexacart-backend-...    │
└─────────────────────────┘      CORS & JWT Security     └─────────────────────────┘
                                                                      │
                                                                      ▼
                                                         ┌─────────────────────────┐
                                                         │      MongoDB Atlas      │
                                                         │   Cloud Database Cluster│
                                                         └─────────────────────────┘
```

### Frontend on Vercel
- **Build Output**: `frontend/dist`
- **Build Command**: `npm run build`
- **Environment Variables**: `VITE_API_URL` pointing to the Render backend, and `VITE_GOOGLE_CLIENT_ID`.
- **SPA Routing**: Handled automatically by Vercel to route all client paths back to `index.html`.

### Backend on Render
- **Environment**: Node.js Web Service
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Port**: Handled dynamically via `process.env.PORT`.
- **Environment Variables**: All required backend variables listed above.

---

## Security & Credential Guidelines

1. **Credential Segregation**: Frontend files must only contain public environment variables prefixed with `VITE_`. All database connection strings, JWT signing keys, and Razorpay secrets must remain strictly within backend environment variables.
2. **Cryptographic Payment Integrity**: Payment outcomes are never accepted based on client-side status flags alone. The backend independently verifies the HMAC-SHA256 signature generated from the Razorpay order ID and payment ID using the server's secret key.
3. **Password Security**: Passwords are never stored in plaintext. They are salted with 10 rounds and hashed with `bcryptjs` via a Mongoose pre-save hook.
4. **CORS Hardening**: The backend whitelist permits only authorized origins (local development ports, `https://nexacart-ai.vercel.app`, and Vercel preview domains). All other web origins are rejected.
5. **Role-Based Protection**: Administrative endpoints are protected by both `protect` (verifying token validity) and `adminOnly` (validating administrative role status).

---

## Troubleshooting Matrix

| Problem | Likely Cause | Solution |
| :--- | :--- | :--- |
| **MongoDB Connection Error** | IP address not whitelisted in MongoDB Atlas or invalid connection string. | In MongoDB Atlas, go to **Network Access** and add `0.0.0.0/0` (or your server's IP). Verify credentials in `MONGO_URI`. |
| **CORS Blocked Error** | Frontend URL not included in backend CORS allowed origins. | Set `CLIENT_URL=https://your-frontend-domain.com` in `backend/.env`. The backend automatically includes this origin. |
| **API Network Error** | `VITE_API_URL` misconfigured or backend server not running. | Verify the backend is listening on port 5000 and confirm `VITE_API_URL` in `frontend/.env` ends with `/api`. Restart the Vite dev server. |
| **Google Sign-In Button Fails** | Google Client ID missing, or origin not listed in Google Cloud Console. | Ensure `VITE_GOOGLE_CLIENT_ID` matches `GOOGLE_CLIENT_ID`. Add `http://localhost:5173` and `https://nexacart-ai.vercel.app` to **Authorized JavaScript origins** in Google Cloud Console. |
| **Gemini AI Errors / Quota** | API key missing or quota exceeded. | Verify `GEMINI_API_KEY` at [Google AI Studio](https://aistudio.google.com/). The service automatically falls back to `gemini-2.5-flash` and local algorithmic matching if offline. |
| **Razorpay Signature Mismatch** | `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are from mismatched environments. | Verify that both keys in `backend/.env` belong to the exact same environment (Test vs Live) in your Razorpay Dashboard. |

---

## Contribution & License

### Contribution Workflow
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Verify your changes locally by testing both the frontend and backend services.
4. Run frontend linting: `cd frontend && npm run lint`.
5. Commit your changes: `git commit -m "feat: add descriptive feature summary"`.
6. Push to your branch: `git push origin feature/your-feature-name`.
7. Open a Pull Request with a clear description of the modifications.

### License Status
- The backend package manifest ([`backend/package.json`](backend/package.json#L14)) declares an `ISC` license.
- A standalone `LICENSE` file is not currently present in the root repository. If you plan to use or redistribute this project commercially, please verify licensing terms with the repository maintainer.

---

## Documentation Index

For detailed implementation and configuration guides, refer to the specialized documentation files:

- **[ARCHITECTURE.md](ARCHITECTURE.md)**: System design, Mermaid sequence diagrams, data models, AI pipeline architecture, and security boundaries.
- **[frontend/README.md](frontend/README.md)**: Frontend component organization, Redux slices, Google GIS flow, Vite build configuration, and Vercel deployment.
- **[backend/README.md](backend/README.md)**: Express API route reference, controller logic, database auto-seeding, Razorpay integration, and Render deployment.
