const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const wordRoutes = require('./routes/wordRoutes')
const scoreRoutes = require('./routes/scoreRoutes')
const cors = require('cors')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors( {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['content-Type', 'Authorization']
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.error('DB connection error:', err));

app.use('/api/words', wordRoutes)
app.use('/api/scores', scoreRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on port ${PORT}`));