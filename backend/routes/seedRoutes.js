const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { getIsConnected } = require('../config/db');

// @route POST /api/seed
// Protected — only authenticated admins can trigger this in non-production environments.
// Creates the initial admin user if none exists.
router.post('/', protect, async (req, res) => {
  if (!getIsConnected()) {
    return res.status(503).json({ success: false, message: 'Database unavailable' });
  }

  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.json({ success: true, message: 'Admin user already exists. No action taken.' });
    }

    // Only creates admin if none exists — does NOT wipe existing data
    const { adminEmail, adminPassword, adminName } = req.body;

    if (!adminEmail || !adminPassword) {
      return res.status(400).json({ success: false, message: 'adminEmail and adminPassword are required in the request body' });
    }

    await User.create({
      name: adminName || 'Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    res.json({ success: true, message: 'Admin user created successfully.' });
  } catch (error) {
    console.error('Seed error:', error.message);
    res.status(500).json({ success: false, message: 'Error during seed operation', error: error.message });
  }
});

module.exports = router;
