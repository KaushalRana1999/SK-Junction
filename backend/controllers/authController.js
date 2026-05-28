const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

//
// =========================
// REGISTER USER + OTP
// =========================
//
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
      isVerified: false
    });

    const message = `
      <h2>Welcome to Zyntra</h2>
      <p>Your verification OTP is:</p>
      <h1>${otp}</h1>
      <p>OTP valid for 10 minutes.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: 'Verify Your Email - Zyntra',
      message
    });

    res.status(201).json({
      message: 'OTP sent to email',
      email: user.email
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//
// =========================
// VERIFY REGISTER OTP
// =========================
//
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: 'Already verified'
      });
    }

    if (
      user.otp !== otp ||
      user.otpExpiry < Date.now()
    ) {
      return res.status(400).json({
        message: 'Invalid or expired OTP'
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      message: 'OTP verified successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//
// =========================
// LOGIN USER
// =========================
//
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      if (!user.isVerified) {
        return res.status(401).json({
          message: 'Please verify your email OTP first'
        });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });

    } else {
      res.status(401).json({
        message: 'Invalid email or password'
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//
// =========================
// GET USERS (ADMIN)
// =========================
//
const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password');

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//
// =========================
// FORGOT PASSWORD (SEND OTP)
// =========================
//
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const message = `
      <h2>Password Reset Request</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: 'Reset Password OTP',
      message
    });

    res.json({
      message: 'OTP sent to email'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//
// =========================
// VERIFY RESET OTP
// =========================
//
const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    if (
      user.resetOtp !== otp ||
      user.resetOtpExpiry < Date.now()
    ) {
      return res.status(400).json({
        message: 'Invalid or expired OTP'
      });
    }

    res.json({
      message: 'OTP verified successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//
// =========================
// RESET PASSWORD
// =========================
//
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetOtp = null;
    user.resetOtpExpiry = null;

    await user.save();

    res.json({
      message: 'Password reset successful'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const updateAdminCredentials = async (req, res) => {
  try {
    const { email, newEmail, newPassword } = req.body;

    // find admin user
    const admin = await User.findOne({ email });

    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({
        message: 'Admin not found'
      });
    }

    // update email if provided
    if (newEmail) {
      admin.email = newEmail;
    }

    // update password if provided
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword, salt);
    }

    await admin.save();

    res.json({
      message: 'Admin credentials updated successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//
// =========================
// EXPORTS
// =========================
//
module.exports = {
  registerUser,
  verifyOtp,
  loginUser,
  getUsers,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  updateAdminCredentials
};