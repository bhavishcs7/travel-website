import express from 'express';
import SiteConfig from '../models/SiteConfig.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/config - Public
router.get('/', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = await SiteConfig.create({});
    }
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    console.error('Error fetching config:', error);
    res.status(500).json({ success: false, message: 'Server Error while fetching config' });
  }
});

// PUT /api/config - Admin Only
router.put('/', protectAdmin, async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig();
    }
    
    const fields = [
      'aboutTitle', 'aboutSubtitle', 'aboutDescription1', 'aboutDescription2',
      'youtubeLink', 'facebookLink', 'instagramLink', 'email', 'phone'
    ];
    
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        config[field] = req.body[field];
      }
    });
    
    config.updatedAt = Date.now();
    await config.save();
    
    res.status(200).json({ success: true, message: 'Configuration updated successfully', data: config });
  } catch (error) {
    console.error('Error updating config:', error);
    res.status(500).json({ success: false, message: 'Server Error while updating config' });
  }
});

export default router;
