const express = require('express');
const {
  registerUser,
  loginUser,
  getUsers,
  verifyOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  updateAdminCredentials
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);

// 🔐 Forgot Password Flow (NEW)
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);

// Admin
router.get('/users', protect, admin, getUsers);
router.put(
  '/admin/update',
  protect,
  admin,
  updateAdminCredentials
);

module.exports = router;