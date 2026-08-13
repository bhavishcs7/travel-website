const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  coverImage: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  author: {
    name: { type: String, default: '' },
    avatar: { type: String, default: '' }
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published'
  },
  tags: [{
    type: String
  }],
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
