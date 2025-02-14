const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

// express app initialization
const app = express();
dotenv.config();
app.use(express.json());

// database connection with mongoose
mongoose.connect("mongodb://localhost:27017/todo-data", {
})
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log(err));

// application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

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