const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        index: true
    },
    mood: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Mood', MoodSchema);
