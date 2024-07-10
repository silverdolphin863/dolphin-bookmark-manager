const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');
const shortid = require('shortid');

// Add a new bookmark
router.post('/add', async (req, res) => {
  const { title, originalUrl, category } = req.body;
  const urlCode = shortid.generate();
  const shortUrl = `http://localhost:3008/${urlCode}`;

  const newBookmark = new Bookmark({
    title,
    originalUrl,
    shortUrl,
    category
  });

  await newBookmark.save();
  res.json(newBookmark);
});

// List all bookmarks
router.get('/', async (req, res) => {
  const bookmarks = await Bookmark.find();
  res.json(bookmarks);
});

// Delete a bookmark
router.delete('/:id', async (req, res) => {
  await Bookmark.findByIdAndDelete(req.params.id);
  res.json({ message: 'Bookmark deleted' });
});

module.exports = router;
