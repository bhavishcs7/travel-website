const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const { protect } = require('../middleware/auth');
const { getIsConnected } = require('../config/db');

const dbCheck = (res) => {
  if (!getIsConnected()) {
    res.status(503).json({ success: false, message: 'Database unavailable. Please try again later.' });
    return false;
  }
  return true;
};

const extractEmbedId = (url, type) => {
  if (!url) return null;
  if (type === 'youtube') {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  } else if (type === 'instagram') {
    const match = url.match(/instagram\.com\/(?:p|reel)\/([^/?#&]+)/);
    return match ? match[1] : null;
  }
  return null;
};

// @route GET /api/videos
router.get('/', async (req, res) => {
  if (!dbCheck(res)) return;
  const { type, featured } = req.query;
  try {
    let query = {};
    if (type && type !== 'all') query.type = type;
    if (featured === 'true') query.isFeatured = true;
    const videos = await Video.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: videos });
  } catch (e) {
    console.error('Get videos error:', e.message);
    res.status(500).json({ success: false, message: 'Error fetching videos' });
  }
});

// @route POST /api/videos
router.post('/', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  const data = req.body;
  if (!data.url || !data.type) {
    return res.status(400).json({ success: false, message: 'URL and type are required' });
  }
  const embedId = extractEmbedId(data.url, data.type);
  if (!embedId) {
    return res.status(400).json({ success: false, message: 'Could not extract embed ID from the provided URL. Please check the URL format.' });
  }
  data.embedId = embedId;
  try {
    const newVid = new Video(data);
    const saved = await newVid.save();
    res.status(201).json({ success: true, data: saved });
  } catch (e) {
    console.error('Create video error:', e.message);
    if (e.name === 'ValidationError') return res.status(400).json({ success: false, message: e.message });
    res.status(500).json({ success: false, message: 'Error creating video' });
  }
});

// @route PUT /api/videos/:id
router.put('/:id', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  const updates = req.body;
  if (updates.url && updates.type) {
    const embedId = extractEmbedId(updates.url, updates.type);
    if (!embedId) {
      return res.status(400).json({ success: false, message: 'Could not extract embed ID from the provided URL' });
    }
    updates.embedId = embedId;
  }
  try {
    const updated = await Video.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Video not found' });
    res.json({ success: true, data: updated });
  } catch (e) {
    console.error('Update video error:', e.message);
    if (e.name === 'ValidationError') return res.status(400).json({ success: false, message: e.message });
    res.status(500).json({ success: false, message: 'Error updating video' });
  }
});

// @route DELETE /api/videos/:id
router.delete('/:id', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  try {
    const deleted = await Video.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Video not found' });
    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (e) {
    console.error('Delete video error:', e.message);
    res.status(500).json({ success: false, message: 'Error deleting video' });
  }
});

module.exports = router;
