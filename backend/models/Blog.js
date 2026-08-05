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
    name: { type: String, default: 'Alex Rivera' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300' }
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
