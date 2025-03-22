const Leaderboard = require('../model/leaderboard')

//update score
const updateScore = async (req, res) => {

    try {
        const { valid, word } = req.body
        const player = req.player
        if (!player) return res.status(400).json({ message: 'player not found' });

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
        res.status(500).json({ message: 'Failed to update score' });
    }
}

//get leaderboard
const getLeaderboard = async (req ,res) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ score: -1, streak: -1 }).limit(10)
        res.json(leaderboard)

    } catch (error) {
        console.error('Erro loading leaderboard', error)
        res.status(500).json({ message: 'Failed to fetch leaderboard' })
    }
}

module.exports = {updateScore, getLeaderboard}