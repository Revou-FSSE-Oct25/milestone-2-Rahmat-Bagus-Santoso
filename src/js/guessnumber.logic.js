// GAME STATE
// Initial variable when game loaded
export const MAX_ATTEMPTS = 10;
const LEADERBOARD_KEY = "guessnumber_leaderboard";

const gameState = {
  targetNumber: 0,
  attemptsLeft: MAX_ATTEMPTS,
  isActive: false,
  guessHistory: [],
};

// UTILITIES FUNCTION
// Generates a random number between 1 - 100
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// GAME INITIALIZATION
// Initialize the game state
export function initGame() {
  gameState.targetNumber = generateRandomNumber();
  gameState.attemptsLeft = MAX_ATTEMPTS;
  gameState.isActive = true;
  gameState.guessHistory = [];
}

// INPUT VALIDATION
// Validate user input before processing the guess
export function validateInput(input) {
  if (input === "") {
    return {
      isValid: false,
      message: "Please enter a number",
    };
  }

  const number = Number(input);
  if (Number.isNaN(number)) {
    return {
      isValid: false,
      message: "Please enter a valid number.",
    };
  }

  if (number < 1 || number > 100) {
    return {
      isValid: false,
      message: "Number must be between 1 and 100.",
    };
  }

  return { isValid: true, value: number };
}

// GAME FLOW
// Processing the main flow when submitting a guess
export function processGuess(inputValue) {
  if (!gameState.isActive) {
    return {
      status: "inactive",
    };
  }

  const validation = validateInput(inputValue);
  if (!validation.isValid) {
    return {
      status: "invalid",
      message: validation.message,
    };
  }

  const guess = validation.value;
  gameState.guessHistory.push(guess);
  gameState.attemptsLeft--;

  if (guess === gameState.targetNumber) {
    gameState.isActive = false;
    return {
      status: "win",
      attemptsLeft: gameState.attemptsLeft,
    };
  }

  if (gameState.attemptsLeft === 0) {
    gameState.isActive = false;
    return {
      status: "lose",
      targetNumber: gameState.targetNumber,
    };
  }

  if (guess > gameState.targetNumber) {
    return {
      status: "high",
      attemptsLeft: gameState.attemptsLeft,
    };
  }
  return {
    status: "low",
    attemptsLeft: gameState.attemptsLeft,
  };
}

export function getGuessHistory() {
  return [...gameState.guessHistory];
}

function loadLeaderboard() {
  const stored = localStorage.getItem(LEADERBOARD_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveLeaderboard(data) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(data));
}

export function saveScore(username) {
  const leaderboard = loadLeaderboard();
  const attemptsUsed = MAX_ATTEMPTS - gameState.attemptsLeft;

  leaderboard.push({
    username,
    attemptsUsed,
    date: Date.now(),
  });

  saveLeaderboard(leaderboard);
}

export function getLeaderboard() {
  return loadLeaderboard();
}

// GAME CONTROL
export function newGameLogic() {
  initGame();
}
