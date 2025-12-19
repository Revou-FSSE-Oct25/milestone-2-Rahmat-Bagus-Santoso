// Game state Variables
let randomNumber;
let attemptsLeft;
let gameActive = false;
let userName;

// DOM Elements
const startButton = document.getElementById("startBtn");
const submitButton = document.getElementById("submitBtn");
const playAgainButton = document.getElementById("playAgainBtn");
const nameInput = document.getElementById("userNameInput");
const guessNumber = document.getElementById("guessNumber");
const initArea = document.getElementById("initArea");
const gameArea = document.getElementById("gameArea");
const feedback = document.getElementById("feedback");

//Functions
function getUserName(inputName) {
  return inputName ? inputName : "Guest";
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function initGame() {
  randomNumber = generateRandomNumber();
  attemptsLeft = 3;
  gameActive = true;
}

function validateInput(input) {
  if (input === ""){
      return {
        isValid: false, message: "Please enter a number"
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

  console.log("input validated:", number);
  return { isValid: true, value: number };
}

function handleSubmitGuess(){
    if (!gameActive) return;

  const result = validateInput(guessNumber.value);
  if (!result.isValid) {
    feedback.textContent = result.message;
    return;
  }

  const userGuess = result.value;
  attemptsLeft--;
  if (userGuess === randomNumber) {
    feedback.textContent = `Correct! Congratulations, ${userName}`;
    gameActive = false;
    submitButton.disabled = true;
    playAgainButton.disabled = false;
    return;
  }

  if (attemptsLeft === 0) {
    feedback.textContent = `Game over! ${userName}. The number was ${randomNumber}.`;
    gameActive = false;
    submitButton.disabled = true;
    playAgainButton.disabled = false;
    return;
  }

  if (userGuess > randomNumber) {
    feedback.textContent = `Too high! Attempts left: ${attemptsLeft}`;
    return;
  }

  feedback.textContent = `Too low! Attempts left: ${attemptsLeft}`;
}

function endGame (){
    gameActive = false;
    submitButton.disabled = true;
    playAgainButton.disabled = false;
}

//Event Listeners
startButton.addEventListener("click", () => {
  userName = getUserName(nameInput.value.trim());
  initGame();

  initArea.classList.add("hidden");
  gameArea.classList.remove("hidden");
  guessNumber.value = "";
  feedback.textContent = "";
  submitButton.disabled = false;
  playAgainButton.disabled = true;

  console.log("Answer: ", randomNumber);
});

submitButton.addEventListener("click", handleSubmitGuess);

playAgainButton.addEventListener("click", () => {
  initGame();
  guessNumber.value = "";
  feedback.textContent = "";
  submitButton.disabled = false;
  playAgainButton.disabled = true;
});
