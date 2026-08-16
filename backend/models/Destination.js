const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: ''
  },
  placeName: {
    type: String,
    trim: true,
    default: ''
  },
  slug: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: 'India'
  },
  state: {
    type: String,
    default: ''
  },
  district: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Historical'
  },
  coverImage: {
    type: String,
    default: '/content_hunter_logo_transparent.png'
  },
  images: [{
    type: String
  }],
  galleryImages: [{
    type: String
  }],
  description: {
    type: String,
    default: ''
  },
  history: {
    type: String,
    default: ''
  },
  travelBudget: {
    type: String,
    default: '$500 - $1,200 / week'
  },
  bestTime: {
    type: String,
    default: 'October to April'
  },
  bestTimeToVisit: {
    type: String,
    default: ''
  },
  googleMapsUrl: {
    type: String,
    default: ''
  },
  googleMapsLink: {
    type: String,
    default: ''
  },
  youtubeUrl: {
    type: String,
    default: ''
  },
  youtubeLink: {
    type: String,
    default: ''
  },
  instagramReelUrl: {
    type: String,
    default: ''
  },
  instagramLink: {
    type: String,
    default: ''
  },
  dateVisited: {
    type: String,
    default: ''
  },
  isPublished: {
    type: Boolean,
    default: true
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
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

destinationSchema.pre('save', function (next) {
  if (!this.title && this.placeName) {
    this.title = this.placeName;
  }
  if (!this.placeName && this.title) {
    this.placeName = this.title;
  }
  if (!this.slug && (this.title || this.placeName)) {
    const name = this.title || this.placeName;
    this.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString(36);
  }
  if (!this.bestTime && this.bestTimeToVisit) {
    this.bestTime = this.bestTimeToVisit;
  }
  if (!this.bestTimeToVisit && this.bestTime) {
    this.bestTimeToVisit = this.bestTime;
  }
  if (!this.youtubeUrl && this.youtubeLink) {
    this.youtubeUrl = this.youtubeLink;
  }
  if (!this.youtubeLink && this.youtubeUrl) {
    this.youtubeLink = this.youtubeUrl;
  }
  if (!this.googleMapsUrl && this.googleMapsLink) {
    this.googleMapsUrl = this.googleMapsLink;
  }
  if (!this.googleMapsLink && this.googleMapsUrl) {
    this.googleMapsLink = this.googleMapsUrl;
  }
  if (!this.instagramReelUrl && this.instagramLink) {
    this.instagramReelUrl = this.instagramLink;
  }
  if (!this.instagramLink && this.instagramReelUrl) {
    this.instagramLink = this.instagramReelUrl;
  }
  next();
});

module.exports = mongoose.model('Destination', destinationSchema);
