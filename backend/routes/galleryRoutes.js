const express = require('express');
const router = express.Router();
const GalleryItem = require('../models/GalleryItem');
const { protect } = require('../middleware/auth');
const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');

// @route GET /api/gallery
router.get('/', async (req, res) => {
  const { category } = req.query;

  if (getIsConnected()) {
    try {
      let query = {};
      if (category && category !== 'All') query.category = category;
      const gallery = await GalleryItem.find(query).sort({ createdAt: -1 });
      if (gallery.length > 0) return res.json(gallery);
    } catch (e) {
      // fallback
    }
  }

  let list = memoryStore.gallery;
  if (category && category !== 'All') {
    list = list.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }

  res.json(list);
});

// @route POST /api/gallery
router.post('/', protect, async (req, res) => {
  const data = req.body;

  if (getIsConnected()) {
    try {
      const newItem = new GalleryItem(data);
      const saved = await newItem.save();
      return res.status(201).json(saved);
    } catch (e) {
      // fallback
    }
  }

  const newItem = {
    _id: `gal-${Date.now()}`,
    ...data,
    aspectRatio: data.aspectRatio || 'portrait',
    createdAt: new Date().toISOString()
  };
  memoryStore.gallery.unshift(newItem);
  res.status(201).json(newItem);
});

// @route DELETE /api/gallery/:id
router.delete('/:id', protect, async (req, res) => {
  const id = req.params.id;

  if (getIsConnected()) {
    try {
      await GalleryItem.findByIdAndDelete(id);
    } catch (e) {
      // fallback
    }
  }

  memoryStore.gallery = memoryStore.gallery.filter(g => g._id !== id);
  res.json({ message: 'Gallery item deleted' });
});

module.exports = router;
