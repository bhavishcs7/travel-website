const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Destination = require('../models/Destination');
const { protect } = require('../middleware/auth');
const { getIsConnected } = require('../config/db');

const dbCheck = (res) => {
  if (!getIsConnected()) {
    res.status(503).json({ success: false, message: 'Database unavailable. Please try again later.' });
    return false;
  }
  return true;
};

// @route GET /api/destinations
router.get('/', async (req, res) => {
  if (!dbCheck(res)) return;

  const { search, country, category, featured } = req.query;
  try {
    let query = {};
    if (country && country !== 'All') query.country = country;
    if (category && category !== 'All') query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ];
    }
    const destinations = await Destination.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: destinations });
  } catch (e) {
    console.error('Get destinations error:', e.message);
    res.status(500).json({ success: false, message: 'Error fetching destinations' });
  }
});

// @route GET /api/destinations/admin
router.get('/admin', protect, async (req, res) => {
  if (!dbCheck(res)) return;

  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.json({ success: true, data: destinations });
  } catch (e) {
    console.error('Get admin destinations error:', e.message);
    res.status(500).json({ success: false, message: 'Error fetching destinations' });
  }
});

// @route GET /api/destinations/:idOrSlug
router.get('/:idOrSlug', async (req, res) => {
  if (!dbCheck(res)) return;

  const param = req.params.idOrSlug;
  try {
    let dest = null;
    if (mongoose.Types.ObjectId.isValid(param)) {
      dest = await Destination.findById(param);
    }
    if (!dest) {
      dest = await Destination.findOne({ slug: param });
    }
    if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: dest });
  } catch (e) {
    console.error('Get destination error:', e.message);
    res.status(500).json({ success: false, message: 'Error fetching destination' });
  }
});

// @route POST /api/destinations
router.post('/', protect, async (req, res) => {
  if (!dbCheck(res)) return;

  const data = req.body;
  if (!data.title) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }
  if (!data.slug) {
    data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  try {
    const newDest = new Destination(data);
    const saved = await newDest.save();
    res.status(201).json({ success: true, data: saved });
  } catch (e) {
    console.error('Create destination error:', e.message);
    if (e.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: e.message });
    }
    if (e.code === 11000) {
      return res.status(409).json({ success: false, message: 'A destination with this slug already exists' });
    }
    res.status(500).json({ success: false, message: 'Error creating destination' });
  }
});

// @route PUT /api/destinations/:id
router.put('/:id', protect, async (req, res) => {
  if (!dbCheck(res)) return;

  try {
    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: updated });
  } catch (e) {
    console.error('Update destination error:', e.message);
    if (e.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: e.message });
    }
    res.status(500).json({ success: false, message: 'Error updating destination' });
  }
});

// @route DELETE /api/destinations/:id
router.delete('/:id', protect, async (req, res) => {
  if (!dbCheck(res)) return;

  try {
    const deleted = await Destination.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, message: 'Destination deleted successfully' });
  } catch (e) {
    console.error('Delete destination error:', e.message);
    res.status(500).json({ success: false, message: 'Error deleting destination' });
  }
});

module.exports = router;
