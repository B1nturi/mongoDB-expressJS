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

// instance method
todoSchema.methods = {
    findActive: function () {
        return mongoose.model('Todo').find({ status: 'active' });
    }
}

// static method
todoSchema.statics = {
    findActive: function () {
        return mongoose.model('Todo').find({ status: /active/i });
    }
}

// query helper
todoSchema.query = {
    byStatus: function (status) {
        return this.find({ status: new RegExp(status, 'i') }); // i for case-insensitive
    }
}

// export the schema
module.exports = todoSchema;