const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;

// Increase event listeners limit
require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware setup - IMPORTANT: Body parser should come before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (if any)
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const codeRouter = require('./pair'); // Make sure this file exists

// Routes
app.use('/code', codeRouter);

// HTML file serving
app.get('/pair', (req, res) => {
    res.sendFile(path.join(__dirname, 'pair.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
    console.log(`
    Server running on port: ${PORT}
    Local: http://localhost:${PORT}
    `);
});

module.exports = app;
