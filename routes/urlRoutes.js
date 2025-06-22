const express = require('express');
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlController');

const router = express.Router();

router.post('/shorten', createShortUrl);       // ✅ POST for shortening
router.get('/:shortId', redirectToOriginalUrl); // ✅ GET for redirecting

module.exports = router;
