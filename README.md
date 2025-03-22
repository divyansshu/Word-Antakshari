# Word Antakshari Game

A fun and interactive web-based Word Antakshari game built using Node.js, Express.js, MongoDB, and Vanilla JavaScript. Players can submit words, earn scores, and track their streaks. It also features a leaderboard to display the top players.

---

## 🚀 Features
- **Dynamic Word Validation:** Word chaining logic for valid gameplay.
- **Score and Streak Tracking:** Real-time tracking per player.
- **Leaderboard:** Displays top players with scores and streaks.
- **User Authentication:** Session-based username storage.
- **MongoDB Integration:** Persistent storage for scores and streaks.

---

## ✅ Prerequisites
Ensure the following are installed before running the project:
- **Node.js** (v18+ recommended)
- **MongoDB** (local or Atlas)
- **Git**

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API Calls:** Fetch API

---

## 🔥 How to Play
1. Enter your username when prompted.
2. Receive a random starting word.
3. Submit a valid word starting with the last letter of the current word:
   - ✅ Earn points and streaks for valid entries.
   - ❌ Reset streaks for invalid entries.
4. Click the "Show Leaderboard" button to view top players.

---

## 🛠️ API Endpoints

### 📌 Words API
- `POST /words/add-player`: Add a new player to the database.
- `GET /words/random-word`: Retrieve a random starting word.
- `POST /words/validate-word`: Validate user word against the current word.

### 📌 Scores API
- `POST /scores/score`: Update player score and streak.
- `GET /scores/leaderboard`: Retrieve leaderboard data.

---

## 📊 Leaderboard
- Displays top players with their scores and streaks.
- Updated in real-time as players submit words.

---

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/divyansshu/Word-Antakshari.git
   cd Word-Antakshari
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure MongoDB:
   - Make sure MongoDB is running on `mongodb://127.0.0.1:27017/`
   - The application will automatically create a database named `antakshari`

4. Load the dictionary:
   - Place the `words_alpha.txt` file in the data folder
   - Run the words loader script:
     ```
     node model/wordsLoader.js
     ```

## 🚀 Running the Project

### Start the Backend Server
Run the following command to start the backend server:
```bash
node server.js
```
The backend server will be available at http://localhost:5000.

### Open the Game in Your Browser
After starting the server, you can open the  file in your browser. You can either double-click the file or use one of the commands below, depending on your operating system:
```
start index.html
```
✅ The game will now be ready to play in your browser. Have fun!
   

## 📷 Screenshots

![Screenshot 2025-03-22 160512](https://github.com/user-attachments/assets/5f359eb3-4eaa-4fe1-bac3-e7cebd6bbb91)
![Screenshot 2025-03-22 161218](https://github.com/user-attachments/assets/2d4675d2-64ba-4198-a699-46a9bbb999ea)
![Screenshot 2025-03-22 161234](https://github.com/user-attachments/assets/3f548121-5252-4237-8e3b-de2dcbfcf5d7)
![Screenshot 2025-03-22 161316](https://github.com/user-attachments/assets/788fbe60-5f49-4f6f-a1ea-08a8663fcc18)

## 📂 Project Directory
**/ANTAKSHARI-GAME**

## 📂 Folder Descriptions

- **controllers:** Handles the logic for incoming requests and integrates with other parts of the project.
- **db:** Contains static word data or seed data necessary for the game.
- **middleware:** Houses middleware functions to process requests.
- **model:** MongoDB models for interacting with the database.
- **routes:** Defines the express routes for the application.
- **screenshots:** Stores screenshots that demonstrate the game's UI or features.

## 📂 File Descriptions

- **.gitignore:** Specifies files or directories to be ignored by Git.
- **index.html:** The main game UI file written in HTML.
- **package.json:** Contains project metadata, dependencies, and scripts.
- **README.md:** The project's documentation (that's this file!).
- **script.js:** Includes the game logic for the frontend.
- **server.js:** Entry point for the backend, managing server-side logic.
- **style.css:** The stylesheet for the game's UI.

---
