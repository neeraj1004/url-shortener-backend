const express = require('express');
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlController');

const router = express.Router();

// Create short URL
router.post('/shorten', createShortUrl);

// Redirect to original URL from short one
router.get('/:shortId', redirectToOriginalUrl);  // 👈 This is the redirection route

module.exports = router;
