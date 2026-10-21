# NexaCart AI — System Architecture & Technical Design

[![System Architecture](https://img.shields.io/badge/Architecture-Full--Stack%20Decoupled-blueviolet)](#system-overview)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel%20%2B%20Render-black)](#deployment-architecture)
[![AI Integration](https://img.shields.io/badge/AI%20Engine-Gemini%20Flash%20%2B%20Strict%20Catalog-4285F4)](#ai-request-pipeline--reasoning-architecture)

---

## Table of Contents

- [System Overview](#system-overview)
- [Technology Architecture](#technology-architecture)
- [High-Level Architecture Diagram](#high-level-architecture-diagram)
- [Repository Structure & Architectural Boundaries](#repository-structure--architectural-boundaries)
- [End-to-End Request Lifecycle](#end-to-end-request-lifecycle)
- [Authentication & Identity Architecture](#authentication--identity-architecture)
- [Shopping, Payment & Fulfillment Lifecycle](#shopping-payment--fulfillment-lifecycle)
- [AI Request Pipeline & Reasoning Architecture](#ai-request-pipeline--reasoning-architecture)
- [Data Model & Schema Relationships](#data-model--schema-relationships)
- [API Topology & Route Organization](#api-topology--route-organization)
- [Deployment Architecture](#deployment-architecture)
- [Security Boundaries & Threat Mitigation](#security-boundaries--threat-mitigation)
- [Operational Resilience & Failure Handling](#operational-resilience--failure-handling)
- [Navigation Links](#navigation-links)

---

## System Overview

**NexaCart AI** is a production-grade, decoupled full-stack eCommerce platform designed around two principal subsystems:

1. **Client-Facing Presentation Tier (Frontend)**: A Single Page Application (SPA) built with React 19, Vite, Tailwind CSS, and Redux Toolkit, deployed to **Vercel**. It offers an interactive catalog, a conversational AI shopping copilot, an automated budget optimizer, a multi-stage checkout with Razorpay and Cash on Delivery, visual order tracking timelines, and an operational admin suite with Recharts data visualization.
2. **Business Logic & Data Tier (Backend)**: An Express 5 REST API running on Node.js and hosted on **Render**. It connects to **MongoDB Atlas** via Mongoose, interfaces with **Google Generative AI (Gemini 1.5/2.5 Flash)** for natural language processing and recommendations, communicates with **Google Identity Services** for OAuth token verification, and integrates with **Razorpay** for payment order creation and cryptographic HMAC-SHA256 signature verification.

The two tiers communicate exclusively via asynchronous JSON-based HTTP requests secured by CORS policies and Bearer JSON Web Tokens.

---

## Technology Architecture

| Architectural Layer | Technologies Employed | Architectural Role |
| :--- | :--- | :--- |
| **Client Application (SPA)** | React 19, Vite 8, Tailwind CSS, Redux Toolkit, React Router v7, Framer Motion, Recharts, React Hot Toast | Renders the responsive UI, manages client state, maintains the conversational shopping chat, and coordinates checkout. |
| **API Application Server** | Node.js (CommonJS), Express.js 5.2, Cookie-Parser, Multer | Routes requests, enforces CORS policies, authenticates JWTs, executes business validation, and orchestrates downstream integrations. |
| **Data Persistence Store** | MongoDB Atlas, Mongoose ODM 9.6 | Stores normalized documents for Users, Products, Carts, Wishlists, Orders, and Payment audit logs with schema constraints. |
| **AI & NLP Engine** | Google Generative AI SDK (`@google/generative-ai`), `gemini-1.5-flash` / `gemini-2.5-flash`, Custom Heuristic Parser | Extracts structured shopping requirements, performs strict database catalog filtering, and synthesizes natural language recommendations. |
| **Identity & Authentication** | Google Auth Library (`OAuth2Client`), JWT (`jsonwebtoken`), Bcryptjs | Dual-path authentication: Google Identity Services (GIS) token verification alongside salted and hashed credentials. |
| **Payment Gateway** | Razorpay Node.js SDK, Razorpay Checkout JS SDK, Node.js Crypto | Generates gateway payment orders, provides the client checkout modal, and verifies HMAC-SHA256 signatures before confirming orders. |
| **Infrastructure & Hosting** | Vercel (Frontend CDN edge network), Render (Backend web service) | Manages build pipelines, zero-downtime rollouts, environment secrets, and HTTPS termination. |

---

## High-Level Architecture Diagram

The diagram below illustrates the architectural boundaries, system relationships, network flows, and external integration touchpoints across NexaCart AI:

```mermaid
flowchart TB
    subgraph ClientBrowser["User Browser Client"]
        SPA["React 19 SPA (Vite)<br/>State: Redux Toolkit | Router: React Router v7"]
        GIS_SDK["Google Identity Services SDK<br/>(accounts.google.com/gsi/client)"]
        RZP_SDK["Razorpay Checkout SDK<br/>(checkout.razorpay.com/v1/checkout.js)"]
    end

    subgraph HostingBoundary["Deployment Hosting Infrastructure"]
        subgraph VercelBoundary["Vercel Global Edge Network"]
            VercelHost["Static SPA Hosting<br/>nexacart-ai.vercel.app"]
        end

        subgraph RenderBoundary["Render Cloud Platform"]
            ExpressServer["Express.js 5 Application<br/>Node.js REST API<br/>nexacart-backend-124q.onrender.com"]
            AuthMiddleware["Auth Middleware<br/>(protect & adminOnly)"]
            Controllers["Controllers<br/>(Auth, Products, Cart, Orders, Payment, AI)"]
            Services["Services<br/>(geminiService, aiSearchEngine, razorpayService)"]
        end
    end

    subgraph ExternalServices["External Cloud Integrations"]
        MongoAtlas[("MongoDB Atlas<br/>Mongoose 9.6 ODM<br/>(Users, Products, Carts, Wishlists, Orders, Payments)")]
        GoogleOAuth["Google Identity Services<br/>Token Verification API"]
        GeminiAI["Google Gemini API<br/>(gemini-1.5-flash / gemini-2.5-flash)"]
        RazorpayAPI["Razorpay Payment Gateway API"]
    end

    %% Client Interactions
    ClientBrowser -.->|Loads Static Assets| VercelHost
    SPA <==>|HTTPS / JSON REST API Calls<br/>Authorization: Bearer JWT| ExpressServer

    %% Internal Backend Dispatch
    ExpressServer --> AuthMiddleware
    AuthMiddleware --> Controllers
    Controllers --> Services
    Controllers <-->|Mongoose Queries| MongoAtlas

    %% External Service Connections
    SPA <==>|User Authentication| GIS_SDK
    SPA <==>|Payment Modal Popup| RZP_SDK
    Services <-->|ID Token / UserInfo Verification| GoogleOAuth
    Services <-->|Structured Prompts & RAG Synthesis| GeminiAI
    Services <-->|Order Creation & Verification| RazorpayAPI
```

---

## Repository Structure & Architectural Boundaries

The codebase is organized into distinct directory boundaries:

```text
nexacart/
├── frontend/                  # Presentation Tier: React + Vite Single Page Application
│   ├── public/                # Static assets served directly
│   ├── src/
│   │   ├── admin/             # Internal admin helper utilities
│   │   ├── ai/                # Client-side AI conversation state, memory bounds, & intent classification
│   │   ├── components/        # Storefront, AI chat (AIChatBox), Admin, & UI primitives
│   │   ├── layouts/           # MainLayout (Storefront) & AdminLayout (Control Center)
│   │   ├── pages/             # Customer route views & 20 specialized Operational Admin views
│   │   ├── redux/             # Redux Toolkit global store and slices (auth, cart, products, etc.)
│   │   ├── services/          # Axios instance (api.js) with dynamic base URL resolution
│   │   └── utils/             # Google GIS loader, invoice generator, and class helpers
│   ├── vite.config.js         # Vite configuration with dev server proxy (/api -> localhost:5000)
│   └── package.json           # Frontend manifests and scripts
│
├── backend/                   # Business Logic & Data Tier: Express REST API
│   ├── config/                # Database connection (db.js) & Catalog auto-seeder (autoSeed.js)
│   ├── controllers/           # HTTP handlers for auth, products, cart, orders, payments, & AI
│   ├── middleware/            # Token verification (protect) & Role authorization (adminOnly)
│   ├── models/                # Mongoose schemas (User, Product, Cart, Wishlist, Order, Payment)
│   ├── routes/                # Express router declarations mapped to route prefixes
│   ├── services/              # Third-party SDK wrappers (Gemini Generative AI, Razorpay)
│   ├── utils/                 # Cryptographic helpers (HMAC-SHA256 signature verification)
│   ├── server.js              # Application entry point, CORS whitelist, & middleware wiring
│   └── package.json           # Backend manifests, dependencies, and execution scripts
│
├── ARCHITECTURE.md            # High-level system architecture and data lifecycle documentation
└── README.md                  # Comprehensive root onboarding and repository entry point
```

---

## End-to-End Request Lifecycle

Every HTTP request dispatched from the React SPA travels through a systematic series of architectural pipeline stages:

```mermaid
sequenceDiagram
    autonumber
    participant ReactClient as React Frontend (Axios)
    participant CorsLayer as CORS & Pre-flight Layer
    participant RouteLayer as Route Layer (/api/...)
    participant AuthGuard as Auth Middleware (protect / adminOnly)
    participant Controller as Controller Handler
    participant ServiceLayer as Service / Model Layer
    participant ExternalSys as MongoDB Atlas / Gemini / Razorpay
    participant ErrorHandler as Global Error Middleware

    ReactClient->>CorsLayer: HTTP Request (Method, Path, Headers, Body)
    CorsLayer->>CorsLayer: Validate Origin against allowedOrigins whitelist
    alt Origin Rejected
        CorsLayer-->>ReactClient: 403 Forbidden / CORS Blocked
    else Origin Approved
        CorsLayer->>RouteLayer: Forward to matching route handler
        RouteLayer->>AuthGuard: Inspect route protection requirements
        opt Protected Route
            AuthGuard->>AuthGuard: Extract Bearer token & verify with JWT_SECRET
            AuthGuard->>ExternalSys: Hydrate User from MongoDB (select: -password)
            AuthGuard->>AuthGuard: Verify role if adminOnly required
        end
        AuthGuard->>Controller: Invokes controller method with req.user
        Controller->>ServiceLayer: Invoke business logic / queries
        ServiceLayer->>ExternalSys: Execute database operation or external SDK request
        ExternalSys-->>ServiceLayer: Return query result / API payload
        ServiceLayer-->>Controller: Return transformed data
        Controller-->>ReactClient: HTTP 200/201 JSON Response
    end
    opt Exception Caught
        Controller->>ErrorHandler: next(error)
        ErrorHandler-->>ReactClient: HTTP Status + { message, stack (null in prod) }
    end
```

---

## Authentication & Identity Architecture

NexaCart AI implements a hybrid authentication mechanism supporting both native credentials and Google OAuth 2.0 (Google Identity Services).

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Customer / Browser
    participant GIS as Google Identity Services (GIS SDK)
    participant Client as React Client (Login/Register)
    participant Redux as Redux authSlice
    participant Controller as authController.js
    participant GoogleAuth as Google OAuth2 API
    participant DB as MongoDB (User Collection)

    alt Native Credential Authentication
        Customer->>Client: Submit email & password
        Client->>Redux: dispatch(loginUserAsync / registerUserAsync)
        Redux->>Controller: POST /api/auth/login or POST /api/auth/register
        Controller->>DB: Query User / Create User with bcrypt hash
        Controller->>Controller: Sign JWT (id, role, expiresIn: "30d")
        Controller-->>Redux: Return { user, token }
    else Google Identity Services (GIS)
        Customer->>Client: Click "Sign in with Google"
        Client->>GIS: Render Google GIS Button / Prompt One Tap
        Customer->>GIS: Authenticate with Google
        GIS-->>Client: Return Credential ({ credential: "<id_token>" })
        Client->>Redux: dispatch(googleLoginAsync({ credential, idToken }))
        Redux->>Controller: POST /api/auth/google { credential, idToken }
        Controller->>GoogleAuth: verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID })
        opt ID Token Fallback
            Controller->>GoogleAuth: getTokenInfo(accessToken) & /userinfo API
        end
        GoogleAuth-->>Controller: Verified profile (email, sub, given_name, family_name)
        Controller->>DB: Find by googleId OR email
        alt User Not Found
            Controller->>DB: Create User (random password, googleId, role: "user")
        else User Exists
            Controller->>DB: Link googleId if missing
        end
        Controller->>Controller: Sign JWT (id, role, expiresIn: "30d")
        Controller-->>Redux: Return { user, token }
    end
    Redux->>Redux: localStorage.setItem('token', token)
    Redux-->>Client: State updated: isAuthenticated = true
```

---

## Shopping, Payment & Fulfillment Lifecycle

```mermaid
flowchart TD
    subgraph Browsing["1. Product Discovery & Selection"]
        Catalog["Catalog Browsing & AI Smart Search"] --> ProductView["Product Detail Page"]
        ProductView --> CartAction["Add to Cart (POST /api/cart)"]
        CartAction --> CartState[("MongoDB Cart Collection")]
    end

    subgraph Checkout["2. Checkout & Payment Initialization"]
        CartState --> CheckoutView["Checkout Page (/checkout)"]
        CheckoutView --> MethodSelect{"Select Payment Method"}
        MethodSelect -->|Cash on Delivery| CODOrder["Direct Order Creation<br/>POST /api/orders<br/>(status: 'Confirmed', isPaid: false)"]
        MethodSelect -->|Razorpay| RZPOrderReq["Create Razorpay Order<br/>POST /api/payment/create-order<br/>(amount converted to paise)"]
    end

    subgraph Gateway["3. Gateway Interaction & Verification"]
        RZPOrderReq --> RZPGateway["Razorpay API (orders.create)"]
        RZPGateway --> RZPModal["Open Razorpay Checkout Modal (Client)"]
        RZPModal --> CustomerPay["Customer Completes UPI / Card / Netbanking"]
        CustomerPay --> SignaturePayload["Receive Payment ID & Signature"]
        SignaturePayload --> VerifyReq["Verify Signature<br/>POST /api/payment/verify"]
        VerifyReq --> CryptoCheck{"HMAC-SHA256 Match?"}
    end

    subgraph Fulfillment["4. Fulfillment & Stock Management"]
        CryptoCheck -->|Valid| ConfirmOrder["Create Order in DB<br/>status: 'Confirmed', isPaid: true"]
        CryptoCheck -->|Invalid| RejectPayment["Return 400 Bad Request<br/>'Invalid Signature'"]
        ConfirmOrder --> AuditPayment["Log in Payment Collection<br/>status: 'Captured', gateway: 'Razorpay'"]
        ConfirmOrder --> StockDec["Decrement Product countInStock<br/>(Product.findById & save)"]
        ConfirmOrder --> CourierAssign["Assign Logistics Partner<br/>(Delhivery, Blue Dart, DTDC, etc.)<br/>Generate Tracking Number"]
        CODOrder --> CourierAssign
        CourierAssign --> Timeline["Initialize Timeline Tracking<br/>['Order Placed', 'Confirmed']"]
    end
```

---

## AI Request Pipeline & Reasoning Architecture

The AI subsystem delivers grounded product recommendations and natural language query extraction using a two-stage hybrid pipeline:

```mermaid
flowchart TD
    UserQuery["User Query / Copilot Message<br/>e.g. 'Show me 5G phones under ₹25000 with AMOLED'"] --> Extractor["aiSearchEngine.js: extractRequirementsWithGemini()"]

    subgraph Stage1["Stage 1: Intent & Entity Parsing"]
        Extractor --> RegexPass["Regex Parser:<br/>Extracts numeric price bounds, K-notation,<br/>RAM (8GB), Storage (128GB), Display (AMOLED)"]
        RegexPass --> GeminiNLP["Gemini 1.5/2.5 Flash:<br/>Extracts structured JSON requirements<br/>(category, brand, processor, price limits)"]
    end

    subgraph Stage2["Stage 2: Deterministic Catalog Grounding"]
        GeminiNLP --> Filter["filterProductsStrictly():<br/>Hard constraint evaluation against MongoDB Product catalog"]
        Filter --> CatalogMatch{"Matches Found in Catalog?"}
    end

    subgraph Stage3["Stage 3: Grounded Synthesis"]
        CatalogMatch -->|Yes| RAG["generateResponseFromProducts():<br/>Presents Verified Best Match, Alternative, & Budget Pick"]
        CatalogMatch -->|No| FallbackNotice["Generates clear rejection stating exact missing criteria<br/>Suggests relaxing price/spec constraints"]
    end

    RAG --> FinalResponse["Structured JSON to Client"]
    FallbackNotice --> FinalResponse
```

### AI Module Responsibilities

1. **`services/geminiService.js`**:
   - Manages the Google Generative AI client.
   - Defaults to `gemini-1.5-flash`, automatically falling back to `gemini-2.5-flash` if model deprecation or availability issues arise.
   - Provides deterministic local algorithmic fallback functions if `GEMINI_API_KEY` is unavailable or rate-limited.
2. **`services/aiSearchEngine.js`**:
   - Acts as an anti-hallucination guardrail.
   - Evaluates parsed query specifications strictly against actual database documents.
   - Formulates responses citing only verified in-stock products.
3. **`frontend/src/ai/conversationEngine.js`**:
   - Maintains client-side conversation memory across chat turns.
   - Retains active price bounds and specifications while allowing users to refine filters iteratively.

---

## Data Model & Schema Relationships

The database layer consists of six Mongoose models in [`backend/models/`](backend/models/):

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER ||--o{ PAYMENT : makes
    USER ||--|| CART : owns
    USER ||--|| WISHLIST : maintains
    CART ||--o{ PRODUCT : contains
    WISHLIST ||--o{ PRODUCT : references
    ORDER ||--o{ PRODUCT : includes
    ORDER ||--o| PAYMENT : records

    USER {
        ObjectId _id PK
        string firstName
        string lastName
        string email UK
        string password
        string role "enum: ['user', 'admin']"
        string googleId
        string phoneNumber
        string address
        date dob
        date createdAt
        date updatedAt
    }

    PRODUCT {
        ObjectId _id PK
        string name
        string description
        number price
        number originalPrice
        string category
        string image
        string[] images
        number countInStock
        number rating
        number numReviews
        boolean isFeatured
        date createdAt
        date updatedAt
    }

    CART {
        ObjectId _id PK
        ObjectId user FK,UK
        cartItem[] items "product: ObjectId, quantity: number"
        date createdAt
        date updatedAt
    }

    WISHLIST {
        ObjectId _id PK
        ObjectId user FK,UK
        ObjectId[] products FK
        date createdAt
        date updatedAt
    }

    ORDER {
        ObjectId _id PK
        ObjectId user FK
        orderItem[] orderItems "name, quantity, image, price, product"
        string shippingAddress
        string paymentMethod "Razorpay | Cash on Delivery"
        number itemsPrice
        number taxPrice
        number shippingPrice
        number totalPrice
        boolean isPaid
        date paidAt
        boolean isDelivered
        date deliveredAt
        string status "enum: ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', ...]"
        string deliveryPartner "Delhivery, Blue Dart, DTDC, etc."
        string trackingNumber
        date expectedDeliveryDate
        string estimatedDeliveryTime
        timelineEvent[] timeline "status, timestamp, description"
        date createdAt
        date updatedAt
    }

    PAYMENT {
        ObjectId _id PK
        string paymentId UK "Razorpay Payment ID"
        string orderId "Razorpay Order ID"
        ObjectId userOrder FK
        ObjectId userId FK
        number amount
        string currency "INR"
        string paymentMethod
        string status "enum: ['Pending', 'Captured', 'Failed', ...]"
        string gateway "Razorpay"
        date createdAt
        date updatedAt
    }
```

---

## API Topology & Route Organization

All API endpoints reside beneath the `/api` route prefix. The table below maps prefixes, route files, and controllers:

| Route Prefix | Router File | Controller File | Purpose |
| :--- | :--- | :--- | :--- |
| `/api/auth` | [`routes/authRoutes.js`](backend/routes/authRoutes.js) | [`controllers/authController.js`](backend/controllers/authController.js) | Registration, login, profile management, Google OAuth token verification. |
| `/api/products` | [`routes/productRoutes.js`](backend/routes/productRoutes.js) | [`controllers/productController.js`](backend/controllers/productController.js) | Public catalog queries, regex keyword search, category and price filters. |
| `/api/cart` | [`routes/cartRoutes.js`](backend/routes/cartRoutes.js) | [`controllers/cartController.js`](backend/controllers/cartController.js) | Authenticated cart CRUD, item quantity increment/decrement, cart clearing. |
| `/api/wishlist` | [`routes/wishlistRoutes.js`](backend/routes/wishlistRoutes.js) | [`controllers/wishlistController.js`](backend/controllers/wishlistController.js) | Authenticated wishlist retrieval, additions, and removals. |
| `/api/orders` | [`routes/orderRoutes.js`](backend/routes/orderRoutes.js) | [`controllers/orderController.js`](backend/controllers/orderController.js) | Order creation, personal order history, order cancellation, return requests, admin status updates. |
| `/api/payment` | [`routes/paymentRoutes.js`](backend/routes/paymentRoutes.js) | [`controllers/paymentController.js`](backend/controllers/paymentController.js) | Razorpay order generation, HMAC-SHA256 signature verification, admin payment audit ledger. |
| `/api/ai` | [`routes/aiRoutes.js`](backend/routes/aiRoutes.js) | [`controllers/aiController.js`](backend/controllers/aiController.js)<br/>[`controllers/geminiController.js`](backend/controllers/geminiController.js) | AI smart search, personalized recommendations, budget assistant, diagnostic tests. |

---

## Deployment Architecture

```mermaid
flowchart LR
    subgraph Vercel["Vercel Cloud (Frontend)"]
        V_Edge["Global Edge Network"]
        V_Dist["Static SPA Assets (dist/)"]
        V_Env["Env: VITE_API_URL, VITE_GOOGLE_CLIENT_ID"]
    end

    subgraph Render["Render Cloud (Backend)"]
        R_Service["Node.js Web Service (Express 5)"]
        R_Proc["server.js (PORT automatically assigned)"]
        R_Env["Env: MONGO_URI, JWT_SECRET, GEMINI_API_KEY, RAZORPAY_*, GOOGLE_*"]
    end

    subgraph MongoDBAtlas["MongoDB Atlas (Database)"]
        M_Cluster["Replica Set Cluster"]
        M_Access["Network IP Whitelist (0.0.0.0/0)"]
    end

    UserBrowser["User Web Browser"] -->|Loads Application| V_Edge
    V_Edge --> V_Dist
    UserBrowser -->|HTTPS API Requests| R_Service
    R_Service --> R_Proc
    R_Proc <-->|TCP TLS Connection| M_Cluster
```

### Communication & Configuration
- **Frontend Hosting**: Deployed to Vercel at `https://nexacart-ai.vercel.app`. Built from the `frontend/` directory with `vite build`.
- **Backend Hosting**: Deployed to Render as an automated Web Service at `https://nexacart-backend-124q.onrender.com`. Executed via `npm start` (`node server.js`).
- **Dynamic Port Assignment**: Render assigns dynamic ports via `process.env.PORT`, handled by Express in [`server.js`](backend/server.js#L101-L103).
- **CORS Configuration**: [`server.js`](backend/server.js#L23-L58) whitelists local ports, `https://nexacart-ai.vercel.app`, and Vercel branch previews (`https://nexacart-*.vercel.app`).

---

## Security Boundaries & Threat Mitigation

1. **Password Encryption**: Passwords are salted (10 rounds) and hashed using `bcryptjs` in a Mongoose pre-save hook before persisting to MongoDB. Plaintext passwords are never stored or logged.
2. **Stateless JWT Authorization**: Sensitive routes require a JSON Web Token signed with `JWT_SECRET`. Tokens expire after 30 days. Password hashes are excluded from hydrated user objects (`select('-password')`).
3. **Role-Based Access Control (RBAC)**: Distinct authorization checks differentiate regular shoppers (`role: 'user'`) from administrators (`role: 'admin'`). Administrative endpoints (`/api/orders/admin/all`, `/api/payment/admin/all`, status update endpoints) enforce `adminOnly` middleware.
4. **Payment Integrity**: Razorpay payments are confirmed exclusively after server-side cryptographic HMAC-SHA256 signature verification matching `razorpay_order_id` and `razorpay_payment_id` against `RAZORPAY_KEY_SECRET`. Client-supplied payment outcomes are never trusted without cryptographic proof.
5. **CORS Origin Whitelisting**: Strict origin matching prevents unauthorized third-party websites from making authenticated requests on behalf of users.
6. **NoSQL Injection Defense**: MongoDB queries are formulated using Mongoose schema object parameters, preventing unescaped query-injection attacks.

---

## Operational Resilience & Failure Handling

### Existing Implementation Behaviors

| Subsystem | Existing Error Handling & Resilience Strategy |
| :--- | :--- |
| **Google Gemini API** | Multi-tier failover: (1) Attempts primary query with `gemini-1.5-flash`; (2) If unavailable, automatically falls back to `gemini-2.5-flash`; (3) If offline, quota-exceeded (HTTP 429), or missing API key, switches to deterministic local catalog heuristics without crashing. |
| **Razorpay Payments** | If credentials are placeholder strings or API keys are unregistered, the backend detects the condition, logs a warning, and generates a simulated test order ID (`order_test_<timestamp>`), enabling local verification without a live merchant account. |
| **Catalog Seeding** | On server boot, `server.js` verifies product catalog volume. If the catalog contains fewer than 500 items, it automatically seeds 595+ sample items. If 500 or more items are present, seeding is safely bypassed. |
| **Express Middleware** | Global uncaught exception middleware intercepts unhandled errors, returning structured JSON error messages while omitting stack traces in production (`process.env.NODE_ENV === 'production'`). |
| **Admin UI Modules** | All administrative routes are wrapped inside an isolated React Error Boundary (`AdminErrorBoundary.jsx`), preventing a failure in an individual analytics component from crashing the wider application. |

### Recommended Future Improvements (Not Currently Implemented)
*These items represent architectural roadmap recommendations, not existing capabilities:*
- **Automated Test Suite**: Implementing integration test suites (e.g., Jest/Supertest for backend, Vitest/React Testing Library for frontend) to replace the current placeholder test script.
- **Distributed Caching**: Introducing Redis for frequently queried product listings and category aggregations.
- **Refresh Token Rotation**: Migrating from long-lived 30-day JWTs to short-lived access tokens paired with secure HTTP-only refresh token cookies.
- **Razorpay Webhooks**: Implementing an asynchronous webhook listener (`/api/payment/webhook`) to handle payment events even if a customer closes their browser prior to redirect.
- **Rate Limiting**: Introducing `express-rate-limit` to throttle brute-force login attempts and AI endpoint abuse.

---

## Navigation Links

- **Root Documentation**: [README.md](README.md)
- **Frontend Documentation**: [frontend/README.md](frontend/README.md)
- **Backend Documentation**: [backend/README.md](backend/README.md)
