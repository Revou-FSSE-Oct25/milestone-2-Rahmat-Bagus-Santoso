import { clickerLogic } from "./clicker.logic.js";
import { loadUsername, saveUsername } from "./global.js";

// DOM Elements
const ui = {
  clickButton: document.getElementById("clickButton"),
  resetButton: document.getElementById("resetButton"),
  clickCount: document.getElementById("clickCount"),
  timeLeft: document.getElementById("timeLeft"),
  usernameInput: document.getElementById("usernameInput"),
  usernameSubmit: document.getElementById("usernameSubmit"),
  leaderboardSection: document.getElementById("leaderboardSection"),
  leaderboardList: document.getElementById("leaderboardList"),
};

function render() {
  const state = clickerLogic.getState();
  ui.clickCount.textContent = state.clicks;
  ui.timeLeft.textContent = state.timeLeft;
  ui.clickButton.disabled = false;
  ui.resetButton.disabled = state.status !== "finished";
}

function renderLeaderboard() {
  const leaderboard = clickerLogic.getLeaderboard();
  ui.leaderboardList.innerHTML = "";
  leaderboard.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.username} - ${entry.score}`;
    ui.leaderboardList.appendChild(li);
  });
}

document.addEventListener("keydown", (e) => {
  const isTyping = e.target === ui.usernameInput || e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";

  if (isTyping) {
    return;
  }

  if (e.key === "Enter" || e.key === "") {
    e.preventDefault();
  }
});

ui.clickButton.addEventListener("click", () => {
  clickerLogic.startGame();
  clickerLogic.incrementClick();
  render();
});
ui.resetButton.addEventListener("click", () => {
  clickerLogic.resetGame();
  render();
});

ui.usernameSubmit.addEventListener("click", () => {
  const state = clickerLogic.getState();
  if (state.status !== "finished") {
    return;
  }
  const username = ui.usernameInput.value.trim() || "Guest";
  clickerLogic.submitScore(username);
  renderLeaderboard();
});

ui.usernameInput.addEventListener("input", (e) => {
  saveUsername(e.target.value.trim() || "Guest");
});

renderLeaderboard();
render();
setInterval(render, 200);
