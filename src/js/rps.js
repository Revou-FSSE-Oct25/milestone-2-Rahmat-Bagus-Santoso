// Game state Variables
let userName = "Guest";
let playerChoice = null;
let computerChoice = null;

// DOM Elements
const nameInput = document.getElementById("userNameInput");
const choiceButtons = document.querySelectorAll(".choiceBtn");
const resultEl = document.getElementById("result");
const playAgainBtn = document.getElementById("playAgainBtn");

//Functions
const choices = ["rock", "paper", "scissors"];

// function getUserName(inputName) {
//   return inputName ? inputName : "Guest";
// }
function getUser(){
    if (userName !== "Guest"){
        return;
    }
    const input = nameInput.value.trim();
    userName = input === "" ? "Guest" : input;
}

function getComputerChoice(){
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function determineResult(player, computer){
    if (player === computer)
        return "draw";

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
choiceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        getUser();

        playerChoice = btn.dataset.choice;
        computerChoice = getComputerChoice();

        const result = determineResult(playerChoice, computerChoice);

        resultEl.textContent = `${userName} chose ${playerChoice}. Computer chose ${computerChoice}. Result: ${result.toUpperCase()}`;

        playAgainBtn.disabled = false;
        choiceButtons.forEach(b => b.disabled = true);
    });
});

playAgainBtn.addEventListener("click", () => {
    playerChoice = null;
    computerChoice = null;
    resultEl.textContent = "";

    choiceButtons.forEach(b => b.disabled = false);
    playAgainBtn.disabled = true;
});

