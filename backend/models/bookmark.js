const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
