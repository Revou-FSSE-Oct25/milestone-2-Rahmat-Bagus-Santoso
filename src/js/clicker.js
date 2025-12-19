// Game state Variables
let clicks = 0;
let timeLeft = 10;
let timerId = null;

// DOM Elements
const clickButton = document.getElementById("clickBtn");
const resetButton = document.getElementById("resetBtn");
const clickCountEl = document.getElementById("clickCount");
const timeLeftEl = document.getElementById("timeLeft");

//Functions
function startTimer(){
    timerId = setInterval(() => {
        timeLeft--;
        timeLeftEl.textContent = timeLeft;

        if (timeLeft <= 0){
            endGame();
        }
    }, 1000);
}

function endGame(){
    clearInterval(timerId);
    timerId = null;
    clickButton.disabled = true;
    resetButton.disabled = false;
}

//Event Listeners
clickButton.addEventListener("click", () => {
    if (timerId === null){
        startTimer();
    }

    clicks++;
    clickCountEl.textContent = clicks;
});

resetButton.addEventListener("click", () => {
    clicks = 0;
    timeLeft = 0;

    clickCountEl.textContent = clicks;
    timeLeftEl.textContent = timeLeft;

    clickButton.disabled = false;
    resetButton.disabled = true;
});

