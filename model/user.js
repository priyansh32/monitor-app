const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dsa: [{
        platform: String,
        difficulty: String,
        link: String,
        date: Date,
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
