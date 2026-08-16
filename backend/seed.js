'use strict';

/**
 * seed.js
 * -------
 * One-time script to create the first admin user in the MongoDB database.
 *
 * Usage:
 *   npm run seed
 *
 * Required environment variables (set in backend/.env before running):
 *   MONGO_URI       - Full MongoDB connection string (Atlas URI for production)
 *   ADMIN_EMAIL     - Email address for the admin account
 *   ADMIN_PASSWORD  - Password for the admin account (plain text — User model hashes it)
 *
 * Optional environment variables:
 *   ADMIN_NAME      - Display name for the admin (defaults to "Admin" if not set)
 *
 * Behaviour:
 *   - Exits with code 1 if any required env var is missing.
 *   - Exits with code 1 if MongoDB connection fails.
 *   - Exits with code 0 if admin already exists (no duplicate created).
 *   - Exits with code 0 after successfully creating the admin user.
 *   - Always disconnects from MongoDB before exiting.
 *   - Does NOT create any other data (destinations, blogs, videos, etc.).
 *   - Does NOT manually hash the password — the User model pre-save hook handles it.
 */

require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/User');

// ── Read from environment — no hardcoded secrets ──────────────────────────────
const MONGO_URI      = process.env.MONGO_URI;
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME     = process.env.ADMIN_NAME || 'Admin';
// ─────────────────────────────────────────────────────────────────────────────

async function seed() {

  // ── Step 1: Validate required environment variables ───────────────────────
  const missing = [];
  if (!MONGO_URI)      missing.push('MONGO_URI');
  if (!ADMIN_EMAIL)    missing.push('ADMIN_EMAIL');
  if (!ADMIN_PASSWORD) missing.push('ADMIN_PASSWORD');

  if (missing.length > 0) {
    console.error('');
    console.error('❌  Cannot run seed — missing required environment variables:');
    missing.forEach((v) => console.error(`    - ${v}`));
    console.error('');
    console.error('    Add the missing variables to backend/.env and try again.');
    console.error('');
    process.exit(1);
  }

  const normalizedEmail = ADMIN_EMAIL.toLowerCase().trim();

  // ── Step 2: Connect to MongoDB ────────────────────────────────────────────
  console.log('');
  console.log('🔌  Connecting to MongoDB...');

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅  Connected to: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('');
    console.error('❌  MongoDB connection failed:', err.message);
    console.error('    Check that MONGO_URI is correct and the database is reachable.');
    console.error('');
    process.exit(1);
  }

  // ── Step 3: Check for existing user with this email ───────────────────────
  try {
    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
      console.log('');
      console.log('ℹ️   Admin user already exists — no action taken.');
      console.log(`    Email : ${existing.email}`);
      console.log(`    Role  : ${existing.role}`);
      console.log(`    ID    : ${existing._id}`);
      console.log('');
      await mongoose.disconnect();
      console.log('🔌  Disconnected from MongoDB.');
      process.exit(0);
    }

    // ── Step 4: Create the admin user ───────────────────────────────────────
    // The User model's pre('save') hook automatically bcrypt-hashes the
    // password. Supplying plain text here is correct — do NOT hash manually.
    const admin = await User.create({
      name:     ADMIN_NAME,
      email:    normalizedEmail,
      password: ADMIN_PASSWORD,
      role:     'admin',
    });

    console.log('');
    console.log('🎉  Admin user created successfully!');
    console.log(`    Name  : ${admin.name}`);
    console.log(`    Email : ${admin.email}`);
    console.log(`    Role  : ${admin.role}`);
    console.log(`    ID    : ${admin._id}`);
    console.log('');
    console.log('    You can now log in at: /admin/login');
    console.log('');

  } catch (err) {
    console.error('');
    console.error('❌  Error during seed operation:', err.message);
    console.error('');

    try {
      await mongoose.disconnect();
      console.log('🔌  Disconnected from MongoDB.');
    } catch (_) {
      // ignore disconnect error — we are already in a failure path
    }

    process.exit(1);
  }

  // ── Step 5: Disconnect cleanly ────────────────────────────────────────────
  await mongoose.disconnect();
  console.log('🔌  Disconnected from MongoDB.');
  process.exit(0);
}

seed();
