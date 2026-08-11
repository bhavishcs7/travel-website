import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import placeRoutes from './routes/placeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import configRoutes from './routes/configRoutes.js';
import Admin from './models/Admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/content_hunter';

// Enable Permissive CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads folder for local development image serving
const uploadDir = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadDir));

// Seed Initial Admin User if none exists
const seedAdminUser = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('No admin user found. Creating initial admin user...');
      const newAdmin = new Admin({
        name: 'Content Hunter Admin',
        email: process.env.ADMIN_EMAIL || 'admin@contenthunter.com',
        password: process.env.ADMIN_PASSWORD || 'AdminPassword123!',
        role: 'admin'
      });
      await newAdmin.save();
      console.log('Initial Admin created successfully.');
    }
  } catch (err) {
    console.error('Error seeding admin user:', err.message);
  }
};

// Global DB Connection Caching for Serverless
let isConnected = false;
export const connectToDatabase = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState >= 1;
    console.log('Successfully connected to MongoDB!');
    await seedAdminUser();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Routes
app.use('/api/places', placeRoutes);
app.use('/api/destinations', placeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/config', configRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Content Hunter API is running' });
});

// Run standalone server when executed directly locally
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
}

export default app;
