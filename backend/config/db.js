const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wanderlust';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000 // Quick timeout if local DB isn't running
    });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Connection Notice: ${error.message}. API running with fallback memory seed data.`);
    isConnected = false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
