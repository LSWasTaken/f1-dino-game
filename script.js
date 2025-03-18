const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const coin = document.getElementById("coin");
const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;
let gameRunning = true;

// Listen for touch/tap or keyboard space
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping) {
        jump();
    }
});

gameContainer.addEventListener("click", function() {
    if (!isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let position = 10;
    let upInterval = setInterval(() => {
        if (position >= 120) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 10) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                dino.style.bottom = position + "px";
                position -= 10;
            }, 20);
        }
        dino.style.bottom = position + "px";
        position += 12;
    }, 20);
}

function checkCollision() {
    let dinoRect = dino.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();
    let coinRect = coin.getBoundingClientRect();
    
    // Obstacle collision
    if (
        dinoRect.right > obstacleRect.left &&
        dinoRect.left < obstacleRect.right &&
        dinoRect.bottom > obstacleRect.top &&
        dinoRect.top < obstacleRect.bottom
    ) {
        alert("Game Over! Your Score: " + score);
        stopGame();
    }
    
    // Coin collection
    if (
        dinoRect.right > coinRect.left &&
        dinoRect.left < coinRect.right &&
        dinoRect.bottom > coinRect.top &&
        dinoRect.top < coinRect.bottom
    ) {
        score += 100;
        resetCoin();
    }
}

function resetCoin() {
    coin.style.left = "100%"; 
    coin.style.animation = "none"; // Stop current animation

    setTimeout(() => {
        coin.style.animation = "moveCoin 3s linear infinite"; // Restart coin movement
    }, 500);
}

function increaseScore() {
    if (gameRunning) {
        score++;
        scoreDisplay.textContent = score;
        
        if (score % 100 === 0) {
            resetCoin();
        }
    }
}

function stopGame() {
    gameRunning = false;
    obstacle.style.animation = "none"; // Stop obstacle animation
    coin.style.animation = "none"; // Stop coin animation
    document.getElementById("startAgainButton").style.display = "block"; // Show the Start Again button
    setTimeout(() => {
        alert("Game Over! Your Score: " + score);
    }, 100); // Display Game Over after a short delay
}

document.getElementById("startAgainButton").addEventListener("click", restartGame);

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
    document.getElementById("startAgainButton").style.display = "none";
}

// Update text position
function moveText() {
    x += dx;
    y += dy;

    if (x <= 0 || x + bouncingText.clientWidth >= screenWidth) dx *= -1;
    if (y <= 0 || y + bouncingText.clientHeight >= screenHeight) dy *= -1;

    bouncingText.style.left = x + "px";
    bouncingText.style.top = y + "px";

    requestAnimationFrame(moveText);
}

// Adjust on window resize
window.addEventListener("resize", () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
});

// Start animation
moveText();
