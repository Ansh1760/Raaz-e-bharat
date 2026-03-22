const express = require('express');
const router = express.Router();
const { getVideos } = require('../controllers/youtubeController');

router.get('/videos', getVideos);

module.exports = router;

