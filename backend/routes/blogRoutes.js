const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');
const { getIsConnected } = require('../config/db');

const dbCheck = (res) => {
  if (!getIsConnected()) {
    res.status(503).json({ success: false, message: 'Database unavailable. Please try again later.' });
    return false;
  }
  return true;
};

// @route GET /api/blogs
router.get('/', async (req, res) => {
  if (!dbCheck(res)) return;
  const { search, category } = req.query;
  try {
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (e) {
    console.error('Get blogs error:', e.message);
    res.status(500).json({ success: false, message: 'Error fetching blogs' });
  }
});

// @route GET /api/blogs/:idOrSlug
router.get('/:idOrSlug', async (req, res) => {
  if (!dbCheck(res)) return;
  const param = req.params.idOrSlug;
  try {
    const blog = await Blog.findOne({
      $or: [
        ...(param.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: param }] : []),
        { slug: param },
      ],
    });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    res.json({ success: true, data: blog });
  } catch (e) {
    console.error('Get blog error:', e.message);
    res.status(500).json({ success: false, message: 'Error fetching blog' });
  }
});

// @route POST /api/blogs
router.post('/', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  const data = req.body;
  if (!data.title) return res.status(400).json({ success: false, message: 'Title is required' });
  if (!data.slug) {
    data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  try {
    const newBlog = new Blog(data);
    const saved = await newBlog.save();
    res.status(201).json({ success: true, data: saved });
  } catch (e) {
    console.error('Create blog error:', e.message);
    if (e.name === 'ValidationError') return res.status(400).json({ success: false, message: e.message });
    if (e.code === 11000) return res.status(409).json({ success: false, message: 'A blog with this slug already exists' });
    res.status(500).json({ success: false, message: 'Error creating blog' });
  }
});

// @route PUT /api/blogs/:id
router.put('/:id', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Blog post not found' });
    res.json({ success: true, data: updated });
  } catch (e) {
    console.error('Update blog error:', e.message);
    if (e.name === 'ValidationError') return res.status(400).json({ success: false, message: e.message });
    res.status(500).json({ success: false, message: 'Error updating blog' });
  }
});

// @route DELETE /api/blogs/:id
router.delete('/:id', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Blog post not found' });
    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (e) {
    console.error('Delete blog error:', e.message);
    res.status(500).json({ success: false, message: 'Error deleting blog' });
  }
});

module.exports = router;
