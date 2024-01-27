const express = require('express');
const mongodb = require('./db/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for handling CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Middleware for parsing request body as JSON
app.use(express.json());

// Routes
app.use('/', require('./routes'));

// Error handling for unhandled exceptions
process.on('uncaughtException', (err, origin) => {
    console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error appropriately
});

// Initialize MongoDB connection
mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        // Start the server after successful MongoDB connection
        app.listen(port, () => {
            console.log(`Connected to DB and Running on port ${port}`);
        });
    }
});
