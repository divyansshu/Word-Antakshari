const express = require('express')
const router = express.Router()
const {getRandomWord, addPlayer, validateWord} = require('../controllers/wordController')
const getPlayer = require('../middleware/getPlayer')

router.get('/random-word', getRandomWord)
router.post('/validate-word', getPlayer, validateWord)
router.post('/add-player', addPlayer)

module.exports = router