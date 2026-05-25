const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopnest.com',
      password: hashedPassword,
      role: 'admin'
    });

   const products = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immersive sound experience with advanced active noise cancellation.',
    price: 299.99,
    category: 'Electronics',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    ratings: 4.8,
    numReviews: 24
  },
  {
    name: 'Minimalist Modern Chair',
    description: 'A stylish and comfortable addition to any contemporary living room.',
    price: 150,
    category: 'Furniture',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800',
    ratings: 4.2,
    numReviews: 12
  },
  {
    name: 'Professional DSLR Camera',
    description: 'Capture stunning moments with high-resolution clarity and speed.',
    price: 1199.99,
    category: 'Electronics',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    ratings: 4.9,
    numReviews: 50
  },
  {
    name: 'Classic White Sneakers',
    description: 'Versatile and comfortable, a staple for any casual outfit.',
    price: 85,
    category: 'Clothing',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    ratings: 4.5,
    numReviews: 89
  },
  {
    name: 'Smartwatch Series 7',
    description: 'Track fitness, heart rate, and notifications with sleek design.',
    price: 399.99,
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    ratings: 4.6,
    numReviews: 112
  },
  {
    name: '4K Ultra HD TV',
    description: '65-inch smart TV with HDR and streaming apps built-in.',
    price: 799.99,
    category: 'Electronics',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
    ratings: 4.7,
    numReviews: 95
  },
  {
    name: 'Modern Bookshelf',
    description: '5-tier wooden bookshelf with minimalist design.',
    price: 180,
    category: 'Furniture',
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    ratings: 4.4,
    numReviews: 41
  },
  {
    name: 'Luxury King Bed',
    description: 'Comfortable king-size bed frame with upholstered headboard.',
    price: 950,
    category: 'Furniture',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    ratings: 4.8,
    numReviews: 67
  },
  {
    name: 'Leather Jacket',
    description: 'Premium black leather jacket with zip closure.',
    price: 120,
    category: 'Clothing',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ratings: 4.7,
    numReviews: 54
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight shoes designed for comfort and speed.',
    price: 95,
    category: 'Clothing',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    ratings: 4.5,
    numReviews: 89
  },
  {
    name: 'Hair Dryer Pro',
    description: 'Fast-drying with ionic technology for smooth hair.',
    price: 70,
    category: 'Beauty',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
    ratings: 4.3,
    numReviews: 44
  },
  {
    name: 'Makeup Brush Set',
    description: '10-piece professional brush set for flawless application.',
    price: 40,
    category: 'Beauty',
    stock: 55,
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    ratings: 4.6,
    numReviews: 73
  },
  {
    name: 'Tennis Racket',
    description: 'Lightweight graphite racket for intermediate players.',
    price: 110,
    category: 'Sports',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800',
    ratings: 4.5,
    numReviews: 38
  },
  {
    name: 'Football',
    description: 'Durable leather football for outdoor play.',
    price: 35,
    category: 'Sports',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
    ratings: 4.4,
    numReviews: 52
  },
  {
    name: 'Microwave Oven',
    description: 'Compact microwave with multiple cooking modes.',
    price: 150,
    category: 'Home Appliances',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800',
    ratings: 4.3,
    numReviews: 33
  },
  {
    name: 'Coffee Maker',
    description: 'Automatic drip coffee maker with timer.',
    price: 90,
    category: 'Home Appliances',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    ratings: 4.5,
    numReviews: 61
  }
];

    await Product.insertMany(products);
    
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
