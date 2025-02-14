const mongoose = require('mongoose');


// todo schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    todos: [{
        type: mongoose.Types.ObjectId,
        ref: 'Todo'
    }] // Reference to the Todo model
});

// export the schema
module.exports = userSchema;