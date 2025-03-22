# Word-Antakshari-game
A fun and interactive web-based Word Antakshari game built using Node.js, Express.js, MongoDB, and Vanilla JavaScript. Players can submit words, earn scores, and track their streaks. It also features a leaderboard to display the top players.

🚀 Features
📝 Word validation with dynamic word chaining logic.
📊 Score and streak tracking per player.
🏅 Leaderboard to display top players.
🔥 User authentication with session-based username storage.
📦 MongoDB integration to persist scores and streaks.

🛠️ Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
API Calls: Fetch API

🔥 How to Play
Enter your username when prompted.
You’ll see a random starting word.
Enter a valid word starting with the last letter of the current word.
✅ If valid, you earn points and streak increases.
❌ If invalid, streak resets.
You can view the leaderboard by clicking the "Show Leaderboard" button.

🛠️ API Endpoints
📌 Words API
POST /words/add-player: Add new player to the database.
GET /words/random-word: Get a random starting word.
POST /words/validate-word: Validate user word against the current word.
📌 Scores API
POST /scores/score: Update player score and streak.
GET /scores/leaderboard: Retrieve leaderboard data.

📊 Leaderboard
Displays top players with their scores and streaks.
Updated in real-time as players submit words.

/ANTAKSHARI-GAME
 ├── controllers         # Controller logic for handling requests
 ├── db                  # Static word data or seed data
 ├── middleware          # Middleware functions
 ├── model               # MongoDB Models
 ├── routes              # Express Routes
 ├── screenshots         # Screenshots of the game
 ├── .gitignore          # Ignored files for Git
 ├── index.html          # Game UI
 ├── package.json        # Dependencies and scripts
 ├── README.md           # Project documentation
 ├── script.js           # Game Logic (Frontend)
 ├── server.js           # Main Backend Server
 ├── style.css           # Stylesheet
