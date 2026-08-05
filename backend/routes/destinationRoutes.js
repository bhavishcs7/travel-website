const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');
const { protect } = require('../middleware/auth');
const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');

// @route GET /api/destinations
router.get('/', async (req, res) => {
  const { search, country, category, featured } = req.query;

  if (getIsConnected()) {
    try {
      let query = {};
      if (country && country !== 'All') query.country = country;
      if (category && category !== 'All') query.category = category;
      if (featured === 'true') query.isFeatured = true;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { country: { $regex: search, $options: 'i' } }
        ];
      }

      const destinations = await Destination.find(query).sort({ createdAt: -1 });
      if (destinations.length > 0) return res.json(destinations);
    } catch (e) {
      console.warn('DB query error, using memory fallback');
    }
  }

  let list = memoryStore.destinations;
  if (country && country !== 'All') list = list.filter(d => d.country.toLowerCase() === country.toLowerCase());
  if (category && category !== 'All') list = list.filter(d => d.category.toLowerCase() === category.toLowerCase());
  if (featured === 'true') list = list.filter(d => d.isFeatured);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(d => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || d.country.toLowerCase().includes(q));
  }

  res.json(list);
});

// @route GET /api/destinations/:idOrSlug
router.get('/:idOrSlug', async (req, res) => {
  const param = req.params.idOrSlug;

  if (getIsConnected()) {
    try {
      const dest = await Destination.findOne({
        $or: [{ _id: param.match(/^[0-9a-fA-F]{24}$/) ? param : null }, { slug: param }]
      });
      if (dest) return res.json(dest);
    } catch (e) {
      // fallback
    }
  }

  const dest = memoryStore.destinations.find(d => d._id === param || d.slug === param);
  if (dest) return res.json(dest);

  res.status(404).json({ message: 'Destination not found' });
});

// @route POST /api/destinations
router.post('/', protect, async (req, res) => {
  const data = req.body;
  if (!data.slug) {
    data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  if (getIsConnected()) {
    try {
      const newDest = new Destination(data);
      const saved = await newDest.save();
      return res.status(201).json(saved);
    } catch (e) {
      console.warn('DB Save failed, adding to memory store');
    }
  }

  const newDest = {
    _id: `dest-${Date.now()}`,
    ...data,
    isFeatured: !!data.isFeatured,
    status: data.status || 'published',
    createdAt: new Date().toISOString()
  };
  memoryStore.destinations.unshift(newDest);
  res.status(201).json(newDest);
});

// @route PUT /api/destinations/:id
router.put('/:id', protect, async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (getIsConnected()) {
    try {
      const updated = await Destination.findByIdAndUpdate(id, updates, { new: true });
      if (updated) return res.json(updated);
    } catch (e) {
      // fallback
    }
  }

  const idx = memoryStore.destinations.findIndex(d => d._id === id);
  if (idx !== -1) {
    memoryStore.destinations[idx] = { ...memoryStore.destinations[idx], ...updates };
    return res.json(memoryStore.destinations[idx]);
  }

  res.status(404).json({ message: 'Destination not found' });
});

// @route DELETE /api/destinations/:id
router.delete('/:id', protect, async (req, res) => {
  const id = req.params.id;

  if (getIsConnected()) {
    try {
      await Destination.findByIdAndDelete(id);
    } catch (e) {
      // fallback
    }
  }

  memoryStore.destinations = memoryStore.destinations.filter(d => d._id !== id);
  res.json({ message: 'Destination deleted successfully' });
});

module.exports = router;
