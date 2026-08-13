const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['Historical', 'Heritage', 'Architecture', 'Fort', 'Nature', 'Temple', 'Cave', 'Waterfall', 'Mountain', 'Beach', 'Culture', 'Adventure', 'Island', 'Forest', 'City', 'Desert', 'Other'],
  },
  coverImage: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  travelBudget: {
    type: String,
    default: '$500 - $1,200 / week'
  },
  bestTime: {
    type: String,
    default: 'October to April'
  },
  googleMapsUrl: {
    type: String,
    default: ''
  },
  youtubeUrl: {
    type: String,
    default: ''
  },
  instagramReelUrl: {
    type: String,
    default: ''
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published'
  },
  rating: {
    type: Number,
    default: 4.9
  }
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);
