const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        max: 255
    },

    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('user', User);