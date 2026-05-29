const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const getAdminStats = async (req, res) => {
  try {
    console.log('Analytics API hit');
    console.log('User:', req.user);

    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({
      role: 'user'
    });

    const orders = await Order.find({});

    const totalRevenue = orders.reduce(
      (acc, item) =>
        acc + (item.totalAmount || 0),
      0
    );

    return res.status(200).json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue
    });

  } catch (error) {
    console.log('ANALYTICS ERROR:', error);

    return res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
};

module.exports = { getAdminStats };