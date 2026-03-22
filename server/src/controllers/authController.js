const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc   Login admin
// @route  POST /api/auth/login
// @access Public
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc   Seed default admin user (run once)
// @route  POST /api/auth/seed
// @access Public (disable in production)
const seedAdmin = async (req, res) => {
  try {
    const existing = await User.findOne({ role: 'admin' });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const admin = await User.create({
      username: 'admin@reb',
      password: 'password@reb',
      role: 'admin',
    });

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc   Get current admin profile
// @route  GET /api/auth/me
// @access Private
const getMe = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
    },
  });
};

module.exports = { login, seedAdmin, getMe };
