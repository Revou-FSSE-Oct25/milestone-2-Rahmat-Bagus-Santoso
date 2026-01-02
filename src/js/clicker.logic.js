import { loadUsername, saveUsername } from "./global.js";

// Game state Variables
const GAME_DURATION = 10;
const LEADERBOARD_KEY = "clicker_leaderboard";
let timerId = null;
const gameState = {
  clicks: 0,
  timeLeft: GAME_DURATION,
  status: "idle",
};

let leaderboard = loadLeaderboard();
function loadLeaderboard() {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLeaderboard() {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
}

//Functions
function startGame() {
  if (gameState.status !== "idle") {
    return;
  }
  gameState.status = "running";
  startTimer();
}

function incrementClick() {
  if (gameState.status !== "running") {
    return;
  }
  gameState.clicks++;
}
function startTimer() {
  timerId = setInterval(tickTimer, 1000);
}

function tickTimer() {
  if (gameState.timeLeft <= 0) {
    endGame();
    return;
  }

  gameState.timeLeft--;
}

function endGame() {
  clearInterval(timerId);
  timerId = null;
  gameState.status = "finished";
}

function resetGame() {
  clearInterval(timerId);
  timerId = null;
  gameState.clicks = 0;
  gameState.timeLeft = GAME_DURATION;
  gameState.status = "idle";
}

function submitScore() {
  leaderboard.push({
    username,
    score: gameState.clicks,
    date: Date.now(),
  });

  saveLeaderboard();
}

export const clickerLogic = {
  getState: () => ({ ...gameState }),
  getLeaderboard: () => [...leaderboard],
  startGame,
  incrementClick,
  submitScore,
  resetGame,
};
