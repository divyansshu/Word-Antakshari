const Word = require('../model/word')
const Leaderboard = require('../model/leaderboard')
//get random word
const getRandomWord = async (req, res) => {
    try {
        const count = await Word.countDocuments();
        const random = Math.floor(Math.random() * count)
        const word = await Word.findOne().skip(random)
        res.json({ word: word.word })

    } catch (error) {
        console.error('Error fetching random word:', error);
        res.status(500).json({ message: 'Failed to fetch random word' });
    }
}

//validate word
const validateWord = async (req, res) => {
    const { currentWord, userWord, username } = req.body
    console.log('\n🔹 Received on Backend:');
    console.log(`Current Word: ${currentWord}`);
    console.log(`User Word: ${userWord}`);
    console.log(`Username: ${username}`);
    console.log('Received on backend:', { currentWord, userWord, username });

    try {
        if (!currentWord || !userWord || !username) {
            console.log('❌ Missing data in the request');
            return res.status(400).json({ valid: false, message: 'Invalid request' });
        }
        //check if user word starts with the last letter of current word
        if (userWord[0].toLowerCase() !== currentWord.slice(-1).toLowerCase()) {
            console.log('❌ Invalid starting letter!');
            return res.status(400).json({ message: 'Invalid starting letter!' })
        }

        //check if word exists in the database
        const exists = await Word.findOne({ word: userWord.toLowerCase() })

        if (exists) {
            console.log('✅ Valid word found:', userWord);
            res.json({ valid: true, nextWord: userWord })
        } else {
            console.log('❌ Word not found:', userWord);
            res.status(404).json({ valid: false, message: 'word not found' })
        }

    } catch (error) {
        console.error('Error validating word:', error);
        res.status(500).json({ valid: false, message: 'Failed to validate word' });
    }
}

const addPlayer = async(req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        let player = await Leaderboard.findOne({ username });

        if (!player) {
            player = await Leaderboard.create({ username });
        }

        res.status(201).json({ message: 'Player added successfully', player });
    } catch (error) {
        console.error('Error adding player:', error);
        res.status(500).json({ message: 'Failed to add player' });
    }
}


module.exports = {getRandomWord,addPlayer, validateWord}