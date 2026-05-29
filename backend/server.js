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
// CORS FIX
// =====================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://zyntrafrontend.vercel.app'
];

// ✅ Manual CORS middleware — handles preflight without app.options('*')
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


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
module.exports = app;s