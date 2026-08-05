import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Place from '../models/Place.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'place-' + uniqueSuffix + ext);
  }
});

// File Filter for Images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }
});

const cpUpload = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 15 }
]);

const getFileUrl = (filename) => `/uploads/${filename}`;

// PUBLIC API: GET /api/places - Get all published places
router.get('/', async (req, res) => {
  try {
    const places = await Place.find({ isPublished: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: places.length, data: places });
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ success: false, message: error.message || 'Server Error while fetching places.' });
  }
});

// PROTECTED API: GET /api/places/admin - Get all places
router.get('/admin', protectAdmin, async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: places.length, data: places });
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ success: false, message: error.message || 'Server Error while fetching places.' });
  }
});

// PUBLIC API: GET /api/places/:id - Get single place
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }
    // Optional: could restrict to published only for non-admins, but leaving open so admins can preview
    res.status(200).json({ success: true, data: place });
  } catch (error) {
    console.error('Error fetching place:', error);
    res.status(500).json({ success: false, message: 'Invalid ID or Server Error' });
  }
});

// PROTECTED API: POST /api/places - Create place (Requires JWT Admin Auth)
router.post('/', protectAdmin, cpUpload, async (req, res) => {
  try {
    const { 
      placeName, description, youtubeLink, instagramLink, googleMapsLink, dateVisited, coverImageUrl,
      state, district, category, history, bestTimeToVisit, isPublished, isFeatured
    } = req.body;

    if (!placeName || !placeName.trim()) {
      return res.status(400).json({ success: false, message: 'Place Name is required.' });
    }

    let coverImage = '/content_hunter_camera_logo.jpg';
    if (req.files && req.files.coverImage && req.files.coverImage.length > 0) {
      coverImage = getFileUrl(req.files.coverImage[0].filename);
    } else if (coverImageUrl && coverImageUrl.trim()) {
      coverImage = coverImageUrl.trim();
    }

    let galleryImages = [];
    if (req.files && req.files.galleryImages && req.files.galleryImages.length > 0) {
      galleryImages = req.files.galleryImages.map(file => getFileUrl(file.filename));
    } else if (req.body.galleryImageUrls) {
      try {
        galleryImages = JSON.parse(req.body.galleryImageUrls);
      } catch (e) {
        galleryImages = Array.isArray(req.body.galleryImageUrls) ? req.body.galleryImageUrls : [req.body.galleryImageUrls];
      }
    }

    const newPlace = new Place({
      placeName: placeName.trim(),
      description: description ? description.trim() : '',
      state: state ? state.trim() : '',
      district: district ? district.trim() : '',
      category: category ? category.trim() : '',
      history: history ? history.trim() : '',
      bestTimeToVisit: bestTimeToVisit ? bestTimeToVisit.trim() : '',
      isPublished: isPublished === 'true' || isPublished === true,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      coverImage,
      galleryImages,
      youtubeLink: youtubeLink ? youtubeLink.trim() : '',
      instagramLink: instagramLink ? instagramLink.trim() : '',
      googleMapsLink: googleMapsLink ? googleMapsLink.trim() : '',
      dateVisited: dateVisited ? new Date(dateVisited) : null
    });

    const savedPlace = await newPlace.save();
    res.status(201).json({ success: true, message: 'Place saved successfully!', data: savedPlace });
  } catch (error) {
    console.error('Error creating place:', error);
    res.status(500).json({ success: false, message: error.message || 'Server Error while saving place.' });
  }
});

// PROTECTED API: PUT /api/places/:id - Update place (Requires JWT Admin Auth)
router.put('/:id', protectAdmin, cpUpload, async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }

    const { 
      placeName, description, youtubeLink, instagramLink, googleMapsLink, dateVisited, coverImageUrl,
      state, district, category, history, bestTimeToVisit, isPublished, isFeatured
    } = req.body;

    if (placeName && placeName.trim()) place.placeName = placeName.trim();
    if (description !== undefined) place.description = description.trim();
    if (state !== undefined) place.state = state.trim();
    if (district !== undefined) place.district = district.trim();
    if (category !== undefined) place.category = category.trim();
    if (history !== undefined) place.history = history.trim();
    if (bestTimeToVisit !== undefined) place.bestTimeToVisit = bestTimeToVisit.trim();
    
    if (isPublished !== undefined) place.isPublished = isPublished === 'true' || isPublished === true;
    if (isFeatured !== undefined) place.isFeatured = isFeatured === 'true' || isFeatured === true;

    if (youtubeLink !== undefined) place.youtubeLink = youtubeLink.trim();
    if (instagramLink !== undefined) place.instagramLink = instagramLink.trim();
    if (googleMapsLink !== undefined) place.googleMapsLink = googleMapsLink.trim();
    if (dateVisited !== undefined) place.dateVisited = dateVisited ? new Date(dateVisited) : null;

    if (req.files && req.files.coverImage && req.files.coverImage.length > 0) {
      place.coverImage = getFileUrl(req.files.coverImage[0].filename);
    } else if (coverImageUrl) {
      place.coverImage = coverImageUrl.trim();
    }

    if (req.files && req.files.galleryImages && req.files.galleryImages.length > 0) {
      const newGallery = req.files.galleryImages.map(file => getFileUrl(file.filename));
      place.galleryImages = [...place.galleryImages, ...newGallery];
    }

    const updatedPlace = await place.save();
    res.status(200).json({ success: true, message: 'Place updated successfully!', data: updatedPlace });
  } catch (error) {
    console.error('Error updating place:', error);
    res.status(500).json({ success: false, message: error.message || 'Server Error while updating place.' });
  }
});

// PROTECTED API: DELETE /api/places/:id - Delete place (Requires JWT Admin Auth)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }

    await Place.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Place deleted successfully!' });
  } catch (error) {
    console.error('Error deleting place:', error);
    res.status(500).json({ success: false, message: error.message || 'Server Error while deleting place.' });
  }
});

export default router;
