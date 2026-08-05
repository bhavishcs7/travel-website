const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['youtube', 'instagram'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  embedId: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    type: String,
    default: 'Global Adventure'
  },
  views: {
    type: String,
    default: '125K views'
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
