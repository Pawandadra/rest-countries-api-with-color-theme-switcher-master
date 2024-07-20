const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Handle dynamic routes
app.get('/:countryName', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'details.html'));
});

module.exports = app;