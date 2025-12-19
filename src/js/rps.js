// Game state Variables
let userName = "Guest";
let playerChoice = "";
let computerChoice = "";
let isUserReady = false;
let roundsPlayed = 0;
const MAX_ROUNDS = 5;

// DOM Elements
const nameInput = document.getElementById("userNameInput");
const setNameButton = document.getElementById("setNameBtn");
const userGreeting = document.getElementById("userGreeting");
const choiceButtons = document.querySelectorAll(".choiceBtn");
const resultText = document.getElementById("result");
const playAgainButton = document.getElementById("playAgainBtn");

//Functions
const choices = ["rock", "paper", "scissors"];

function getUserName(inputName) {
  return inputName ? inputName : "Guest";
}

function getComputerChoice(){
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function determineResult(player, computer){
    if (player === computer){
        return "draw";
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "scissors" && computer === "paper") ||
        (player === "paper" && computer === "rock")
    ){
        return "win";
    }
    return "loss";
}

//Event Listeners
choiceButtons.forEach(button => {
    button.disabled = true;
});
playAgainButton.disabled = true;

setNameButton.addEventListener("click", () => {
    userName = getUserName(nameInput.value.trim());
    isUserReady = true;

    userGreeting.textContent = `Hello, ${userName}!`;
    userGreeting.classList.remove("hidden");

    nameInput.classList.add("hidden");
    setNameButton.classList.add("hidden");

    choiceButtons.forEach(button => {
        button.disabled = false;
    });
});



choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {

        playerChoice = button.dataset.choice;
        computerChoice = getComputerChoice();

        const result = determineResult(playerChoice, computerChoice);

        resultText.textContent = `${userName} chose ${playerChoice}. Computer chose ${computerChoice}. Result: ${result.toUpperCase()}`;

        roundsPlayed++;
        if(roundsPlayed === MAX_ROUNDS){
            choiceButtons.forEach(button => {
                button.disabled = true;
            resultText.textContent = "Round end!!"
            });
        }
        playAgainButton.disabled = false;
    });
});

playAgainButton.addEventListener("click", () => {
    playerChoice = "";
    computerChoice = "";
    resultText.textContent = "";
    roundsPlayed = 0;

    choiceButtons.forEach(button => button.disabled = false);
    playAgainButton.disabled = true;

    if(isUserReady){
        choiceButtons.forEach(button => {
            button.disabled = false;
        });
    }
    playAgainButton.disabled = true;
});

