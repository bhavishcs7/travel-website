const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');
const { protect } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'wanderlust_secret_key_2026';

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    if (getIsConnected()) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        if (email.toLowerCase().trim() === 'admin@contenthunter.com' || email.toLowerCase().trim() === 'admin@wanderlust.com') {
          user = await User.findOne({ role: 'admin' });
        }
      }

      if (!user) {
        return res.status(401).json({ message: 'Invalid admin email or password' });
      }

      let isMatch = false;
      if (typeof user.matchPassword === 'function') {
        isMatch = await user.matchPassword(password);
      } else {
        isMatch = await bcrypt.compare(password, user.password);
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid admin email or password' });
      }
    } else {
      user = memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid admin credentials' });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role || 'admin', email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'admin',
        bio: user.bio,
        avatar: user.avatar,
        socials: user.socials
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during authentication', error: error.message });
  }
});

// @route GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  try {
    if (getIsConnected()) {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(user);
    }
    const user = memoryStore.users[0];
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// @route PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
  const { name, bio, avatar, socials } = req.body;
  try {
    if (getIsConnected()) {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, bio, avatar, socials },
        { new: true }
      ).select('-password');
      return res.json(user);
    }
    const user = memoryStore.users[0];
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;
    user.socials = socials || user.socials;
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
