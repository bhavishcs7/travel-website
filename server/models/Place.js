import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: [true, 'Place name is required'],
    trim: true
  },
  state: {
    type: String,
    default: '',
    trim: true
  },
  district: {
    type: String,
    default: '',
    trim: true
  },
  category: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  history: {
    type: String,
    default: '',
    trim: true
  },
  bestTimeToVisit: {
    type: String,
    default: '',
    trim: true
  },
  coverImage: {
    type: String,
    default: '/content_hunter_camera_logo.jpg'
  },
  galleryImages: {
    type: [String],
    default: []
  },
  youtubeLink: {
    type: String,
    default: '',
    trim: true
  },
  instagramLink: {
    type: String,
    default: '',
    trim: true
  },
  googleMapsLink: {
    type: String,
    default: '',
    trim: true
  },
  dateVisited: {
    type: Date,
    default: null
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Place', PlaceSchema);
