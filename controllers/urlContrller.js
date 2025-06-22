const Url = require('../models/Url');
const shortid = require('shortid');

const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  const shortId = shortid.generate();
  const baseUrl = 'https://url-shortener-api-lkfl.onrender.com'; // Replace with your Render backend URL

  try {
    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();

    res.json({ shortUrl: `${baseUrl}/${shortId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortId });

    if (urlEntry) {
      return res.redirect(urlEntry.originalUrl);
    } else {
      return res.status(404).json({ message: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createShortUrl, redirectToOriginalUrl };
