// Game state Variables
let clicks = 0;
let timeLeft = 10;
let timerId = 0;
let isRunning = false;

// DOM Elements
const clickButton = document.getElementById("clickBtn");
const resetButton = document.getElementById("resetBtn");
const clickCountEl = document.getElementById("clickCount");
const timeLeftEl = document.getElementById("timeLeft");

//Functions
function startTimer() {
  if (isRunning) {
    return;
  }
  isRunning = true;
  timerId = setInterval(() => {
    if (timeLeft <= 0) {
      endGame();
      return;
    }
    timeLeft--;
    timeLeftEl.textContent = timeLeft;
  }, 1000);
}

function endGame() {
  clearInterval(timerId);
  timerId = 0;
  isRunning = false;
  clickButton.disabled = true;
  resetButton.disabled = false;
}

//Event Listeners
clickButton.addEventListener("click", () => {
    startTimer();
  

  clicks++;
  clickCountEl.textContent = clicks;
});

resetButton.addEventListener("click", () => {
  clicks = 0;
  timeLeft = 10;

  clickCountEl.textContent = clicks;
  timeLeftEl.textContent = timeLeft;

  clickButton.disabled = false;
  resetButton.disabled = true;
});
