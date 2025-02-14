const mongoose = require('mongoose');


// todo schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// export the schema
module.exports = todoSchema;