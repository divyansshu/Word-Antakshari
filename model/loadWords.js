const fs = require('fs')
const Word = require('./word')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect('mongodb+srv://divyansshu:7eR8%23xiiru%21RZP9@cluster0.rbu4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const importWords = async () => {
    try {
        const data = fs.readFileSync('../data/words_alpha.txt', 'utf8');
        const words = data.split('\n').map(word => word.trim().toLowerCase());
        const bulkOps = words.map(word => ({
            updateOne: {
                filter: {word},
                update: {$setOnInsert: {word}},
                upsert: true
            }
        }));
        await Word.bulkWrite(bulkOps)
        console.log(`Inserted ${words.length} words into MongoDB`)
        mongoose.connection.close()
    }
    catch (error) {
        console.log('Error importing words:', error)
    }
}

importWords();