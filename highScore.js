// Initialize high score from localStorage or set to 0 if not available
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
const highScoreDisplay = document.getElementById("highScore");

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        // Save new high score to localStorage
        localStorage.setItem('highScore', highScore);
    }
    highScoreDisplay.textContent =  highScore;
}

// Call updateHighScore function after the game ends
function stopGame() {
    gameRunning = false;
    obstacle.style.animation = "none"; // Stop obstacle animation
    coin.style.animation = "none"; // Stop coin animation

    // Show the Start Again button
    const startAgainButton = document.getElementById("startAgainButton");
    startAgainButton.style.display = "block"; // Make the button visible

    // Show the death message with a shaking animation
    const deathMessage = document.getElementById("deathMessage");
    deathMessage.style.display = "block";
    deathMessage.style.animation = "shake 0.5s ease-in-out"; // Apply shake animation

    // Update the high score after the game ends
    updateHighScore();
}

function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    gameRunning = true;

    // Reset Dino position
    dino.style.bottom = "10px";

    // Reset obstacle
    obstacle.style.right = "-5vw";
    obstacle.style.animation = "moveObstacle 2s linear infinite";

    // Reset coin
    coin.style.left = "100%";
    coin.style.animation = "moveCoin 3s linear infinite";

    // Hide the Start Again button
    const startAgainButton = document.getElementById("startAgainButton");
    startAgainButton.style.display = "none"; // Hide button again

    // Hide the death message after reset
    const deathMessage = document.getElementById("deathMessage");
    deathMessage.style.display = "none";
}

// Display the high score when the page loads
document.addEventListener("DOMContentLoaded", function() {
    updateHighScore();
});
