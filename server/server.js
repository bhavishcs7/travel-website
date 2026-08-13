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
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';

// Support both MONGO_URI and MONGODB_URI
const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || (isProduction ? null : 'mongodb://localhost:27017/content_hunter');

if (isProduction && !MONGODB_URI) {
  console.error('FATAL: MONGO_URI environment variable is required in production.');
  process.exit(1);
}

// Production CORS Configuration
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map(url => url.trim().replace(/\/$/, ''))
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (!isProduction) return callback(null, true);
    
    const formattedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(formattedOrigin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  credentials: true,
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
      const email = process.env.ADMIN_EMAIL || (!isProduction ? 'admin@contenthunter.com' : null);
      const password = process.env.ADMIN_PASSWORD || (!isProduction ? 'AdminPassword123!' : null);

      if (!email || !password) {
        console.warn('⚠️ No admin user exists, but ADMIN_EMAIL and ADMIN_PASSWORD were not set in production. Admin account was not auto-created.');
        return;
      }

      console.log('No admin user found. Creating initial admin user...');
      const newAdmin = new Admin({
        name: process.env.ADMIN_NAME || 'Content Hunter Admin',
        email,
        password,
        role: 'admin'
      });
      await newAdmin.save();
      console.log('Initial Admin created successfully.');
    }
  } catch (err) {
    console.error('Error seeding admin user:', err.message);
  }
};

// Global DB Connection Caching
let isConnected = false;
export const connectToDatabase = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }
  if (!MONGODB_URI) {
    throw new Error('MONGO_URI is not defined.');
  }
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = db.connections[0].readyState >= 1;
    console.log(`Successfully connected to MongoDB! Host: ${db.connections[0].host}`);
    await seedAdminUser();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    if (isProduction) {
      throw err;
    }
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    res.status(503).json({ success: false, message: 'Database connection unavailable', error: err.message });
  }
});

// Routes
app.use('/api/places', placeRoutes);
app.use('/api/destinations', placeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/config', configRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState >= 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    message: 'Content Hunter API is running',
    database: dbStatus,
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Standalone server execution for Render / local runtime
if (!process.env.VERCEL) {
  const HOST = '0.0.0.0';
  connectToDatabase().then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on port ${PORT} [Host: ${HOST}] [Env: ${NODE_ENV}]`);
    });
  }).catch((err) => {
    console.error('Fatal: Server startup failed:', err.message);
    if (isProduction) {
      process.exit(1);
    }
  });
}

export default app;
