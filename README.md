# Wanderlust - Travel Creator Website & Admin CMS 🌍

A modern, production-ready travel content creator website and full admin portal. Built for travel vloggers, influencers, photographers, and filmmakers.

## 🚀 Features

### Public Website
- **Hero & Storytelling**: Fullscreen cinematic hero, stats counters, creator introduction, and social proof.
- **Destinations Hub**: Filter travel spots by Country and Category (Island, Beach, Mountain, Culture, etc.), real-time search, travel budget indicators, and best visiting seasons.
- **Destination Details**: Google Maps integration, YouTube video embeds, Instagram Reel previews, and photo galleries.
- **Travel Blogs**: Responsive blog cards, categories, estimated reading times, and rich markdown text rendering.
- **Cinematic Media Hub**: Combined YouTube vlogs and Instagram Reels interactive video embeds.
- **Masonry Photo Gallery**: Interactive photo gallery with full-screen Lightbox zoom and metadata viewer.
- **Contact & Collaboration**: Functional contact form, social handle shortcuts, and Canggu studio map embed.

### Admin Panel (`/admin`)
- **Protected JWT Authentication**: Secure admin login (`admin@wanderlust.com` / `Password123!`).
- **Dashboard Overview**: Metrics overview, recent brand inquiries, and quick shortcuts.
- **CRUD Operations**: Complete management of Destinations, Blogs, Videos, Gallery items, and Messages.
- **Publish & Draft Controls**: Toggle content visibility instantly.
- **Creator Settings**: Update profile bio, avatar image, and social media handles.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion, Axios, React Router v6
- **Backend**: Node.js, Express.js, Mongoose, JWT, Cors, Multer
- **Database**: MongoDB Atlas (with automatic fallback seed data)
- **Deployment**: Vercel (Frontend) & Render (Backend)

---

## ⚡ Quick Start & Local Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Start Servers

**Start Backend Server (Port 5000):**
```bash
cd backend
npm run dev
```

**Start Frontend Server (Port 3000):**
```bash
cd frontend
npm run dev
```

Visit the app in your browser at `http://localhost:3000`.

### 3. Default Admin Login Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@wanderlust.com`
- **Password**: `Password123!`

---

## 🌐 Production Deployment Guide

### Deploying Backend to Render
1. Create a Web Service on [Render.com](https://render.com).
2. Connect your Git repository and set Root Directory to `backend`.
3. Build Command: `npm install`
4. Start Command: `node index.js`
5. Set Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas Connection String
   - `JWT_SECRET`: Random secure string
   - `PORT`: `5000`

### Deploying Frontend to Vercel
1. Import your repository into [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Framework Preset: `Vite`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Set Environment Variable:
   - `VITE_API_URL`: `https://your-backend-render-app.onrender.com/api`
