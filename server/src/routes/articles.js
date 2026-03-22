const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticlesAdmin,
} = require('../controllers/articleController');
const { protect, adminOnly } = require('../middleware/auth');

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Public routes
router.get('/', getArticles);

// Admin routes — MUST be before /:id to avoid 'admin' being cast as ObjectId
router.get('/admin/all', protect, adminOnly, getAllArticlesAdmin);
router.post('/', protect, adminOnly, upload.single('image'), createArticle);
router.put('/:id', protect, adminOnly, upload.single('image'), updateArticle);
router.delete('/:id', protect, adminOnly, deleteArticle);

// Public single article — keep AFTER admin routes
router.get('/:id', getArticleById);

module.exports = router;
