const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const Url = require('../models/Url');

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortId = nanoid(6);
  const url = new Url({ originalUrl, shortId });
  await url.save();
  res.json({ shortUrl: `http://localhost:5000/${shortId}` });
});

router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });
  if (url) return res.redirect(url.originalUrl);
  res.status(404).json({ message: 'URL not found' });
});

module.exports = router;
