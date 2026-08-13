const express = require('express');
const router = express.Router();
const GalleryItem = require('../models/GalleryItem');
const { protect } = require('../middleware/auth');
const { getIsConnected } = require('../config/db');

const dbCheck = (res) => {
  if (!getIsConnected()) {
    res.status(503).json({ success: false, message: 'Database unavailable. Please try again later.' });
    return false;
  }
  return true;
};

// @route GET /api/gallery
router.get('/', async (req, res) => {
  if (!dbCheck(res)) return;
  const { category } = req.query;
  try {
    let query = {};
    if (category && category !== 'All') query.category = category;
    const gallery = await GalleryItem.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: gallery });
  } catch (e) {
    console.error('Get gallery error:', e.message);
    res.status(500).json({ success: false, message: 'Error fetching gallery' });
  }
});

// @route POST /api/gallery
router.post('/', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  const data = req.body;
  if (!data.title || !data.imageUrl || !data.location) {
    return res.status(400).json({ success: false, message: 'Title, imageUrl, and location are required' });
  }
  try {
    const newItem = new GalleryItem(data);
    const saved = await newItem.save();
    res.status(201).json({ success: true, data: saved });
  } catch (e) {
    console.error('Create gallery item error:', e.message);
    if (e.name === 'ValidationError') return res.status(400).json({ success: false, message: e.message });
    res.status(500).json({ success: false, message: 'Error creating gallery item' });
  }
});

// @route DELETE /api/gallery/:id
router.delete('/:id', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  try {
    const deleted = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (e) {
    console.error('Delete gallery item error:', e.message);
    res.status(500).json({ success: false, message: 'Error deleting gallery item' });
  }
});

module.exports = router;
