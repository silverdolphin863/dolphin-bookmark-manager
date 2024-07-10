const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/bookmarkmanager', { useNewUrlParser: true, useUnifiedTopology: true });

const bookmarkRoutes = require('./routes/bookmarks');

app.use(bodyParser.json());
app.use('/api/bookmarks', bookmarkRoutes);

app.use(express.static('../frontend'));

app.listen(3008, () => console.log('Server running on port 3008'));
