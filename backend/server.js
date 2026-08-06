const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to database
connectDB().then(() => {
  const autoSeed = require('./config/autoSeed');
  autoSeed();
  
  // Verify Gemini API Connection
  const { checkGeminiConnection } = require('./services/geminiService');
  checkGeminiConnection();
});

// Middleware
// CORS configuration allowing localhost, production, and Vercel preview domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://nexacart-ai.vercel.app'
];

if (process.env.CLIENT_URL) {
  const sanitizedClientUrl = process.env.CLIENT_URL.replace(/\/$/, '');
  if (!allowedOrigins.includes(sanitizedClientUrl)) {
    allowedOrigins.push(sanitizedClientUrl);
  }
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
      /^http:\/\/localhost:\d+$/.test(origin) ||
      /^http:\/\/127\.0\.0\.1:\d+$/.test(origin) ||
      /^https:\/\/nexacart-.*\.vercel\.app$/.test(origin);
      
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`[CORS Blocked] Origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.url}`);
  next();
});

// Routes
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', paymentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/payment', paymentRoutes);
app.use('/api/ai', require('./routes/aiRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('NexaCart API is running...');
});

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 NexaCart Backend running on port ${PORT}`);
  console.log(`- Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`================ REGISTERED ROUTES ================`);
  console.log(`- POST /api/payment/create-order`);
  console.log(`- POST /api/payment/verify`);
  console.log(`- GET  /api/payment/order/:orderId`);
  console.log(`- GET  /api/payment/admin/all`);
  console.log(`- POST /api/payment/admin/verify-payment`);
  console.log(`- POST /api/auth/login`);
  console.log(`- POST /api/auth/register`);
  console.log(`- GET  /api/products`);
  console.log(`- GET  /api/cart`);
  console.log(`- GET  /api/orders`);
  console.log(`======================================================\n`);
});
