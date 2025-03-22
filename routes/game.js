const Leaderboard = require('../model/leaderboard');
const Word = require('../model/word')
const express = require('express')
const router = express.Router()

//get random words (start the game)
router.get('/random-word', async (req, res) => {
    try {
        const count = await Word.countDocuments();
        const random = Math.floor(Math.random() * count)
        const word = await Word.findOne().skip(random)
        res.json(word)
        
    } catch (error) {
        console.error('Error fetching random word:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/add-player', async (req,res) => {
    const {username} = req.body

    if(!username) {
        return res.status(400).json({message: 'username required'})
    }

    try {
        let player = await Leaderboard.findOne({username})

        if(!player) {
            player = new Leaderboard({username, score:0, streak: 0})
            await player.save()
        }
        res.status(201).json({message: 'player added', player})
    } catch (error) {
        console.error('Error adding player:', error)
        res.status(500).json({message: 'Server error'})
    }
});

//validate user word
router.post('/validate-word', async (req, res) => {
    const { currentWord, userWord } = req.body

    //check if user word starts with the last letter of current word
    if (userWord[0].toLowerCase() !== currentWord.slice(-1).toLowerCase()) {
        return res.status(400).json({ message: 'Invalid starting letter!' })
    }

    //check if word exists in the database
    const exists = await Word.findOne({ word: userWord.toLowerCase() })

    if (exists) {
        res.json({ valid: true, nextWord: userWord })
    } else {
        res.status(404).json({ message: 'word not found' })
    }
});


router.post('/score', async (req, res) => {
    const { valid, word, username } = req.body
    if (!username) return res.status(400).json({ message: 'Username required' });
    try {
        let player = await Leaderboard.findOneAndUpdate({ username }, {}, { upsert: true });

        if (!player) {
            player = new Leaderboard({ username, score: 0, streak: 0 }); // Ensure streak is initialized
        }
        if (valid) {
            const points = word.length
            player.score += points
            player.streak++
        } else {
            player.streak = 0
        }
        await player.save()
        res.json({ score: player.score, streak: player.streak })
    } catch (error) {
        console.error('Error updating score:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//store score
// router.post('/submit-score', async (req, res) => {
//     const { username, score } = req.body
//         try {
//             let player = await Leaderboard.findOne({ username });

//             if (!player) {
//                 player = new Leaderboard({ username, score });
//             } else {
//                 player.score = score;
//             }

//             await player.save()
//             res.json({ message: 'score saved!' })
//     } catch (error) {
//             console.error('Error saving score:', error);
//             res.status(500).json({ message: 'Server error' });
//     }
// });

//display leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10)
        res.json(leaderboard)
        
    } catch (error) {
        console.error('Erro loading leaderboard', error)
        res.status(500).json({message: 'Server error'})
    }
});

module.exports = router