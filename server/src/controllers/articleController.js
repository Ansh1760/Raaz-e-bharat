const Article = require('../models/Article');
const path = require('path');
const fs = require('fs');

// @desc   Get all articles (paginated)
// @route  GET /api/articles
// @access Public
const getArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const category = req.query.category;
    const skip = (page - 1) * limit;

    const filter = { isPublished: true };
    if (category && category !== 'All') {
      filter.category = category;
    }

    const [articles, total] = await Promise.all([
      Article.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Article.countDocuments(filter),
    ]);

    res.json({
      success: true,
      articles,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc   Get single article by ID
// @route  GET /api/articles/:id
// @access Public
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article || !article.isPublished) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.json({ success: true, article });
  } catch (error) {
    console.error('Get article error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc   Create article
// @route  POST /api/articles
// @access Private (Admin)
const createArticle = async (req, res) => {
  try {
    const { title, description, content, category, author } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const article = await Article.create({
      title,
      description,
      content: content || '',
      image: imageUrl,
      category: category || 'General',
      author: author || 'Raaz-e-Bharat',
    });

    res.status(201).json({ success: true, article });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc   Update article
// @route  PUT /api/articles/:id
// @access Private (Admin)
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    const { title, description, content, category, author, isPublished } = req.body;

    if (title) article.title = title;
    if (description) article.description = description;
    if (content !== undefined) article.content = content;
    if (category) article.category = category;
    if (author) article.author = author;
    if (isPublished !== undefined) article.isPublished = isPublished;

    // Update image if new file uploaded
    if (req.file) {
      // Delete old image if exists
      if (article.image) {
        const oldPath = path.join(__dirname, '../../public', article.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      article.image = `/uploads/${req.file.filename}`;
    }

    const updated = await article.save();
    res.json({ success: true, article: updated });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc   Delete article
// @route  DELETE /api/articles/:id
// @access Private (Admin)
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    // Delete image file if exists
    if (article.image) {
      const imagePath = path.join(__dirname, '../../public', article.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Article.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc   Get all articles for admin (including unpublished)
// @route  GET /api/articles/admin/all
// @access Private (Admin)
const getAllArticlesAdmin = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json({ success: true, articles });
  } catch (error) {
    console.error('Get admin articles error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getArticles, getArticleById, createArticle, updateArticle, deleteArticle, getAllArticlesAdmin };
