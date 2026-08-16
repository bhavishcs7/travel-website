const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Destination = require('../models/Destination');
const { protect } = require('../middleware/auth');
const { getIsConnected } = require('../config/db');
const upload = require('../middleware/upload');

const dbCheck = (res) => {
  if (!getIsConnected()) {
    res.status(503).json({ success: false, message: 'Database unavailable. Please try again later.' });
    return false;
  }
  return true;
};

// Helper to format place document for response
const formatPlace = (doc) => {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  if (!obj.placeName && obj.title) obj.placeName = obj.title;
  if (!obj.title && obj.placeName) obj.title = obj.placeName;
  if (!obj.youtubeLink && obj.youtubeUrl) obj.youtubeLink = obj.youtubeUrl;
  if (!obj.youtubeUrl && obj.youtubeLink) obj.youtubeUrl = obj.youtubeLink;
  if (!obj.googleMapsLink && obj.googleMapsUrl) obj.googleMapsLink = obj.googleMapsUrl;
  if (!obj.googleMapsUrl && obj.googleMapsLink) obj.googleMapsUrl = obj.googleMapsLink;
  if (!obj.instagramLink && obj.instagramReelUrl) obj.instagramLink = obj.instagramReelUrl;
  if (!obj.instagramReelUrl && obj.instagramLink) obj.instagramReelUrl = obj.instagramLink;
  if (!obj.bestTimeToVisit && obj.bestTime) obj.bestTimeToVisit = obj.bestTime;
  if (!obj.bestTime && obj.bestTimeToVisit) obj.bestTime = obj.bestTimeToVisit;
  if (!obj.galleryImages && obj.images) obj.galleryImages = obj.images;
  if (!obj.images && obj.galleryImages) obj.images = obj.galleryImages;
  return obj;
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
        { placeName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } },
      ];
    }
    const destinations = await Destination.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: destinations.map(formatPlace) });
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
    res.json({ success: true, data: destinations.map(formatPlace) });
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
    if (!dest) {
      dest = await Destination.findOne({ placeName: param });
    }
    if (!dest) {
      dest = await Destination.findOne({ title: param });
    }
    if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: formatPlace(dest) });
  } catch (e) {
    console.error('Get destination error:', e.message);
    res.status(500).json({ success: false, message: 'Error fetching destination' });
  }
});

// @route POST /api/destinations
router.post('/', protect, upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 20 }
]), async (req, res) => {
  if (!dbCheck(res)) return;

  const data = { ...req.body };
  const name = data.placeName || data.title;
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Place Name is required' });
  }

  data.title = name.trim();
  data.placeName = name.trim();

  // If cover image file was uploaded
  if (req.files && req.files['coverImage'] && req.files['coverImage'][0]) {
    data.coverImage = `/uploads/${req.files['coverImage'][0].filename}`;
  }
  // If gallery image files were uploaded
  if (req.files && req.files['galleryImages'] && req.files['galleryImages'].length > 0) {
    const newImgs = req.files['galleryImages'].map(f => `/uploads/${f.filename}`);
    data.galleryImages = newImgs;
    data.images = newImgs;
  }

  if (data.isPublished !== undefined) {
    data.isPublished = data.isPublished === true || data.isPublished === 'true';
    data.status = data.isPublished ? 'published' : 'draft';
  }
  if (data.isFeatured !== undefined) {
    data.isFeatured = data.isFeatured === true || data.isFeatured === 'true';
  }

  try {
    const newDest = new Destination(data);
    const saved = await newDest.save();
    res.status(201).json({ success: true, data: formatPlace(saved) });
  } catch (e) {
    console.error('Create destination error:', e.message);
    if (e.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: e.message });
    }
    if (e.code === 11000) {
      return res.status(409).json({ success: false, message: 'A destination with this name or slug already exists' });
    }
    res.status(500).json({ success: false, message: 'Error creating destination' });
  }
});

// @route PUT /api/destinations/:id
router.put('/:id', protect, upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 20 }
]), async (req, res) => {
  if (!dbCheck(res)) return;

  const data = { ...req.body };
  if (data.placeName && !data.title) data.title = data.placeName;
  if (data.title && !data.placeName) data.placeName = data.title;

  if (req.files && req.files['coverImage'] && req.files['coverImage'][0]) {
    data.coverImage = `/uploads/${req.files['coverImage'][0].filename}`;
  }
  if (req.files && req.files['galleryImages'] && req.files['galleryImages'].length > 0) {
    const newImgs = req.files['galleryImages'].map(f => `/uploads/${f.filename}`);
    data.galleryImages = newImgs;
    data.images = newImgs;
  }

  if (data.isPublished !== undefined) {
    data.isPublished = data.isPublished === true || data.isPublished === 'true';
    data.status = data.isPublished ? 'published' : 'draft';
  }
  if (data.isFeatured !== undefined) {
    data.isFeatured = data.isFeatured === true || data.isFeatured === 'true';
  }

  try {
    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: formatPlace(updated) });
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
