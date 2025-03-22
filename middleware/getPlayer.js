    const Leaderboard = require('../model/leaderboard')

    const getPlayer = async (req, res, next) => {

        const { username } = req.body;

        if (!username) {
            console.log("❌ Missing username");
            return res.status(400).json({ message: 'Username is required' });
        }

        try {
            // Find or create the player
            let player = await Leaderboard.findOne({ username });

            if (!player) {
                console.log(`❌ Player not found: ${username}`);
                player = await Leaderboard.create({ username });
            }

            // Attach player to the request
            req.player = player;
            next();
        } catch (error) {
            console.error('Error in getPlayer middleware:', error);
            res.status(500).json({ message: 'Server error' });
        }
    };

    module.exports = getPlayer;