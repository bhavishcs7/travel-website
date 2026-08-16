const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  aboutTitle: { type: String, default: 'About Content Hunter' },
  aboutSubtitle: { type: String, default: 'Chasing the Unseen & Cinematic' },
  aboutDescription1: { type: String, default: 'We are passionate explorers documenting ancient temples, hidden waterfalls, and heritage monuments.' },
  aboutDescription2: { type: String, default: 'Join us on our journey across incredible destinations.' },
  email: { type: String, default: 'contact@contenthunter.com' },
  phone: { type: String, default: '+91 98765 43210' },
  youtubeLink: { type: String, default: 'https://youtube.com/@contenthunter' },
  instagramLink: { type: String, default: 'https://instagram.com/contenthunter' },
  facebookLink: { type: String, default: 'https://facebook.com/contenthunter' },
}, { timestamps: true });

module.exports = mongoose.model('Config', configSchema);
