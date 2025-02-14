const express = require('express');

// express app initialization
const app = express();
app.use(express.json());

// application routes

// default error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
});

// server initialization
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});