// Call functions game logic
import { MAX_ATTEMPTS, processGuess, newGameLogic, getGuessHistory, saveScore, getLeaderboard } from "./guessnumber.logic.js";

// call function to check logged in
import { loadUsername, saveUsername } from "./global.js";

// DOM ELEMENTS
const ui = {
  feedback: document.getElementById("feedback"),
  attemptsLeft: document.getElementById("attemptsLeft"),
  guessInput: document.getElementById("guessInput"),
  submitButton: document.getElementById("submitButton"),
  playAgainButton: document.getElementById("playAgainButton"),
  guessHistory: document.getElementById("guessHistory"),
  usernameInput: document.getElementById("usernameInput"),
  leaderboard: document.getElementById("leaderboard"),
};

function resetGuessInput() {
  ui.guessInput.value = "";
  ui.guessInput.focus();
}

function setControls({ submitDisabled, playAgainDisabled }) {
  ui.submitButton.disabled = submitDisabled;
  ui.playAgainButton.disabled = playAgainDisabled;
}

const feedbackConfig = {
  high: {
    message: ({ guess, attemptsLeft }) => `${guess}, too high! Attempts left: ${attemptsLeft}. Try lower number.`,
    className: "bg-blue-100 text-blue-700",
  },

  low: {
    message: ({ guess, attemptsLeft }) => `${guess}, too low! Attempts left: ${attemptsLeft}. Try higher number.`,
    className: "bg-red-100 text-red-700",
  },

  win: {
    message: ({ guess, username }) => `${guess}. Congratulations ${username}. You are correct!`,
    className: "bg-green-100 text-green-700",
  },

  lose: {
    message: ({ targetNumber }) => `Game over! The correct number was ${targetNumber}.`,
    className: "bg-gray-100 text-gray-700",
  },

  invalid: {
    message: ({ message }) => message,
    className: "bg-yellow-100 text-yellow-700",
  },
};

function renderFeedback({ status, guess, attemptsLeft, targetNumber, message, username }) {
  const config = feedbackConfig[status];

  if (!config) {
    return;
  }

  ui.feedback.textContent = config.message({ guess, attemptsLeft, targetNumber, message, username });

  ui.feedback.className = `p-3 rounded ${config.className}`;
}

function renderGuessHistory() {
  ui.guessHistory.innerHTML = "";
  getGuessHistory().forEach((guess) => {
    const li = document.createElement("li");
    li.textContent = guess;
    li.className = "px-2 py-1 border-b text-sm";
    ui.guessHistory.appendChild(li);
  });
}

function renderLeaderboard() {
  ui.leaderboard.innerHTML = "";
  const leaderboard = getLeaderboard();

  if (leaderboard.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No scores yet.";
    empty.className = "text-sm italic text-gray-500";
    ui.leaderboard.appendChild(empty);
  }

  leaderboard
    .sort((score1, score2) => score1.attemptsUsed - score2.attemptsUsed)
    .slice(0, 10)
    .forEach((entry, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${entry.username} - ${entry.attemptsUsed} attempts`;
      li.className = "px-2 py-1 border-b text-sm";
      ui.leaderboard.appendChild(li);
    });
}

// EVENT HANDLERS
function handleStartGame() {
  newGameLogic();
  resetGuessInput();
  ui.attemptsLeft.textContent = MAX_ATTEMPTS;
  ui.feedback.textContent = "";
  ui.feedback.className = "";
  renderGuessHistory();
  renderLeaderboard();
  setControls({
    submitDisabled: false,
    playAgainDisabled: true,
  });
}

function handleSubmitGuess() {
  const value = ui.guessInput.value;
  const result = processGuess(value);

  if (!result) {
    return;
  }

  if (result.status === "invalid") {
    renderFeedback({
      status: "invalid",
      message: result.message,
    });
    return;
  }

  ui.attemptsLeft.textContent = result.attemptsLeft;
  if (result.status === "high" || result.status === "low") {
    renderFeedback({
      status: result.status,
      guess: Number(value),
      attemptsLeft: result.attemptsLeft,
    });

    resetGuessInput();
    renderGuessHistory();
    return;
  }

  if (result.status === "win") {
    const username = loadUsername() || "Guest";
    renderFeedback({
      status: "win",
      guess: Number(value),
      username,
    });

    saveScore(username);
    setControls({
      submitDisabled: true,
      playAgainDisabled: false,
    });

    renderGuessHistory();
    renderLeaderboard();
    return;
  }

  if (result.status === "lose") {
    renderFeedback({
      status: "lose",
      targetNumber: result.targetNumber,
    });

    setControls({
      submitDisabled: true,
      playAgainDisabled: false,
    });
    renderGuessHistory();
  }
}

function handlePlayAgain() {
  handleStartGame();
}

// EVENT LISTENER
document.addEventListener("DOMContentLoaded", () => {
  handleStartGame();
  ui.submitButton.addEventListener("click", handleSubmitGuess);
  ui.playAgainButton.addEventListener("click", handlePlayAgain);
});

ui.usernameInput.addEventListener("input", (e) => {
  saveUsername(e.target.value.trim() || "Guest");
});

ui.guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSubmitGuess();
  }
});
