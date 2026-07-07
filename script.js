// ===============================
// DOM Elements
// ===============================

const choices = document.querySelectorAll(".choice");

const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

const playerChoice = document.getElementById("player-choice");
const computerChoice = document.getElementById("computer-choice");

const result = document.getElementById("result-text");

const reset = document.getElementById("reset-btn");

const modal = document.getElementById("winner-modal");
const winnerTitle = document.getElementById("winner-title");
const playAgain = document.getElementById("play-again");

// ===============================
// Load Saved Scores
// ===============================

let pScore = Number(localStorage.getItem("player")) || 0;
let cScore = Number(localStorage.getItem("computer")) || 0;

playerScore.textContent = pScore;
computerScore.textContent = cScore;

// ===============================
// Game Data
// ===============================

const gameChoices = ["rock", "paper", "scissors"];

const emojis = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};

// ===============================
// Button Click
// ===============================

choices.forEach(button => {

    button.addEventListener("click", () => {

        const playerMove = button.dataset.choice;

        playerChoice.textContent = emojis[playerMove];

        computerChoice.classList.add("thinking");
        computerChoice.textContent = "🤖";

        result.textContent = "Computer is thinking...";
        result.style.color = "white";

        choices.forEach(btn => btn.disabled = true);

        setTimeout(() => {

            const random = Math.floor(Math.random() * gameChoices.length);

            const computerMove = gameChoices[random];

            computerChoice.classList.remove("thinking");
            computerChoice.textContent = emojis[computerMove];

            determineWinner(playerMove, computerMove);

            choices.forEach(btn => btn.disabled = false);

        }, 900);

    });

});

// ===============================
// Winner Logic
// ===============================

function determineWinner(player, computer) {

    if (player === computer) {

        result.textContent = "🤝 It's a Draw!";
        result.style.color = "#facc15";

        return;
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {

        pScore++;

        playerScore.textContent = pScore;

        localStorage.setItem("player", pScore);

        result.textContent = "🎉 You Win!";
        result.style.color = "#22c55e";

    } else {

        cScore++;

        computerScore.textContent = cScore;

        localStorage.setItem("computer", cScore);

        result.textContent = "💻 Computer Wins!";
        result.style.color = "#ef4444";

    }

    checkChampion();

}

// ===============================
// First to 5
// ===============================

function checkChampion() {

    if (pScore >= 5) {

    launchConfetti();

    showWinner("🏆 YOU WON THE MATCH!");

}

    if (cScore >= 5) {

        showWinner("🤖 COMPUTER WON THE MATCH!");

    }

}
function launchConfetti() {

    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {

        confetti({
            particleCount: 5,
            angle: 60,
            spread: 60,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 60,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }

    })();

}

// ===============================
// Winner Popup
// ===============================

function showWinner(message) {

    winnerTitle.textContent = message;

    modal.style.display = "flex";

}

// ===============================
// Play Again
// ===============================

playAgain.addEventListener("click", () => {

    resetGame();

    modal.style.display = "none";

});

// ===============================
// Reset Button
// ===============================

reset.addEventListener("click", () => {

    resetGame();

});

// ===============================
// Reset Function
// ===============================

function resetGame() {

    pScore = 0;
    cScore = 0;

    playerScore.textContent = 0;
    computerScore.textContent = 0;

    playerChoice.textContent = "❔";
    computerChoice.textContent = "❔";

    result.textContent = "Choose your weapon!";
    result.style.color = "white";

    localStorage.removeItem("player");
    localStorage.removeItem("computer");

}