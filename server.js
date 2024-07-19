const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle dynamic routes
app.get('/:countryName', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'details.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
