const express = require('express');
const router = express.Router();
const {updateScore, getLeaderboard} = require('../controllers/scoreController')
const getPlayer = require('../middleware/getPlayer')

router.post('/score', getPlayer, updateScore)
router.get('/leaderboard', getLeaderboard)

module.exports = router