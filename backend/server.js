const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();


// =====================
// DATABASE CONNECTION
// =====================
connectDB()
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('DB Error:', err));


// =====================
// CORS FIX (IMPORTANT)
// =====================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://zyntrafrontend.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS blocked for origin: ' + origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// ✅ Handle preflight OPTIONS requests for ALL routes
app.options('*', cors(corsOptions));


// =====================
// MIDDLEWARE
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =====================
// ROUTES
// =====================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));


// =====================
// TEST ROUTE
// =====================
app.get('/', (req, res) => {
  res.send('API is running');
});


// =====================
// LOCAL SERVER ONLY
// =====================
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


// =====================
// VERCEL EXPORT
// =====================
module.exports = app;