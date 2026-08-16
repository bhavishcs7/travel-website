const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const User = require('./models/User');

dotenv.config();

const app = express();

// ── Auto-seed: create admin on first startup if ADMIN_EMAIL is configured ────
async function seedAdminUser() {
  const adminEmail    = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName     = process.env.ADMIN_NAME || 'Admin';

  if (!adminEmail || !adminPassword) {
    console.log('ℹ️  ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping automatic admin initialization.');
    return;
  }

  try {
    const normalizedEmail = adminEmail.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
      console.log(`ℹ️  Admin user already exists (${existing.email}) — no action taken.`);
      return;
    }

    // Password is plain text here — User model pre-save hook bcrypt-hashes it
    await User.create({
      name:     adminName,
      email:    normalizedEmail,
      password: adminPassword,
      role:     'admin',
    });

    console.log(`✅ Admin user created: ${normalizedEmail}`);
  } catch (err) {
    // Never crash the backend over an admin seed failure
    console.error('⚠️  Admin auto-initialization failed (non-fatal):', err.message);
  }
}

// ── Startup: connect to DB, seed admin, then start HTTP server ────────────────
async function startup() {
  await connectDB();
  await seedAdminUser();

  app.listen(PORT, () => {
    console.log(`🌍 Wanderlust Backend running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
}

// CORS — restrict to known frontend origin in production
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL]
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    success: true,
    message: 'Wanderlust Travel Creator API is running',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Seed route — only available outside production
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/seed', require('./routes/seedRoutes'));
  console.log('⚠️  Seed route enabled (NODE_ENV is not production)');
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

startup();

