const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Alex Rivera'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'admin'
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
  },
  bio: {
    type: String,
    default: 'Full-time travel creator, filmmaker, and adventurer sharing hidden gems across the globe.'
  },
  socials: {
    youtube: { type: String, default: 'https://youtube.com' },
    instagram: { type: String, default: 'https://instagram.com' },
    twitter: { type: String, default: 'https://twitter.com' },
    tiktok: { type: String, default: 'https://tiktok.com' }
  }
}, { timestamps: true });

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
