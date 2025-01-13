const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({ username, email, password, role });

  await user.save();

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token,
  });
});

// Protected admin route
router.get('/admin', protect, isAdmin, (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

// Protected user route
router.get('/user', protect, (req, res) => {
  res.json({ message: 'Welcome, User!' });
});

module.exports = router;