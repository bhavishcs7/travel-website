const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');
const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');

// @route GET /api/blogs
router.get('/', async (req, res) => {
  const { search, category } = req.query;

  if (getIsConnected()) {
    try {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ];
      }
      const blogs = await Blog.find(query).sort({ createdAt: -1 });
      if (blogs.length > 0) return res.json(blogs);
    } catch (e) {
      console.warn('DB query fallback');
    }
  }

  let list = memoryStore.blogs;
  if (category && category !== 'All') list = list.filter(b => b.category.toLowerCase() === category.toLowerCase());
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
  }

  res.json(list);
});

// @route GET /api/blogs/:idOrSlug
router.get('/:idOrSlug', async (req, res) => {
  const param = req.params.idOrSlug;

  if (getIsConnected()) {
    try {
      const blog = await Blog.findOne({
        $or: [{ _id: param.match(/^[0-9a-fA-F]{24}$/) ? param : null }, { slug: param }]
      });
      if (blog) {
        blog.views += 1;
        await blog.save();
        return res.json(blog);
      }
    } catch (e) {
      // fallback
    }
  }

  const blog = memoryStore.blogs.find(b => b._id === param || b.slug === param);
  if (blog) {
    blog.views = (blog.views || 0) + 1;
    return res.json(blog);
  }

  res.status(404).json({ message: 'Blog post not found' });
});

// @route POST /api/blogs
router.post('/', protect, async (req, res) => {
  const data = req.body;
  if (!data.slug) {
    data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  if (getIsConnected()) {
    try {
      const newBlog = new Blog(data);
      const saved = await newBlog.save();
      return res.status(201).json(saved);
    } catch (e) {
      console.warn('DB Save error, falling back to memory store');
    }
  }

  const newBlog = {
    _id: `blog-${Date.now()}`,
    ...data,
    author: data.author || memoryStore.user,
    status: data.status || 'published',
    views: 0,
    createdAt: new Date().toISOString()
  };
  memoryStore.blogs.unshift(newBlog);
  res.status(201).json(newBlog);
});

// @route PUT /api/blogs/:id
router.put('/:id', protect, async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (getIsConnected()) {
    try {
      const updated = await Blog.findByIdAndUpdate(id, updates, { new: true });
      if (updated) return res.json(updated);
    } catch (e) {
      // fallback
    }
  }

  const idx = memoryStore.blogs.findIndex(b => b._id === id);
  if (idx !== -1) {
    memoryStore.blogs[idx] = { ...memoryStore.blogs[idx], ...updates };
    return res.json(memoryStore.blogs[idx]);
  }

  res.status(404).json({ message: 'Blog post not found' });
});

// @route DELETE /api/blogs/:id
router.delete('/:id', protect, async (req, res) => {
  const id = req.params.id;

  if (getIsConnected()) {
    try {
      await Blog.findByIdAndDelete(id);
    } catch (e) {
      // fallback
    }
  }

  memoryStore.blogs = memoryStore.blogs.filter(b => b._id !== id);
  res.json({ message: 'Blog post deleted successfully' });
});

module.exports = router;
