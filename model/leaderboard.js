const mongoose = require('mongoose')
const leaderboardSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    score: { type: Number, required: true, default: 0 },
    streak: { type: Number, required: true, default: 0 }, // Tracks consecutive valid words
    createdAt: { type: Date, default: Date.now } // Timestamp for sorting
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
module.exports = Leaderboard