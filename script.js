const API_URL = 'http://localhost:5000/api'

let currentWord = ''

document.addEventListener('DOMContentLoaded', async () => {
    await askForUsername()
    loadRandomWord()
    displayUsername()
})

async function askForUsername() {
    let username = sessionStorage.getItem('username') || prompt('Enter your username:')
    console.log(username)
    if (!username) {
        alert('Username is required to play')
        window.location.reload();
        return
    }
    sessionStorage.setItem('username', username)
    displayUsername()

    // add the player to the database
    try {
        await fetch(`${API_URL}/words/add-player`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });
        console.log('player added')
    } catch (error) {
        console.error('Error adding player:', error)
    }
}

function displayUsername() {
    const username = sessionStorage.getItem('username');
    const usernameElement = document.getElementById('username');

    if (username && usernameElement) {
        usernameElement.innerText = username;
    } else {
        console.error("Username element not found or username missing.");
    }
}

async function loadRandomWord() {
    try {
        const res = await fetch(`${API_URL}/words/random-word`)
        if (!res.ok) {
            throw new Error('Failed to fetch random word')
        }
        const data = await res.json()
        currentWord = data.word;
        document.getElementById('current-word').innerText = currentWord
        console.log(`🔹 Loaded Random Word: ${currentWord}`);
    } catch (error) {
        console.log('Error fetching random word:', error)
        document.getElementById('current-word').innerText = 'Error loading Word!'
    }
}

async function submitWord() {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase()
    if (!userInput) {
        alert('Please enter a word')
        return
    }
    const username = sessionStorage.getItem('username')
    console.log(`🔹 Current Word (Before Submission): ${currentWord}`);
    console.log(`🔹 User Input: ${userInput}`);

    try {
         currentWord = document.getElementById('current-word').innerText

        const res = await fetch(`${API_URL}/words/validate-word`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentWord, userWord: userInput, username })
        });
        console.log(`🔹 Response Status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.log('❌ Invalid response format (non-JSON)');

            throw new Error("Invalid response format (HTML or non-JSON)");
        }
        const result = await res.json()
        console.log(`🔹 Response Data:`, result);
        if (res.ok && result.valid) {
            console.log('✅ Valid word accepted');
            currentWord = userInput
            document.getElementById('current-word').innerText = result.nextWord;
            document.getElementById('message').innerText = 'valid word!'
            document.getElementById('user-input').value = ''

            updateScore(userInput, username, true)
        } else {
            console.log(`❌ Invalid word: ${result.message}`);
            document.getElementById('message').innerText = result.message
            document.getElementById('user-input').value = '';
            updateScore(userInput, username, false)
        }
    } catch (error) {
        console.error('Error validating word:', error)
        document.getElementById('message').innerText = 'Error submitting word!'
    }
}

const updateScore = async (word, username, isValid) => {
    if (!username) {
        console.error("Username is required to update score.");
        return;
    }
    console.log(`🔹 Updating Score - Word: ${word}, Valid: ${isValid}`);
    try {
        const response = await fetch(`${API_URL}/scores/score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ valid: isValid, word, username })
        });

        const data = await response.json();
        console.log(`🔹 Score Update Response:`, data);
        const scoreElement = document.getElementById('score')
        const streakElement = document.getElementById('streak')
        if (scoreElement && streakElement) {
            scoreElement.innerText = `Score: ${data.score}`
            streakElement.innerText = `${data.streak}`
        }
        else {
            console.error("Score element not found in DOM.");
        }

    } catch (error) {
        console.error('Error updating score:', error);
    }
};

const displayLeaderboard = async () => {
    try {
        const response = await fetch(`${API_URL}/scores/leaderboard`)
        const leaderboard = await response.json()

        const leaderboardElement = document.getElementById('leaderboard')
        leaderboardElement.innerHTML = '<h2>Leaderboard</h2><ol>'
        leaderboard.forEach((player) => {
            leaderboardElement.innerHTML += `<li>${player.username}: ${player.score} points (Streak: ${player.streak})</li>`
        });

        leaderboardElement.innerHTML += '</ol>'
    } catch (error) {
        console.error('Error loading leaderboard:', error)
        document.body.innerHTML += '<p>Error loading leaderboard!</p>'
    }
}

