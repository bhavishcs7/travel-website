const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Wanderlust Travel Creator API',
    status: 'online',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/seed', require('./routes/seedRoutes'));

// 404 & Global Error Handling Middleware
app.use((req, res) => {
  res.status(404).json({ message: 'API Route Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌍 Wanderlust Backend Server running on port ${PORT}`);
});
