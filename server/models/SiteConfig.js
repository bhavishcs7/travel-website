import mongoose from 'mongoose';

const SiteConfigSchema = new mongoose.Schema({
  // About Section
  aboutTitle: { type: String, default: 'About Us' },
  aboutSubtitle: { type: String, default: 'ಇತಿಹಾಸ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ನೈಜ ಅನಾವರಣ' },
  aboutDescription1: { type: String, default: 'CONTENT HUNTER is a travel content creation channel...' },
  aboutDescription2: { type: String, default: 'Through cinematic films and on-ground exploration...' },

  // Contact Section
  youtubeLink: { type: String, default: 'https://youtube.com/@contenthunter-o8n' },
  facebookLink: { type: String, default: 'https://www.facebook.com/share/1EZ33PFmsk/' },
  instagramLink: { type: String, default: 'https://instagram.com/contenthunter' },
  email: { type: String, default: 'contact@contenthunter.com' },
  phone: { type: String, default: '' },

  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('SiteConfig', SiteConfigSchema);
