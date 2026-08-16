const express = require('express');
const router = express.Router();
const Config = require('../models/Config');
const { protect } = require('../middleware/auth');
const { getIsConnected } = require('../config/db');

const dbCheck = (res) => {
  if (!getIsConnected()) {
    res.status(503).json({ success: false, message: 'Database unavailable. Please try again later.' });
    return false;
  }
  return true;
};

// @route GET /api/config
router.get('/', async (req, res) => {
  if (!dbCheck(res)) return;
  try {
    let config = await Config.findOne();
    if (!config) {
      config = await Config.create({});
    }
    res.json({ success: true, data: config });
  } catch (e) {
    console.error('Get config error:', e.message);
    res.status(500).json({ success: false, message: 'Error fetching config' });
  }
});

// @route PUT /api/config
router.put('/', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  try {
    let config = await Config.findOne();
    if (!config) {
      config = new Config(req.body);
    } else {
      Object.assign(config, req.body);
    }
    await config.save();
    res.json({ success: true, data: config });
  } catch (e) {
    console.error('Update config error:', e.message);
    res.status(500).json({ success: false, message: 'Error updating config' });
  }
});

module.exports = router;
