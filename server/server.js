import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import placeRoutes from './routes/placeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import Admin from './models/Admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/content_hunter';

// Enable Permissive CORS for local dev
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads folder for image serving
const uploadDir = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/api/places', placeRoutes);
app.use('/api/auth', authRoutes);

import configRoutes from './routes/configRoutes.js';
app.use('/api/config', configRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Content Hunter API is running' });
});

// Seed Initial Admin User if none exists
const seedAdminUser = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('No admin user found. Creating initial admin user...');
      const newAdmin = new Admin({
        name: 'Content Hunter Admin',
        email: 'admin@contenthunter.com',
        password: 'AdminPassword123!',
        role: 'admin'
      });
      await newAdmin.save();
      console.log('Initial Admin created successfully: admin@contenthunter.com');
    }
  } catch (err) {
    console.error('Error seeding admin user:', err.message);
  }
};

// Database Connection & Server Start
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Successfully connected to MongoDB!');
    await seedAdminUser();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT} (MongoDB reconnecting...)`);
    });
  });
