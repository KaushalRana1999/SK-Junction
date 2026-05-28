const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// DB
connectDB()
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('DB Error:', err));

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

app.get('/', (req, res) => {
  res.send('API is running');
});

// LOCAL ONLY
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;