const mongoose = require('mongoose')
const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true
    },
    length: {
        type: Number,
        required: true
    }
});
const Word = new mongoose.model('Word', wordSchema)
module.exports = Word