const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Handle dynamic routes
app.get('/:countryName', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'details.html'));
});

// Default route for undefined paths
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Export the Express app as a serverless function
module.exports = (req, res) => {
    app(req, res);
};
