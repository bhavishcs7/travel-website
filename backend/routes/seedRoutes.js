const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Destination = require('../models/Destination');
const Blog = require('../models/Blog');
const Video = require('../models/Video');
const GalleryItem = require('../models/GalleryItem');
const Message = require('../models/Message');
const { getIsConnected } = require('../config/db');

// @route POST /api/seed
// Completely clears all sample data and creates only the single admin user
router.post('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      await User.deleteMany({});
      await Destination.deleteMany({});
      await Blog.deleteMany({});
      await Video.deleteMany({});
      await GalleryItem.deleteMany({});
      await Message.deleteMany({});

      // Create Admin Users for Content Hunter
      await User.create({
        name: 'Content Hunter Admin',
        email: 'admin@contenthunter.com',
        password: 'Password123!',
        role: 'admin'
      });

      await User.create({
        name: 'Content Hunter Admin',
        email: 'admin@wanderlust.com',
        password: 'Password123!',
        role: 'admin'
      });

      return res.json({ message: 'All sample data removed! Single Admin account initialized.' });
    }

    res.json({ message: 'Memory store reset - ready for clean admin inputs.' });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ message: 'Error clearing database', error: error.message });
  }
});

module.exports = router;
