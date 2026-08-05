const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'Worldwide'
  },
  category: {
    type: String,
    enum: ['Landscape', 'Wildlife', 'Culture', 'Portrait', 'Aerial', 'Urban'],
    default: 'Landscape'
  },
  aspectRatio: {
    type: String,
    enum: ['portrait', 'landscape', 'square'],
    default: 'portrait'
  }
}, { timestamps: true });

module.exports = mongoose.model('GalleryItem', gallerySchema);
