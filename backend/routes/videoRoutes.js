const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const { protect } = require('../middleware/auth');
const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');

const extractEmbedId = (url, type) => {
  if (!url) return '';
  if (type === 'youtube') {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : 'dQw4w9WgXcQ';
  } else {
    const match = url.match(/instagram\.com\/(?:p|reel)\/([^/?#&]+)/);
    return match ? match[1] : 'C3x4156S-example';
  }
};

// @route GET /api/videos
router.get('/', async (req, res) => {
  const { type, featured } = req.query;

  if (getIsConnected()) {
    try {
      let query = {};
      if (type && type !== 'all') query.type = type;
      if (featured === 'true') query.isFeatured = true;
      const videos = await Video.find(query).sort({ createdAt: -1 });
      if (videos.length > 0) return res.json(videos);
    } catch (e) {
      // fallback
    }
  }

  let list = memoryStore.videos;
  if (type && type !== 'all') list = list.filter(v => v.type === type);
  if (featured === 'true') list = list.filter(v => v.isFeatured);

  res.json(list);
});

// @route POST /api/videos
router.post('/', protect, async (req, res) => {
  const data = req.body;
  data.embedId = extractEmbedId(data.url, data.type);

  if (getIsConnected()) {
    try {
      const newVid = new Video(data);
      const saved = await newVid.save();
      return res.status(201).json(saved);
    } catch (e) {
      console.warn('DB error, using memory fallback');
    }
  }

  const newVid = {
    _id: `vid-${Date.now()}`,
    ...data,
    views: data.views || '10K views',
    createdAt: new Date().toISOString()
  };
  memoryStore.videos.unshift(newVid);
  res.status(201).json(newVid);
});

// @route PUT /api/videos/:id
router.put('/:id', protect, async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  if (updates.url && updates.type) {
    updates.embedId = extractEmbedId(updates.url, updates.type);
  }

  if (getIsConnected()) {
    try {
      const updated = await Video.findByIdAndUpdate(id, updates, { new: true });
      if (updated) return res.json(updated);
    } catch (e) {
      // fallback
    }
  }

  const idx = memoryStore.videos.findIndex(v => v._id === id);
  if (idx !== -1) {
    memoryStore.videos[idx] = { ...memoryStore.videos[idx], ...updates };
    return res.json(memoryStore.videos[idx]);
  }

  res.status(404).json({ message: 'Video not found' });
});

// @route DELETE /api/videos/:id
router.delete('/:id', protect, async (req, res) => {
  const id = req.params.id;

  if (getIsConnected()) {
    try {
      await Video.findByIdAndDelete(id);
    } catch (e) {
      // fallback
    }
  }

  memoryStore.videos = memoryStore.videos.filter(v => v._id !== id);
  res.json({ message: 'Video deleted' });
});

module.exports = router;
