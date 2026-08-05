const multer = require('multer');
const path = require('path');

// Memory storage for flexibility (can upload to Cloudinary or return Base64/Data URI)
const storage = multer.memoryStorage();

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only (jpeg, jpg, png, webp, gif)!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports = upload;
