// Content Hunter Clean Store - Zero Sample Data
const memoryStore = {
  users: [
    {
      _id: 'user-admin',
      name: 'Content Hunter Admin',
      email: 'admin@contenthunter.com',
      password: 'Password123!',
      role: 'admin',
      bio: 'Exploring ancient heritage, historical temples, forts, and unfolding untold stories.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      socials: {
        youtube: 'https://youtube.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        tiktok: 'https://tiktok.com'
      }
    }
  ],

  destinations: [],
  blogs: [],
  videos: [],
  gallery: [],
  messages: []
};

module.exports = memoryStore;
